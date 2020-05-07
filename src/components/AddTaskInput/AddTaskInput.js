import React, { Component } from 'react';
import { createComponent } from 'effector-react';
import { tasks, categories, selectedCategory } from '../../redux/store';
import { addTask } from '../../redux/events/tasks';

import './AddTaskInput.css';

class AddTaskInput extends Component {
    state = { 
        inputValue: ''
    }

    onChangeHandle = (event) => {
        this.setState({ inputValue: event.target.value });
    }

    onSubmitHandle = (event) => {
        event.preventDefault();

        const { categories, selectedCategory } = this.props;

        const categoryId = selectedCategory
            ? selectedCategory.id
            : categories[Object.keys(categories)[0]].id;

        const newTask = {
            title: this.state.inputValue,
            createdAt: new Date(),
            completed: false,
            categoryId
        };

        addTask(newTask);

        this.setState({ inputValue: '' });
    }

    render() { 
        return (  
            <div className='todoAddInput'>
                <form onSubmit={this.onSubmitHandle}>
                    <input 
                        value={this.state.inputValue}
                        onChange={this.onChangeHandle}
                    />
                </form>
            </div>
        );
    }
}
 
export default createComponent(
    { categories, selectedCategory },
    (props, state) => <AddTaskInput {...props} {...state} />
);

tasks.on(
    addTask.done,
    (state, payload) => {
        return {
            ...state,
            [payload.result.id]: payload.result
        }
    }
)