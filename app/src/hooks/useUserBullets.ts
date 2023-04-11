import { useEffect, useState } from "react";
import { useSession } from "../lib/Session";
import { collection, Timestamp, QuerySnapshot, DocumentData, QueryDocumentSnapshot, FirestoreError, onSnapshot, query, where, orderBy } from '@firebase/firestore';
import { fb_firestore } from "../lib/Firebase";

type Bullets = {
    bullets: NoteBullet[] | null
}

export type NoteBullet = {
    score: number | null,
    timestamp: Timestamp,
    bulletJSON: string,
    keywords: string[],
    isFavorited: boolean,
    isPublic: boolean,
    bulletDocID?: string,
    images: string[],
    bulletTextContent: string
    bulletLongitude: number  | null,
    bulletLatitude: number | null,
    bulletAddress: string | null
}

const useUserBullets = (feedQuery: string) => {
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
                isPublic: bulletDocData.isPublic,
                bulletDocID: bulletDocData.bulletDocID,
                images: bulletDocData.images,
                bulletTextContent: bulletDocData.bulletTextContent,
                bulletLongitude: bulletDocData.bulletLongitude,
                bulletLatitude: bulletDocData.bulletLatitude,
                bulletAddress: bulletDocData.bulletAddress
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
            let q;
                  
            if (feedQuery === "Personal") {
              q = query(ref, orderBy('timestamp', 'desc'));
            }
            else if (feedQuery === "Favorites") {
              q = query(ref, orderBy('timestamp', 'desc'), where("isFavorited", "==", true));
            }
            else if (feedQuery === "Public") {
              q = query(ref, orderBy('timestamp', 'desc'), where("isPublic", "==", true));
            }
        
            if (q) {
              const unsubscribe = onSnapshot(q, handleData, handleError);
              return unsubscribe;
            }
          }
    }, [session?.user, feedQuery])
    
    return userBullets;
}

export default useUserBullets;