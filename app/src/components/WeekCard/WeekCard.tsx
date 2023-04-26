import DayCard from './DayCard';
import { Timestamp } from '@firebase/firestore';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import useUserBullets from '../../hooks/useUserBullets';

export type TFilterBullet = { score: number | null; timestamp: Timestamp };
export type TFilterBullets = TFilterBullet[] | undefined;

export type TWeekday = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
export type WeekdayBullets = {
    [key in TWeekday]: TFilterBullets;
};

const WeekCard: React.FC = () => {
    dayjs.extend(weekday);

    const { bullets } = useUserBullets('CurrentWeek');

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
        const bulletDay = dayjs(bullet.timestamp.toDate()).format('dddd') as TWeekday;
        acc[bulletDay]?.push(bullet);
        return acc;
    };

    filteredBullets?.reduce(accumulator, currentWeek);

    const handleDayClick = () => {
        // console.log("day clicked");
    };

    return (
        <div className={'my-2 flex flex-col transition-all duration-500'}>
            {/* WEEKCARD */}
            <div
                className="flex flex-row overflow-x-scroll md:justify-center
                            md:scrollbar-none
                            scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700"
            >
                {Object.keys(currentWeek).map((day, index) => {
                    const weekDate = dayjs().weekday(index).toDate();

                    return (
                        <DayCard
                            handleDayClick={handleDayClick}
                            key={`${weekDate.toString()}DayCard`}
                            dayNumber={weekDate.getDate()}
                            dayBullets={currentWeek[day as TWeekday]}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default WeekCard;
