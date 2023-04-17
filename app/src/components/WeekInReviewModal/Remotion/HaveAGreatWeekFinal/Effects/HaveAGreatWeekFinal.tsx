import { useCurrentFrame, AbsoluteFill } from "remotion";

type HaveAGreatWeekFinalProps = {
}

export const HaveAGreatWeekFinal: React.FC<HaveAGreatWeekFinalProps> = ({  }) => {
    const frame = useCurrentFrame();


    return (
        <AbsoluteFill className="justify-center items-center">
            <div>
                In Have a Great Week Final
            </div>
        </AbsoluteFill>
    );
};