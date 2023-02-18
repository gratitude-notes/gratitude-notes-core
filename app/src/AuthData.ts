import React, { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useFirebase } from "./Firebase";

interface AuthData {
    /**
     * Data Model for containing User Auth Information.
     */
    logged_in: Boolean;
    user_id?: string;
    user_data?: any;
}

interface AuthDataInit {
    /**
     * Data Model for containing Auth Initialization Process
     * Used in the initial load of <App>
     */
    auth_loading: boolean;
    auth?: AuthData;
}

// Using React Context Hook & Establishing ContextProvider
export const AuthContext = React.createContext<AuthData>({logged_in: false});

export function useAuth(): AuthData {
    /**
     * Gets Current State of UserAuth (including their profile data).
     * 
     * @returns See `Auth` model to retrieve current User Information.
     */
    console.log("auth used");
    return useContext(AuthContext);
}

export function useAuthInit(): AuthDataInit {
    /**
     * Starts the firebase event listener `onAuthChanged` and updates `Auth` accordingly.
     * 
     * @returns Using `AuthInit`, determine if the firebase event listener is ready via `loading`.
     */
    const [authDataInit, setAuthDataInit] = useState<AuthDataInit>({auth_loading: true});
    const { auth } = useFirebase();

    useEffect(() => {
        return auth?.onAuthStateChanged((firebaseUser) => {
            const auth_result = firebaseUser 
            ? {logged_in: true, user_id: firebaseUser.uid, user_data: firebaseUser}
            : {logged_in: false }
            setAuthDataInit({ auth_loading: false, auth: auth_result})
        })
    });

    return authDataInit;
}