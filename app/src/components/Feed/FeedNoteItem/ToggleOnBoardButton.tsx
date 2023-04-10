import { useEffect, useState } from 'react';
import { BsGlobe } from 'react-icons/bs';
import { setDoc, doc, Firestore } from '@firebase/firestore';
import { fb_firestore } from '../../../lib/Firebase';
import { useSession } from '../../../lib/Session';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import toast from 'react-hot-toast';
import { PublicNoteBullet } from '../../../hooks/useUserPublicBullets';

type AddToBoardButtonProps = {
  isOnPublicBoard: boolean;
  bulletDocID: string | undefined;
}

const AddToBoardButton: React.FC<AddToBoardButtonProps> = ({isOnPublicBoard, bulletDocID}) => {
  const session = useSession();
  const [isFilled, setIsFilled] = useState(isOnPublicBoard);

  // useEffect(() => {
  //   setIsFilled(isOnPublicBoard);
  // }, [isOnPublicBoard])

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
      {isFilled ? 
      (
        <button
          className="mt-auto"
        >
          <BsGlobe size={17} />
        </button>
      ) : (
        <button
          
          className="mt-auto"
        >
          {!isFilled && <MdOutlineDashboardCustomize size={17} />}
        </button>
      )}
    </>
  );
}

export default AddToBoardButton;

