import React, { useState } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { MdPadding } from 'react-icons/md';

// const LikeButton: React.FC = (outlineText, fillText) => {  
//   const [value, setValue] = useState<number>(0);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setValue(Number(event.target.value));
//   };


//     // function highlight(): React.MouseEventHandler<HTMLButtonElement>{
//     //     return(
            
//     //     )
//     // };
//     const [isFilled, setIsFilled] = useState(false);

//   return (

//     <div className="flex flex-col items-center relative pb-1" >
//         <button
//       className={`text-white font-bold py-2 px-4 rounded ${
//         isFilled ? "bg-pink-500" : "border-2 border-pink-500"
//       }`}
//       onClick={() => setIsFilled(!isFilled)}
//     >
//       {isFilled ? (
//         <>
//           <BsHeart className="inline-block mr-2" />
//           {fillText}
//         </>
//       ) : (
//         <>
//           <BsHeartFill className="inline-block mr-2" />
//           {outlineText}
//         </>
//       )}
//     </button>
      
//     </div>
//   );
// };
interface OutlineFillButtonProps {
    outlineText: string;
    fillText: string;
  }

function OutlineFillButton({ outlineText, fillText }: OutlineFillButtonProps) {
  const [isFilled, setIsFilled] = useState(false);

  return (
    <>
      {isFilled ? (
        <button
          className="text-white font-bold py-2 px-4"
          onClick={() => setIsFilled(false)}
        >
          <BsHeartFill className="inline-block mr-2 fill-pink-600" />
          {fillText}
        </button>
      ) : (
        <button
          className="text-pink-500 font-bold py-2 px-4"
          onClick={() => setIsFilled(true)}
        >
          {!isFilled && <BsHeart className="inline-block mr-2" />}
          {outlineText}
        </button>
      )}
    </>
  );
}

export default OutlineFillButton;
