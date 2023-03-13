import { fb_auth } from "../lib/Firebase";
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from "react";

// Custom hook to read auth record and user profile
const useUserData = () => {
    const [user] = useAuthState(fb_auth);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        // turn off realtime subscription
        
    })    
}

export default useUserData;