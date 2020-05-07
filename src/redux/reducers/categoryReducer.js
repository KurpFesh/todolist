import * as actions from '../actionTypes/categories';

const initialState = [];

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {

        case actions.GET_CATEGORIES:
            return payload;

        case actions.ADD_CATEGORY:
            return [ 
                ...state,
                payload 
            ];
            
        case actions.DELETE_CATEGORIES:
            return state.filter( category => {
                return category.id !== payload;
            });       

        default:
            return state;
    }
}