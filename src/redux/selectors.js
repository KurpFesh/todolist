import { createSelector } from 'reselect';
import { object } from 'prop-types';

const getTasks = (state) => state.tasks || [];
const getCategories = (state) => state.categories || [];

const getCategorySortParameter = (state) => state.categorySortParameter;
const getTaskFilter = (state) => state.taskFilter;

const getSelectedCategory = (state) => state.selectedCategory;
const getSelectedTask = (state) => state.selectedTask;

const getSubtasks = (state) => state.subtasks || {};
const getNotes = (state) => state.notes || {};

const getSearchTerm = (state) => state.searchTerm;

const getDateCategories = (state) => state.dateCategories;

const getTodolistViewer = (state) => state.todolistViewer;

export const getCategoryList = createSelector(
    [getCategories, getSelectedCategory],
    (categories, selectedCategory) => {
        return selectedCategory 
            ? [selectedCategory]
            : categories
    }
);

export const getTaskList = createSelector(
    [getTasks, getSelectedTask],
    (tasks, selectedTask) => {
        return ( selectedTask 
            ? [selectedTask]
            : tasks
        );
    }
);

export const getSearchedTasks = createSelector(
    [getTaskList, getSearchTerm],
    (tasks, searchTerm) => {
        return tasks.filter( task => {
            const regExp = new RegExp(searchTerm, "g");
            return task.title.match(regExp);
        });
    }
);

export const getFilteredTaskList = createSelector(
    [getTasks, getTaskFilter],
    (tasks, filter) => {
            switch(filter) {
            case 'All':
                return tasks;
            case 'Active':
                return tasks.filter( task => {
                    return !task.completed 
                        && ( task.deadline
                            ? task.deadline.seconds - Date.now()/1000 > 0
                            : true
                        );
                });
            case 'Completed':
                return tasks.filter( task => {
                    return task.completed === true;
                });
            default:
                return [];
        }
    }
);

export const getCategoryListWithTaskCount = createSelector(
    [getCategoryList, getFilteredTaskList],
    (categories, tasks) => {
        return categories.map( category => {
            return {
                ...category,
                tasksCount: tasks.filter( task => { 
                    return task.categoryId === category.id
                }).length
            };
        });
    }
);

export const getSearchedCategories = createSelector(
    [getCategoryListWithTaskCount, getSearchTerm],
    (categories, searchTerm) => {
        return categories.filter( category => {
            const regExp = new RegExp(searchTerm, "g");
            return category.title.match(regExp);
        });
    }
);

export const getSortedCategoryList = createSelector(
    [getCategoryListWithTaskCount, getCategorySortParameter],
    (categories, sortParameter) => {
        switch(sortParameter) {
            case 'Title':
                return categories;
            case 'Task count':
                return categories.sort((category, nextCategory) => nextCategory.tasksCount - category.tasksCount);
            default:
                return [];
        }
    }
);

export const getSubtaskList = createSelector(
    [getSubtasks, getSelectedTask],
    (subtasks, selectedTask) => {
        if(!selectedTask) {
            return {};
        }
        const subtaskList = {};
        Object.keys(subtasks).map( subtaskId => {
            if(subtasks[subtaskId].taskId === selectedTask.id) {
                subtaskList[subtaskId] = subtasks[subtaskId];
            }
        });
        return subtaskList;
    }
);

export const getNote = createSelector(
    [getNotes, getSelectedTask],
    (notes, selectedTask) => {
        if(!selectedTask) {
            return {};
        }
        let note = {
            text: '',
            taskId: selectedTask.id
        };
        Object.keys(notes).map( noteId => {
            if(notes[noteId].taskId === selectedTask.id) {
                note = notes[noteId];
            }
        });
        return note;
    }
);

export const getTaskListWithDate = createSelector(
    [getFilteredTaskList, getDateCategories, getSelectedCategory],
    (tasks, dates, selectedCategory) => {
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
                return dates.SOMEDAY;
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
                return dates.OUTDATED
            }
            if(date-todayLimit < 0) {
                return dates.TODAY;
            }
            if(date-tomorrowLimit < 0) {
                return dates.TOMORROW;
            }
            if(date-monthLimit < 0) {
                return dates.THIS_MONTH;
            }
            if(date-yearLimit < 0) {
                return dates.THIS_YEAR;
            }
            return dates.SOMEDAY;
        }

        const taskList = tasks.map( task => {
            const dateCategory = setDateCategory(task);
            return { ...task, dateCategory };
        });

        if(selectedCategory === null) {
            return taskList;
        }
        
        return taskList.filter( task => { 
            return task.categoryId === selectedCategory.id 
        });
    }
)

export const getMappedDatesToCategories = createSelector(
    [getDateCategories],
    (dateCategories) => {
        return Object.keys(dateCategories).map( dateId => {
            return { title: dateCategories[dateId] };
        })
    }
);

export const getDateCategoriesWithCount = createSelector(
    [getMappedDatesToCategories, getTaskListWithDate],
    (categories, tasks) => {
        return categories.map( category => {
            return {
                ...category,
                tasksCount: tasks.filter( task => {
                    return task.dateCategory === category.title;
                }).length
            }
        })
    }
);

export const getCategoryListByViewer = createSelector(
    [getTodolistViewer, getCategoryListWithTaskCount, getDateCategoriesWithCount],
    (viewer, categories, dateCategories) => {
        switch(viewer.selected) {
            case viewer.keywords.CATEGORIES:
                return categories;
            case viewer.keywords.DATES:
                return dateCategories;
        }
    }
)