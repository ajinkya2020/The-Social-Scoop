// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDkjHXdDdIaDXF6KUovmzVMzJFpNLSnZR4",
    authDomain: "social-scoop.firebaseapp.com",
    projectId: "social-scoop",
    storageBucket: "social-scoop.appspot.com",
    messagingSenderId: "201367795639",
    appId: "1:201367795639:web:27665e7b86daa7858f1a32",
    measurementId: "G-0WB9BRGN1T"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db, auth, storage};