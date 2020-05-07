import React, { Component } from 'react';
import { createComponent } from 'effector-react';
import { categories } from '../../redux/store';
import { addTask } from '../../redux/events/tasks';

import { DatePicker, TimePicker } from 'antd';
import 'antd/dist/antd.css';  

import './AddTaskForm.css';

class AddTaskForm extends Component {
    state = { 
        titleInput: '',
        selectedCategory: null,
        submited: false,
        date: null,
        time: null
    }

    onSubmitHandle = (event) => {
        event.preventDefault();
        
        const { titleInput, selectedCategory, submited, date, time } = this.state;

        if(!submited) {
            this.setState({ submited: true });
        }

        if(selectedCategory===null) {
            return;
        }

        if(!date) {
            addTask({
                title: titleInput,
                completed: false,
                createdAt: Date.now(),
                categoryId: selectedCategory.id
            });
            this.props.onClose();
            return;
        }

        let deadline;

        if(!time) {
            deadline = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
            );
        } else {
            deadline = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                time.getHours(),
                time.getMinutes(),
                time.getSeconds(),
            );
        }

        addTask({
            title: titleInput,
            completed: false,
            createdAt: Date.now(),
            categoryId: selectedCategory.id,
            deadline
        });
        this.props.onClose();
    }

    onChangeTitleHandle = (event) => {
        this.setState({ titleInput: event.target.value });
    }

    selectCategory = (selectedCategory) => {
        this.setState({ selectedCategory });
    }

    onDateSelect = (dateInfo) => {
        if(dateInfo===null) {
            return;
        }

        this.setState({ date: dateInfo._d });
    }

    onTimeSelect = (timeInfo) => {
        if(timeInfo===null) {
            return;
        }

        this.setState({ time: timeInfo._d });
    }


    render() { 
        const { titleInput, selectedCategory, submited } = this.state;
        const { categories } = this.props;
        return ( 
            <div className='taskForm'>
                <h3>Task form</h3>
                <form onSubmit={this.onSubmitHandle}>
                    <div className='titleInput'>
                        <label>Title</label>
                        <input 
                            placeholder='Enter task title' 
                            onChange={this.onChangeTitleHandle}
                            value={titleInput}
                        />
                    </div>
                    <div className='categoryList'>
                        <select
                            value={selectedCategory===null ? 'Select category' : selectedCategory.title}
                            onChange={()=>{}}
                        >
                            {
                                Object.keys(categories).map( categoryId => {
                                    const category = categories[categoryId];
                                    return (
                                        <option
                                            key={categoryId}
                                            onClick={() => this.selectCategory(category)}
                                        >
                                            {category.title}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <div>
                            <DatePicker onChange={this.onDateSelect} />
                            <TimePicker onChange={this.onTimeSelect} />
                        </div>
                    </div>
                    { selectedCategory===null && submited && <h4>Select category</h4>}
                    <div className='actions'>
                        <button type='submit' className='submit'>Add task</button>
                        <button onClick={this.props.onClose} className='cancel'>Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default createComponent(
    { categories },
    (props, state) => <AddTaskForm {...props} {...state} />
);
