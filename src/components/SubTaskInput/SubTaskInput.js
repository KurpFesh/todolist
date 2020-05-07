import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addSubtask } from '../../redux/actions/subtasks';

import './SubTaskInput.css';

class SubTaskInput extends Component {
    state = { 
        inputValue: ''
    }

    onChangeHandle = (event) => {
        this.setState({ inputValue: event.target.value });
    }

    onSubmitHandle = (event) => {
        event.preventDefault();

        this.props.addSubtask({
            title: this.state.inputValue,
            completed: false,
            createdAt: Date.now(),
            taskId: this.props.selectedTask.id
        });

        this.setState({ inputValue: '' });
    }

    render() { 
        const { inputValue } = this.state;
        return ( 
            <div className='subtaskInput'>
                <form onSubmit={this.onSubmitHandle}>
                    <input
                        value={inputValue}
                        onChange={this.onChangeHandle}
                        placeholder='Add subtask here'
                    />
                </form>
            </div>
         );
    }
}

const mapStateToProps = ({ selectedTask }) => {
    return {
        selectedTask
    }
}

export default connect(mapStateToProps, { addSubtask })(SubTaskInput);