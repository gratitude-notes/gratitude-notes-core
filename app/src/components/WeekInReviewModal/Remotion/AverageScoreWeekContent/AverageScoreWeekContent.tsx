import { useCurrentFrame, AbsoluteFill } from "remotion";
import { NoteBullet } from "../../../../hooks/useUserBullets";

import SadEmoji from "../../../../assets/emojis/sad_emoji.png";
import SlightlySadEmoji from "../../../../assets/emojis/slightly_sad_emoji.png";
import NeutralEmoji from "../../../../assets/emojis/neutral_emoji.png";
import SlightlyHappyEmoji from "../../../../assets/emojis/slightly_happy_emoji.png";
import HappyEmoji from "../../../../assets/emojis/happy_emoji.png";
import ProhibitedEmoji from "../../../../assets/emojis/prohibited_emoji.png";

import EmojiImg from "./Content/EmojiImg";
import YourText from "./Content/YourText";
import HappinessText from "./Content/HappinessText";

// type ShowStreakContentProps = {
//     streakCount: number | null | undefined,
// }

// export const ShowStreakContent: React.FC<ShowStreakContentProps> = ({ streakCount }) => {

type AverageScoreWeekContentProps = {
    scoreArray: NoteBullet[] | null;
}

export const AverageScoreWeekContent: React.FC<AverageScoreWeekContentProps> = ({  scoreArray  }) => {
    const frame = useCurrentFrame();

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

    // const results = scoreArray?.filter((bullet: NoteBullet) => {
    //     const bulletScore = bullet.score;
        const results = scoreArray?.filter((bullet: NoteBullet) => bullet.score !== null);

        const sum = results?.reduce((acc: number, bullet: NoteBullet) => acc + bullet.score!, 0) ?? 0;
        const count = results?.length ?? 0;
        const average = sum / count;
        //console.log(average)
        const normalizedScore = Math.round(average);
        //console.log(normalizedScore)

        const imgEmoji = icons[normalizedScore].icon;


    


    return (
        <AbsoluteFill className="justify-center items-center">
            <YourText></YourText>
            <EmojiImg emojiIcon={imgEmoji}></EmojiImg>
            <HappinessText></HappinessText>
            {/* <div>
                <img className="w-96" src={imgEmoji} alt="" />
            </div> */}
        </AbsoluteFill>
    );
};