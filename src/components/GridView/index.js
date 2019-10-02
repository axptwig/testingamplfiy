import React, {Component} from 'react';
import VideoPlayer from 'react-video-js-player';
import {Grid, Col, Row} from 'react-styled-flexboxgrid';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import './index.css';
import GridCardView from './../GridCardView'

class GridView extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayingMovie:false,
      url:"",
      choosenItem:{},
      value:"",
      items:[{id:1, title:"Steve Jobs Speech", details:"None", url:"http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8"}, {id:2, title:"JW Player Test", details:"None", url:"https://content.jwplatform.com/manifests/yp34SRmf.m3u8"}, {id:3, title:"Kaltura Player HLS URL Tester", details:"None", url:"http://cdnapi.kaltura.com/p/1878761/sp/187876100/playManifest/entryId/1_usagz19w/flavorIds/1_5spqkazq,1_nslowvhp,1_boih5aji,1_qahc37ag/format/applehttp/protocol/http/a.m3u8"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}]
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    this.playURL(this.state.value)
    event.preventDefault();
  }

  displayMovie = (item, e) =>{
    this.setState({
      displayingMovie:true,
      choosenItem:item
    })
  }

  playURL = (link) => {
    console.log("clicked");
    this.setState({
      url:link
    }, () => {
      if (!!this.player) {
        this.player.src(this.state.url)
        console.log("hello")
      }
    });

    console.log(this.state.url);
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
  }

  overlayMovie = () => {
    return (
    <Modal id='popup' style={{maxWidth: 800}} isOpen={this.state.displayingMovie} toggle={this.hideMovie}>
      <ModalHeader  toggle={this.hideMovie}>{this.state.choosenItem.title}</ModalHeader>
      <ModalBody>
        {this.state.choosenItem.details}
            <div>
                <VideoPlayer
                    controls={true}
                    src={this.state.choosenItem.url}
                    width="720"
                    height="420"
                    onReady={this.onPlayerReady.bind(this)}
                />
            </div>
            <div>
              Input Url Here: <input type="text" value={this.state.value} name="contentURL" onChange={this.handleChange}></input>
              <button onClick={e => this.handleSubmit(e)}>submit</button>
            </div>
      </ModalBody>
    </Modal>
    );
  }




  render(){
    const items = this.state.items.map((item, key) =>
      <Col xs={6} sm={3} lg={2} style={{paddingTop:5, paddingBottom:5}}>
        <button onClick={(e) => this.displayMovie(item, e)}><GridCardView item={item}></GridCardView></button>
      </Col>
    );
    
    //https://github.com/LoicMahieu/react-styled-flexboxgrid

  
    return (
      <div style={{paddingTop:85}}>
        {this.overlayMovie()}
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
