import React from 'react';
import Box from './Box.js';
import injectSheet from 'react-jss';
import parent from '../EventRegistry.js';

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
            childrens: this.createChildrens(props.size, props.events)
        }
        var events = props.events;

        this.onNumberChanged = this.onNumberChanged.bind(this);
        events.addEvent('onNumberChanged', this.onNumberChanged);
    }

    onNumberChanged = (number, boxX, boxY, cellX, cellY) => {
        for (var i = 0; i < this.props.size; i++){
            for (var j = 0; j < this.props.size; j++){
                if ((boxX === i && boxY !== j) || (boxX !== i && boxY === j)){
                    this.props.events.getChild("box_" + i + "_" + j)
                                     .fire('crossBoxValidations', number, cellX, cellY);
                }
            }
        }
    }

    createChildrens = function (size, events) {
        let childs = [];
        for (let x = 0; x < size; x++) {
            childs[x] = [];
            for (let y = 0; y < size; y++) {
                let nameSpace = "box_" + x + "_" + y;
                let newRegistry = events.newRegistry(nameSpace);
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