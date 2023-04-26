import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { NoteBullet } from '../../../../hooks/useUserBullets';
import { useEffect, useState } from 'react';
import React from 'react';

type ShowATopScoreNoteContentProps = {
    pastWeekBullets: NoteBullet[] | null;
};

export const ShowATopScoreNoteContent: React.FC<ShowATopScoreNoteContentProps> = ({ pastWeekBullets }) => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();
    const [randomNoteVisible, setRandomNoteVisible] = useState(false);
    const [randomTopScoredNote, setRandomTopScoredNote] = useState<NoteBullet | null>();
    const [truncatedTopScoredNoteContent, setTruncatedTopScoredNoteContent] =
        useState<string>('*No notes entered past week.');

    const getATopScoredNote = () => {
        const TOP_SCORE = 2;

        const results = pastWeekBullets?.filter((bullet: NoteBullet) => {
            const bulletScore = bullet.score;

            if (bulletScore === TOP_SCORE) return bullet;
        });

        if (results?.length) {
            const randomIndex = Math.floor(Math.random() * results.length);
            const randomNote = results[randomIndex];
            return randomNote;
        }

        // return null if no notes
        return null;
    };

    useEffect(() => {
        const note = getATopScoredNote();
        setRandomTopScoredNote(note);
    }, []);

    useEffect(() => {
        if (randomTopScoredNote != undefined) {
            const truncatedString =
                randomTopScoredNote.bulletTextContent.length > 100
                    ? randomTopScoredNote.bulletTextContent.slice(0, 100) + '...'
                    : randomTopScoredNote.bulletTextContent;
            setTruncatedTopScoredNoteContent(truncatedString);
        }
    }, [randomTopScoredNote]);

    // Fade-out
    // [0, ( durationInFrames / 2)] * the fade-out will occur from 0 to half way thru clio
    // [1, 0] * this is the range of values we expect for opacity
    const opacityTitle = interpolate(frame, [0, durationInFrames / 2], [1, 0]);

    // Fade-in
    // [(durationInFrames / 4), ( 2 * durationInFrames / 3)] * the fade-in will occur from half-way thru clip to 2/3 of way thru clip
    // [0, 1] * this is the range of values we expect for opacity
    const opacityContent = interpolate(frame, [durationInFrames / 4, (2 * durationInFrames) / 3], [0, 1]);

    useEffect(() => {
        if (frame >= 60) setRandomNoteVisible(true); // 2 second from start of sequence
    }, [frame]);

    return (
        <AbsoluteFill className="bg-white">
            <div className="flex flex-col gap-[100px] text-[100px]">
                <div style={{ opacity: opacityTitle }} className="pl-10">
                    <h1>Here is a snippet</h1>
                    <h1>
                        of one of your <strong>top scored</strong> notes
                    </h1>
                    <h1>this past week.</h1>
                </div>
                <h1
                    style={{ opacity: opacityContent }}
                    className={`pl-10 text-[75px] font-semi-bold
                                ${randomNoteVisible === false ? 'invisible' : 'visible'}`}
                >
                    {truncatedTopScoredNoteContent}
                </h1>
            </div>
        </AbsoluteFill>
    );
};
