import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import StreakEmoji from "../../../assets/emojis/fire_emoji.png"
import { useState } from "react";
import { useEffect } from "react";
import { StreakFall } from "./Effects/StreakFall";
import animated_fire_gif from "../../../../assets/fire_gif.gif";
import StreakSequence from "./Effects/StreakSequence";


type ShowStreakContentProps = {
    streakCount: number | null | undefined,
}

export const ShowStreakContent: React.FC<ShowStreakContentProps> = ({ streakCount }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const { durationInFrames } = useVideoConfig();

    // Fade-in
    // [0, ( durationInFrames / 2)] * the fade-in will occur from start of clip to half-way thru clip
    // [0, 1] * this is the range of values we expect for opacity
    const opacityTitle = interpolate(frame, [0, ( durationInFrames / 2)], [0, 1]);

    // Fade-in
    // [( durationInFrames / 2), ( 2 * durationInFrames / 3)] * the fade-in will occur from half-way thru clip to 2/3 of way thru clip
    // [0, 1] * this is the range of values we expect for opacity
    const opacityContent = interpolate(frame, [( durationInFrames / 2), ( 2 * durationInFrames / 3)], [0, 1]);

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

    return (
        <AbsoluteFill className="bg-white justify-center items-center text-[100px]">
            {/* First 4 seconds */}
            <div className={`${frame >= 120 ? 'hidden' : 'visible'}`}>
                <div style={{ opacity: opacityTitle, }}
                    className="flex items-end justify-center">
                    <h1>You are on</h1>
                    <img className="h-[200px]" src={animated_fire_gif} alt="fire gif..." />
                </div>
                <div>
                    <h1 className={`${frame >= 60 ? 'visible' : 'invisible'} text-center`}>with a current streak of</h1>
                </div>
            </div>

            {/* Last 2 seconds */}
            <div className={`${frame >= 120 ? 'visible' : 'hidden'}`}>
                <h1 className="font-semibold">{streakCount} days!</h1>
            </div>

            <Sequence from={120}>
                <StreakSequence />
            </Sequence>
            
            {/* <h1 className="text-[100px] text-red-500 flex justify-center items-center">{streakCount} day</h1>
            <h1 className="text-[80px] text-right pb-3"> steak</h1> */}
        </AbsoluteFill>
    );
};