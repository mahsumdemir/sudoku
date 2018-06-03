import React from 'react';
import { parent } from './EventRegistry.js';

class ControlPanel extends React.Component {

    constructor(){
        super();
        this.state ={
            xRef: React.createRef(),
            yRef: React.createRef(),
            valueRef: React.createRef()
        }

        this.changeCellValue = this.changeCellValue.bind(this);
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
                <button onClick={this.generateSudou} > Generate Sudoku </button>
            </div>
        )
    }

}

export default ControlPanel;