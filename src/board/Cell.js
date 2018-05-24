import React from 'react';
import Number from './Number.js';
import injectSheet from 'react-jss';

const styles = {
    cell: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50px',
        height: '50px',
        margin: 'auto',
        border: '1px solid black',
        cursor: 'pointer',
        '&:hover':{
            backgroundColor: 'red'
        }
    }
}

class Cell extends React.Component{
    render(){
        const classes = this.props.classes;
        return(
            <div className={classes.cell}><Number /></div>
        )
    }
}

export default injectSheet(styles)(Cell);