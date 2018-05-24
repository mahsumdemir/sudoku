import React from 'react';
import Number from './Number.js';
import injectSheet from 'react-jss';
import eventRegistry from '../EventRegistry.js';

const styles = {
    cell: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50px',
        height: '50px',
        border: '1px solid black',
        cursor: 'pointer',
        '&:hover':{
            backgroundColor: 'red'
        },
    }
}

class Cell extends React.Component{

    constructor(){
        super();

        this.state = {
            number: 0
        }

        this.changeNumber = this.changeNumber.bind(this);

        eventRegistry.addEvent("changeNumber", this.changeNumber);
    }

    changeNumber = (number) => {
        this.setState({
            number: number
        })
    }


    render(){
        const classes = this.props.classes;
        return(
            <div className={classes.cell}><Number value={this.state.number}/></div>
        )
    }
}

export default injectSheet(styles)(Cell);