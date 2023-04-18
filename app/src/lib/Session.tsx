import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { fb_auth } from "./Firebase";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

type Session = {
    user: User | null
}

const SessionContext = createContext<Session | undefined>(undefined);

export const useSession = () => {
    const ctx = useContext(SessionContext)

    if (ctx != undefined) {
        return ctx
    }
}

export const SessionWrapper = ({ children } : { children: JSX.Element }) => {
    const [session, setSession] = useState<Session | undefined>();

    const onChange = async () => {
        const { user } = await FirebaseAuthentication.getCurrentUser();
        console.log(user);
        setSession({ user: fb_auth.currentUser })
        console.log(session);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(fb_auth, onChange)
        return unsubscribe;
    }, [])

    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    )
}