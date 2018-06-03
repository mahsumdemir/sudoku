import React from 'react';
import Number from './Number.js';
import injectSheet from 'react-jss';

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

        var events = props.events;
        events.addEvent('getNumber', this.getNumber);
        events.addEvent('changeNumber', this.changeNumber);
        events.addEvent('showError', this.showError);
        events.addEvent('deleteAvailableNumber', this.deleteAvailableNumber);
        events.addEvent('onClick', this.onClick);
        events.addEvent('getAvailableNumbers', this.getAvailableNumbers)
    }

    getAvailableNumbers = () => {
        return this.state.availableNumbers;
    }
    
    createAvailableNumbers(size){
        let array = [];
        for (var i = 1; i <= size * size; i++){
            array.push(i);
        }
        return array;
    }

    getNumber = () => {
        return this.state.number;
    }

    changeNumber = (number) => {
        if (this.state.number === number) return;

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
            this.props.events.getParent()
                             .fire('onNumberChanged', number,this.props.x, this.props.y)
        }
    }

    showError = () => {
        this.setState({
            style: 'error'
        })
    }

    deleteAvailableNumber = (number) => {
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

    onClick = () => {
        console.log("x: " + this.props.x + " y: " + this.props.y + " availableNumbers: " + this.state.availableNumbers); 
    }

    render() {
        const classes = this.props.classes;
        const className = this.state.style === "normal" ? classes.normalCell : classes.errorCell; 
        return (
            <div className={[classes.cell + " " + className]} onClick={this.onClick}>
                <Number value={this.state.number} />
            </div>
        )
    }
}

export default injectSheet(styles)(Cell);