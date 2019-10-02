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
      url:"http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8",
      choosenItem:{},
      items:[{id:1, title:"blah", details:"None"}, {id:2, title:"Blha2", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}]
    }
  }


  displayMovie = (item, e) =>{
    this.setState({
      displayingMovie:true,
      choosenItem:item
    })
  }

  playURL = () => {
    console.log("clicked");
    this.setState({
      url:"https://content.jwplatform.com/manifests/yp34SRmf.m3u8"
    });

    console.log(this.state.url);
  }

  hideMovie = () => {
    console.log("hide");
    this.setState({
      displayingMovie:false
    });
  }

  overlayMovie = () => {
    return (
    <Modal id='popup' isOpen={this.state.displayingMovie} toggle={this.hideMovie}>
      <ModalHeader  toggle={this.hideMovie}>{this.state.choosenItem.title}</ModalHeader>
      <ModalBody style={{display: "inline-block"}}>
        {this.state.choosenItem.details}
            <div>
                <VideoPlayer
                    controls={true}
                    src={this.state.url}
                    width="720"
                    height="420"
                />
            </div>
            <div>
              Input Url Here: <input type="text" name="contentURL"></input>
              <button onClick={e => this.handleSubmit(e)}>submit</button>
            </div>
      </ModalBody>
    </Modal>
    );
  }
  handleSubmit(event) {
    event.preventDefault()
    this.playURL()
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
