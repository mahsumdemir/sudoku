import React from 'react';
import Cell from './Cell.js';
import injectSheet from 'react-jss';
import { eventRegistry, eventNameGenerator } from '../EventRegistry.js';

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

    constructor(props){
        super(props);

        this.state = {
            childrens: this.createChildrens(this.props.size, this.props.x, this.props.y)
        }

        this.onNumberChanged = this.onNumberChanged.bind(this);
        this.crossBoxValidations = this.crossBoxValidations.bind(this);
    }

    componentDidMount(){
        eventRegistry.addEvent(
            eventNameGenerator.getCrossBoxValidatiobsEventName(this.props.x, this.props.y),
            this.crossBoxValidations
        )
    }

    crossBoxValidations = (number, x, y) => {
        for (var i = 0; i < this.props.size; i++){
            for (var j = 0; j < this.props.size; j++){
                if (i === x || i === y){
                    eventRegistry.getEvent(
                        eventNameGenerator.getDeleteAvaiableNumberEventName(i, j)
                    )(number);
                }
            }
        }
    }

    onNumberChanged = (number, x, y) => {
        for (var i = 0; i < this.props.size; i++){
            for (var j = 0; j < this.props.size; j++){
                if (!(i === x && j === y))
                    eventRegistry.getEvent(eventNameGenerator.getDeleteAvaiableNumberEventName(i, j))(number);
            }
        }
        this.props.onNumberChanged(number, this.props.x, this.props.y, x, y);
    }

    createChildrens = function(size, boxX, boxY){
        const childrens = [];
        for (let x = 0; x < size; x++){
            childrens[x] = [];
            for (let y = 0; y < size; y++){
                childrens[x][y] = <Cell key={boxX+x+boxY+y}
                 x={boxX + x} y={boxY + y} onNumberChanged={this.onNumberChanged}
                 size={size}/>;
            }
        }
        
        return childrens;
    }

    render(){
        const classes = this.props.classes;
        return(
            <div className={classes.box}>
                {this.state.childrens}
            </div>
        )
        
    }
}

export default injectSheet(styles)(Box);