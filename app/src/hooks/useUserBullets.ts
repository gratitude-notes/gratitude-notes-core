import { useEffect, useState } from 'react';
import { useSession } from '../lib/Session';
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
    Query,
} from '@firebase/firestore';
import { fb_firestore } from '../lib/Firebase';
import dayjs from 'dayjs';

type Bullets = {
    bullets: NoteBullet[] | null;
};

export type NoteBullet = {
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

export type TQuery = 'Personal' | 'Favorites' | 'Public' | 'PastWeek' | 'CurrentWeek';

const useUserBullets = (feedQuery: TQuery) => {
    const session = useSession();
    const [userBullets, setUserBullets] = useState<Bullets>({ bullets: null });

    const composeUserNotes = (documents: QueryDocumentSnapshot<DocumentData>[]) => {
        const collectionBullets: NoteBullet[] = [];

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
                bulletAddress: bulletDocData.bulletAddress,
            };

            collectionBullets.push(composeNewBullet);
        });

        setUserBullets({ bullets: collectionBullets });
    };

    const handleData = (snapshot: QuerySnapshot<DocumentData>) => {
        if (!snapshot.empty) {
            const userNoteDocs: QueryDocumentSnapshot<DocumentData>[] = snapshot.docs;
            composeUserNotes(userNoteDocs);
        } else {
            setUserBullets({ bullets: null });
        }
    };

    const handleError = (error: FirestoreError) => {
        console.log(error.message);
    };

    useEffect(() => {
        if (session?.user) {
            const ref = collection(fb_firestore, 'users', session.user.uid, 'notes');

            const orderDescending = orderBy('timestamp', 'desc');

            const previousStartOfWeek = Timestamp.fromDate(dayjs().startOf('week').subtract(1, 'week').toDate());
            const previousEndOfWeek = Timestamp.fromDate(dayjs().endOf('week').subtract(1, 'week').toDate());

            const startOfWeek = Timestamp.fromDate(dayjs().startOf('week').toDate());
            const endOfWeek = Timestamp.fromDate(dayjs().endOf('week').toDate());

            let q: Query<DocumentData>;

            switch (feedQuery) {
                case 'Personal':
                    q = query(ref, orderDescending);
                    break;
                case 'Favorites':
                    q = query(ref, orderDescending, where('isFavorited', '==', true));
                    break;
                case 'Public':
                    q = query(ref, orderDescending, where('isPublic', '==', true));
                    break;
                case 'CurrentWeek':
                    q = query(
                        ref,
                        orderDescending,
                        where('timestamp', '<', endOfWeek),
                        where('timestamp', '>', startOfWeek)
                    );
                    break;
                case 'PastWeek':
                    q = query(
                        ref,
                        orderDescending,
                        where('timestamp', '<', previousEndOfWeek),
                        where('timestamp', '>', previousStartOfWeek)
                    );
                    break;
                default:
                    throw new Error(`Invalid feed query: ${feedQuery}`);
            }

            if (q) {
                const unsubscribe = onSnapshot(q, handleData, handleError);
                return unsubscribe;
            }
        }
    }, [session?.user, feedQuery]);

    return userBullets;
};

export default useUserBullets;
