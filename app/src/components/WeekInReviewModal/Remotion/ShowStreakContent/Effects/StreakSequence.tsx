import { useMemo } from 'react';
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import fire_gif from '../../../../../assets/fire_gif.gif';
import React from 'react';

const dropCount = 40;

const StreakSequence: React.FC = () => {
    const drops = useMemo(() => {
        return new Array(dropCount).fill(true).map((_, i) => {
            const x = random('x' + i) * 100 + '%';
            const delay = random('delay' + i) * 250;
            const size = random('size' + i) + 0.4;
            return { x, delay, size };
        });
    }, []);
    return (
        <AbsoluteFill>
            {drops.map((d, i) => {
                return <Streak key={i} x={d.x} delay={d.delay} size={d.size} />;
            })}
        </AbsoluteFill>
    );
};

export default StreakSequence;

const viewSize = 50;

const Streak: React.FC<{
    delay: number;
    x: string;
    size: number;
}> = ({ delay, x, size }) => {
    const { fps } = useVideoConfig();
    const frame = useCurrentFrame();

    const drop = spring({
        fps,
        frame: frame - delay,
        config: {
            damping: 100,
        },
    });

    const top = interpolate(drop, [0, 1], [-0.2, 1.1]);

    return (
        <img
            style={{
                width: 100,
                position: 'absolute',
                left: x,
                // top: top * 100 + "%",
                bottom: top * 100 + '%', // flip to come from bottom
                transform: `scale(${size})`,
            }}
            className="h-[100px]"
            src={fire_gif}
            alt="fire gif..."
        />
    );
};
