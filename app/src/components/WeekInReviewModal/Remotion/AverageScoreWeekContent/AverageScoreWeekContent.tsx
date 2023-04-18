import { useCurrentFrame, AbsoluteFill, useVideoConfig, interpolate, Sequence } from "remotion";
import { NoteBullet } from "../../../../hooks/useUserBullets";

import SadEmoji from "../../../../assets/emojis/sad_emoji.png";
import SlightlySadEmoji from "../../../../assets/emojis/slightly_sad_emoji.png";
import NeutralEmoji from "../../../../assets/emojis/neutral_emoji.png";
import SlightlyHappyEmoji from "../../../../assets/emojis/slightly_happy_emoji.png";
import HappyEmoji from "../../../../assets/emojis/happy_emoji.png";
import ProhibitedEmoji from "../../../../assets/emojis/prohibited_emoji.png";
import RedHeartsSequence from "./Effects/RedHeartsSequence";
import YellowHeartsSequence from "./Effects/YellowHeartsSequence";


type AverageScoreWeekContentProps = {
    scoreArray: NoteBullet[] | null;
}
export const AverageScoreWeekContent: React.FC<AverageScoreWeekContentProps> = ({ scoreArray }) => {
    const frame = useCurrentFrame();
    const { width } = useVideoConfig();
    const { durationInFrames } = useVideoConfig();

    const icons: Record<number, { icon: string }> = {
        "-2": {
            icon: SadEmoji,
        },
        "-1": {
            icon: SlightlySadEmoji,
        },
        "0": {
            icon: NeutralEmoji,
        },
        "1": {
            icon: SlightlyHappyEmoji,
        },
        "2": {
            icon: HappyEmoji,
        },
        "NaN": {
            icon: ProhibitedEmoji
        }
    };

    const results = scoreArray?.filter((bullet: NoteBullet) => bullet.score !== null);

    const sum = results?.reduce((acc: number, bullet: NoteBullet) => acc + bullet.score!, 0) ?? 0;
    const count = results?.length ?? 0;
    const average = sum / count;

    const normalizedScore = Math.round(average);

    const imgEmoji = icons[normalizedScore].icon;

    const rotate = interpolate(frame, [0, 1.5], [0, 2]) - 160;

    // Fade-in
    // [0, ( durationInFrames / 2)] * the fade-in will occur from start of clip thru 1/2 thru clip
    // [0, 1] * this is the range of values we expect for opacity
    const opacityTitle = interpolate(frame, [0, (durationInFrames / 2)], [0, 1]);

    // Fade-in
    // [0, ( 3 * durationInFrames / 4)] * the fade-in will occur from start of clip thru 3/4 way thru clip
    // [0, 1] * this is the range of values we expect for opacity
    const opacityEmoji = interpolate(frame, [0, ( 3 * durationInFrames / 4)], [0, 1]);

    // Fade-out
    // [0, durationInFrames] * the fade-out will occur from 0 to to whole way thru clip
    // [1, 0] * this is the range of values we expect for opacity
    const opacityHearts = interpolate(frame, [0, durationInFrames], [1, 0]);

    return (
        <AbsoluteFill className="bg-white justify-center items-center text-[100px]">
            <div style={{ opacity: opacityTitle, }}>
                This week you were
            </div>

            <div style={{
                    // position: "absolute",
                    // top: "65%",
                    // left: "50%",
                    // transform: "translate(-50%, -35%)",
                  }}>
                <img
                    src={imgEmoji}
                    alt="emoji..."
                    style={{
                        width: width / 3,
                        transform: `rotate(${rotate}deg)`,
                        opacity: opacityEmoji,
                    }}
                />
            </div>

            <Sequence>
                    <RedHeartsSequence opacity={opacityHearts}/>
                    <YellowHeartsSequence opacity={opacityHearts}/>
            </Sequence>
            
        </AbsoluteFill>
    );
};