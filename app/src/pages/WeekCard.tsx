import DayCard from "./DayCard";

const data = [
    {
        "date": "February 15, 2023",
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
        "date": "February 16, 2023",
        "noteData": [
        {
            "time": "9:15:00 AM",
            "score": 3
        },
        {
            "time": "12:30:45 PM",
            "score": -2
        },
        {
            "time": "6:00:00 PM",
            "score": 1
        },
        {
            "time": "11:59:59 PM",
            "score": 4
        },
        {
            "time": "10:30:45 PM",
            "score": 2
        }
        ]
    },
    {
        "date": "February 17, 2023",
        "noteData": [
        {
            "time": "8:00:00 AM",
            "score": 1
        },
        {
            "time": "10:30:15 AM",
            "score": -3
        },
        {
            "time": "2:45:00 PM",
            "score": 2
        },
        {
            "time": "7:15:30 PM",
            "score": 0
        },
        {
            "time": "11:59:59 PM",
            "score": 4
        }
        ]
    },
    {
        "date": "February 19, 2023",
        "noteData": [
        {
            "time": "9:00:00 AM",
            "score": 3
        },
        {
            "time": "12:30:15 PM",
            "score": -1
        },
        {
            "time": "4:45:00 PM",
            "score": 2
        },
        {
            "time": "8:15:30 PM",
            "score": 1
        },
        {
            "time": "11:59:59 PM",
            "score": 5
        }
        ]
    },
    {
        "date": "February 20, 2023",
        "noteData": [
        {
            "time": "9:30:00 AM",
            "score": 2
        },
        {
            "time": "12:00:45 PM",
            "score": -2
        },
        {
            "time": "3:15:00 PM",
            "score": 1
        },
        {
            "time": "7:00:15 PM",
            "score": 0
        },
        {
            "time": "11:59:59 PM",
            "score": 4
        }
        ]
    },
    {
        "date": "February 21, 2023",
        "noteData": [
        {
            "time": "8:45:00 AM",
            "score": 0
        },
        {
            "time": "12:15:30 PM",
            "score": -1
        },
        {
            "time": "4:30:00 PM",
            "score": 2
        },
        {
            "time": "9:00:45 PM",
            "score": 3
        },
        {
            "time": "7:00:15 PM",
            "score": 1
        }
        ]
    },
    {
        "date": "February 22, 2023",
        "noteData": [
        {
            "time": "10:00:00 AM",
            "score": 1
        },
        {
            "time": "12:30:45 PM",
            "score": -2
        },
        {
            "time": "3:45:00 PM",
            "score": 3
        },
        {
            "time": "7:15:30 PM",
            "score": 0
        },
        {
            "time": "11:59:59 PM",
            "score": 5
        }
        ]
    }
]


const WeekCard: React.FC = () => {
  
    console.log(data)
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
        height: '100%'
    } as React.CSSProperties,
    dayCard1: { gridArea: 'dayCard1' } as React.CSSProperties,
    dayCard2: { gridArea: 'dayCard2' } as React.CSSProperties,
    dayCard3: { gridArea: 'dayCard3' } as React.CSSProperties,
    dayCard4: { gridArea: 'dayCard4' } as React.CSSProperties,
    dayCard5: { gridArea: 'dayCard5' } as React.CSSProperties,
    dayCard6: { gridArea: 'dayCard6' } as React.CSSProperties,
    dayCard7: { gridArea: 'dayCard7' } as React.CSSProperties
}