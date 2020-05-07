import React, { Component } from 'react';
import { createComponent } from 'effector-react';
import { selectedTask, dateCategories } from '../../redux/store';

const DeadlineIcon = createComponent(
    { selectedTask, dateCategories },
    (props, { selectedTask, dateCategories }) => {
        const getTimerColor = (task) => {

            const { TODAY, TOMORROW, THIS_MONTH, THIS_YEAR, SOMEDAY, OUTDATED } = dateCategories;

            switch(task.dateCategory) {
                case TODAY:
                case OUTDATED:
                    return 'red';
                case TOMORROW:
                    return 'orangered';
                case THIS_MONTH:
                    return 'orange';
                case THIS_YEAR:
                    return 'green';
                case SOMEDAY:
                    return 'grey';
            }
        }
    
        const checkOudatedTask = (task) => {
            return task.dateCategory === dateCategories.OUTDATED;
        }

        if(!selectedTask.deadline) {
            return null;
        }

        const date = selectedTask.deadline.toDate();
        const timerColor = getTimerColor(selectedTask);
        const deadline = (date.toISOString().slice(0, 19).replace('T', ' '));
        const outdated = checkOudatedTask(selectedTask);
        return ( 
            <div style={{ color: timerColor}}>⏰ <span style={{ fontSize: '16px', textDecoration: outdated ? 'line-through' : 'none' }}>{deadline}</span></div>
        );
    }
);

export default DeadlineIcon;