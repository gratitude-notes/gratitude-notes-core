import { useEffect, useState } from 'react';
import { BsGlobe } from 'react-icons/bs';
import { setDoc, doc, Firestore } from '@firebase/firestore';
import { fb_firestore } from '../../../lib/Firebase';
import { useSession } from '../../../lib/Session';
import toast from 'react-hot-toast';
import { BiLockAlt } from 'react-icons/bi';

type PublicBoardButtonProps = {
  isPublic: boolean;
  bulletDocID: string | undefined;
}

const PublicBoardButton: React.FC<PublicBoardButtonProps> = ({isPublic, bulletDocID}) => {
  const session = useSession();
  const [isFilled, setIsFilled] = useState(isPublic);

  useEffect(() => {
    setIsFilled(isPublic);
  }, [isPublic])

  const onClickPublicBoardButton = () => {
    if (bulletDocID && session && session.user) {
      const publicBoardDocRef = doc(fb_firestore, "users", session.user.uid, "notes", bulletDocID);
      setDoc(publicBoardDocRef, {isPublic: !isPublic}, {merge: true})
    }
  }

  // const onClickAddToBoardButton = async () => {
  //   const newPublicBullet: PublicNoteBullet = {
  //     bulletJSON: JSON.stringify(editorStateRef.current),
  //     bulletTextContent: editorTextContent ? editorTextContent : ""
  //   }

    // try {
    //   if (bulletDocID && session && session.user) {
    //     const publicBulletsCollectionRef = collection(fb_firestore, "users", session.user.uid, "public_notes");
    //     const newPublicBulletDocRef = await addDoc(publicBulletsCollectionRef, newBullet);
    //   }
    // } catch(error) {
    //   console.log(error);
    //   toast.error("Error Adding Note to Public Board.")
    // }
    // if (bulletDocID && session && session.user) {
    //   const boardDocRef = doc(fb_firestore, "users", session.user.uid, "shared_notes", bulletDocID);
    //   setDoc(boardDocRef, {hi: "hi"}, {merge: true});
    // }
  // }
  // try {
  //   if (session && session.user) {
  //     const bulletCollectionRef = collection(fb_firestore, "users", session.user.uid, "notes");
  //     const newBulletDocRef = await addDoc(bulletCollectionRef, newBullet);
  //     await setDoc(newBulletDocRef, {bulletDocID: newBulletDocRef.id}, {merge: true});
      
  //     const downloadURLs = await uploadImages(newBulletDocRef.id);        
  //     await updateDoc(newBulletDocRef, { images: downloadURLs });

  //     toast.success("Note Submitted!");
  //   }
  // } catch(error) {
  //   console.log(error);
  //   toast.error("Error Submitting Note.")
  // }

  // const onClickLikeButton = () => {
  //   if (bulletDocID && session && session.user) {
  //     const likedDocRef = doc(fb_firestore, "users", session.user.uid, "notes", bulletDocID);
  //     setDoc(likedDocRef, {isOnPublicBoard: !isOnPublicBoard}, {merge: true})
  //   }
  // }

  return (
    <>
      {isFilled
        ? 
          <button className="hover:bg-cyan-700 hover:bg-opacity-20 hover:text-cyan-500 p-2 hover:rounded-full"
                onClick={onClickPublicBoardButton}>
            <BiLockAlt size={17} />
          </button>
        :
          <button className="hover:bg-cyan-700 hover:bg-opacity-20 hover:text-cyan-500 p-2 hover:rounded-full"
                onClick={onClickPublicBoardButton}>
            <BsGlobe size={15} />
          </button>
      }
    </>
  );
}

export default PublicBoardButton;

