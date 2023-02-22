import WeekCard from "./WeekCard";

const data = {
    "week1NoteData": [{
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
    }],
    "week2NoteData": [{
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
    }]
}


const MonthCard: React.FC = () => {
  
    return (
        <div style={styles.layout}>
            <div style={styles.calendarHeader}>1</div>
            <div style={styles.weekCard1}>2</div>
            <div style={styles.weekCard2}>3</div>
            <div style={styles.weekCard3}>4</div>
            <div style={styles.weekCard4}>5</div>
            <div style={styles.weekCard5}>6</div>
        </div>
    );
}
  
export default MonthCard;
  
const styles = {
    layout: {
        display: 'grid',
        grid:
          `"calendarHeader" 0.5fr
          "weekCard1" 1fr
          "weekCard2" 1fr
          "weekCard3" 1fr
          "weekCard4" 1fr
          "weekCard5" 1fr
          / 1fr`,
        gap: '1px',
        height: '100%',
        border: '5px solid yellow'
    } as React.CSSProperties,
        calendarHeader: { gridArea: 'calendarHeader' } as React.CSSProperties,
        weekCard1: { gridArea: 'weekCard1' } as React.CSSProperties,
        weekCard2: { gridArea: 'weekCard2' } as React.CSSProperties,
        weekCard3: { gridArea: 'weekCard3' } as React.CSSProperties,
        weekCard4: { gridArea: 'weekCard4' } as React.CSSProperties,
        weekCard5: { gridArea: 'weekCard5' } as React.CSSProperties
}