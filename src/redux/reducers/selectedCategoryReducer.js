import * as actions from '../actionTypes/categories';

const initialState = null;

export default (state = initialState, action) => {
    switch(action.type){

        case actions.SELECT_CATEGORY:
            return action.payload;

        case actions.SHOW_ALL_CATEGORIES:
            return null;
    
        default:
            return state;
    }
}