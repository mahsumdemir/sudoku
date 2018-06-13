import React, { Component } from 'react';
import './App.css';
import Board from './board/Board';
import ControlPanel from './ControlPanel.js';
import parent from './EventRegistry.js'

class App extends Component {

  constructor(){
    super();

    this._forceUpdate = this._forceUpdate.bind(this);
    parent.addEvent('forceUpdate');
  }

  _forceUpdate = () => this.forceUpdate();

  render() {
    return (
      <div className="App">
        <Board size={3} events={parent.newRegistry("board")}/>
        <ControlPanel size={3} events={parent.newRegistry("controlPanel")}/>
      </div>
    );
  }
}

export default App;
