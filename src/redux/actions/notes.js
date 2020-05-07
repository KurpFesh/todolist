import * as actions from '../actionTypes/notes';
import { firestore } from '../../firebase';

export const getNotes = () => async (dispatch) => {
    const notes = {};
    firestore.collection('notes').get()
        .then( querySnapshot => {
            querySnapshot.forEach( doc => {
                notes[doc.id] = {
                    id: doc.id,
                    ...doc.data()
                }
            });
            dispatch({
                type: actions.GET_NOTES,
                payload: notes
            });
        }).catch( error => {
            console.error(error);
        });
}

export const addNotes = (note) => async (dispatch) => {
    firestore.collection('notes').add(note)
        .then( snap => {
            dispatch({
                type: actions.ADD_NOTES,
                payload: {
                    id: snap._key.path.segments[1],
                    ...note
                }
            });
        }).catch( error => {
            console.error(error);
        })
}

export const saveNotes = (note, text) => async (dispatch) => {
    firestore.runTransaction( transaction => {
        return transaction.get(firestore.collection('notes').doc(note.id)).then( note => {
            if (!note.exists) {
                throw "Document does not exist!";
            }
            transaction.update(
                firestore.collection('notes').doc(note.id), 
                { text }
            );
        }).catch( error => {
            console.error(error);
        })
    }).then( () => {
        dispatch({
            type: actions.SAVE_NOTES,
            payload: {
                noteId: note.id,
                text
            }
        });
    }).catch( error => {
        console.error("Transaction failed: ", error);
    });
}

export const clearNotes = (noteId) => async (dispatch) => {
    firestore.collection('notes').doc(noteId)
    .delete()
    .then( () => {
        dispatch({
            type: actions.CLEAR_NOTES,
            payload: noteId
        });
    }).catch( (error) => {
        console.error(error);
    });
} 