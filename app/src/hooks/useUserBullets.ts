import { useEffect, useState } from "react";
import { useSession } from "../lib/Session";
import { collection, Timestamp, QuerySnapshot, DocumentData, QueryDocumentSnapshot, FirestoreError, onSnapshot } from '@firebase/firestore';
import { fb_firestore } from "../lib/Firebase";

type Bullets = {
    bullets: NoteBullet[] | null
}

export type NoteBullet = {
    score: number,
    timestamp: Timestamp,
    bulletJSON: string,
    keywords: string[],
    isFavorited: boolean
    bulletDocID?: string,
    images: string[],
    bulletTextContent: string
}

const useUserBullets = () => {
    const session = useSession();
    const [userBullets, setUserBullets] = useState<Bullets>({bullets: null});

    const composeUserNotes = (documents: QueryDocumentSnapshot<DocumentData>[]) => {
        let collectionBullets: NoteBullet[] = [];

        documents.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            const bulletDocData: DocumentData = doc.data();

            const composeNewBullet: NoteBullet = {
                bulletJSON: bulletDocData.bulletJSON,
                keywords: bulletDocData.keywords,
                score: bulletDocData.score,
                timestamp: bulletDocData.timestamp,
                isFavorited: bulletDocData.isFavorited,
                bulletDocID: bulletDocData.bulletDocID,
                images: bulletDocData.images,
                bulletTextContent: bulletDocData.bulletTextContent
            }
            
            collectionBullets.push(composeNewBullet)
        })

        setUserBullets({bullets: collectionBullets});
    }

    const handleData = (snapshot: QuerySnapshot<DocumentData>) => {
        if (!snapshot.empty) {
            const userNoteDocs: QueryDocumentSnapshot<DocumentData>[] = snapshot.docs;
            composeUserNotes(userNoteDocs);
        } else {
            setUserBullets({bullets: null})
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
    
    return userBullets;
}

export default useUserBullets;