import React from 'react';
import logo from './logo.svg';
import './App.css';
import GridView from './../GridView';
import Navbar from './../Navbar'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar></Navbar>
        <GridView></GridView>
      </header>
    </div>
  );
}

export default App;
