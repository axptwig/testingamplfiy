import React from 'react';
import logo from './logo.svg';
import './App.css';
import GridView from './../GridView';
import Navbar from './../Navbar'

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <header className="App-header">
        <GridView></GridView>
      </header>
    </div>
  );
}

export default App;
