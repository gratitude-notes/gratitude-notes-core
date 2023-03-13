import { useEffect, useState } from "react";
import { useSession } from "../lib/Session";
import { collection, DocumentData, CollectionReference, FirestoreError, onSnapshot, DocumentSnapshot } from '@firebase/firestore';
import { fb_firestore } from "../lib/Firebase";

type NoteData = {
    data: any
}

const useNoteData = () => {
    const session = useSession();
    const [noteData, setNoteData] = useState<NoteData>({data: null});

    const handleData = (snapshot: any) => {
        setNoteData({data: snapshot})
    }

    const handleError = (error: FirestoreError) => {
        
    }

    useEffect(() => {
        if (session?.user) {
            const ref = collection(fb_firestore, "users", session.user.uid, "notes");

            const unsubscribe = onSnapshot(ref, handleData, handleError);
            return unsubscribe;
        }
    }, [session?.user])
    
    return noteData;
}

export default useNoteData;