import * as actions from '../actionTypes/sort';
/*
export const sortByCategoryTitles = (categories) => {
    const categoriesArray = [];
    for(const categoryId in categories) {
        categoriesArray.push(categories[categoryId]);
    }
    const sortedCategories = categoriesArray.sort( (category, nextCategory) => {
        return category.title.localeCompare(nextCategory.title);
    });

    console.log(sortedCategories);

    return {
        type: actions.SORT_BY_CATEGORY_TITLES,
        payload: sortedCategories
    }
}


export const sortByTasksNumber = (categories, tasks) => {
    const categoriesArray = [];
    for(const categoryId in categories) {
        let taskCounter = 0;
        for(const taskId in tasks) {
            if(tasks[taskId].categoryId === categoryId) {
                taskCounter += 1;
            }
        }
        categoriesArray.push({ ...categories[categoryId], taskCounter });
    }

    const sortedCategories = categoriesArray.sort( (category, nextCategory) => {
        return nextCategory.taskCounter - category.taskCounter;
    });

    console.log(sortedCategories);

    return {
        type: actions.SORT_BY_TASKS_NUMBER,
        payload: sortedCategories
    }
}
*/