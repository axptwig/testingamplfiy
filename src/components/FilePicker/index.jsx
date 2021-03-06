import React, { Component } from 'react';
import './index.css';


class FilePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  async componentDidMount() {
    // this.uploadFile();

  }

  onChange(e) {
    const file = e.target.files[0];
    this.setState({
      name: file.name,
    });
    this.props.callbackFromParent(file);
    e.preventDefault();
  }

  render() {
    return (
      <input type="file" id="FilePicker" accept="video/*" onChange={(e) => this.onChange(e)} />
    );
  }
}

export default FilePicker;
