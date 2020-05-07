import * as actions from '../actionTypes/tasks';
import { firestore } from '../../firebase';

import { deleteSubtask } from './subtasks';
import { clearNotes} from './notes';

const SUBTASKS = 'subtasks';
const NOTES = 'notes';

const deleteRelatedItems = (taskId, relatedItem, dispatch) => {
    firestore.collection(relatedItem).get()
        .then( querySnapshot => {
            querySnapshot.forEach( doc => {
                if(doc.data().taskId === taskId) {
                    switch(relatedItem) {
                        case SUBTASKS: 
                            deleteSubtask(doc.id)(dispatch);
                            break;
                        case NOTES:
                            clearNotes(doc.id)(dispatch);
                            break;
                    }
                }
            })
        });
}

export const getTasks = () => async (dispatch) => {
    const tasks = [];
    firestore.collection('tasks').get()
        .then( querySnapshot => {
            querySnapshot.forEach( doc => {
                tasks.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            dispatch({
                type: actions.GET_TASKS,
                payload: tasks
            });
        }).catch( error => {
            console.error(error);
        });
}

export const addTask = (task) => async (dispatch) => {
    firestore.collection('tasks').add(task)
        .then( snap => {
            dispatch({
                type: actions.ADD_TASK,
                payload: {
                    id: snap._key.path.segments[1],
                    ...task,
                    deadline: task.deadline && {
                        seconds: Math.round(+ task.deadline / 1000),
                        toDate(){
                            return new Date(task.deadline);
                        }
                    }
                }
            });
        }).catch( error => {
            console.error(error);
        });
}

export const completeTask = (task) => async (dispatch) => {
    firestore.runTransaction( transaction => {
            
        return transaction.get(firestore.collection('tasks').doc(task.id)).then( task => {
            if (!task.exists) {
                throw "Document does not exist!";
            }
            transaction.update(
                firestore.collection('tasks').doc(task.id), 
                { completed: !task.data().completed }
            );
        }).catch( error => {
            console.error(error);
        })
    }).then( () => {
        dispatch({
            type: actions.COMPLETE_TASK,
            payload: task
        });
    }).catch( error => {
        console.error("Transaction failed: ", error);
    });
}

export const deleteTask = (taskId) => async (dispatch) => {

    deleteRelatedItems(taskId, SUBTASKS, dispatch);
    deleteRelatedItems(taskId, NOTES, dispatch);

    firestore.collection('tasks').doc(taskId)
        .delete()
        .then( () => {
            dispatch({
                type: actions.DELETE_TASK,
                payload: taskId
            });
        }).catch( (error) => {
            console.error(error);
        });

}

export const selectTask = (task) => {
    return {
        type: actions.SELECT_TASK,
        payload: task
    }
}

export const changeCategory = (task, category) => async (dispatch) => {
    return firestore.runTransaction(function(transaction) {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(firestore.collection('tasks').doc(task.id)).then(function(taskDoc) {
            if (!taskDoc.exists) {
                throw "Document does not exist!";
            }
    
            transaction.update(
                firestore.collection('tasks').doc(task.id), 
                { categoryId: category.id }
            );
        });
    }).then(function() {
        dispatch({
            type: actions.CHANGE_CATEGORY,
            payload: {
                taskId: task.id,
                categoryId: category.id
            }
        });
    }).catch(function(error) {
        console.log("Transaction failed: ", error);
    });
}

export const deleteCompletedTasks = () => async (dispatch) => {
    const tasks = [];
    firestore.collection('tasks').get()
        .then( querySnapshot => {
            querySnapshot.forEach( doc => {
                if(doc.data().completed) {
                    
                    deleteRelatedItems(doc.id, SUBTASKS, dispatch);
                    deleteRelatedItems(doc.id, NOTES, dispatch);

                    firestore.collection('tasks').doc(doc.id)
                    .delete()
                    .catch( (error) => {
                        console.error(error);
                    });
                } else {
                    tasks.push({
                        id: doc.id,
                        ...doc.data()
                    });
                }
            });
            dispatch({
                type: actions.DELETE_COMPLETED_TASKS,
                payload: tasks
            });
        }).catch( error => {
            console.error(error);
        });
}

export const deleteOutdatedTasks = () => async (dispatch) => {
    const tasks = [];
    const deletedTaskIds = {};
    firestore.collection('tasks').get()
        .then( querySnapshot => {
            querySnapshot.forEach( doc => {
                if(doc.data().deadline && (doc.data().deadline.seconds - Date.now()/1000 < 0)) {
                    
                    deleteRelatedItems(doc.id, SUBTASKS, dispatch);
                    deleteRelatedItems(doc.id, NOTES, dispatch);

                    deletedTaskIds[doc.id] = doc.id;
                    firestore.collection('tasks').doc(doc.id)
                    .delete()
                    .catch( (error) => {
                        console.error(error);
                    });
                } else {
                    tasks.push({
                        id: doc.id,
                        ...doc.data()
                    });
                }
            });
            dispatch({
                type: actions.DELETE_OUTDATED_TASKS,
                payload: tasks
            });
        }).catch( error => {
            console.error(error);
        });
}

