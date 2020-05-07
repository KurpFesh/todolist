import * as actions from '../actionTypes/subtasks';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {

        case actions.GET_SUBTASKS:
            return action.payload;

        case actions.ADD_SUBTASK:
            return {
                ...state,
                [action.payload.id]: action.payload
            }

        case actions.COMPLETE_SUBTASK:
            return {
                ...state,
                [action.payload.id]: {
                   ...state[action.payload.id],
                   completed: true
                }
            }

        case actions.DELETE_SUBTASK: 
            const resultSubtaskList = {};
            for(const subtaskId in state) {
               if(subtaskId !== action.payload) {
                   resultSubtaskList[subtaskId] = state[subtaskId];
               }
            }
            return resultSubtaskList;

        default:
            return state;
    }
}