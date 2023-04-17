import { useCurrentFrame, AbsoluteFill, Sequence } from "remotion";
import { Timestamp } from '@firebase/firestore';
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import WEEKLY_DOSAGE_text from "../../../../assets/logo/WEEKLY_DOSAGE_text.png";
import Confetti from 'remotion-confetti';

type CurrentWeekIntroProps = {
}

export const CurrentWeekIntro: React.FC<CurrentWeekIntroProps> = ({  }) => {
    const frame = useCurrentFrame();
    
    const [weeklyDosageVisible, setWeeklyDosageVisible] = useState(false);
    const [forVisible, setForVisible] = useState(false);
    const [firstDateVisible, setFirstDateVisible] = useState(false);
    const [toDateVisible, setToDateVisible] = useState(false);
    const [secondDateVisible, setSecondDateVisible] = useState(false);

    useEffect(() => {
        if (frame >= 15) setWeeklyDosageVisible(true);  // 0.5 second from start of sequence
        if (frame >= 30) setForVisible(true);           // 1 second from start of sequence
        if (frame >= 60) setFirstDateVisible(true);     // 2 second from start of sequence
        if (frame >= 75) setToDateVisible(true);        // 2.5 second from start of sequence
        if (frame >= 90) setSecondDateVisible(true);    // 3 second from start of sequence
    }, [frame])

    const monthMap = new Map<Number, string>();
    monthMap.set(0, "January");
    monthMap.set(1, "February");
    monthMap.set(2, "March");
    monthMap.set(3, "April");
    monthMap.set(4, "May");
    monthMap.set(5, "June");
    monthMap.set(6, "July");
    monthMap.set(7, "August");
    monthMap.set(8, "September");
    monthMap.set(9, "October");
    monthMap.set(10, "November");
    monthMap.set(11, "December");

    const startOfWeek = Timestamp.fromDate(dayjs().startOf('week').subtract(1, 'week').toDate()).toDate()
    const endOfWeek = Timestamp.fromDate(dayjs().endOf('week').subtract(1, 'week').toDate()).toDate()

    const startOfWeekObj = {
        month: monthMap.get(startOfWeek.getMonth()),
        date: startOfWeek.getDate(),
        year: startOfWeek.getFullYear()
    }

    const endOfWeekObj = {
        month: monthMap.get(endOfWeek.getMonth()),
        date: endOfWeek.getDate(),
        year: endOfWeek.getFullYear()
    }

    const confettiConfig1 = {
	    particleCount: 200,
	    startVelocity: 30,
	    spread: 60,
	    x: 320,
	    y: 1000,
	    scalar: 1.5,
	};

	const confettiConfig2 = {
		particleCount: 200,
		startVelocity: 50,
		decay: 0.8,
		spread: 360,
		ticks: 100,
		gravity: 0.5,
		x: 850,
		y: 1300,
		scalar: 1.5
	};

    return (
        <AbsoluteFill className="justify-center items-center">
            <div className="flex flex-col justify-center mx-auto text-center">
                <h1 className="text-[75px]">
                    This is your
                </h1>
                <img className={`w-[1000px]
                                ${weeklyDosageVisible === false ? 'invisible' : 'visible'}`} 
                    src={WEEKLY_DOSAGE_text} alt="weekly dosage"/>
                <h1 className={`text-[75px]
                                ${forVisible === false ? 'invisible' : 'visible'}`}>
                    for
                </h1>
                <h1 className={`pt-6 font-bold text-[100px]
                                ${firstDateVisible === false ? 'invisible' : 'visible'}`}>
                    {startOfWeekObj.month} {startOfWeekObj.date}, {startOfWeekObj.year}
                </h1>
                <h1 className={`text-[75px]
                                ${toDateVisible === false ? 'invisible' : 'visible'}`}>
                    to
                </h1>
                <h1 className={`font-bold text-[100px]
                                ${secondDateVisible === false ? 'invisible' : 'visible'}`}>
                    {endOfWeekObj.month} {endOfWeekObj.date}, {endOfWeekObj.year}
                </h1>
            </div>

            {/* Drop confetti1 at 2 seconds */}
            <Sequence from={2 * 30}>
                <Confetti {...confettiConfig1} />
            </Sequence>     

            {/* Drop confetti2 at 3 seconds */}
            <Sequence from={3 * 30}>
                <Confetti {...confettiConfig2} />
            </Sequence>  
            
        </AbsoluteFill>
    );
};