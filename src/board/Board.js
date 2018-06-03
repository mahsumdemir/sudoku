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
        super(props);
        this.state = {
            childrens: this.createChildrens(props.size, props.events)
        }
        var events = props.events;

        this.onNumberChanged = this.onNumberChanged.bind(this);
        events.addEvent('onNumberChanged', this.onNumberChanged);
    }

    forEachBox = (method) => {
        for (var x = 0; x < this.props.size; x++) {
            for (var y = 0; y < this.props.size; y++) {
                method.call(this, x, y);
            }          
        }
    }

    onNumberChanged = (number, boxX, boxY, cellX, cellY) => {
        this.forEachBox(function(x, y){
            if ((boxX === x && boxY !== y) || (boxX !== x && boxY === y)){
                this.props.events.getChild("box_" + x + "_" + y)
                                 .fire('crossBoxValidations', number, cellX, cellY);
            }
        })
    }

    createChildrens = (size, events) => {
        let childs = [];
        this.forEachBox(function(x, y){
            if (childs[x] == null) childs[x] = [];

            let nameSpace = "box_" + x + "_" + y;
            let newRegistry = events.newRegistry(nameSpace);
            childs[x][y] = <Box size={size} key={x + y} x={x} y={y} onNumberChanged={this.onNumberChanged} events={newRegistry}/>;
        
        });

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