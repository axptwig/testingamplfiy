import React from 'react';
import './index.css';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { createVodAsset } from '../../graphql/mutations';
import { withAuthenticator } from 'aws-amplify-react';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', titleVal: '', lenVal:'',descVal:''};
        this.submitFormHandler = this.submitFormHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLenChange = this.handleLenChange.bind(this);
    }

    componentDidMount(){
      Storage.configure({
        AWSS3: {
            bucket: 'unicornflixwstest-dev-input',
            region: 'us-west-2'
        }
      });
      Storage.put('test2.txt', 'Hello')
      .then (result => console.log(result))
      .catch(err => console.log(err));
    }

    handleChange(event) {
      const value = event.target.value;
      const name = event.target.name;

      this.setState({
        [name]:value
      });
    }

    handledescChange(event) {
        this.setState({descVal: event.target.value});
    }
    handleLenChange(event) {
        this.setState({lenVal: event.target.value});
    }
    submitFormHandler(event){
        const object = {
            input: {

                title: this.state.titleVal,
                description:this.state.descVal,
                length:this.state.lenVal
            }
        }
        
       API.graphql(graphqlOperation(createVodAsset, object)).then((response,error) => {
              console.log(response.data.createVodAsset);
        });
        event.preventDefault();

    }
    render() {
        return (      
        <div>
        	<h1>Admin Panel</h1>
	        <form onSubmit={this.submitFormHandler}>
	          <div>
	          	Title: <input type="text" value={this.state.titleVal} name="titleVal" onChange={this.handleChange}/><br/>
	          	Length: <input type="text" value={this.state.lenVal} name="lenVal" onChange={this.handleChange}/><br/>
	          	Description: <br/><textarea rows="4" cols="50" value={this.state.descVal} name="descVal" onChange={this.handleChange}></textarea><br/>
	            <input type="file" accept='image/png'/>
	            <input type="submit" value="Submit" />
	          </div>
	        </form>
      	</div>
      )
    }
}

export default withAuthenticator(Admin, true);

