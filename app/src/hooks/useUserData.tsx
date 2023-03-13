import { useEffect, useState } from "react";
import { useSession } from "../lib/Session";
import { doc, DocumentData, DocumentSnapshot, FirestoreError, onSnapshot } from 'firebase/firestore';
import { fb_firestore } from "../lib/Firebase";

type UserData = {
    data: DocumentData | null
}

// Custom hook to read auth record and user profile
const useUserData = () => {
    const session = useSession();
    const [userData, setUserData] = useState<UserData>({data: null});

    // Going to have to break this down into an interface that holds the specific structure of our firebase data.
    // Currently retrieving by note field on my document in firestore: vxvCnDowhIbBseELl5XHXUPj0vc2
    const handleData = (data: DocumentSnapshot<DocumentData>) => {
        setUserData({data: data.get('note')})
    }

    const handleError = (error: FirestoreError) => {

    }

    useEffect(() => {
        if (session?.user) {
            const ref = doc(fb_firestore, "users", session.user.uid)
            const unsubscribe = onSnapshot(ref, handleData, handleError);
            return unsubscribe;
        }
    }, [session?.user])
    
    return userData;
}

export default useUserData;