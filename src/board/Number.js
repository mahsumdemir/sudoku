import React from 'react';

class Number extends React.Component{
    onClick = function(){
        console.log("Number clicked");
    }
    
    render(){
        return(
            <div class="sudoku-number" onClick={this.onClick}>
                0
            </div>
        )
    }
}

export default Number;