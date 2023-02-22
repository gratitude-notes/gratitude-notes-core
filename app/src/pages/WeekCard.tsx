import DayCard from "./DayCard";

const data = [
    {
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
    },
    {
        "date": "February 23, 2023",
        "noteData": [
            {
                "time": "12:05:00 AM",
                "score": 3
            },
            {
                "time": "2:30:45 AM",
                "score": -2
            },
            {
                "time": "9:45:15 AM",
                "score": 4
            },
            {
                "time": "1:15:30 PM",
                "score": 1
            },
            {
                "time": "7:00:00 PM",
                "score": -4
            }
        ]
    }
]


const WeekCard: React.FC = () => {
  
    return (
        <div style={styles.layout}>
            {data.map((singleDayData, key) => {
                return (
                    <DayCard key={key} date={singleDayData.date} noteData={singleDayData.noteData} />
                );
            })}
        </div>
    );
}
  
export default WeekCard;
  
const styles = {
    layout: {
        display: 'grid',
        grid:
          `"dayCard1 dayCard2 dayCard3 dayCard4 dayCard5 dayCard6 dayCard7" 1fr
          / 1fr 1fr 1fr 1fr 1fr 1fr 1fr`,
        gap: '1px',
        height: '100%',
        border: '5px solid gren'
    } as React.CSSProperties,
    dayCard1: { gridArea: 'dayCard1' } as React.CSSProperties,
    dayCard2: { gridArea: 'dayCard2' } as React.CSSProperties,
    dayCard3: { gridArea: 'dayCard3' } as React.CSSProperties,
    dayCard4: { gridArea: 'dayCard4' } as React.CSSProperties,
    dayCard5: { gridArea: 'dayCard5' } as React.CSSProperties,
    dayCard6: { gridArea: 'dayCard6' } as React.CSSProperties,
    dayCard7: { gridArea: 'dayCard7' } as React.CSSProperties
}