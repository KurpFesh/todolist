import * as actions from '../actionTypes//notes';

const initialState = {};

export default (state = initialState, action) => {
    switch(action.type) {

        case actions.GET_NOTES:
            return action.payload;

        case actions.ADD_NOTES:
            return {
                ...state,
                [action.payload.id]: action.payload
            };

        case actions.SAVE_NOTES:
            return {
                ...state,
                [action.payload.noteId]: {
                    ...state[action.payload.noteId],
                    text: action.payload.text
                }
            }

        case actions.CLEAR_NOTES: 
            const result = {};
            Object.keys(state).map( noteId => {
                if(noteId !== action.payload) {
                    result[noteId] = state[noteId];
                }
            });
            return result;

        default:
            return state
    }
}