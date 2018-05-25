import React from 'react';
import { eventRegistry, eventNameGenerator } from './EventRegistry.js';

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

    generateSudou = () => {
        eventRegistry.getEvent(
            eventNameGenerator.getChangeCellNumberEventName(0 , 0)
        )(9);
    }

    changeCellValue = () => {
        var x = this.state.xRef.current.value;
        var y = this.state.yRef.current.value;
        var value = this.state.valueRef.current.value;

        x = parseInt(x);
        y = parseInt(y);
        value = parseInt(value);

        eventRegistry.getEvent(
            eventNameGenerator.getChangeCellNumberEventName(x, y)
        )(value);
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