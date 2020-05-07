import { createEvent, createEffect } from 'effector';
import { firestore } from '../../firebase';

import { deleteSubtask } from './subtasks';
import { clearNotes} from './notes';

const SUBTASKS = 'subtasks';
const NOTES = 'notes';

const deleteRelatedItems = (taskId, relatedItem) => {
    firestore.collection(relatedItem).get()
        .then( querySnapshot => {
            querySnapshot.forEach( doc => {
                if(doc.data().taskId === taskId) {
                    switch(relatedItem) {
                        case SUBTASKS: 
                            deleteSubtask(doc.id);
                            break;
                        case NOTES:
                            clearNotes(doc.id);
                            break;
                    }
                }
            })
        });
}

export const getTasks = createEffect('get tasks').use( () => {
    const tasks = {};
    return firestore.collection('tasks').get()
        .then( querySnapshot => {
            querySnapshot.forEach( doc => {
                tasks[doc.id] = {
                    id: doc.id,
                    ...doc.data()
                };
            });
            return tasks;
        }).catch( error => {
            console.error(error);
        });
})


export const addTask = createEffect('add task').use( (task) => {
    return firestore.collection('tasks').add(task)
        .then( snap => {
            return {
                id: snap._key.path.segments[1],
                ...task,
                deadline: task.deadline && {
                    seconds: Math.round(+ task.deadline / 1000),
                    toDate(){
                        return new Date(task.deadline);
                    }
                }
            }
        }).catch( error => {
            console.error(error);
        });
});


export const completeTask = createEffect('complete task').use( (task) => {
    return firestore.runTransaction( transaction => {
            
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
        return task;
    }).catch( error => {
        console.error("Transaction failed: ", error);
    });
});


export const deleteTask = createEffect('delete task').use( (taskId) => {

    deleteRelatedItems(taskId, SUBTASKS);
    deleteRelatedItems(taskId, NOTES);

    firestore.collection('tasks').doc(taskId)
        .delete()
        .then( () => {
            return taskId;
        }).catch( (error) => {
            console.error(error);
        });

});


export const selectTask = createEvent('select task');


export const changeCategory = createEffect('change category').use( ({task, category}) => {
    return firestore.runTransaction(function(transaction) {
        
        return transaction.get(firestore.collection('tasks').doc(task.id)).then(taskDoc => {
            if (!taskDoc.exists) {
                throw "Document does not exist!";
            }
    
            transaction.update(
                firestore.collection('tasks').doc(task.id), 
                { categoryId: category.id }
            );
        });
    }).then( () => {
        return {
            taskId: task.id,
            categoryId: category.id
        }
    }).catch( error => {
        console.log("Transaction failed: ", error);
    });
});


export const deleteCompletedTasks = createEffect('delete completed tasks').use( () => {
    const tasks = {};
    firestore.collection('tasks').get()
        .then( querySnapshot => {
            querySnapshot.forEach( doc => {
                if(doc.data().completed) {
                    
                    deleteRelatedItems(doc.id, SUBTASKS);
                    deleteRelatedItems(doc.id, NOTES);

                    firestore.collection('tasks').doc(doc.id)
                    .delete()
                    .catch( (error) => {
                        console.error(error);
                    });
                } else {
                    tasks[doc.id] = {
                        id: doc.id,
                        ...doc.data()
                    };
                }
            });
            return tasks;
        }).catch( error => {
            console.error(error);
        });
});


export const deleteOutdatedTasks = createEffect('delete outdated tasks').use( () => {
    const tasks = {};
    const deletedTaskIds = {};
    firestore.collection('tasks').get()
        .then( querySnapshot => {
            querySnapshot.forEach( doc => {
                if(doc.data().deadline && (doc.data().deadline.seconds - Date.now()/1000 < 0)) {
                    
                    deleteRelatedItems(doc.id, SUBTASKS);
                    deleteRelatedItems(doc.id, NOTES);

                    deletedTaskIds[doc.id] = doc.id;
                    firestore.collection('tasks').doc(doc.id)
                    .delete()
                    .catch( (error) => {
                        console.error(error);
                    });
                } else {
                    tasks[doc.id] = {
                        id: doc.id,
                        ...doc.data()
                    };
                }
            });
            return tasks;
        }).catch( error => {
            console.error(error);
        });
});