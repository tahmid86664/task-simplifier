import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBydu1MEXCLgvZ8Az6PZUl4jOpO9R3vpfE",
    authDomain: "task-simplifier.firebaseapp.com",
    projectId: "task-simplifier",
    storageBucket: "task-simplifier.appspot.com",
    messagingSenderId: "195369749818",
    appId: "1:195369749818:web:d73355b890d5f6445cd403",
    measurementId: "G-N16Q7KEHGT"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export { auth, provider };
export default db;
