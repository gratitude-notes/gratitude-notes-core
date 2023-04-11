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
      {isFilled 
        ? 
          <button className="hover:bg-pink-700 hover:bg-opacity-20 p-2 hover:rounded-full"
                onClick={onClickLikeButton}>
            <BsHeartFill className="text-pink-500" size={15} />
          </button>
        : 
        <button className="hover:bg-pink-700 hover:bg-opacity-20 hover:text-pink-500 p-2 hover:rounded-full"
                onClick={onClickLikeButton}>
          <BsHeart size={15} />
        </button>
      }
    </>
  );
}

export default LikeButton;