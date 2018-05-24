import React from 'react';
import Box from './Box.js';
import injectSheet from 'react-jss'; 

const styles = {
    board: {
        width: '500px',
        height: '500px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        margin: '20px',
        backgroundColor: 'grey'
      }
}

class Board extends React.Component {
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
        const classes = this.props.classes;
        debugger;
        return (
            <div className={classes.board}>
                {this.createBoard()}
            </div>
        )
    }
}

export default injectSheet(styles)(Board);