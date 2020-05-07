import { createEffect } from 'effector';

import { firestore } from '../../firebase';


export const getSubtasks = createEffect('get subtasks').use( () => {
    const subtasks = {};
    firestore.collection('subtasks').get()
        .then( querySnapshot => {
            querySnapshot.forEach( doc => {
                subtasks[doc.id] = {
                    id: doc.id,
                    ...doc.data()
                }
            });
            return subtasks;
        }).catch( error => {
            console.error(error);
        })
});


export const addSubtask = createEffect('add subtask').use( (subtask) => {
    firestore.collection('subtasks').add(subtask)
        .then( snap => {
            return {
                id: snap._key.path.segments[1],
                ...subtask
            }
        }).catch( error => {
            console.error(error);
        })
});


export const completeSubtask = createEffect('complete subtask').use( (subtask) => {
    firestore.runTransaction( transaction => {
        return transaction.get(firestore.collection('subtasks').doc(subtask.id)).then( subtask => {
            if(!subtask.exists) {
                throw "Document does not exist!";
            }
            transaction.update(
                firestore.collection('subtasks').doc(subtask.id), 
                { completed: !subtask.data().completed }
            );
        }).catch( error => {
            console.error(error);
        })
    }).then( () => {
        return subtask;
    }).catch( error => {
        console.error(error);
    })
});


export const deleteSubtask = createEffect('delete subtask').use( (subtaskId) => {
    firestore.collection('subtasks').doc(subtaskId)
        .delete()
        .then( () => {
            return subtaskId;
        })
        .catch( error => {
            console.error(error);
        });
});
