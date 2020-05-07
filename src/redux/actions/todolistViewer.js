import { SET_TODOLIST_VIEWER_KEYWORD } from '../actionTypes/todolistViewer';

export const setTodolistKeyword = (keyword) => {
    return {
        type: SET_TODOLIST_VIEWER_KEYWORD,
        payload: keyword
    }
}