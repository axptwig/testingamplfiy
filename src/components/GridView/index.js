import React, {Component} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Storage } from 'aws-amplify';
import {Grid, Col, Row} from 'react-styled-flexboxgrid';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import { onCreateVodAsset } from '../../graphql/subscriptions';
import './index.css';
import VideoPlayer from './../VideoPlayer'
import GridCardView from './../GridCardView'
import * as queries from '../../graphql/queries';
import BottomScrollListener from 'react-bottom-scroll-listener'
import 'video.js/dist/video-js.css'
import awsvideo from '../../aws-video-exports'

class GridView extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayingMovie:false,
      url:"",
      choosenItem:{},
      value:"",
      nextToken:"",
      sources:[],
      items:[]
    
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnDocumentBottom = this.handleOnDocumentBottom.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    this.playURL(this.state.value)
    event.preventDefault();
  }
  async componentDidMount(){
    Storage.configure({
      AWSS3: {
          bucket: 'unicornflix-dev-ow6z2qfpy',
          region: 'us-west-2'
      }
    });
    const storageOptions = {
      customPrefix: {
        public: 'output/'
      }
    };
    const url = await Storage.get('SampleVideo_1280x720_1mb.m3u8', storageOptions);
    const assets = await API.graphql(graphqlOperation(queries.listVodAssets));
    var nextToken = assets.data.listVodAssets.nextToken;
    if(nextToken == undefined){
      nextToken = "";
    }
    this.setState({items: assets.data.listVodAssets.items, nextToken: nextToken})
    this.listenForNewAssets();
  }


  async handleOnDocumentBottom(){
    console.log('I am at bottom! ' + Math.round(performance.now()))
    console.log(this.state.nextToken);
    if(this.state.nextToken !== "" && this.state.nextToken !== undefined){
      const assets = await API.graphql(graphqlOperation(queries.listVodAssets,{nextToken:this.state.nextToken}));
      var items = this.state.items.concat(assets.data.listVodAssets.items);
      console.log(this.state.token);
      var nextToken = assets.data.listVodAssets.nextToken;
      if(nextToken == undefined){
        nextToken = "";
      }
      this.setState({items: items, nextToken: nextToken});

    }
  }
  displayMovie = (item, e) =>{
    this.setState({
      sources:[{
        src:`https://${awsvideo.awsOutputVideo}.s3.amazonaws.com/output/${item.video.id}.m3u8`,
        type:'application/x-mpegURL'
      }],
      displayingMovie:true,
      choosenItem:item
    });
  }

  hideMovie = () => {
    console.log("hide");
    this.setState({
      displayingMovie:false
    });
  }

  onPlayerReady(player){
    console.log("Player is ready: ", player);
    this.player = player;


    console.log(Object.getOwnPropertyNames(player).filter(function (p) {
    return typeof Math[p] === 'function';
}));
  }

  overlayMovie = () => {
    return (
    <Modal id='popup' style={{maxWidth: 800}} isOpen={this.state.displayingMovie} toggle={this.hideMovie}>
      <ModalHeader  toggle={this.hideMovie}>{this.state.choosenItem.title}</ModalHeader>
      <ModalBody>
        {this.state.choosenItem.description}
        {this.state.choosenItem.details}
                <VideoPlayer controls={true} sources={this.state.sources} width={720} height={420} bigPlayButton={false} autoplay={true}
             
                />
      </ModalBody>
    </Modal>
    );
  }

  listenForNewAssets = () => {
    API.graphql(
      graphqlOperation(onCreateVodAsset)
    ).subscribe({
      next: (((data) => {
        console.log(data.value.data.onCreateVodAsset);
        console.log("RIP");
        var newItemList = this.state.items.push(data.value.data.onCreateVodAsset);
        console.log(newItemList);
        this.setState({
            //items:newItemList
        });
      }))
    })
  }


  render(){
    const items = this.state.items.map((item, key) =>
      <Col xs={6} sm={4} lg={3.5} style={{paddingTop:15, paddingBottom:15}}>
        <button onClick={(e) => this.displayMovie(item, e)}><GridCardView item={item}></GridCardView></button>
      </Col>
    );
    
    //https://github.com/LoicMahieu/react-styled-flexboxgrid

  
    return (
      <div style={{paddingTop:85}}>
        {this.overlayMovie()}
        <BottomScrollListener onBottom={this.handleOnDocumentBottom} />
        <Grid fluid={true}>
          <Row>
            {items}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default GridView;
