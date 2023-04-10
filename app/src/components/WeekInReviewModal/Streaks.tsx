import React, { useRef } from 'react';
import { useState, useEffect } from "react";
import useUserBullets from '../../hooks/useUserBullets';


const Streaks: React.FC = () => {

  const userBullets = useUserBullets();
  const lastBullet = userBullets.bullets && userBullets.bullets.length > 0 ? userBullets.bullets[0] : null;
  const lastConsecitiveDays: number = (lastBullet?.consecutiveDays ?? 0);
  const lastNoteTimestamp: number = lastBullet?.lastNoteTimestamp ?? 0;
  const currentNoteTimestamp = Date.now();

  const streakNumber: number = compareTimestamps(currentNoteTimestamp, lastNoteTimestamp);

  function compareTimestamps(timestamp1: number, timestamp2: number): number {
    // Calculate the difference in time (milliseconds)
    const timeDiff = Math.abs(timestamp2 - timestamp1);
    // Convert the time difference to days
    const dayDiff = Math.round(timeDiff / (1000 * 60 * 60 * 24));

    if (dayDiff === 0) {
      return lastConsecitiveDays;
    } else if (dayDiff === 1) {
      return lastConsecitiveDays + 1;
    } else {
      return 1;
    }
  }


  return (
    <>
        <div className="content-center items-center text-center">
          <h2 className="content-center items-center text-center">Streaks</h2>
          <div className="content-center items-center text-center">
            <span role="img" aria-label="fire emoji" className='text-6xl content-center items-center text-center'>🔥</span>
            <p>{streakNumber} Day{streakNumber > 1 ? "s" : ""}</p>
          </div>
        </div>
    </>
  );
};

export default Streaks;