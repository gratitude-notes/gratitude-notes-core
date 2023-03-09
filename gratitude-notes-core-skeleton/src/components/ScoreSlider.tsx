import { useState } from 'react';

const Slider = () => {
    const [value, setValue] = useState(50);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(parseInt(event.target.value));
    };
  
    const tickCount = 5; // number of ticks
    const tickSpacing = 100 / (tickCount - 1); // spacing between ticks
    const tickLabels = ["0", "25", "50", "75", "100"]; // labels for ticks
  
    return (
      <div className="flex items-center space-x-4">
        <div className="flex-grow">
          <div className="relative w-full">
            {/* Track */}
            <div
              className="h-1 bg-gray-300 rounded-full"
              style={{ backgroundSize: `${tickSpacing}% 100%`, backgroundImage: `linear-gradient(to right, #2c5282, #2c5282 ${tickSpacing - 1}%, #cbd5e0 ${tickSpacing - 1}%, #cbd5e0 100%)` }}
            >
              {/* Ticks */}
              {Array(tickCount).fill(0).map((_, index) => (
                <span
                  key={index}
                  className="absolute w-1 h-2 bg-gray-300 rounded-full top-0.5"
                  style={{ left: `${index * tickSpacing}%` }}
                />
              ))}
            </div>
  
            {/* Knob */}
            <input
              type="range"
              className="absolute top-0 left-0 -ml-1 w-full h-full appearance-none cursor-pointer z-10 focus:outline-none"
              value={value}
              onChange={handleChange}
              min={0}
              max={100}
              step={1}
            />
          </div>
        </div>
  
        <div className="w-12 text-center">
          {tickLabels.map((label, index) => (
            <div key={index} className="text-xs" style={{ left: `${index * tickSpacing}%` }}>
              {label}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Slider;

