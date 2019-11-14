import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Grid, Col, Row } from 'react-styled-flexboxgrid';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { onCreateVodAsset } from '../../graphql/subscriptions';
import './index.css';
import VideoPlayer from '../VideoPlayer';
import GridCardView from '../GridCardView';
import * as queries from '../../graphql/queries';
import BottomScrollListener from 'react-bottom-scroll-listener';
import 'video.js/dist/video-js.css';
import awsvideo from '../../aws-video-exports';

class GridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayingMovie: false,
      url: '',
      choosenItem: {},
      value: '',
      nextToken: '',
      sources: [],
      items: [],

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnDocumentBottom = this.handleOnDocumentBottom.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.playURL(this.state.value);
    event.preventDefault();
  }

  async componentDidMount() {
    const assets = await API.graphql(graphqlOperation(queries.listVodAssets));
    let { nextToken } = assets.data.listVodAssets;
    if (nextToken === undefined) {
      nextToken = '';
    }
    this.setState({ items: assets.data.listVodAssets.items, nextToken });
    this.listenForNewAssets();
  }


  async handleOnDocumentBottom() {
    console.log(`I am at bottom! ${Math.round(performance.now())}`);
    console.log(this.state.nextToken);
    if (this.state.nextToken !== '' && this.state.nextToken !== undefined) {
      const assets = await API.graphql(graphqlOperation(queries.listVodAssets, { nextToken: this.state.nextToken }));
      const items = this.state.items.concat(assets.data.listVodAssets.items);
      console.log(this.state.token);
      let { nextToken } = assets.data.listVodAssets;
      if (nextToken === undefined) {
        nextToken = '';
      }
      this.setState({ items, nextToken });
    }
  }

  displayMovie = (item, e) => {
    this.setState({
      sources: [{
        src: `https://${awsvideo.awsOutputVideo}.s3.amazonaws.com/output/${item.video.id}.m3u8`,
        type: 'application/x-mpegURL',
      }],
      displayingMovie: true,
      choosenItem: item,
    });
  }

  hideMovie = () => {
    console.log('hide');
    this.setState({
      displayingMovie: false,
    });
  }

  onPlayerReady(player) {
    console.log('Player is ready: ', player);
    this.player = player;


    console.log(Object.getOwnPropertyNames(player).filter((p) => typeof Math[p] === 'function'));
  }

  overlayMovie = () => (
    <Modal id="popup" style={{ maxWidth: 800 }} isOpen={this.state.displayingMovie} toggle={this.hideMovie}>
      <ModalHeader toggle={this.hideMovie}>{this.state.choosenItem.title}</ModalHeader>
      <ModalBody>
        {this.state.choosenItem.description}
        {this.state.choosenItem.details}
        <VideoPlayer
          controls
          sources={this.state.sources}
          width={720}
          height={420}
          bigPlayButton={false}
          autoplay
        />
      </ModalBody>
    </Modal>
  )

  listenForNewAssets = () => {
    API.graphql(
      graphqlOperation(onCreateVodAsset),
    ).subscribe({
      next: (((data) => {
        console.log(data.value.data.onCreateVodAsset);
        console.log('RIP');
        const newItemList = this.state.items.push(data.value.data.onCreateVodAsset);
        console.log(newItemList);
        this.setState({
          // items:newItemList
        });
      })),
    });
  }


  render() {
    const items = this.state.items.map((item, key) => (
      <Col xs={6} sm={4} lg={3.5} style={{ paddingTop: 15, paddingBottom: 15 }}>
        <button onClick={(e) => this.displayMovie(item, e)}><GridCardView item={item} /></button>
      </Col>
    ));

    // https://github.com/LoicMahieu/react-styled-flexboxgrid


    return (
      <div style={{ paddingTop: 85 }}>
        {this.overlayMovie()}
        <BottomScrollListener onBottom={this.handleOnDocumentBottom} />
        <Grid fluid>
          <Row>
            {items}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default GridView;
