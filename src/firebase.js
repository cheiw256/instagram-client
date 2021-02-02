import firebase from "firebase";

var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCEf4h9m9yJxYe6S4d2X0jGONCpnZvJYvw",
    authDomain: "mern-instagram-18af7.firebaseapp.com",
    databaseURL: "https://mern-instagram-18af7-default-rtdb.firebaseio.com",
    projectId: "mern-instagram-18af7",
    storageBucket: "mern-instagram-18af7.appspot.com",
    messagingSenderId: "178237264951",
    appId: "1:178237264951:web:8da38df69b13a8de199bb2"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage  = firebase.storage();

export {db, auth, storage};