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
  if (score >= -5 && score <= -2) return 'bg-red-600'  // red
  else if (score >= -1 && score <= 1) return 'bg-yellow-400'  // yellow
  else if (score >= 2 && score <= 5) return 'bg-green-500' // green
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

  const pointX = (totalSeconds / SECONDS_IN_DAY * 100).toString() // time
  const pointXStr = `left-[${Math.floor(Number(pointX))}%]`

  let normalizePointY = (score - (MIN_SCORE)) / ((MAX_SCORE) - (MIN_SCORE)) * 100

  // reverse scale of pointY
  const reversePointY = (MIN_SCALE - normalizePointY + MAX_SCALE).toString()  // score
  const reversePointYStr = `top-[${reversePointY}%]`

  console.log(pointXStr)
  console.log(reversePointYStr)

  // get background color
  let pointBackgroundColor = getPointBackgroundColor(score)

  // const style = {
  //   position: 'absolute',
  //   left: pointX.concat('%'),
  //   top: reversePointY.concat('%'),
  //   backgroundColor: `${pointColor}`,
  //   height: '7px',
  //   width: '7px',
  //   borderRadius: '100%',
  //   margin: '-3.5px',         // make sure this is half the size of radius and negative to ensure proper centering
  //   border: '1px solid black'
  // } as React.CSSProperties

  return (
    <div className={`absolute ${reversePointYStr} ${pointXStr} ${pointBackgroundColor} h-[7px] w-[7px] rounded-full -m-[3.5px] border-[1px] border-black`}></div>
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
    <div className="block min-w-[80px] max-w-[150px] p-[10px] border-[1px] border-black">
      <h1 className="text-right m-[0.1rem] text-[1rem]">{date.split(" ")[1].replace(',', '')}</h1>
      <div className="relative max-w-[100px] min-h-[80px] m-auto">
        {noteData.map((singleNoteData: { time: string, score: number }, key) => {
          console.log(singleNoteData)
          return (
            <DayCardPoint key={key} date={date} time={singleNoteData.time} score={singleNoteData.score} />
          );
        })}
      </div>
    </div>
  );
}

export default DayCard;

// const styles = {
//   layout: {
//     display: 'block',
//     minWidth: '80px',
//     maxWidth: '150px',
//     padding: '0 10px 10px 10px',
//     border: '1px solid black'
//   } as React.CSSProperties,
//   dayDate: {
//     textAlign: 'right',
//     margin: '0.1rem',
//     fontSize: '1rem'
//   } as React.CSSProperties,
//   dayPoints: {
//     position: 'relative',
//     maxWidth: '100px',
//     minHeight: '80px',
//     margin: 'auto'
//   } as React.CSSProperties
// }