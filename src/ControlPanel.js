import React from 'react';
import eventRegistry from './EventRegistry.js';

class ControlPanel extends React.Component{

    render(){
        return(
            <button onClick={() => eventRegistry.getEvent("changeNumber")(9)} > Change Cell Number </button> 
        )
    }

}

export default ControlPanel;