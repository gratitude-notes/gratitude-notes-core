import DayCard from "./DayCard";
import { Timestamp } from "@firebase/firestore";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import useComponentVisible from "../../hooks/useComponentVisible";
import { useState } from "react";
import useUserBullets from "../../hooks/useUserBullets";

const data = [
    {
        "date": "February 22, 2023",
        "noteData": [
          {
            "time": "11:59:00 PM",
            "score": 2
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
            "score": 1
          },
          {
            "time": "9:30:45 PM",
            "score": null
          }
        ]
    },
    {
        "date": "February 22, 2023",
        "noteData": [
          {
            "time": "11:59:00 PM",
            "score": 2
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
            "score": 1
          },
          {
            "time": "9:30:45 PM",
            "score": null
          }
        ]
    },
    {
        "date": "February 22, 2023",
        "noteData": [
          {
            "time": "11:59:00 PM",
            "score": 2
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
            "score": 1
          },
          {
            "time": "9:30:45 PM",
            "score": null
          }
        ]
    },
    {
        "date": "February 22, 2023",
        "noteData": [
          {
            "time": "11:59:00 PM",
            "score": 2
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
            "score": 1
          },
          {
            "time": "9:30:45 PM",
            "score": null
          }
        ]
    },
    {
        "date": "February 22, 2023",
        "noteData": [
          {
            "time": "11:59:00 PM",
            "score": 2
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
            "score": 1
          },
          {
            "time": "9:30:45 PM",
            "score": null
          }
        ]
    },
    {
        "date": "February 22, 2023",
        "noteData": [
          {
            "time": "11:59:00 PM",
            "score": 2
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
            "score": 1
          },
          {
            "time": "9:30:45 PM",
            "score": null
          }
        ]
    },
    {
        "date": "February 22, 2023",
        "noteData": [
          {
            "time": "11:59:00 PM",
            "score": 2
          },
          {
            "time": "1:45:30 AM",
            "score": 0
          },
          {
            "time": "12:15:00 AM",
            "score": -2
          },
          {
            "time": "3:00:15 PM",
            "score": 1
          },
          {
            "time": "9:30:45 PM",
            "score": null
          }
        ]
    },
    {
        "date": "February 22, 2023",
        "noteData": [
          {
            "time": "11:59:00 PM",
            "score": 2
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
            "score": 1
          },
          {
            "time": "9:30:45 PM",
            "score": null
          }
        ]
    },
]

const WeekCard: React.FC = () => {
  
    const { bullets } = useUserBullets("PastWeek");

    type TFilterBullet = {score: number | null, timestamp: Timestamp};
    type TFilterBullets = TFilterBullet[]  | undefined;

    const filteredBullets: TFilterBullets = bullets?.map(({score, timestamp}) => ({score, timestamp}));

    type Weekdays = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";

    type WeekdayBullets = {
        [key in Weekdays]: TFilterBullets;
    };

    const currentWeek: WeekdayBullets = {
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
    };

    dayjs.extend(weekday);

    const accumulator = (acc: WeekdayBullets, bullet: TFilterBullet) => {
        const bulletDay = dayjs(bullet.timestamp.toDate()).format("dddd") as Weekdays;
        acc[bulletDay]?.push(bullet);
        return acc;
    };

    filteredBullets?.reduce(accumulator, currentWeek);

    Object.keys(currentWeek).map((day, index) => {
      const weekDate = dayjs().weekday(index);
      console.log(weekDate.toDate());
      console.log(currentWeek[day as Weekdays]);
    });

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
        // <div ref={infoVisible.ref} className={`${isWeekCardVisible ? "visible opacity-100" : "invisible opacity-0"}
        //                                     my-2 flex flex-col transition-all duration-500`}>
        <div ref={infoVisible.ref} className={`my-2 flex flex-col transition-all duration-500`}>
            {/* WEEKCARD */}
            <div className="flex flex-row overflow-x-scroll md:justify-center
                            md:scrollbar-none
                            scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
                
            </div>

            {/* DAYCARD POINT INFORMATION */}
            {/* <div className={`${infoDisplayStatus} flex h-fit items-center w-fit mx-auto text-black dark:text-white`}>
                <h1 className="font-semibold text-sm text-gray-400">Info time: {infoTime} | Info score: {(infoScore) ? infoScore : 'null'}</h1>
            </div> */}
        </div>
    );
}

export default WeekCard;