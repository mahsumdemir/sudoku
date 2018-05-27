import React, { Component } from 'react';
import './App.css';
import Board from './board/Board';
import ControlPanel from './ControlPanel.js';
import {parent} from 'EventRegistry.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board size={3} events={parent.newRegistry("board")}/>
        <ControlPanel events={parent.newRegistry("controlPanel")}/>
      </div>
    );
  }
}

export default App;
