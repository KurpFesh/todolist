import { SET_TODOLIST_VIEWER_KEYWORD } from '../actionTypes/todolistViewer';

const initialState = {
    keywords: { CATEGORIES: 'CATEGORIES', DATES: 'DATES' },
    selected: 'DATES'
}

export default (state = initialState, action) => {
    switch(action.type) {

        case SET_TODOLIST_VIEWER_KEYWORD:
            return {
                ...state,
                selected: action.payload
            }
            
        default:
            return state;
    }
}