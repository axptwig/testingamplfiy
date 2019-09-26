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
      <Col>
        <GridCardView item={item}></GridCardView>
      </Col>
    );
    
    //https://github.com/LoicMahieu/react-styled-flexboxgrid

  
    return (
        <Grid>
          <Row>
            {items}
          </Row>
        </Grid>
    );
  }
}

export default GridView;
