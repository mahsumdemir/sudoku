import React from 'react';
import Cell from './Cell.js';
import injectSheet from 'react-jss';

const styles = {
    box:{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        border: '1px solid black',
        '&:nth-child(2n)':{
            backgroundColor: 'aqua'
        }
    }
}

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
        const classes = this.props.classes;
        return(
            <div className={classes.box}>
                {this.createBox()}
            </div>
        )
        
    }
}

export default injectSheet(styles)(Box);