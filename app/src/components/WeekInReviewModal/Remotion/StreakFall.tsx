import { random, AbsoluteFill } from "remotion";
import React, { useMemo } from "react";

import { Streak } from "./Streak";

const dropCount = 600;

export const StreakFall: React.FC = () => {
  const drops = useMemo(() => {
    return new Array(dropCount).fill(true).map((_, i) => {
      const x = random("x" + i) * 100 + "%";
      const delay = random("delay" + i) * 90;
      const size = random("size" + i) + 0.4;
      return { x, delay, size };
    });
  }, []);
  return (
    <AbsoluteFill>
      {drops.map((d) => {
        return <Streak x={d.x} delay={d.delay} size={d.size} />;
      })}
    </AbsoluteFill>
  );
};