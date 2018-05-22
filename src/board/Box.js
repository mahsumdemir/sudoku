import React from 'react';
import Cell from './Cell.js';

class Box extends React.Component{

    createBox = function(){
        const childrens = [];
        const size = this.props.size;
        for (let j = 0; j < size; j++){
            childrens[j] = [];
            for (let i = 0; i < size; i++){
                childrens[j][i] = <Cell />;
            }
        }
        
        return childrens;
    }

    render(){
        return(
            <div className="sudoku-box">
                {this.createBox()}
            </div>
        )
        
    }
}

export default Box;