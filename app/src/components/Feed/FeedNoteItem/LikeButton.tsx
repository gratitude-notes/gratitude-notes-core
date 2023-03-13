import { useState } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

const LikeButton: React.FC = () => {
  const [isFilled, setIsFilled] = useState(false);

  return (
    <>
      {isFilled ? (
        <button
          className="text-white font-bold py-2 px-4"
          onClick={() => setIsFilled(false)}
        >
          <BsHeartFill className="inline-block mr-2 fill-pink-600" />
        </button>
      ) : (
        <button
          className="text-pink-500 font-bold py-2 px-4"
          onClick={() => setIsFilled(true)}
        >
          {!isFilled && <BsHeart className="inline-block mr-2" />}
        </button>
      )}
    </>
  );
}

export default LikeButton;
