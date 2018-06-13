import React from 'react';
import { parent } from './EventRegistry.js';

class ControlPanel extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            xRef: React.createRef(),
            yRef: React.createRef(),
            valueRef: React.createRef(),
        }


        this.changeCellValue = this.changeCellValue.bind(this);
    }

    count = 0;

    generateSudoku = () => {

        this.forEachBox(function(box){
            this.forEachCell(box, function(cell){
                cell.fire('clear');
            })
        })


        var failed = false;
        this.forEachBox(function(box){
            if (failed) return;
            this.forEachCell(box, function(cell){
                if (failed) return;
                var availableNumbers = cell.fire('getAvailableNumbers');
                if (availableNumbers == null & availableNumbers.length < 0) failed = true;
                var index = Math.floor(availableNumbers.length * Math.random());
                console.log("Setting " + availableNumbers[index] + " to " + cell.getName());
                cell.fire('changeNumber', availableNumbers[index]);
            })
        })

        this.props.events.getParent().fire('forceUpdate');

        var tryAgain = false;
        this.forEachBox(function(box){
            this.forEachCell(box, function(cell){
                if (cell.fire('getStyle') === 'error') tryAgain = true;
            })
        })

        if (this.count === 100){
            this.count = 0;
            debugger;
        }
        if (tryAgain) this.generateSudoku();

    }

    forEachBox = (method) => {
        for (var x = 0; x < this.props.size; x++) {
            for (var y = 0; y < this.props.size; y++) {
                var box = this.props.events.getRoot()
                                           .getChild('board')
                                           .getChild("box_" + x + "_" + y);
                method.call(this, box);
            }          
        }
    }

    forEachCell = (box, method) => {
        for (var x = 0; x < this.props.size; x++) {
            for (var y = 0; y < this.props.size; y++) {
                var cell = box.getChild("cell_"+ x % 3 + "_" + y % 3)
                method.call(this, cell);
            }          
        }
    }

    changeCellValue = () => {
        var x = this.state.xRef.current.value;
        var y = this.state.yRef.current.value;
        var value = this.state.valueRef.current.value;

        x = parseInt(x);
        y = parseInt(y);
        value = parseInt(value);

        var events = this.props.events;
        events.getRoot()
              .getChild('board')
              .getChild("box_" + parseInt(x / 3) + "_" + parseInt(y / 3))
              .getChild("cell_"+ x % 3 + "_" + y % 3)
              .fire('changeNumber', value);
    }

    render() {
        return (
            <div>
                <input type="text" name="x" placeholder="x" ref={this.state.xRef}/>
                <input type="text" name="y" placeholder="y" ref={this.state.yRef}/>
                <input type="text" name="value" placeholder="value" ref={this.state.valueRef}/>
                <button onClick={this.changeCellValue}>changeCellValue </button>
                <br />
                <br />
                <button onClick={this.generateSudoku} > Generate Sudoku </button>
            </div>
        )
    }

}

export default ControlPanel;