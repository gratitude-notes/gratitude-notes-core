import { FirebaseApp, initializeApp,  } from "@firebase/app";
import { firebaseConfig } from "./config/firebase";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore"

import React from "react";
import { useContext } from "react";

interface Firebase {
    app: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
}

const setupFirebase = function(): Firebase {
    const fb_app = initializeApp(firebaseConfig);
    const fb_auth = getAuth(fb_app);
    const fb_firestore = getFirestore(fb_app);

    const FirebaseComponents: Firebase = { app: fb_app, auth: fb_auth, firestore: fb_firestore}
    return FirebaseComponents;
}

export const FirebaseContext = React.createContext<Firebase>(setupFirebase());

export function useFirebase(): Firebase {
    return useContext(FirebaseContext);
}