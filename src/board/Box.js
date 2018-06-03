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

    constructor(props){
        super(props);

        this.state = {
            childrens: this.createChildrens(this.props.size, this.props.x, this.props.y)
        }

        var events = this.props.events;

        events.addEvent('onNumberChanged', this.onNumberChanged);
        events.addEvent('crossBoxValidations', this.crossBoxValidations);
    }


    forEachCell = (method) => {
        for (var i = 0; i < this.props.size; i++){
            for (var j = 0; j < this.props.size; j++){
                method.call(this, i, j);
            }
        }
    }

    crossBoxValidations = (number, x, y) => {
        this.forEachCell(function(cellX, cellY){
            if (cellX === x || cellY === y){
                this.props.events.getChild("cell_" + cellX + "_" + cellY)
                                 .fire('deleteAvailableNumber', number);
            }
        })
    }

    onNumberChanged = (number, x, y) => {
        var events = this.props.events;
        this.forEachCell(function(cellX, cellY){
            if (!(cellX === x && cellY === y)){
                events.getChild("cell_" + cellX + "_" + cellY)
                      .fire("deleteAvailableNumber", number);
            }
        })
        this.props.onNumberChanged(number, this.props.x, this.props.y, x, y);
    }


    createChildrens = function(size, boxX, boxY){
        let events = this.props.events;
        const childrens = [];
        this.forEachCell(function(cellX, cellY){
            if (childrens[cellX] == null) childrens[cellX] = [];
            
            let newRegistry = events.newRegistry("cell_" + cellX + "_" + cellY);
            childrens[cellX][cellY] = <Cell key={cellX + cellY}
                                    x={cellX} y={cellY} size={size}
                                    events={newRegistry}/>;
        });
        
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