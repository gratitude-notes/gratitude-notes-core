import React from 'react';
import {AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

type YelloweartsSequenceProps = {
    opacity: number
}

const YellowHeartsSequence: React.FC<YelloweartsSequenceProps> = ({ opacity }) => {
	return (
        <Move delay={0}>
            <Trail amount={10} extraOffset={0}>
                <AbsoluteFill style={{ transform: `translateY(-100px)` }}>
                    <Shrinking>
                        <YellowHeart opacity={opacity}/>
                    </Shrinking>
                </AbsoluteFill>
            </Trail>
        </Move>
	);
};

export default YellowHeartsSequence;

const Move: React.FC<{
  children: React.ReactNode;
  delay: number;
}> = ({ children, delay }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const down = spring({
    fps,
    frame: frame - delay,
    config: {
      damping: 200,
    },
    durationInFrames: 120,
  });

  const y = interpolate(down, [0, 2], [0, -600]);

  return (
    <AbsoluteFill
      style={{
        translate: `0 ${y}px`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

const Trail: React.FC<{
    amount: number;
    extraOffset: number;
    children: React.ReactNode;
  }> = ({ amount, extraOffset, children }) => {
    return (
      <AbsoluteFill>
        {new Array(amount).fill(true).map((a, i) => {
          return (
            <Sequence from={i * 10} key={i}>
              <AbsoluteFill
                style={{
                  translate: `0 ${-extraOffset}px`,
                }}
              >
                <Move delay={0}>
                  <AbsoluteFill
                    style={{
                      scale: String(1 - i / amount),
                    }}
                  >
                    {children}
                  </AbsoluteFill>
                </Move>
              </AbsoluteFill>
            </Sequence>
          );
        })}
      </AbsoluteFill>
    );
  };

const Shrinking: React.FC<{
    children: React.ReactNode;
  }> = ({ children }) => {
    const frame = useCurrentFrame();
  
    return (
      <AbsoluteFill
        style={{
          scale: String(
            interpolate(frame, [60, 90], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          ),
        }}
      >
        {children}
      </AbsoluteFill>
    );
};

const YellowHeart: React.FC<{opacity: number}> = ({opacity}) => {
    return (
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "start",
          top: '50%',
          opacity: opacity
        }}
      >
        💛
      </AbsoluteFill>
    );
};