import * as actions from '../actionTypes/auth';

const initialState = {}

export default (state = initialState, action) => {
    switch(action.type) {

        case actions.SIGN_UP_WITH_GOOGLE:
            return action.payload;
        
        case actions.SIGN_IN_WITH_GOOGLE:
            return  action.payload;

        case actions.SIGN_UP_WITH_EMAIL_AND_PASSWORD:
            return action.payload;

        case actions.SIGN_IN_WITH_EMAIL_AND_PASSWORD:
            return action.payload;

        case actions.SIGN_OUT:
            return null;

        case actions.SET_USER:
            return action.payload;

        case actions.DELETE_USER:
            return null;

        default:
            return state;
    }
}