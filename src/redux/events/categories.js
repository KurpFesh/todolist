import { createEvent, createEffect } from 'effector';
import { firestore } from '../../firebase';

import { deleteTask } from './tasks';

const deleteRelatedTasks = (categoryId) => {
    firestore.collection('tasks').get()
        .then(querySnapshot => {
            querySnapshot.forEach( doc => {
                if(doc.data().categoryId === categoryId) {
                    deleteTask(doc.id);
                }
            })
        });
}

export const getCategories = createEffect('get categories').use( (user) => {
    const categoriesRef = firestore.collection('categories');
    const categories = {};
    return categoriesRef.get()
        .then( querySnapshot => {
            querySnapshot.forEach( doc => {
                if(doc.data().userId === user.id){
                    categories[doc.id] = {
                        id: doc.id,
                        ...doc.data()
                    };
                }
            });
            
            return categories;

        }).catch( error => {
            console.error(error);
        });
});


export const addCategory = createEffect('add category').use( (category) => {
    return firestore.collection('categories').add(category)
        .then( snap => {
            return {
                id: snap._key.path.segments[1],
                ...category
            }
        }).catch( error => {
            console.error(error);
        });
});


export const selectCategory = createEvent('selectedCategory');


export const deleteCategory = createEffect('delete category').use( (category) => {

    deleteRelatedTasks(category.id);
    
    firestore.collection('categories').doc(category.id)
        .delete()
        .then( () => {
            return category.id;
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
});


export const showAllCategories = createEvent('show all categories');