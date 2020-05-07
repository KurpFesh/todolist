import { createEvent } from 'effector';
import { createEffect } from 'effector';
import firebase, { firestore } from '../../firebase';

import { deleteCategory } from './categories';

const deleteRelatedCategories = (userId) => {
    firestore.collection('categories').get()
        .then(querySnapshot => {
            querySnapshot.forEach( doc => {
                if(doc.data().userId === userId) {
                    deleteCategory(doc.id);
                }
            })
        });
}

export const signUpWithGoogle = createEffect('sign up with google').use( () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
        .then(async ({ user }) => {
            if(!user) {
                return;
            }

            const userRef = firestore.doc(`users/${user.uid}`);
            const snapshot = userRef.get();

            if(!snapshot.exist) {
                const { displayName, email } = user;
                const createdAt = new Date();

                try {
                    await userRef.set({
                        displayName,
                        email,
                        createdAt
                    });

                    return user;

                } catch (error) {
                    console.error(error);
                    return;
                }
            }
        }).catch(error => {
            console.error(error);
            return;
        });
});

export const signInWithGoogle = createEffect('sign in with google').use( () => {
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(async ({ user }) => {
            if(!user) {
                return;
            }

            const userRef = firestore.doc(`users/${user.uid}`);
            const snapshot = userRef.get();

            if(!snapshot) {
                return;
            }
            
            return user;

        }).catch(error => {
            console.error(error);
            return;
        });
});

export const signUpWithEmailAndPassword = createEffect('sign up with email and password').use( 
    (email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
            return user;
        }).catch(function(error) {
            console.error(error);
            return;
        });
    }
);

export const signInWithEmailAndPassword = createEffect('sign in with email and password').use(
    (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
            return user;
        }).catch(function(error) {
            console.error(error);
            return;
        });
    }
);

export const setUser = createEvent('set user');

export const signOut = createEffect('sign out').use( () => {
    firebase.auth().signOut()
        .catch(error => {
            console.error(error);
            return;
        });
});

export const clearUser = createEvent('clear user');

export const deleteUser = createEffect('delete user').use( () => {

    console.log(firebase.auth().currentUser);
    /*deleteRelatedCategories()

    firebase.auth().currentUser
        .delete()
        .catch( error => {
            console.error(error);
        });
    */
});