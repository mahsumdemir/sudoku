import React from 'react';
import { eventRegistry, eventNameGenerator } from './EventRegistry.js';

class ControlPanel extends React.Component {

    render() {
        return (
            <button onClick={() => eventRegistry.getEvent(
                eventNameGenerator.getChangeCellNumberEventName(0, 0)
            )(9)} > Change Cell Number </button>
        )
    }

}

export default ControlPanel;