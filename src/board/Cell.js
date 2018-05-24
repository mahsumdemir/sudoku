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

    constructor() {
        super();

        this.state = {
            number: 0,
            style: "normal"
        }

        this.changeNumber = this.changeNumber.bind(this);
        this.showError = this.showError.bind(this);
    }

    componentDidMount() {
        let x = this.props.x;
        let y = this.props.y;

        eventRegistry.addEvent(
            eventNameGenerator.getChangeCellNumberEventName(x, y),
            this.changeNumber);
        eventRegistry.addEvent(
            eventNameGenerator.getShowErrorEventName(x, y),
            this.showError);
    }

    changeNumber = (number) => {
        this.setState({
            number: number
        })
    }

    showError = () => {
        this.setState({
            style: 'error'
        })
    }


    render() {
        const classes = this.props.classes;
        const className = this.state.style === "normal" ? classes.normalCell : classes.errorCell; 
        return (
            <div className={[classes.cell + " " + className]}>
                <Number value={this.state.number} />
            </div>
        )
    }
}

export default injectSheet(styles)(Cell);