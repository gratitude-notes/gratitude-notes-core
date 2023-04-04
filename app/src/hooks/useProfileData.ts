import { useEffect, useState } from "react";
import { useSession } from "../lib/Session";
import { doc, DocumentData, DocumentSnapshot, FirestoreError, onSnapshot, setDoc } from '@firebase/firestore';
import { fb_firestore } from "../lib/Firebase";

type ProfileData = {
    data: DocumentData | null
}

type UserProfile = {
    settings: {
        theme: "light" | "dark"
        trackLocation: boolean
    }
}

// Custom hook to read auth record and user profile
const useProfileData = () => {
    const session = useSession();
    const [profileData, setProfileData] = useState<ProfileData>({data: null});

    const createProfileData = async () => {
        const initialProfileData: UserProfile = {
            settings: {
                theme: "light",
                trackLocation: false,
            }
        }

        if (session?.user) {
            const ref = doc(fb_firestore, "users", session.user.uid);
            await setDoc(ref, initialProfileData);
        }
    }

    const handleData = async (snapshot: DocumentSnapshot<DocumentData>) => {
        if (!snapshot.exists()) {
            await createProfileData();
        }
        else {
            setProfileData({data: snapshot.data()})
        }
    }

    const handleError = (error: FirestoreError) => {
        console.log(error.code); // Typically permission-denied when accessing documents not belonging to the current authenticated user.
    }

    useEffect(() => {
        if (session?.user) {
            const ref = doc(fb_firestore, "users", session.user.uid);
            const unsubscribe = onSnapshot(ref, handleData, handleError);
            return unsubscribe;
        }
    }, [session?.user])
    
    return profileData;
}

export default useProfileData;