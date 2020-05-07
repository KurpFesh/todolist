import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

import './TodoDropdownItem.css';

import TaskItem from '../TaskItem/TaskItem';

import { tasks, viewerCategories, selectedViewer } from '../../redux/store';
import { changeCategory } from '../../redux/events/tasks';
import { createComponent } from 'effector-react';

const taskTarget = {
    drop(props, monitor) {
        const category = props.category;
        const task = monitor.getItem().task;
        
        changeCategory({task, category});
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

class TodoDropdownItem extends Component {

    state = {
        isOpened: false
    }

    toggleTaskList = () => {
        this.setState({ isOpened: !this.state.isOpened });
    }

    renderTasks = (tasks, category, viewerCategories, selectedViewer) => {
        if( !tasks || tasks.length <= 0 ) {
            return <div>No tasks found</div>
        }
        if( selectedViewer === viewerCategories.Dates ) {
            return tasks.map( task => {
                return task.dateCategory === category.title && (
                   <TaskItem 
                       key={`${task.id}`} 
                       task={task} 
                   />
                )  
            }) 
        } else if ( selectedViewer === viewerCategories.Categories ){
            return tasks.map( task => {
                return task.categoryId === category.id && (
                    <TaskItem 
                        key={`${task.id}`} 
                        task={task} 
                    />
                )
            });
        }
    }

    renderCategoryTitle = (category) => {
        return category
        ?   <>
                <h3 onClick={() => this.toggleTaskList()}>
                    {category.title}
                </h3>
                
                <div className='tasksCounter'>{category.taskCount}</div>
            </>
        :   <div>No tasks found</div>
    }
    
    render() {
        const { category, tasks, connectDropTarget, viewerCategories, selectedViewer } = this.props;
        
        return ( 
            connectDropTarget(
                <div className='todoDropdownItem'>
                    <div className='dropdownHeader'>{ this.renderCategoryTitle(category) }</div>
                    { 
                        this.state.isOpened
                        ? this.renderTasks(tasks, category, viewerCategories, selectedViewer)
                        : null
                    }
                </div>
            )
        );
    }
}
 
export default DropTarget('TASK', taskTarget, collect)(
    createComponent(
        { viewerCategories, selectedViewer },
        (props, state) => {
            return <TodoDropdownItem {...props} {...state} />
        }
    )
);

tasks.on(
    changeCategory.done,
    (state, payload) => {
        return {
            ...state,
            [payload.result.taskId]: {
                ...state[payload.result.taskId],
                categoryId: payload.result.categoryId
            }
        }
    }
)