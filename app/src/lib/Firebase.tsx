import { FirebaseApp, initializeApp, getApp, getApps } from "@firebase/app";
import { Auth, getAuth } from "@firebase/auth";
import { Firestore, getFirestore }  from "@firebase/firestore";
import { FirebaseStorage, getStorage } from "@firebase/storage"
// Firebase Configuration
export const firebaseConfig = {
    apiKey: import.meta.env.VITE_FB_API_KEY,
    authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FB_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FB_MSG_SENDER_ID,
    appId: import.meta.env.VITE_FB_APP_ID
};

// Returns Firebase Services to utilize throughout the whole application
export const fb_app: FirebaseApp = (!getApps().length) ? initializeApp(firebaseConfig) : getApp();
export const fb_auth: Auth = getAuth(fb_app);
export const fb_firestore: Firestore = getFirestore(fb_app);
export const fb_storage: FirebaseStorage = getStorage(fb_app);