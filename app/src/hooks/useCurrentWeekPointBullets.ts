import { useEffect, useState } from "react";
import { useSession } from "../lib/Session";
import { collection, Timestamp, QuerySnapshot, DocumentData, QueryDocumentSnapshot, FirestoreError, onSnapshot, query, where } from '@firebase/firestore';
import { fb_firestore } from "../lib/Firebase";
import dayjs from "dayjs";

type PointBullets = {
    pointBullets: PointBullet[] | null
}

export type PointBullet = {
    score: number,
    timestamp: Timestamp
}

const useCurrentWeekPointBullets = () => {
    const session = useSession();
    const [pointUserBullets, setPointUserBullets] = useState<PointBullets>({pointBullets: null});

    const composePointBullets = (documents: QueryDocumentSnapshot<DocumentData>[]) => {
        let collectionPointBullets: PointBullet[] = [];

        documents.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            const pointBulletDocData: DocumentData = doc.data();

            const composedPointBullet: PointBullet = {
                score: pointBulletDocData.score,
                timestamp: pointBulletDocData.timestamp
            }
            
            collectionPointBullets.push(composedPointBullet)
        })

        setPointUserBullets({pointBullets: collectionPointBullets});
    }

    const handleData = (snapshot: QuerySnapshot<DocumentData>) => {
        if (!snapshot.empty) {
            const userBulletDocs: QueryDocumentSnapshot<DocumentData>[] = snapshot.docs;
            composePointBullets(userBulletDocs);
        } else {
            setPointUserBullets({pointBullets: null})
        }
    }

    const handleError = (error: FirestoreError) => {
        console.log(error.message);
    }

    useEffect(() => {
        if (session?.user) {
            const startOfWeek = dayjs().startOf('week').toDate();
            const endOfWeek = dayjs().endOf('week').toDate();

            const ref = collection(fb_firestore, "users", session.user.uid, "notes");
            console.log(startOfWeek.valueOf())
            const q = query(ref, where('timestamp', '>', startOfWeek.valueOf()), where('timestamp', '<', endOfWeek.valueOf()))
            const unsubscribe = onSnapshot(q, handleData, handleError);
            return unsubscribe;
        }
    }, [session?.user])
    
    return pointUserBullets;
}

export default useCurrentWeekPointBullets;