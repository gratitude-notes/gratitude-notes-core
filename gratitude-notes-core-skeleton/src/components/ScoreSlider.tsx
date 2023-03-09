import React, { useState } from 'react';
import { BsFillEmojiSmileFill, BsFillEmojiFrownFill } from 'react-icons/bs';

const Slider = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  const tickmarks = ['-5', '-2', '-1', '0', '1', '2', '3', '4', '5'];

  return (
    <div className="items-center">
    <div className="flex flex-col items-center relative">
      <div className="text-2xl text-gray-700 font-bold mb-2">{value}</div>
      <div className='absoulute top-0'>
        <input
          type="range"
          min="-5"
          max="5"
          value={value}
          onChange={handleChange}
          className="w-64 h-2 bg-pink-200 rounded-full appearance-none"
        />
      </div>
      <div className="absolute bottom-0 left-0">
        <BsFillEmojiSmileFill />
      </div>
      <div className="absolute bottom-0 right-0">
        <BsFillEmojiSmileFill />
      </div>
      <style>
        {`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 24px;
            height: 24px;
            background-color: #fff;
            border: 2px solid #ccc;
            border-radius: 50%;
            cursor: pointer;
          }
        `}
      </style>
    </div>
    </div>
  );
};

export default Slider;

