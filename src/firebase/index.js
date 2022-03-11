import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDkMimrfqKQsrDqmSLtVK3_za_M95ZAZwc",
  authDomain: "daily-meal-app.firebaseapp.com",
  projectId: "daily-meal-app",
  storageBucket: "daily-meal-app.appspot.com",
  messagingSenderId: "185752617412",
  appId: "1:185752617412:web:d5b56e617a7620f4226491",
  measurementId: "G-PYWV8TNKZJ"
};

export const db = firebase.initializeApp(firebaseConfig).firestore();
export default firebase;