import React, { Component } from 'react';
import './App.css';
import Board from './board/Board';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board size={3}/>
      </div>
    );
  }
}

export default App;
