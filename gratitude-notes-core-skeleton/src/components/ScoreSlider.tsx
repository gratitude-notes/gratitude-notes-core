import React, { useState } from 'react';
import { BsFillEmojiSmileFill, BsFillEmojiFrownFill } from 'react-icons/bs';

const Slider = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  return (
    <div className="flex flex-col items-center relative">
      <input
        type="range"
        min="-5"
        max="5"
        value={value}
        onChange={handleChange}
        className="w-64 h-2 bg-gray-200 rounded-full appearance-none"
      />
      <div className="absolute top-0 left-0 p-2">
        <BsFillEmojiFrownFill />
      </div>
      <div className="absolute top-0 right-0 p-2">
        <BsFillEmojiSmileFill />
      </div>
      <div className="mt-2 text-gray-700">{value}</div>
    </div>
  );
};

export default Slider;

