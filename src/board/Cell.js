import React from 'react';
import Number from './Number.js';
import injectSheet from 'react-jss';
import { eventRegistry, eventNameGenerator } from '../EventRegistry.js';

const styles = {
    
    cell:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50px',
        height: '50px',
        border: '1px solid black',
        cursor: 'pointer',
        padding: '0px'
    },
    
    normalCell: {
        '&:hover': {
            backgroundColor: 'grey'
        },
    },

    errorCell: {
        backgroundColor: 'red'
    }


}

class Cell extends React.Component {

    constructor(props) {
        super();

        this.state = {
            number: 0,
            style: "normal",
            availableNumbers: this.createAvailableNumbers(props.size)
        }

        this.changeNumber = this.changeNumber.bind(this);
        this.showError = this.showError.bind(this);
        this.getNumber = this.getNumber.bind(this);
        this.onCellClicked = this.onCellClicked.bind(this);
        this.deleteAvaiableNumber = this.deleteAvaiableNumber.bind(this);
    }

    createAvailableNumbers(size){
        let array = [];
        for (var i = 0; i < size * size; i++){
            array.push(i);
        }
        return array;
    }

    componentDidMount() {
        let x = this.props.x;
        let y = this.props.y;

        eventRegistry.addEvent(
            eventNameGenerator.getChangeCellNumberEventName(x, y),
            this.changeNumber
        );
        eventRegistry.addEvent(
            eventNameGenerator.getShowErrorEventName(x, y),
            this.showError
        );
        eventRegistry.addEvent(
            eventNameGenerator.getNumberEventName(x, y),
            this.getNumber
        );
        eventRegistry.addEvent(
            eventNameGenerator.getDeleteAvaiableNumberEventName(x, y),
            this.deleteAvaiableNumber
        );    
        
    }

    getNumber = () => {
        return this.state.number;
    }

    changeNumber = (number) => {
        var availableNumbers = this.state.availableNumbers;
        var numberIndex = availableNumbers.indexOf(number);

        if (numberIndex === -1){
            this.setState({
                number: number,
                style: 'error'
            })
        } else {
            availableNumbers.splice(numberIndex, 1);
            this.setState({
                number: number,
                style: 'normal',
                availableNumbers: availableNumbers
            })
            this.props.onNumberChanged(number, this.props.x, this.props.y);
        }
    }

    showError = () => {
        this.setState({
            style: 'error'
        })
    }

    deleteAvaiableNumber(number){
        var availableNumbers = this.state.availableNumbers;
        var numberIndex = availableNumbers.indexOf(number);
        if (numberIndex !== -1){
            availableNumbers.splice(numberIndex, 1);
        }

        if (availableNumbers.length < 1){
            this.setState({
                style: 'error',
                availableNumbers: []
            })
        } else {
            this.setState({
                availableNumbers: availableNumbers
            })
        }
    }

    onCellClicked = () => {
        console.log("x: " + this.props.x + " y: " + this.props.y + " availableNumbers: " + this.state.availableNumbers); 
    }

    render() {
        const classes = this.props.classes;
        const className = this.state.style === "normal" ? classes.normalCell : classes.errorCell; 
        return (
            <div className={[classes.cell + " " + className]} onClick={this.onCellClicked}>
                <Number value={this.state.number} />
            </div>
        )
    }
}

export default injectSheet(styles)(Cell);