import React from 'react';
import { createComponent } from 'effector-react';
import { selectedTask } from '../../redux/store';
import './TodoItem.css';

import DeadlineItem from '../DeadlineItem/DeadlineItem';
import CategoryChanger from '../CategoryChanger/CategoryChanger';
import SubTaskList from '../SubTaskList/SubTaskList';
import NotesInput from '../NotesInput/NotesInput';

const TodoItem = createComponent(
    selectedTask,
    (props, selectedTask) => {
        return ( 
            selectedTask
            && selectedTask !== null
            ? <div className='todoItem'>            
                    <h2> 
                        { selectedTask.title.toUpperCase() } 
                        <DeadlineItem />
                    </h2>
                    <CategoryChanger />
                    <SubTaskList />
                    <NotesInput />
                </div>
            : null
         );
    }
);

export default TodoItem;