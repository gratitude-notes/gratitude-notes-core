//import firebase from 'firebase/compat/app'
import {initializeApp} from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

require('firebase/auth')

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJsQ40vMSJRCfVDE5Vpn9Z4xQ2q75Gh7A",
  authDomain: "gratitudenotes.firebaseapp.com",
  projectId: "gratitudenotes",
  storageBucket: "gratitudenotes.appspot.com",
  messagingSenderId: "73810251457",
  appId: "1:73810251457:web:df69847d2adaca2e55ce40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};
