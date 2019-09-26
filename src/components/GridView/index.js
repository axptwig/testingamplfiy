import React, {Component} from 'react';
import {ThemeProvider} from 'styled-components'
import {Grid, Col, Row} from 'react-styled-flexboxgrid'
import GridCardView from './../GridCardView'

class GridView extends Component {
  constructor(props){
    super(props);
    this.state = {
      items:[{id:1, title:"blah", details:"None"}, {id:2, title:"Blha2", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}, {id:3, title:"works", details:"None"}]
    }
  }

  render(){
    const items = this.state.items.map((item, key) =>
      <Col xs={6} sm={3} lg={2} style={{paddingTop:5, paddingBottom:5}}>
        <GridCardView item={item}></GridCardView>
      </Col>
    );
    
    //https://github.com/LoicMahieu/react-styled-flexboxgrid

  
    return (
        <Grid fluid="true">
          <Row>
            {items}
          </Row>
        </Grid>
    );
  }
}

export default GridView;
