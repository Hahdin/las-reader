import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LasInputFile from '../containers/LasInputFile'

class App extends Component {
  
  render() {
    console.log('app render')
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome</h1>
        </header>
        <LasInputFile />
      </div>
    );
  }
}

export default App;
