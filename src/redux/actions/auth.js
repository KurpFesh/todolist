import firebase, { firestore } from '../../firebase';
import * as actions from '../actionTypes/auth';

export const signUpWithGoogle = () => async(dispatch) => {

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

                    dispatch({
                        type: actions.SIGN_UP_WITH_GOOGLE,
                        payload: user
                    });

                } catch (error) {
                    console.error(error);
                    return;
                }
            }
        }).catch(error => {
            console.error(error);
            return;
        });
};

export const signInWithGoogle = () => async (dispatch) =>  {
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
            dispatch({
                type: actions.SIGN_IN_WITH_GOOGLE,
                payload: user
            });
        }).catch(error => {
            console.error(error);
            return;
        });
};

export const signUpWithEmailAndPassword = (email, password) => async (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
        dispatch({
            type: actions.SIGN_UP_WITH_EMAIL_AND_PASSWORD,
            payload: user
        });
    }).catch(function(error) {
        console.error(error);
        return;
    });

};

export const signInWithEmailAndPassword = (email, password) => async (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
        dispatch({
            type: actions.SIGN_IN_WITH_EMAIL_AND_PASSWORD,
            payload: user
        });
    }).catch(function(error) {
        console.error(error);
        return;
    });
};

export const signOut = () => async (dispatch) => {
    firebase.auth().signOut()
        .then(() =>  {
            dispatch({
                type: actions.SIGN_OUT
            });
        }).catch(error => {
            console.error(error);
            return;
        });
};

export const setUser = (user) => {
    return {
        type: actions.SET_USER,
        payload: {
            id: user.uid,
            name: user.displayName,
            email: user.email
        }
    }
}

export const deleteUser = () => async (dispatch) => {
    firebase.auth().currentUser
        .delete()
        .then( () => {
            dispatch({
                type: actions.DELETE_USER
            });
        }).catch( error => {
            console.error(error);
        });
}