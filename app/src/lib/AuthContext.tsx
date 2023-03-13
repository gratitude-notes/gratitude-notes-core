import { User } from "firebase/auth";
import { createContext, useContext } from "react";

interface UserAuth {
    user: User| null | undefined;
}

export const AuthContext = createContext<UserAuth>({user: null})

export const useAuth = () => {
    return useContext(AuthContext);
}