import React, { useState } from 'react';


const SliderBar = () => {
  const [value, setValue] = useState(0);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value));
  };

  return (
    <div>
      <input type="range" min="-5" max="5" value={value} onChange={handleSliderChange} step="1" />
      <div>{value}</div>
    </div>
  );
};

export default SliderBar;