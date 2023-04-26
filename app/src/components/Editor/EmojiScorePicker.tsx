import SadEmoji from '../../assets/emojis/sad_emoji.png';
import SlightlySadEmoji from '../../assets/emojis/slightly_sad_emoji.png';
import NeutralEmoji from '../../assets/emojis/neutral_emoji.png';
import SlightlyHappyEmoji from '../../assets/emojis/slightly_happy_emoji.png';
import HappyEmoji from '../../assets/emojis/happy_emoji.png';
import { useState } from 'react';
import React from 'react';

type EmojiScorePickerProps = {
    getEmojiScore: (score: number) => void;
};

const EmojiScorePicker: React.FC<EmojiScorePickerProps> = ({ getEmojiScore }) => {
    const [emojiScore, setEmojiScore] = useState<number | null>(null);

    const handleEmojiClick = (score: number) => {
        if (emojiScore !== score) {
            setEmojiScore(score);
            getEmojiScore(score);
        }
    };

    return (
        <div className="flex gap-2 justify-center mt-2">
            <div
                onClick={() => handleEmojiClick(-2)}
                className={`${emojiScore === -2 ? 'opacity-100' : 'opacity-20'} aspect-square cursor-pointer`}
            >
                <img className="w-[30px] mx-auto" src={SadEmoji} alt="sad emoji..." />
                <h1 className={`${emojiScore === -2 ? 'opacity-100' : 'opacity-0'} text-xs text-center`}>Sad</h1>
            </div>
            <div
                onClick={() => handleEmojiClick(-1)}
                className={`${emojiScore === -1 ? 'opacity-100' : 'opacity-20'} aspect-square cursor-pointer`}
            >
                <img className="w-[30px] mx-auto" src={SlightlySadEmoji} alt="slightly sad emoji..." />
                <h1 className={`${emojiScore === -1 ? 'opacity-100' : 'opacity-0'} text-xs text-center`}>
                    Slightly
                    <br />
                    Sad
                </h1>
            </div>
            <div
                onClick={() => handleEmojiClick(0)}
                className={`${emojiScore === 0 ? 'opacity-100' : 'opacity-20'} aspect-square cursor-pointer`}
            >
                <img className="w-[30px] mx-auto" src={NeutralEmoji} alt="neutral emoji..." />
                <h1 className={`${emojiScore === 0 ? 'opacity-100' : 'opacity-0'} text-xs text-center`}>Neutral</h1>
            </div>
            <div
                onClick={() => handleEmojiClick(1)}
                className={`${emojiScore === 1 ? 'opacity-100' : 'opacity-20'} aspect-square cursor-pointer`}
            >
                <img className="w-[30px] mx-auto" src={SlightlyHappyEmoji} alt="slightly happy emoji..." />
                <h1 className={`${emojiScore === 1 ? 'opacity-100' : 'opacity-0'} text-xs text-center`}>
                    Slightly
                    <br />
                    Happy
                </h1>
            </div>
            <div
                onClick={() => handleEmojiClick(2)}
                className={`${emojiScore === 2 ? 'opacity-100' : 'opacity-20'} aspect-square cursor-pointer`}
            >
                <img className="w-[30px] mx-auto" src={HappyEmoji} alt="happy emoji..." />
                <h1 className={`${emojiScore === 2 ? 'opacity-100' : 'opacity-0'} text-xs text-center`}>Happy</h1>
            </div>
        </div>
    );
};

export default EmojiScorePicker;
