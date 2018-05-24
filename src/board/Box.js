import React from 'react';
import Cell from './Cell.js';
import injectSheet from 'react-jss';

const styles = {
    box: {
        display: 'grid',
        gridGap: '0px',
        gridTemplateColumns: props => '1fr '.repeat(props.size),
        '&:nth-child(even)':{
            backgroundColor: 'aqua'
        },
        '&:nth-child(odd)':{
            backgroundColor: 'white'
        },
        margin: '0px',
        padding: '0px',
        border: '1px solid black'
    }
}

class Box extends React.Component{

    createBox = function(){
        const childrens = [];
        const size = this.props.size;
        for (let j = 0; j < size; j++){
            childrens[j] = [];
            for (let i = 0; i < size; i++){
                childrens[j][i] = <Cell key={j+i}/>;
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