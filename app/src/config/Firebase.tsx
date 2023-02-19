import { FirebaseApp, initializeApp, getApp, getApps } from "@firebase/app";
import { Auth, getAuth } from "@firebase/auth";
import { Firestore, getFirestore }  from "@firebase/firestore";

// Firebase Configuration
export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FB_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_MSG_SENDER_ID,
    appId: process.env.REACT_APP_FB_APP_ID
};

// Returns Firebase Services to utilize throughout the whole application
export const fb_app: FirebaseApp = (!getApps().length) ? initializeApp(firebaseConfig) : getApp();
export const fb_auth: Auth = getAuth(fb_app);
export const fb_firestore: Firestore = getFirestore(fb_app);