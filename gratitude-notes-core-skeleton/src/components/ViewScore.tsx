import React from "react";
import GaugeChart from "react-gauge-chart";

interface GaugeProps {
  value: number;
}

const Gauge: React.FC<GaugeProps> = ({ value }) => {
  const gaugeValue = (value + 5) / 10; // Scale the value from -5 to 5 to a value between 0 and 1 for the gauge chart
  const gaugeColor = gaugeValue < 0.5 ? "#FF4136" : gaugeValue < 0.8 ? "#FFDC00" : "#2ECC40"; // Set the color based on the value
  
  return (
    <div className="w-24 h-24">
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={30}
        colors={[gaugeColor]}
        arcWidth={0.3}
        percent={gaugeValue}
        needleColor="#333"
      />
      <p className="text-center text-sm font-medium text-gray-700">{value}</p>
    </div>
  );
};

export default Gauge;






      


