import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var config = {
    apiKey: "AIzaSyCNh8gqt-Tg9wyOaPPqDZmqOiOlhGrdckc",
    authDomain: "todo-list-75d8d.firebaseapp.com",
    databaseURL: "https://todo-list-75d8d.firebaseio.com",
    projectId: "todo-list-75d8d",
    storageBucket: "todo-list-75d8d.appspot.com",
    messagingSenderId: "187563929462"
  };
  firebase.initializeApp(config);

  export const firestore = firebase.firestore();

//187563929462-9973ui2qun12v4th9shvn3m7rli3tb0h.apps.googleusercontent.com

//7WWG2ZJN9psxCyxuPDV681NN

export default firebase;