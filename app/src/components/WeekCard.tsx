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
  
    return (
        <div>
            <div className="flex flex-row overflow-x-scroll">
                {data.map((singleDayData, key) => {
                    return (
                        <DayCard key={key} date={singleDayData.date} noteData={singleDayData.noteData} />
                    );
                })}
            </div>
        </div>
    );
}

export default WeekCard;