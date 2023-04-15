import DayCard from "./DayCard";
import { Timestamp } from "@firebase/firestore";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import useComponentVisible from "../../hooks/useComponentVisible";
import { useState } from "react";
import useUserBullets from "../../hooks/useUserBullets";

export type TFilterBullet = { score: number | null, timestamp: Timestamp };
export type TFilterBullets = TFilterBullet[] | undefined;

export type TWeekday = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
export type WeekdayBullets = {
    [key in TWeekday]: TFilterBullets;
};

const WeekCard: React.FC = () => {
    dayjs.extend(weekday);

    const { bullets } = useUserBullets("PastWeek");

    const filteredBullets: TFilterBullets = bullets?.map(({ score, timestamp }) => ({ score, timestamp }));

    const currentWeek: WeekdayBullets = {
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
    };

    const accumulator = (acc: WeekdayBullets, bullet: TFilterBullet) => {
        const bulletDay = dayjs(bullet.timestamp.toDate()).format("dddd") as TWeekday;
        acc[bulletDay]?.push(bullet);
        return acc;
    };

    filteredBullets?.reduce(accumulator, currentWeek);

    Object.keys(currentWeek).map((day, index) => {
        const weekDate = dayjs().weekday(index);
        const dayBullets = currentWeek[day as TWeekday];
        console.log(weekDate.toDate());
        console.log();
    });

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
                {
                    Object.keys(currentWeek).map((day, index) => {
                        const weekDate = dayjs().weekday(index).toDate();

                        return (
                            <DayCard
                                dayNumber={weekDate.getDate()}
                                dayBullets={currentWeek[day as TWeekday]}
                            />
                        )
                    })
                }
            </div>

            {/* DAYCARD POINT INFORMATION */}
            {/* <div className={`${infoDisplayStatus} flex h-fit items-center w-fit mx-auto text-black dark:text-white`}>
                <h1 className="font-semibold text-sm text-gray-400">Info time: {infoTime} | Info score: {(infoScore) ? infoScore : 'null'}</h1>
            </div> */}
        </div>
    );
}

export default WeekCard;