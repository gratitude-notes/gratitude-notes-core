import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { NoteBullet } from "../../../hooks/useUserBullets";

type ShowStreakContentProps = {

}

export const NumberNotesContent: React.FC<ShowStreakContentProps> = ({  }) => {
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


    const scale = spring({
        fps,
        frame,
    });

    return (
        <div className="flex flex-col justify-center mx-auto text-center">
            
        </div>
    );
};