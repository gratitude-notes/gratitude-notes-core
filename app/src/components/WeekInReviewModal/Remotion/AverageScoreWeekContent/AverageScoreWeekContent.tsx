import { useCurrentFrame, AbsoluteFill } from "remotion";


type AverageScoreWeekContentProps = {
}

export const AverageScoreWeekContent: React.FC<AverageScoreWeekContentProps> = ({  }) => {
    const frame = useCurrentFrame();


    return (
        <AbsoluteFill className="justify-center items-center">
            <div>
                In Average Score Week Content
            </div>
        </AbsoluteFill>
    );
};