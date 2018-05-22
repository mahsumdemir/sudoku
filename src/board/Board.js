import React from 'react';
import Box from './Box.js';

class Board extends React.Component {
    constructor() {
        super();
    }

    createBoard = function(){
        let childs = [];
        for (let j = 0; j < this.props.size; j++){
            childs[j] = [];
            for (let i = 0; i < this.props.size; i++){
                childs[j][i] = <Box size={3}/>;
            }    
        }
        
        return childs;
    }

    render() {
        return (
            <div className="sudoku-board">
                {this.createBoard()}
            </div>
        )
    }
}

export default Board;