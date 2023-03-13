import React from "react";

interface GaugeProps {
  value: any;
}

const Gauge: React.FC<GaugeProps> = ({ value }) => {
  const percentage = ((value + 5) / 10) * 100;
  const radius = 50;
  const strokeWidth = 10;
  const centerX = 50;
  const centerY = 50;

  let color;
  if (value < 0) {
    color = "rgb(255, 0, 0)"; // red
  } else if (value < 3) {
    color = "rgb(255, 214, 51)"; // yellow
  } else {
    color = "rgb(38, 194, 129)"; // green
  }

  const needleRotation = (value + 5) / 10 * 180;

  return (
    <div className="w-64 h-64 relative">
      <svg viewBox="0 0 100 100" className="absolute">
        <circle
          r={radius}
          cx={centerX}
          cy={centerY}
          stroke="#eee"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          r={radius}
          cx={centerX}
          cy={centerY}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${percentage} ${100 - percentage}`}
          transform="rotate(-90 50 50)"
        />
        <line
          x1={centerX}
          y1={centerY - radius - strokeWidth / 2}
          x2={centerX}
          y2={centerY - radius - strokeWidth * 2}
          stroke="#000"
          strokeWidth={1}
          transform={`rotate(${needleRotation} ${centerX} ${centerY})`}
        />
        <circle
          r={strokeWidth * 1.5}
          cx={centerX}
          cy={centerY}
          fill="#000"
        />
      </svg>
      <span className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-3xl font-bold text-gray-800">
        {value}
      </span>
    </div>
  );
};

export default Gauge;
