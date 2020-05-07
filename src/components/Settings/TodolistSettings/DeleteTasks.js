import React from 'react';

import { selectSettingsSection } from '../../../redux/events/settings';
import { deleteCompletedTasks, deleteOutdatedTasks } from '../../../redux/events/tasks';

import * as settings from '../constants';

const DeleteCompletedTasks = (props) => {
    const { action } = props;
    let submitAction;
    let message;
    switch( action ) { 
        case settings.DELETE_COMPLETED_TASKS:
            submitAction = deleteCompletedTasks;
            message = 'Are you sure to delete all completed tasks?'
            break;
        case settings.DELETE_OUTDATED_TASKS:
            submitAction = deleteOutdatedTasks;
            message = 'Are you sure to delete all outdated tasks?'
            break;
        default:
            submitAction = () => {};
            message = '';
            return;
    } 
    return ( 
        <div>
            <p>{message}</p>
            <p>You can’t Undo this</p>
            <div>
                <button
                    onClick={() => {
                        submitAction()
                    }}
                    className='submit'
                >
                    Delete
                </button>
                <button 
                    onClick={() => selectSettingsSection(settings.TODOLIST)}
                    className='cancel'
                >
                    Go back
                </button>
            </div>
        </div>
    );
}

export default DeleteCompletedTasks;