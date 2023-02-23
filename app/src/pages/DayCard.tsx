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

// const POINT_COLORS = {
//   '5': 'green',
//   '4': 'green',
//   '3': 'green',
//   '2': 'yellow',
//   '1': 'yellow',
//   '0': 'yellow',
//   '-1': 'yellow',
//   '-2': 'yellow',
//   '-3': 'red',
//   '-4': 'red',
//   '-5': 'red'
// }

const getPointColor = (score: number) => {
  if (score >= -5 && score <= -2) return 'red'
  else if (score >= -1 && score <= 1) return 'yellow'
  else if (score >= 2 && score <= 5) return 'green'
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

  let normalizePointY = (score - (MIN_SCORE)) / ((MAX_SCORE) - (MIN_SCORE)) * 100

  // reverse scale of pointY
  const reversePointY = (MIN_SCALE - normalizePointY + MAX_SCALE).toString()  // score

  // get color
  let pointColor = getPointColor(score)

  const style = {
    position: 'absolute',
    left: pointX.concat('%'),
    top: reversePointY.concat('%'),
    backgroundColor: `${pointColor}`,
    height: '10px',
    width: '10px',
    borderRadius: '10px',
    margin: '-5px',         // make sure this is half the size of radius and negative to ensure proper centering
    border: '1px solid black'
  } as React.CSSProperties

  return (
    <div style={style}></div>
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
    <div style={styles.layout}>
      <h1 style={styles.dayDate}>{date.split(" ")[1].replace(',', '')}</h1>
      <div style={styles.dayPoints}>
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

const styles = {
  layout: {
    display: 'block',
    maxWidth: '150px',
    padding: '0 10px 10px 10px',
    border: '1px solid black'
  } as React.CSSProperties,
  dayDate: {
    textAlign: 'right',
    margin: '0.1rem',
    fontSize: '1rem'
  } as React.CSSProperties,
  dayPoints: {
    position: 'relative',
    maxWidth: '100px',
    minHeight: '100px',
    margin: 'auto'
  } as React.CSSProperties
}