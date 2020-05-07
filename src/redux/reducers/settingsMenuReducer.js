import * as actions from '../actionTypes/settings';

const initialState = 'MAIN';

export default (state = initialState, action) => {
    switch(action.type) {

        case actions.SELECT_SETTINGS_SECTION:
            return action.payload;
        
        default:
            return state;
    }
}