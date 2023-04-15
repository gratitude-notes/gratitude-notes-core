import { useEffect, useState } from "react";
import { useSession } from "../lib/Session";
import { doc, DocumentData, DocumentSnapshot, Firestore, FirestoreError, onSnapshot, setDoc, Timestamp } from '@firebase/firestore';
import { fb_firestore } from "../lib/Firebase";

export type UserSettings = {
    theme: "light" | "dark",
    geolocation: boolean,
    analysis: boolean
}

export type UserStreaks = {
    lastTimeStamp: Timestamp,
    streakCount: number,
}

type UserProfile = {
    settings: UserSettings,
    streaks: UserStreaks
} | null;

type UserPublicProfile = {
    displayName: string
} | null;

// Custom hook to read auth record and user profile
const useProfileData = () => {
    const session = useSession();
    const [profileData, setProfileData] = useState<UserProfile>(null);

    const composeUserProfile = (userProfileData: DocumentData) => {
        const currentUserProfile: UserProfile = {
            settings: userProfileData.settings,
            streaks: userProfileData.streaks
        }

        return currentUserProfile;
    }

    const createProfileData = async () => {
        const initialProfileData: UserProfile = {
            settings: {
                theme: "light",
                geolocation: false,
                analysis: false
            },
            streaks: {
                lastTimeStamp: Timestamp.fromMillis(0),
                streakCount: 0
            }
        }

        if (session?.user) {
            const ref = doc(fb_firestore, "users", session.user.uid);
            await setDoc(ref, initialProfileData);
        }
    }

    const createPublicProfile = async () => {
        const initialPublicProfileData: UserPublicProfile = {
            displayName: session?.user?.displayName!
        }

        if (session?.user) {
            const ref = collection(fb_firestore, "users", session.user.uid, "public_profile");
            const newProfileDocRef = await addDoc(ref, initialPublicProfileData);

            // await setDoc(newProfileDocRef, {profileID: session.user.uid}, {merge: true});
        }
    }

    const handleData = async (snapshot: DocumentSnapshot<DocumentData>) => {
        if (!snapshot.exists()) {
            await createProfileData();
            await createPublicProfile();
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

function collection(fb_firestore: Firestore, arg1: string, uid: string, arg3: string) {
    throw new Error("Function not implemented.");
}
function updateDoc(ref: void, initialPublicProfileData: { displayName: string; }) {
    throw new Error("Function not implemented.");
}

function addDoc(ref: void, initialPublicProfileData: { displayName: string; }) {
    throw new Error("Function not implemented.");
}

