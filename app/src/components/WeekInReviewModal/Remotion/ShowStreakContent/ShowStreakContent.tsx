import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import StreakEmoji from "../../../assets/emojis/fire_emoji.png"
import { useState } from "react";
import { useEffect } from "react";
import { StreakFall } from "../StreakFall";


type ShowStreakContentProps = {
    streakCount: number | null | undefined,
}

export const ShowStreakContent: React.FC<ShowStreakContentProps> = ({ streakCount }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const { durationInFrames } = useVideoConfig();

    // Fade-in / Fade-out
    const opacityPastWeek = interpolate(
        frame,
        [0, 20, (durationInFrames / 2) - 20, (durationInFrames / 2)],
        // v--v---v----------------------v
        [0, 1, 1, 0]
    );

    // Fade-in
    // [(durationInFrames / 2), ( 2 * durationInFrames / 3)] * the fade-in will occur from half-way thru clip to 2/3 of way thru clip
    // [0, 1] * this is the range of values we expect for opacity
    const opacityLifetime = interpolate(frame, [(durationInFrames / 2), ( 2 * durationInFrames / 3)], [0, 1]);

    const [weeklyDosageVisible, setWeeklyDosageVisible] = useState(false);
    const [forVisible, setForVisible] = useState(false);
    const [firstDateVisible, setFirstDateVisible] = useState(false);
    const [toDateVisible, setToDateVisible] = useState(false);
    const [secondDateVisible, setSecondDateVisible] = useState(false);

    const [imageStyles, setImageStyles] = useState<Array<{ position: string, left: string, top: string }>>([]);


    useEffect(() => {
    const styles = [];
    for (let i = 0; i < 3; i++) {
        const randomLeft = Math.floor(Math.random() * 80) + 10;
        const randomTop = Math.floor(Math.random() * 80) + 10;
        const style = {
        position: 'absolute',
        left: `${randomLeft}%`,
        top: `${randomTop}%`,
        };
        styles.push(style);
    }
    setImageStyles(styles);
    }, []);

    useEffect(() => {
        if (frame >= 15) setWeeklyDosageVisible(true);  // 0.5 second from start of sequence
        if (frame >= 30) setForVisible(true);           // 1 second from start of sequence
        if (frame >= 60) setFirstDateVisible(true);     // 2 second from start of sequence
        if (frame >= 75) setToDateVisible(true);        // 2.5 second from start of sequence
        if (frame >= 90) setSecondDateVisible(true);    // 3 second from start of sequence
    }, [frame])




    const scale = spring({
        fps,
        frame,
    });

    return (
        <AbsoluteFill className="bg-white justify-center items-center">
            <h1 className="text-[100px]">You are on a </h1>
            <h1 className="text-[100px] text-red-500 flex justify-center items-center">{streakCount} day</h1>
            <h1 className="text-[80px] text-right pb-3"> steak</h1>
        </AbsoluteFill>
    );
};