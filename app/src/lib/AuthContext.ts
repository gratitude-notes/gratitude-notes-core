import React, { useContext, useEffect, useState } from "react";
import { fb_auth } from "../config/Firebase";

export interface UserAuth {
    /**
     * Data Model for containing User Auth Information.
     */
    logged_in: boolean;
    user_id?: string;
    user_data?: any;
}

// Using React Context Hook & Establishing ContextProvider
export const AuthContext = React.createContext<UserAuth>({logged_in: false});

export function useAuth(): UserAuth {
    /**
     * Starts the firebase event listener `onAuthChanged` and updates `Auth` accordingly.
     * 
     * @returns Using `AuthInit`, determine if the firebase event listener is ready via `loading`.
     */
    const [authData, setAuthData] = useState<UserAuth>({logged_in: false});
    
    useEffect(() => {
        return fb_auth.onAuthStateChanged((firebaseUser) => {
            const auth_result = firebaseUser 
            ? setAuthData({logged_in: true, user_id: firebaseUser.uid, user_data: firebaseUser })
            : setAuthData({ logged_in: false, user_id: undefined, user_data: undefined })
        })
    }, []);

    return authData;
}