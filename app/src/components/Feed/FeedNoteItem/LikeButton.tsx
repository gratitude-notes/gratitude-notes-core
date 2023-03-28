import { useEffect, useState } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { setDoc, doc } from '@firebase/firestore';
import { fb_firestore } from '../../../lib/Firebase';
import { useSession } from '../../../lib/Session';

const LikeButton: React.FC<{isFavorited: boolean, bulletDocID?: string}> = ({isFavorited, bulletDocID} : {isFavorited: boolean, bulletDocID?: string}) => {
  const session = useSession();
  const [isFilled, setIsFilled] = useState(isFavorited);

  useEffect(() => {
    setIsFilled(isFavorited);
  }, [isFavorited])

  const onClickLikeButton = () => {
    if (bulletDocID && session && session.user) {
      const likedDocRef = doc(fb_firestore, "users", session.user.uid, "notes", bulletDocID);
      setDoc(likedDocRef, {isFavorited: !isFavorited}, {merge: true})
    }
  }

  return (
    <>
      {isFilled ? (
        <button
          className="text-white font-bold"
          onClick={onClickLikeButton}
        >
          <BsHeartFill className="inline-block fill-pink-600" />
        </button>
      ) : (
        <button
          className="text-pink-500 font-bold"
          onClick={onClickLikeButton}
        >
          {!isFilled && <BsHeart className="inline-block" />}
        </button>
      )}
    </>
  );
}

export default LikeButton;