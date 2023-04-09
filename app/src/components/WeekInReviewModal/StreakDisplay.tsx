import { useEffect, useState } from 'react';
import useUserBullets from '../../hooks/useUserBullets';

const StreakDisplay: React.FC = () => {

  const [imageCount, setImageCount] = useState(0);
  const [positions, setPositions] = useState<Position[]>([]);
  const userBullets = useUserBullets();
  const lastBullet = userBullets.bullets && userBullets.bullets.length > 0 ? userBullets.bullets[0] : null;
  const lastConsecitiveDays: number = (lastBullet?.consecutiveDays ?? 0);

  //const totalImages: number = compareTimestamps(currentNoteTimestamp, lastNoteTimestamp);
  const totalImages = 1000;

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

  type Position = {
    top: number;
    left: number;
  };


    function getRandomPosition() {
      const top = Math.random() * (window.innerHeight - 300);
      const left = Math.random() * (window.innerWidth - 300);
  
      return { top, left };
    }

    useEffect(() => {
      if (imageCount < totalImages) {
        const timer = setTimeout(() => {
          setImageCount((prevCount) => prevCount + 1);
          setPositions((prevPositions: Position[]) => [
            ...prevPositions,
            getRandomPosition(),
          ]);
        }, 200);

        // Clean up the timer on unmount
        return () => clearTimeout(timer);
      }
    }, [imageCount]);

  return (
    <div style={{ position: 'relative', width: '50%', height: '100%' }}>
      {positions.map((position, index) => (
         <div
         key={index}
         style={{
           position: 'absolute',
           top: position.top,
           left: position.left,
           fontSize: '2rem', // Adjust the size of the emoji
         }}
       >
         😊
       </div>
      ))}
    </div>
  );
}

export default StreakDisplay;
