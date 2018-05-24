import React from 'react';
import Box from './Box.js';
import injectSheet from 'react-jss'; 

const styles = {
    board: props => ({
        width: '500px',
        height: '500px',
        display: 'grid',
        gridTemplateColumns: "1fr ".repeat(props.size),
        margin: '20px',
        background: 'black'
      })
}

class Board extends React.Component {
  createBoard = function(){
        let childs = [];
        for (let x = 0; x < this.props.size; x++){
            childs[x] = [];
            for (let y = 0; y < this.props.size; y++){
                childs[x][y] = <Box size={this.props.size} key={x+y} x={x*3} y={y*3}/>;
            }    
        }
        
        return childs;
    }

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.board}>
                {this.createBoard()}
            </div>
        )
    }
}

export default injectSheet(styles)(Board);