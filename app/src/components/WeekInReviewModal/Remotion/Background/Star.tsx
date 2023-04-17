import React from "react";
import { AbsoluteFill } from "remotion";
 
export const Star: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontSize: 14,
      }}
    >
      ⭐
    </AbsoluteFill>
  );
};