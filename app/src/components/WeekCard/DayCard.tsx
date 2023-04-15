import { Timestamp } from '@firebase/firestore';

// EXAMPLE OBJECT FOR SINGLE DAY
const data = {
    "date": "February 22, 2023",
    "noteData": [
      {
        "time": "11:59:00 PM",
        "score": 2
      },
      {
        "time": "1:45:30 AM",
        "score": 0
      },
      {
        "time": "12:15:00 AM",
        "score": -1
      },
      {
        "time": "3:00:15 PM",
        "score": 1
      },
      {
        "time": "9:30:45 PM",
        "score": 2
      }
    ]
  }
  
  const SECONDS_IN_DAY = 86400;
  const SECONDS_IN_HOUR = 3600;
  const SECONDS_IN_MINUTE = 60;
  
  const MIN_SCORE = -2;
  const MAX_SCORE = 2;
  
  const MIN_SCALE = 0;
  const MAX_SCALE = 100;
  
/**
 * Returns the Tailwind CSS background color class name corresponding to the given score.
 * If the score is null, returns a neutral gray color.
 * @param score - The score to map to a background color.
 * @returns The Tailwind CSS background color class name.
 */
const getPointBackgroundColor = (score: number | null): string => {
    // Define a mapping of scores to Tailwind CSS background color class names.
    const colorMap: Record<string, string> = {
      "-2": "bg-red-500",
      "-1": "bg-orange-500",
      "0": "bg-yellow-500",
      "1": "bg-green-500",
      "2": "bg-blue-500",
    };
  
    // Look up the background color class name for the given score.
    const color = colorMap[score?.toString() ?? ""];

    // If the color is null or an empty string, return a neutral gray color.
    return color ?? "bg-gray-300";
};  
  
  interface Point {
    timestamp: Timestamp
    score: number,
    handleMouseOn: (time: Timestamp, score: number) => void,
    handleMouseOut: () => void
  }
  
  const DayCardPoint: React.FC<Point> = ({ timestamp, score, handleMouseOn, handleMouseOut }) => {
    
    const dateObj = new Date(timestamp.toDate());
  
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();
  
    const totalSeconds = (hours * SECONDS_IN_HOUR) + (minutes * SECONDS_IN_MINUTE) + (seconds);
  
    const pointX = (totalSeconds / SECONDS_IN_DAY * 100).toFixed(0); // time
  
    let normalizePointY = (score - (MIN_SCORE)) / ((MAX_SCORE) - (MIN_SCORE)) * 100;
  
    // reverse scale of pointY
    const reversePointY = (MIN_SCALE - normalizePointY + MAX_SCALE).toFixed(0);  // score
    
    // get background color
    let pointBackgroundColor = getPointBackgroundColor(score);
  
    return (
      <div onMouseOver={() => handleMouseOn(timestamp, score)} onMouseOut={handleMouseOut} 
        className={`absolute left-${pointX}% top-${reversePointY}% ${pointBackgroundColor} h-[7px] w-[7px] rounded-full -m-[3.5px]`} />
    );
  }
  
  interface DayCardData {
    timestamp: Timestamp,
    noteData: {
      time: string,
      score: number
    }[],
    handleMouseOn: (timestamp: Timestamp, score: number) => void,
    handleMouseOut: () => void
  }
  
  const DayCard: React.FC<DayCardData> = ({ timestamp, noteData, handleMouseOn, handleMouseOut }) => {
  
    return (
      <div className="relative border border-gray-400">
        <h1 className="p-1 text-right text-sm dark:text-white">{"A"}</h1>
        <div className="relative mx-[6px] mb-1 w-20 h-16">
          <hr className="absolute top-50% left-0 right-0"/>
          {noteData.map((singleNoteData: { time: string, score: number }, key) => {
            return (
              <DayCardPoint key={key} timestamp={timestamp} score={singleNoteData.score}
                            handleMouseOn={handleMouseOn}
                            handleMouseOut={handleMouseOut} />
            );
          })}
        </div>
      </div>
    );
  }
  
  export default DayCard;