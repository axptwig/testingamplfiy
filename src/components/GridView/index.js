import React, {Component} from 'react';
import {Grid, Col, Row} from 'react-styled-flexboxgrid'
import './index.css';
import GridCardView from './../GridCardView'

class GridView extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayingMovie:false,
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

  overlayMovie = () => {
    if(this.state.displayingMovie){
      return (
        <div>
          {this.state.choosenItem.title}
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
    
  }



  render(){
    const items = this.state.items.map((item, key) =>
      <Col xs={6} sm={3} lg={2} style={{paddingTop:5, paddingBottom:5}}>
        <button onClick={(e) => this.displayMovie(item, e)}><GridCardView item={item}></GridCardView></button>
        
      </Col>
    );
    
    //https://github.com/LoicMahieu/react-styled-flexboxgrid

  
    return (
      <div>
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
