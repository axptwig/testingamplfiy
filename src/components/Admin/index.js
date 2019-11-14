import React from 'react';
import './index.css';
import { Auth, API, graphqlOperation, Storage } from 'aws-amplify';
import { createVodAsset, createVideoObject } from '../../graphql/mutations';
import { withAuthenticator } from 'aws-amplify-react';
import uuidv4 from 'uuid/v4';
import FilePicker from './../FilePicker'

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', titleVal: '',descVal:'',groups:[]};
        this.submitFormHandler = this.submitFormHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createAdminPanel = this.createAdminPanel.bind(this);
    }

    componentDidMount(){
      Auth.currentSession()
        .then( data =>  {
          const groups = data.idToken.payload["cognito:groups"];
          if (groups){
            this.setState({groups:data.idToken.payload["cognito:groups"]});
          }
        });


      Storage.configure({
        AWSS3: {
            bucket: 'unicornflix-dev-iw6z2qfpy',
            region: 'us-west-2'
        }
      });
    }

    handleChange(event) {
      const value = event.target.value;
      const name = event.target.name;

      this.setState({
        [name]:value
      });
    }
    myCallback = (dataFromChild) => {
        this.setState({
          file: dataFromChild,
          fileName: dataFromChild.name
        });
    }
    handledescChange(event) {
        this.setState({descVal: event.target.value});
    }


    submitFormHandler(event){
      event.preventDefault();

      const uuid = uuidv4();

      const videoObject = {
        input: {
          id: uuid,
          objectID: uuid
        }
      }

      API.graphql(graphqlOperation(createVideoObject, videoObject)).then((response, error) => {
        const videoAsset = {
          input: {
            title: this.state.titleVal,
            description:this.state.descVal,
            vodAssetVideoId: uuid,
          }
        }
        API.graphql(graphqlOperation(createVodAsset, videoAsset)).then((response, error) => {
          console.log(response.data.createVodAsset);
        }).catch(err => {
          //alert("error: with form"); 
          return
        });
      });
      

    Storage.put(`${uuid}.mp4`, this.state.file, {
        contentType: 'video/*'
      })
      .then (result => alert("Successfully Uploaded: " + uuid))
      .catch(err => console.log("Error: " + err));
       

    }

    createAdminPanel(){
     
      if (this.state.groups.includes("Admin")){
        return (
          <div>
          <h1>Admin Panel</h1>
          <form onSubmit={this.submitFormHandler}>
            <div>
              Title: <input type="text" value={this.state.titleVal} name="titleVal" onChange={this.handleChange}/><br/>
              Description: <br/><textarea rows="4" cols="50" value={this.state.descVal} name="descVal" onChange={this.handleChange}></textarea><br/>
              <FilePicker callbackFromParent={this.myCallback}/>
              <input type="submit" value="Submit" />
            </div>
          </form>
          </div>
          )
      } else {
        return (
        <div>
        Not Authenticated
        </div>);
      }
    }
    render() {
        return (      
        <div class="App-header">
         {this.createAdminPanel()}
      	</div>
      )
    }
}

export default withAuthenticator(Admin, true);
