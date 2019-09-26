import React, {Component} from 'react';
import './index.css';
import logo from '../App/logo.svg';


class GridCardView extends Component {
  constructor(props){
    super(props);
  }


  render(){
    return (
      <div class="card">
          <div class="container">
            <img src={logo}></img>
            {this.props.item.title}
            <p>{this.props.item.details}</p>
          </div>
      </div>
    );
  }
}

export default GridCardView;
