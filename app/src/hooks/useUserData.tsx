import { useEffect, useState } from "react";
import { useSession } from "../lib/Session";

// Custom hook to read auth record and user profile
const useUserData = () => {
    const session = useSession();
    const [userID, setUserID] = useState(session?.user?.uid)

    useEffect(() => {
        // turn off realtime subscription
        if (userID) {
            console.log()
        }
    })    
}

export default useUserData;