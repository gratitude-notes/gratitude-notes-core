const data =
[{
    time: 'February 21, 2023 11:20:09 PM',
    score: 5
}]

interface Point {
  time: string,
  score: number
}

const SECONDS_IN_DAY = 86400;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

const MIN_SCORE = -5;
const MAX_SCORE = 5;

const MIN_SCALE = 0;
const MAX_SCALE = 100;

const DayCardPoint: React.FC<Point> = ({ time, score }) => {
  
  // parse time
  const timeObj = new Date(time);

  const hours = timeObj.getHours();
  const minutes = timeObj.getMinutes();
  const seconds = timeObj.getSeconds();

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
    height: '10px',
    width: '10px'
  } as React.CSSProperties

  return (
    <div style={style}></div>
  );
}

const DayCard: React.FC = () => {

  const dateData = data[0].time.split(' ')[1].replace(',','');
  const timeData = data[0].time;
  const scoreData = data[0].score;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>{dateData}</h1>

      <div style={styles.pointsContainer}> 
        <DayCardPoint time={timeData} score={scoreData}/>
      </div>
      

    </div>
  );
}

export default DayCard;

const styles = {
  container: {
    width: '100%',
    height: '100%',
    border: '5px solid red',
    padding: '3rem'
  } as React.CSSProperties,
  pointsContainer: {
    border: '5px solid green',
    width: '100%',
    height: '100%'
  } as React.CSSProperties,
  header: {
    margin: 0,
    padding: 0,
    position: 'fixed',
    top: '1rem',
    right: '1rem',
    border: '5px solid blue',
  } as React.CSSProperties
}