import SadEmoji from "../../../assets/emojis/sad_emoji.png";
import SlightlySadEmoji from "../../../assets/emojis/slightly_sad_emoji.png";
import NeutralEmoji from "../../../assets/emojis/neutral_emoji.png";
import SlightlyHappyEmoji from "../../../assets/emojis/slightly_happy_emoji.png";
import HappyEmoji from "../../../assets/emojis/happy_emoji.png";

type EmojiScoreProps = {
    emojiScore: number | null;
}

const EmojiScore: React.FC<EmojiScoreProps> = ({emojiScore}) => {  

    switch (emojiScore) {
        case -2: {
            return (
                <div className="ml-auto">
                    <img className="w-[25px]" src={SadEmoji} alt="sad emoji..."/>
                </div>
            )
        }
        case -1: {
            return (
                <div className="ml-auto">
                    <img className="w-[25px]" src={SlightlySadEmoji} alt="slightly sad emoji..."/>
                </div>
            )
        }
        case 0: {
            return (
                <div className="ml-auto">
                    <img className="w-[25px]" src={NeutralEmoji} alt="neutral emoji..."/>
                </div>
            )
        }
        case 1: {
            return (
                <div className="ml-auto">
                    <img className="w-[25px]" src={SlightlyHappyEmoji} alt="slightly happy emoji..."/>
                </div>
            )
        }
        case 2: {
            return (
                <div className="ml-auto">
                    <img className="w-[25px]" src={HappyEmoji} alt="happy emoji..."/>
                </div>
            )
        }
        default: {
            return (
                <></>
            )
        }
    }
  }
  
  export default EmojiScore;