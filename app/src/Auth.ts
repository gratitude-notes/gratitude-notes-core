import React, { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";


interface Auth {
    /**
     * Data Model for containing User Auth Information.
     */
    loggedIn: Boolean;
    userId?: string;
    userData?: any;
}

interface AuthInit {
    /**
     * Data Model for containing Auth Initialization Process
     * Used in the initial load of <App>
     */
    loading: boolean;
    auth?: Auth;
}

// Using React Context Hook & Establishing ContextProvider
export const AuthContext = React.createContext<Auth>({loggedIn: false});

export function useAuth(): Auth {
    /**
     * Gets Current State of UserAuth (including their profile data).
     * 
     * @returns See `Auth` model to retrieve current User Information.
     */
    console.log("auth used");
    return useContext(AuthContext);
}

export function useAuthInit(): AuthInit {
    /**
     * Starts the firebase event listener `onAuthChanged` and updates `Auth` accordingly.
     * 
     * @returns Using `AuthInit`, determine if the firebase event listener is ready via `loading`.
     */
    const [authInit, setAuthInit] = useState<AuthInit>({loading: true});

    useEffect(() => {
        // On Auth State Change
        // return onAuthStateChanged((firebaseUser) => {
        //     const auth = firebaseUser
        //     ? {logg}
        // }))
        
    });

    return authInit;
}