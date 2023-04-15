import { spring, useCurrentFrame, useVideoConfig } from "remotion";

type HelloUserIntroProps = {
    displayName: string | null | undefined,
}

export const HelloUserIntro: React.FC<HelloUserIntroProps> = ({ displayName }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const opacity = Math.min(1, frame / 60);

    const scale = spring({
        fps,
        frame,
    });

    return (
        <div className="flex flex-col gap-4 justify-center mx-auto text-center">
            <h1 className="text-[75px]">
                Hello,
            </h1>
            <h1 style={{ opacity: opacity, transform: `scale(${1.75*scale})` }}
                className="text-[75px] font-bold text-cyan-500">
                {displayName}
            </h1>
        </div>
    );
};