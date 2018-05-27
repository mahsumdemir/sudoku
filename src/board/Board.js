import React from 'react';
import Box from './Box.js';
import injectSheet from 'react-jss';
import { eventRegistry, eventNameGenerator } from '../EventRegistry.js';

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

    constructor(props){
        super();
        this.state = {
            childrens: this.createChildrens(props.size)
        }

        this.onNumberChanged = this.onNumberChanged.bind(this);
    }

    onNumberChanged = (number, boxX, boxY, cellX, cellY) => {
        for (var i = 0; i < this.props.size; i++){
            for (var j = 0; j < this.props.size; j++){
                debugger;
                if ((boxX === i && boxY !== j) || (boxX !== i && boxY === j)){
                    eventRegistry.getEvent(
                        eventNameGenerator.getCrossBoxValidatiobsEventName(i,j)
                    )(number, cellX, cellY);
                }
            }
        }
    }

    createChildrens = function (size) {
        let events = this.props.events;
        let childs = [];
        for (let x = 0; x < size; x++) {
            childs[x] = [];
            for (let y = 0; y < size; y++) {
                let newRegistry = event.newRegistry("box_" + x + "_" + y);
                childs[x][y] = <Box size={size} key={x + y} x={x} y={y} onNumberChanged={this.onNumberChanged} events={newRegistry}/>;
            }
        }

        return childs;
    }

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.board}>
                {this.state.childrens}
            </div>
        )
    }
}

export default injectSheet(styles)(Board);