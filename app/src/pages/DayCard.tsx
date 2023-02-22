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
      "time": "8:15:00 AM",
      "score": -2
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

  let normalizePointY = (score - (MIN_SCORE)) / ((MAX_SCORE) - (MIN_SCORE))
  normalizePointY = (normalizePointY * 100)

  // reverse scale of pointY
  const reversePointY = (MIN_SCALE - normalizePointY + MAX_SCALE).toString()  // score

  const style = {
    position: 'relative',
    left: pointX.concat('%'),
    top: reversePointY.concat('%'),
    backgroundColor: 'blue',
    height: '0.5rem',
    width: '0.5rem',
    borderRadius: '0.5rem'
  } as React.CSSProperties

  return (
    <div style={style}></div>
  );
}

const DayCard: React.FC = () => {

  const date = data.date;

  return (
    <div style={styles.layout}>
      <h1 style={styles.dayDate}>{date.split(" ")[1].replace(',', '')}</h1>
      <div style={styles.dayPoints}>
        {data.noteData.map((singleNoteData, key) => {
          return (
            <DayCardPoint key={key} date={date} time={singleNoteData.time} score={singleNoteData.score} />
          );
        })}
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default DayCard;

const styles = {
  layout: {
    display: 'grid',
    grid:
      `". . dayDate" 1fr
      ". dayPoints ." 11fr
      ". . ." 1fr
      / 1fr 24fr 1fr`,
    gap: '1px',
    height: '100%',
    border: '5px solid red'
  } as React.CSSProperties,
  dayDate: {
    gridArea: 'dayDate',
    paddingRight: '1rem'
  } as React.CSSProperties,
  dayPoints: {
    gridArea: 'dayPoints'
  } as React.CSSProperties
}