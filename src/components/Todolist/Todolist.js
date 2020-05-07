import React, { Component } from 'react';
import { createComponent } from 'effector-react';

import { tasks, sortedCategoryList, filteredTaskList } from '../../redux/store';

import { getTasks } from '../../redux/events/tasks';

import './Todolist.css';

import TodoDropdownItem from '../TodoDropdownItem/TodoDropdownItem';
import AddTaskInput from '../AddTaskInput/AddTaskInput.js';

class Todolist extends Component{

    componentDidMount() {
        getTasks();
    }

    render() {
        const { sortedCategoryList, filteredTaskList } = this.props;
        
        return ( 
            <div className='todolist'>
                {
                    sortedCategoryList.map( category => {
                        return (
                            <TodoDropdownItem 
                                key={category.id}
                                category={category}
                                tasks={filteredTaskList}
                            />
                        );
                    })
                }
                <AddTaskInput />
            </div>
        );
    }
}

 
export default createComponent(
    { sortedCategoryList, filteredTaskList  },
    (props, state) => {
        return <Todolist {...props} {...state} />
    });

tasks.on(getTasks.done, (state, payload) => {
    return payload.result;
})
