import React, {Component} from 'react';
import './index.css';
import logo from '../App/logo.svg';


class GridCardView extends Component {
  render(){
    return (
      <div className="card">
          <div className="container">
            <img src={logo} alt='Movie'></img>
            {this.props.item.title}
            <p>{this.props.item.details}</p>
          </div>
      </div>
    );
  }
}

export default GridCardView;
