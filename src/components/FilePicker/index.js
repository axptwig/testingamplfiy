import React, {Component} from 'react';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import './index.css';



class FilePicker extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: ""
    }
  }

  async componentDidMount(){
    //this.uploadFile();

  }

 

  onChange(e) {
      const file = e.target.files[0];
      alert('Selected files: ' + file.name );
      this.state.name =file.name;
      Storage.put(file.name, file, {
          contentType: 'video/*'
      })
      .then (result => console.log(result))
      .catch(err => console.log(err));
      
      e.preventDefault();

      
  }

 





  render(){
   
   
  
    return (
      <input type="file" id="FilePicker" accept='video/*' onChange={(e) => this.onChange(e)}/>
    );
  }
}

export default FilePicker;
