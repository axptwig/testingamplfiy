import React from 'react';
import logo from './logo.svg';
import './App.css';
import GridView from './../GridView';
import Amplify from 'aws-amplify';
import awsconfig from './../../aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <GridView></GridView>
      </header>
    </div>
  );
}

export default withAuthenticator(App, true);
