import * as actions from '../actionTypes/tasks';

const initialState = [];

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {

        case actions.GET_TASKS:
            return payload;

        case actions.ADD_TASK:
            return [  
                ...state,
                payload
            ];

        case actions.COMPLETE_TASK:
            return state.map( task => {
                if(task.id === action.payload.id) {
                    return {
                        ...task,
                        completed: !task.completed
                    }
                }
                return task;
            })

        case actions.DELETE_TASK:
            const tasks = state.filter( task => {
                return task.id !== payload
            })
            return tasks;

        case actions.CHANGE_CATEGORY:
            return state.map( task => {
                return task.id === payload.taskId
                ? { ...task, categoryId: payload.categoryId }
                : task
            });

        case actions.DELETE_COMPLETED_TASKS:
            return action.payload;

        case actions.DELETE_OUTDATED_TASKS:
            return action.payload;

        default:
            return state;
    }
}