import { combineReducers } from 'redux';

import categoryReducer from './categoryReducer';
import searchReducer from './searchReducer';
import taskReducer from './taskReducer';
import subtaskReducer from './subtaskReducer';
import noteReducer from './noteReducer';
import authReducer from './authReducer';

import selectedCategoryReducer from './selectedCategoryReducer';
import selectedTaskReducer from './selectedTaskReducer';

import sidebarReducer from './sidebarReducer';

import settingsTogglerReducer from './settingsTogglerReducer';
import settingsMenuReducer from './settingsMenuReducer';

import dateCategoryReducer from './dateCategoryReducer';
import todolistViewerReducer from './todolistViewerReducer';

export default combineReducers({
    categories: categoryReducer,
    searchTerm: searchReducer,
    tasks: taskReducer,
    subtasks: subtaskReducer,
    notes: noteReducer,
    user: authReducer,
    selectedCategory: selectedCategoryReducer,
    selectedTask: selectedTaskReducer,
    sidebar: sidebarReducer,
    settingsMenuOpened: settingsTogglerReducer,
    settingsMenu: settingsMenuReducer,
    dateCategories: dateCategoryReducer,
    todolistViewer: todolistViewerReducer
});