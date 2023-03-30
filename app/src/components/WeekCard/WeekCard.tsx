import DayCard from "./DayCard";
import { Timestamp } from "@firebase/firestore";
import dayjs from "dayjs";
import useComponentVisible from "../../hooks/useComponentVisible";
import { RiTimeLine } from "react-icons/ri";
import { useState } from "react";

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



type CalendarBullet = {
    score: number,
    timestamp: Timestamp
}

const WeekCard: React.FC = () => {
    // const { notes } = useNoteData();
    // let calendarBullets: CalendarBullet[] = [];

    // if (notes) {
    //     calendarBullets = notes.map((noteBullet) => {
    //         return {
    //           score: noteBullet.score,
    //           timestamp: noteBullet.timestamp
    //         }
    //     })
    // }

    // console.log(calendarBullets);

    let weekCardDates: number[] = [];

    for(let i = 0; i < 7; i++) {
        let temp = dayjs().startOf('week').add(i, 'days');
        weekCardDates.push(temp.date());
    }

    const infoVisible = useComponentVisible(false);
    const infoDisplayStatus = (infoVisible.isComponentVisible) ? "visible" : "invisible";
    const [infoTime, setInfoTime] = useState("");
    const [infoScore, setInfoScore] = useState(-100);

    const handleMouseOn = (time: string, score: number) => {
        setInfoTime(time);
        setInfoScore(score);
        infoVisible.setComponentVisible(true);
    }

    const handleMouseOut = () => {
        infoVisible.setComponentVisible(false);
        setInfoTime("");
        setInfoScore(-100);
    }
    
    return (
        <div ref={infoVisible.ref} className="mt-4 mb-6 flex flex-col">
            {/* WEEKCARD */}
            <div className="flex flex-row overflow-x-scroll justify-center
                            md:scrollbar-none
                            scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
                {data.map((singleDayData, key) => {
                    return (
                        <DayCard key={key} date={singleDayData.date} noteData={singleDayData.noteData}
                                handleMouseOn={handleMouseOn} handleMouseOut={handleMouseOut}/>
                    );
                })}
            </div>

            {/* DAYCARD POINT INFORMATION */}
            <div className={`${infoDisplayStatus} flex h-fit w-fit mx-auto text-black dark:text-white`}>
                <h1>Info time: {infoTime} | Info score: {infoScore}</h1>
            </div>

        </div>
    );
}

export default WeekCard;