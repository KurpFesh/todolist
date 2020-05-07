import React, { Component } from 'react';

import './CompleteTaskButton.css';

class CompleteTaskButton extends Component {
    state = {  }
    render() { 
        return ( 
            <div 
                className='completeTaskButton'
                onClick={this.props.onClick}
            >
                ✔
            </div>
        );
    }
}
 
export default CompleteTaskButton;