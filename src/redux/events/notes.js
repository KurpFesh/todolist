import { createEffect } from 'effector';
import { firestore } from '../../firebase';

export const getNotes = createEffect('get notes').use( () => {
    const notes = {};
    firestore.collection('notes').get()
        .then( querySnapshot => {
            querySnapshot.forEach( doc => {
                notes[doc.id] = {
                    id: doc.id,
                    ...doc.data()
                }
            });
            return notes;
        }).catch( error => {
            console.error(error);
        });
});


export const addNotes = createEffect('add notes').use( (note) => {
    firestore.collection('notes').add(note)
        .then( snap => {
            return {
                id: snap._key.path.segments[1],
                ...note
            }
        }).catch( error => {
            console.error(error);
        })
});


export const saveNotes = createEffect('save notes').use( (note, text) => {
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
        return {
            noteId: note.id,
            text
        }
    }).catch( error => {
        console.error("Transaction failed: ", error);
    });
});


export const clearNotes = createEffect('clear notes').use( (noteId) => {
    firestore.collection('notes').doc(noteId)
    .delete()
    .then( () => {
        return noteId;
    }).catch( (error) => {
        console.error(error);
    });
});
