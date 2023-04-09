import { useEffect, useState } from 'react';

const StreakDisplay: React.FC = () => {
  // function getRandomPosition() {
  //   const top = Math.random() * (window.innerHeight - 300);
  //   const left = Math.random() * (window.innerWidth - 300);

  //   return { top, left };
  // }

  type Position = {
    top: number;
    left: number;
  };

  // function StreakDisplay() {
    const [imageCount, setImageCount] = useState(0);
    const [positions, setPositions] = useState<Position[]>([]);
    const totalImages = 50;

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
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
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
