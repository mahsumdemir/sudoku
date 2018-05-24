import React, { Component } from 'react';
import './App.css';
import Board from './board/Board';
import ControlPanel from './ControlPanel.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board size={3}/>
        <ControlPanel />
      </div>
    );
  }
}

export default App;
