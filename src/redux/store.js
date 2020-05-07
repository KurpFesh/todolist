import { createStore as createReduxStore, applyMiddleware } from 'redux';
import { createStore, createStoreObject } from 'effector';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const enhancer = applyMiddleware(thunk)

const store = createReduxStore(rootReducer, enhancer);

export default store;

export const user = createStore(null);
export const categories = createStore ({});
export const dateCategories = createStore({
    TODAY: 'Today',
    TOMORROW: 'Tomorrow',
    THIS_MONTH: 'This month',
    THIS_YEAR: 'This year',
    SOMEDAY: 'Someday',
    OUTDATED: 'Outdated'
});
export const notes = createStore({});
export const searchTerm  = createStore(null);
export const selectedCategory = createStore(null);
export const selectedTask = createStore(null);
export const settingsMenu = createStore('MAIN');
export const sidebar = createStore(true);
export const subtasks = createStore({});
export const tasks = createStore({});

export const taskFilterParameters = createStore(['All', 'Completed', 'Active']);
export const selectedTaskFilter = createStore('All');

export const categorySortParameters = createStore(['Title', 'Task count']);
export const selectedCategorySorter = createStore('Title');

export const viewerCategories = createStore({ Categories: 'Categories', Dates: 'Dates'});
export const selectedViewer = createStore('Categories');

export const taskList =
    createStoreObject({ tasks })
    .map( ({tasks}) => {
        return Object.keys(tasks).map( taskId => {
            return tasks[taskId];
        });
    });

export const taskListWithDeadline = 
    createStoreObject({ taskList, dateCategories, selectedCategory })
    .map( ({ taskList, dateCategories, selectedCategory }) => {
        const checkLeapYear = (today) => {
            return today.getFullYear % 4 === 0;
        }
        
        const getMonthDays = (today) => {
            switch(today.getMonth()) {
                case 0: case 2: case 4: case 6: case 7: case 9: case 11:
                    return 31;
                case 3: case 5: case 8: case 10:
                    return 30;
                case 1:
                    if(this.checkLeapYear(today)) {
                        return 29;
                    }
                    return 28;
            }
        }

        const setDateCategory = (task) => {
            if(!task.deadline) {
                return dateCategories.SOMEDAY;
            }

            const date = task.deadline.seconds;
            const today = new Date();
        
            const dayTime = 86400;
        
            const monthDays = getMonthDays(today);
            const monthTime = dayTime * monthDays;
            let yearTime;
            if(checkLeapYear(today)) {
                yearTime = dayTime * 366;
            } else {
                yearTime = dayTime * 365;
            }
        
            const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const currentMonth = new Date(today.getFullYear(), today.getMonth());
            const currentYear = new Date(today.getFullYear(), 0);
        
            const todayLimit = ( currentDate/1000+dayTime );
            const tomorrowLimit = ( currentDate/1000+dayTime*2 );
            const monthLimit = ( currentMonth/1000+monthTime);
            const yearLimit = ( currentYear/1000+yearTime );
        
            if(date - Date.now()/1000 < 0) {
                return dateCategories.OUTDATED
            }
            if(date-todayLimit < 0) {
                return dateCategories.TODAY;
            }
            if(date-tomorrowLimit < 0) {
                return dateCategories.TOMORROW;
            }
            if(date-monthLimit < 0) {
                return dateCategories.THIS_MONTH;
            }
            if(date-yearLimit < 0) {
                return dateCategories.THIS_YEAR;
            }
            return dateCategories.SOMEDAY;
        }

        const taskListWithDeadline = taskList.map( task => {
            const dateCategory = setDateCategory(task);
            return { ...task, dateCategory };
        });
        
        if(selectedCategory !== null) {
            return taskListWithDeadline.filter( task => { 
                return task.categoryId === selectedCategory.id 
            });
        }
        
        return taskListWithDeadline;
    });

export const filteredTaskList =
    createStoreObject({ taskListWithDeadline, selectedTaskFilter })
    .map( ({ taskListWithDeadline, selectedTaskFilter }) => {
        switch(selectedTaskFilter) {
            case 'All':
                return taskListWithDeadline;
            case 'Completed':
                return taskListWithDeadline.filter( task => {
                    return task.completed;
                });
            case 'Active':
                return taskListWithDeadline.filter( task => {
                    return !task.completed && task.dateCategory !== 'OUTDATED'
                })
        }
    })

export const categoryList = 
    createStoreObject({ categories, selectedCategory })
    .map( ({categories, selectedCategory}) => {
        if( selectedCategory !== null ) {
            return [selectedCategory];
        }

        return Object.keys(categories).map( categoryId => {
            return categories[categoryId];
        })
    });

export const categoryListByViewer = 
    createStoreObject({ categoryList, dateCategories, viewerCategories, selectedViewer })
    .map( ({ categoryList, dateCategories, viewerCategories, selectedViewer })=> {
        switch(selectedViewer) {
            case viewerCategories.Dates:
                return Object.keys(dateCategories).map( categoryId => {
                    return {
                        id: categoryId.toString(),
                        title: dateCategories[categoryId]
                    }
                });
            case viewerCategories.Categories:
                return categoryList;
            default :
                console.log('aaa');
                return [];
        }
    });

export const categoryListWithTaskCount =
    createStoreObject({categoryListByViewer, filteredTaskList, viewerCategories, selectedViewer})
    .map( ({categoryListByViewer, filteredTaskList, viewerCategories, selectedViewer}) => {
        switch(selectedViewer) {
            case viewerCategories.Categories:
                return categoryListByViewer.map( category => {
                    return {
                        ...category,
                        taskCount: filteredTaskList.filter( task => {
                            return task.categoryId === category.id;
                        }).length
                    }
                })
            case viewerCategories.Dates:
                return categoryListByViewer.map( category => {
                    return {
                        ...category,
                        taskCount: filteredTaskList.filter( task => {
                            return task.dateCategory === category.title;
                        }).length
                    }
                })
            default:
                return [];
        }
    });

export const sortedCategoryList =
    createStoreObject({ categoryListWithTaskCount, selectedCategorySorter})
    .map( ({categoryListWithTaskCount, selectedCategorySorter}) => {
        switch(selectedCategorySorter) {
            case 'Title':
                return categoryListWithTaskCount;
            case 'Task count':
                const r = categoryListWithTaskCount.sort(
                    (category, nextCategory) => nextCategory.taskCount - category.taskCount
                );
                console.log('r', r);
                return r;
        }
    });
