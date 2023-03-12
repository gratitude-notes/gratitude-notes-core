import { User } from "firebase/auth";
import { createContext, useContext } from "react";

export interface UserAuth {
    user: User | null | undefined
}

export const AuthContext = createContext<UserAuth>({user: null});

export const useAuth = () => {
    const { user } = useContext(AuthContext);
    return useContext(AuthContext);;
}