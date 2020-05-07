import * as actions from '../actionTypes/search';

const initialState = null;

export default (state = initialState, action) => {
    switch (action.type) {

        case actions.SHOW_SEARCH_RESULTS:
            return action.payload

        case actions.CLEAR_SEARCH_RESULTS: 
            return null;

        default:
            return state;
    }
}