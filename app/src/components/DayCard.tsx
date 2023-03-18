// EXAMPLE OBJECT FOR SINGLE DAY
const data = {
  "date": "February 22, 2023",
  "noteData": [
    {
      "time": "11:59:00 PM",
      "score": 5
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
      "score": -3
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

const MIN_SCORE = -5;
const MAX_SCORE = 5;

const MIN_SCALE = 0;
const MAX_SCALE = 100;

const getPointBackgroundColor = (score: number) => {
  if (score >= -5 && score <= -2) return 'bg-red-400'  // red
  else if (score >= -1 && score <= 1) return 'bg-yellow-400'  // yellow
  else if (score >= 2 && score <= 5) return 'bg-green-400' // green
}

interface Point {
  date: string,
  time: string,
  score: number
}

const DayCardPoint: React.FC<Point> = ({ date, time, score }) => {

  // Give format like February 22, 2023 11:20:09 PM
  const dateTime = [date, time].join(" ");
  
  const dateObj = new Date(dateTime);

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

  const totalSeconds = (hours * SECONDS_IN_HOUR) + (minutes * SECONDS_IN_MINUTE) + (seconds);

  const pointX = (totalSeconds / SECONDS_IN_DAY * 100).toFixed(0); // time

  let normalizePointY = (score - (MIN_SCORE)) / ((MAX_SCORE) - (MIN_SCORE)) * 100

  // reverse scale of pointY
  const reversePointY = (MIN_SCALE - normalizePointY + MAX_SCALE).toFixed(0);  // score
  
  // get background color
  let pointBackgroundColor = getPointBackgroundColor(score)

  return (
    <div className={`absolute left-${pointX}% top-${reversePointY}% ${pointBackgroundColor} h-[7px] w-[7px] rounded-full -m-[3.5px]`}></div>
  );
}

interface DayCardData {
  date: string,
  noteData: {
    time: string,
    score: number
  }[]
}

const DayCard: React.FC<DayCardData> = ({date, noteData }) => {

  return (
    <div className="relative border border-gray-400">
      <h1 className="p-1 text-right text-sm dark:text-white">{date.split(" ")[1].replace(',', '')}</h1>
      <div className="relative mx-[6px] mb-1 w-20 h-16">
        <hr className="absolute top-50% left-0 right-0"/>
        {noteData.map((singleNoteData: { time: string, score: number }, key) => {
          return (
            <DayCardPoint key={key} date={date} time={singleNoteData.time} score={singleNoteData.score} />
          );
        })}
      </div>
    </div>
  );
}

export default DayCard;