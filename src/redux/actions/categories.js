import * as actions from '../actionTypes/categories';

import { firestore } from '../../firebase';

export const getCategories = () => async (dispatch) => {
    const categoriesRef = firestore.collection('categories');
    const categories = [];
    categoriesRef.get()
        .then( querySnapshot => {
            querySnapshot.forEach( doc => {
                categories.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            dispatch({
                type: actions.GET_CATEGORIES,
                payload: categories
            });
        }).catch( error => {
            console.error(error);
        });
}

export const addCategory = (category) => async (dispatch) => {
        const categoriesRef = firestore.collection('categories');
        categoriesRef.add(category).then( snap => {
            dispatch({
                type: actions.ADD_CATEGORY,
                payload: {
                    id: snap._key.path.segments[1],
                    ...category
                }
            });
        }).catch( error => {
            console.error(error);
        });
}

export const selectCategory = (selectedCategory) => {
    return {
        type: actions.SELECT_CATEGORY,
        payload: selectedCategory
    }
}

export const deleteCategory = (category) => async(dispatch) => {
    firestore.collection('categories').doc(category.id)
        .delete()
        .then( () => {
            dispatch({
                type: actions.DELETE_CATEGORIES,
                payload: category.id
            });
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
}

export const showAllCategories = () => {
    return {
        type: actions.SHOW_ALL_CATEGORIES
    }
}