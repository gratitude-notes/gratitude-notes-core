import { useState } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

const LikeButton: React.FC = () => {
  const [isFilled, setIsFilled] = useState(false);

  return (
    <>
      {isFilled ? (
        <button
          className="text-white font-bold"
          onClick={() => setIsFilled(false)}
        >
          <BsHeartFill className="inline-block fill-pink-600" />
        </button>
      ) : (
        <button
          className="text-pink-500 font-bold"
          onClick={() => setIsFilled(true)}
        >
          {!isFilled && <BsHeart className="inline-block" />}
        </button>
      )}
    </>
  );
}

export default LikeButton;