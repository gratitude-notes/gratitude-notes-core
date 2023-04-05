import { useEffect, useState } from "react";
import { useSession } from "../lib/Session";
import { doc, DocumentData, DocumentSnapshot, FirestoreError, onSnapshot, setDoc } from '@firebase/firestore';
import { fb_firestore } from "../lib/Firebase";

type UserSettings = {
    theme: "light" | "dark",
    geolocation: boolean
}

type UserProfile = {
    settings: UserSettings
} | null;

// Custom hook to read auth record and user profile
const useProfileData = () => {
    const session = useSession();
    const [profileData, setProfileData] = useState<UserProfile>(null);

    const composeUserProfile = (userProfileData: DocumentData) => {
        const currentUserProfile: UserProfile = {
            settings: {
                theme: userProfileData.theme,
                geolocation: userProfileData.geolocation
            }
        }

        return currentUserProfile;
    }

    const createProfileData = async () => {
        const initialProfileData: UserProfile = {
            settings: {
                theme: "light",
                geolocation: false,
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
            const userProfileDoc = snapshot.data();
            const userProfile = composeUserProfile(userProfileDoc);
            setProfileData(userProfile)
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