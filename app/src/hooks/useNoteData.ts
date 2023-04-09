import { useEffect, useState } from "react";
import { useSession } from "../lib/Session";
import { collection, Timestamp, QuerySnapshot, DocumentData, QueryDocumentSnapshot, FirestoreError, onSnapshot } from '@firebase/firestore';
import { fb_firestore } from "../lib/Firebase";

type NoteData = {
    notes: NoteBullet[] | null
}

export type NoteBullet = {
    score: number,
    timestamp: Timestamp,
    note: string,
    keywords: string[]
}

const useNoteData = () => {
    const session = useSession();
    const [noteData, setNoteData] = useState<NoteData>({notes: null});

    const composeUserNotes = (documents: QueryDocumentSnapshot<DocumentData>[]) => {
        let collectionNotes: NoteBullet[] = [];

        documents.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            const docNotes: NoteBullet[] = doc.data().bullets;
            collectionNotes = collectionNotes.concat(docNotes);
        })

        setNoteData({notes: collectionNotes});
    }

    const handleData = (snapshot: QuerySnapshot<DocumentData>) => {
        if (!snapshot.empty) {
            const userNoteDocs: QueryDocumentSnapshot<DocumentData>[] = snapshot.docs;
            composeUserNotes(userNoteDocs);
        }
    }

    const handleError = (error: FirestoreError) => {
        console.log(error.message);
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