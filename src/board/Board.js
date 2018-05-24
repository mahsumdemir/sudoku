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
        for (let j = 0; j < this.props.size; j++){
            childs[j] = [];
            for (let i = 0; i < this.props.size; i++){
                childs[j][i] = <Box size={this.props.size} key={j+i}/>;
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