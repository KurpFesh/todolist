import * as actions from '../actionTypes/tasks';

const initialState = null;

export default (state = initialState, action) => {
    switch(action.type) {

        case actions.SELECT_TASK: 
            return action.payload;

        case actions.CHANGE_CATEGORY:
            return state === null
                ? state
                : {
                    ...state,
                    categoryId: action.payload.categoryId
                  }

        default:
            return state;
    }
}