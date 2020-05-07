import * as actions from '../actionTypes/settings';

const initialState = false;

export default (state = initialState, action) => {
    switch(action.type) {

        case actions.TOGGLE_SETTINGS_MENU:
            return !state;

        default:
            return state;
    }
}