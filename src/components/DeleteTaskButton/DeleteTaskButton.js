import React, { Component } from 'react';

import './DeleteTaskButton.css';

class DeleteTaskButton extends Component {
    state = {  }
    render() { 
        return ( 
            <div 
                className='deleteTaskButton'
                onClick={this.props.onClick}
            >
                ✖
            </div>
        );
    }
}
 
export default DeleteTaskButton;