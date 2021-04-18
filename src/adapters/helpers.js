import firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "student-campus.firebaseapp.com",
    databaseURL: "https://student-campus-default-rtdb.firebaseio.com",
    projectId: "student-campus",
    storageBucket: "student-campus.appspot.com",
    messagingSenderId: "241781208381",
    appId: "1:241781208381:web:21b944c26b726c3dae8154",
    measurementId: "G-S8TEJKNG0K"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const database = firebase.database();
export const firestore = firebase.firestore();
export const storage = firebase.storage().ref();

