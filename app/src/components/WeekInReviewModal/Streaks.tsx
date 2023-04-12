import React, { useEffect, useState } from 'react';
import StreakEmoji from "../../assets/emojis/fire_emoji.png";
import useProfileData from '../../hooks/useProfileData';
import { updateDoc, doc } from '@firebase/firestore';
import { fb_firestore } from '../../lib/Firebase';
import { useSession } from '../../lib/Session';


const Streaks: React.FC = () => {
  const session = useSession();
  const userStreaks = useProfileData();
  let streakCountDb: number = userStreaks?.streaks.streakCount ?? 0;
  const lastNoteTimestamp: number = userStreaks?.streaks.lastTimeStamp ?? 0;
  let [streakNumber, setStreakNumber] = useState<number>(streakCountDb);

  useEffect(() => {
    const checkTimestamp = (timestamp: number): boolean => {
      const dateToCheck = new Date(timestamp);
      const today = new Date();
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

      if (dateToCheck.getFullYear() === today.getFullYear() && dateToCheck.getMonth() === today.getMonth() && dateToCheck.getDate() === today.getDate()
      ) {
        return true;
      } else if ( dateToCheck.getFullYear() === yesterday.getFullYear() && dateToCheck.getMonth() === yesterday.getMonth() && dateToCheck.getDate() === yesterday.getDate() || lastNoteTimestamp === 0
      ) {
        return true;
      } else {
        return false;
      }
    };

    const timestampResult = checkTimestamp(lastNoteTimestamp);

    if (timestampResult === false) {
      setStreakNumber(0);
      if (session && session.user) {
        const docRef = doc(fb_firestore, "users", session.user.uid);
        updateDoc(docRef, {
          streaks: {
            streakCount: 0,
            lastTimeStamp: lastNoteTimestamp,
          },
        });
      }
    } else {
      setStreakNumber(streakCountDb);
    }
  }, [userStreaks, session]);

  return (
    <>
      {streakNumber > 0 ? (
        <div className="content-center items-center text-center flex dark:text-white">
          {streakNumber} <img className="w-[20px] ml-0" src={StreakEmoji} alt="" />  
        </div>
      ) : null}
    </>
  );
};

export default Streaks;