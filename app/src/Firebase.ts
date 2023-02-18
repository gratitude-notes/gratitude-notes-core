import { FirebaseApp, initializeApp,  } from "@firebase/app";
import { firebaseConfig } from "./config/firebase";
import { Auth, getAuth } from "firebase/auth";

import React from "react";
import { useContext, useState } from "react";

interface Firebase {
    connected: Boolean;
    app?: FirebaseApp;
    auth?: Auth;
}

interface FirebaseInit {
    fb_loading: boolean;
    firebase?: Firebase;
}

export const FirebaseContext = React.createContext<Firebase>({ connected: false });

export function useFirebase(): Firebase {
    return useContext(FirebaseContext);
}

export function useFirebaseInit(): FirebaseInit {
    const [firebaseInit, setFirebaseInit] = useState<FirebaseInit>({fb_loading: true});

    const fb_app = initializeApp(firebaseConfig);
    const fb_auth = getAuth(fb_app);

    setFirebaseInit({fb_loading: false, firebase: {connected: true, app: fb_app, auth: fb_auth}})
    return firebaseInit;
}