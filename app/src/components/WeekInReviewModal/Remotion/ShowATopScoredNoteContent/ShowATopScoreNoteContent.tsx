import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { NoteBullet } from "../../../../hooks/useUserBullets";
import { useEffect, useState } from "react";

type ShowATopScoreNoteContentProps = {
    pastWeekBullets: NoteBullet[] | null,
}

export const ShowATopScoreNoteContent: React.FC<ShowATopScoreNoteContentProps> = ({ pastWeekBullets }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const { durationInFrames } = useVideoConfig();
    const [randomNoteVisible, setRandomNoteVisible] = useState(false);
    const [randomTopScoredNote, setRandomTopScoredNote] = useState<NoteBullet | null>();

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
      }

    useEffect(() => {
      const note = getATopScoredNote();
      setRandomTopScoredNote(note);
    }, []);

    // Fade-in / Fade-out
    const opacityTitle = interpolate(
        frame,
        [0, 20, (durationInFrames) - 20, (durationInFrames)],
        // v--v---v----------------------v
        [0, 1, 1, 0]
    );

    // Fade-in
    // [(durationInFrames / 3), ( 2 * durationInFrames / 3)] * the fade-in will occur from half-way thru clip to 2/3 of way thru clip
    // [0, 1] * this is the range of values we expect for opacity
    const opacityContent = interpolate(frame, [(durationInFrames / 3), ( 2 * durationInFrames / 3)], [0, 1]);

    useEffect(() => {
        if (frame >= 60) setRandomNoteVisible(true);  // 2 second from start of sequence
    }, [frame])

    return (
        <AbsoluteFill className="bg-white">
            <div className="flex flex-col gap-20 text-[100px]">
                <div style={{ opacity: opacityTitle, }}
                    className="">
                    <h1>Here is a snippet</h1>
                    <h1>of one of your <strong>top scored</strong> notes</h1>
                    <h1>this past week.</h1>
                </div>
                <hr className={`border-4 border-gray-200
                                ${randomNoteVisible === false ? 'invisible' : 'visible'}`}/>
                <h1 style={{ opacity: opacityContent, }}
                    className={`text-center text-[75px] font-semi-bold
                                ${randomNoteVisible === false ? 'invisible' : 'visible'}`}>
                    
                    {randomTopScoredNote?.bulletTextContent}
                </h1>


            </div>
        </AbsoluteFill>
    );
};