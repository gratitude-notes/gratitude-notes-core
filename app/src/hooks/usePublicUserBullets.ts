import { useEffect, useState } from 'react';
import {
    collection,
    Timestamp,
    QuerySnapshot,
    DocumentData,
    QueryDocumentSnapshot,
    FirestoreError,
    onSnapshot,
    query,
    where,
    orderBy,
} from '@firebase/firestore';
import { fb_firestore } from '../lib/Firebase';

type PublicBullets = {
    publicBullets: PublicNoteBullet[] | null;
};

export type PublicNoteBullet = {
    score: number | null;
    timestamp: Timestamp;
    bulletJSON: string;
    keywords: string[];
    isFavorited: boolean;
    isPublic: boolean;
    bulletDocID?: string;
    images: string[];
    bulletTextContent: string;
    bulletLongitude: number | null;
    bulletLatitude: number | null;
    bulletAddress: string | null;
};

const useUserPublicBullets = (userID: string | undefined) => {
    const [userPublicBullets, setUserPublicBullets] = useState<PublicBullets>({ publicBullets: null });

    const composeUserPublicNotes = (documents: QueryDocumentSnapshot<DocumentData>[]) => {
        const collectionPublicBullets: PublicNoteBullet[] = [];

        documents.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            const publicBulletDocData: DocumentData = doc.data();

            const composeNewPublicBullet: PublicNoteBullet = {
                bulletJSON: publicBulletDocData.bulletJSON,
                keywords: publicBulletDocData.keywords,
                score: publicBulletDocData.score,
                timestamp: publicBulletDocData.timestamp,
                isFavorited: publicBulletDocData.isFavorited,
                isPublic: publicBulletDocData.isPublic,
                bulletDocID: publicBulletDocData.bulletDocID,
                images: publicBulletDocData.images,
                bulletTextContent: publicBulletDocData.bulletTextContent,
                bulletLongitude: publicBulletDocData.bulletLongitude,
                bulletLatitude: publicBulletDocData.bulletLatitude,
                bulletAddress: publicBulletDocData.bulletAddress,
            };

            collectionPublicBullets.push(composeNewPublicBullet);
        });

        setUserPublicBullets({ publicBullets: collectionPublicBullets });
    };

    const handleData = (snapshot: QuerySnapshot<DocumentData>) => {
        if (!snapshot.empty) {
            const userPublicNoteDocs: QueryDocumentSnapshot<DocumentData>[] = snapshot.docs;
            composeUserPublicNotes(userPublicNoteDocs);
        } else {
            setUserPublicBullets({ publicBullets: null });
        }
    };

    const handleError = (error: FirestoreError) => {
        console.log(error.message);
    };

    useEffect(() => {
        if (userID) {
            const ref = collection(fb_firestore, 'users', userID, 'public_notes');
            const q = query(ref, orderBy('timestamp', 'desc'));
            const unsubscribe = onSnapshot(q, handleData, handleError);
            return unsubscribe;
        }
    }, [userID]);

    return userPublicBullets;
};

export default useUserPublicBullets;
