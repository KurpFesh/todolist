import * as actions from '../actionTypes/sidebar';

const initialState = {
    isOpened: true
}

export default (state = initialState, action) => {
    switch(action.type) {

        case actions.TOGGLE_SIDEBAR:
            return {
                isOpened: !state.isOpened
            }

        default:
            return state;
    }
}