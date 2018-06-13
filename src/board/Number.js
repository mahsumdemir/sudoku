import React from 'react';

class Number extends React.Component{
  render(){
        return(
            <div className="sudoku-number">
                {this.props.value ? this.props.value : ' '}
            </div>
        )
    }
}

export default Number;