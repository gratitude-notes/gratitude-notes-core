import { useEffect, useState } from 'react';
import { BsShare } from 'react-icons/bs';
import { setDoc, doc } from '@firebase/firestore';
import { fb_firestore } from '../../../lib/Firebase';
import { useSession } from '../../../lib/Session';
import { MdOutlineDashboardCustomize } from 'react-icons/md';

type ShareButtonProps = {
  bulletDocID: string | undefined;
}

const ShareButton: React.FC<ShareButtonProps> = ({bulletDocID}) => {
  const session = useSession();;

  // const onClickLikeButton = () => {
  //   if (bulletDocID && session && session.user) {
  //     const likedDocRef = doc(fb_firestore, "users", session.user.uid, "notes", bulletDocID);
  //     setDoc(likedDocRef, {isOnPublicBoard: !isOnPublicBoard}, {merge: true})
  //   }
  // }

  return (
    <>
        <button
          className="mt-auto"
        >
          <BsShare size={17} />
        </button>

    </>
  );
}

export default ShareButton;