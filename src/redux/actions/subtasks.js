import * as actions from '../actionTypes/subtasks';
import { firestore } from '../../firebase';

export const getSubtasks = () => async (dispatch) => {
    const subtasks = {};
    firestore.collection('subtasks').get()
        .then( querySnapshot => {
            querySnapshot.forEach( doc => {
                subtasks[doc.id] = {
                    id: doc.id,
                    ...doc.data()
                }
            });
            dispatch({
                type: actions.GET_SUBTASKS,
                payload: subtasks
            });
        }).catch( error => {
            console.error(error);
        })
}

export const addSubtask = (subtask) => async (dispatch) => {
    firestore.collection('subtasks').add(subtask)
        .then( snap => {
            dispatch({
                type: actions.ADD_SUBTASK,
                payload: {
                    id: snap._key.path.segments[1],
                    ...subtask
                }
            });
        }).catch( error => {
            console.error(error);
        })
}

export const completeSubtask = (subtask) => async (dispatch) => {
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
        dispatch({
            type: actions.COMPLETE_SUBTASK,
            payload: subtask
        });
    }).catch( error => {
        console.error(error);
    })
}

export const deleteSubtask = (subtaskId) => async(dispatch) => {
    console.log(subtaskId);
    firestore.collection('subtasks').doc(subtaskId)
        .delete()
        .then( () => {
            dispatch({
                type: actions.DELETE_SUBTASK,
                payload: subtaskId
            });
        })
        .catch( error => {
            console.error(error);
        });
}