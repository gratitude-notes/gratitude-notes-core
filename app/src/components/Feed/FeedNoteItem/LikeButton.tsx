import { useEffect, useState } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { setDoc, doc } from '@firebase/firestore';
import { fb_firestore } from '../../../lib/Firebase';
import { useSession } from '../../../lib/Session';

type LikeButtonProps = {
  isFavorited: boolean;
  bulletDocID: string | undefined;
}

const LikeButton: React.FC<LikeButtonProps> = ({isFavorited, bulletDocID}) => {
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
      {isFilled ? 
      (
        <button
          className="text-white font-bold mt-auto"
          onClick={onClickLikeButton}
        >
          <BsHeartFill className="inline-block fill-pink-600" size={17} />
        </button>
      ) : (
        <button
          className="text-pink-500 font-bold mt-auto"
          onClick={onClickLikeButton}
        >
          {!isFilled && <BsHeart className="inline-block" size={17} />}
        </button>
      )}
    </>
  );
}

export default LikeButton;