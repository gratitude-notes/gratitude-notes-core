import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from 'remotion';
import keyboard_typing from '../../../../assets/weekly_dosage/audio/keyboard_typing.wav';
import React from 'react';

const cursor: React.CSSProperties = {
    height: 130,
    width: 3,
    display: 'inline-block',
    backgroundColor: 'black',
    marginLeft: 4,
    marginTop: -4,
};

type HelloUserIntroProps = {
    displayName: string | null | undefined;
};

export const HelloUserIntro: React.FC<HelloUserIntroProps> = ({ displayName }) => {
    const frame = useCurrentFrame();
    const text = `${displayName}`;
    // A new character every 4 frames
    const charsShown = Math.floor(frame / 4);
    const textToShow = text.slice(0, charsShown);
    // Show the cursor while the text is typing, then start blinking
    const cursorShown = textToShow.length === text.length ? Math.floor(frame / 10) % 2 === 1 : true;

    // Determine the frame at which the word is fully typed
    const wordEndFrame = text.length * 4 + 10; // 10 extra frames for cursor blink

    return (
        <AbsoluteFill className="bg-white justify-center items-center">
            <div className="text-[100px]">Hello,</div>
            <div className="text-[125px] font-bold text-cyan-500">
                {textToShow}
                <span
                    style={{
                        ...cursor,
                        verticalAlign: 'middle',
                        opacity: Number(cursorShown),
                    }}
                />
            </div>
            {/* Set the end frame of the audio to the frame at which the word is fully typed */}
            <Audio src={staticFile(keyboard_typing)} endAt={wordEndFrame} />
        </AbsoluteFill>
    );
};
