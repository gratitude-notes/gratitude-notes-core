import React from 'react';
import {AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

type DotsSecondHalfOfSequenceProps = {
  from: number,
  durationInFrames: number
}

const DotsSecondHalfOfSequence: React.FC<DotsSecondHalfOfSequenceProps> = ({from, durationInFrames}) => {
	return (
		<Explosion>
			<Trail amount={5} extraOffset={0}>
				<Shrinking>
					<Sequence from={from} durationInFrames={durationInFrames}>
						<Dot />
					</Sequence>
				</Shrinking>
			</Trail>
		</Explosion>
	);
};

export default DotsSecondHalfOfSequence;

const AMOUNT = 10;
 
const Explosion: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <AbsoluteFill>
      {new Array(AMOUNT).fill(true).map((_, i) => {
        return (
          <AbsoluteFill
            style={{
              rotate: (i / AMOUNT) * (2 * Math.PI) + "rad",
            }}
          >
            {children}
          </AbsoluteFill>
        );
      })}
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
            <Sequence from={i * 3}>
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
 
  const y = interpolate(down, [0, 1], [0, -400]);
 
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

const Dot: React.FC = () => {
    return (
      <AbsoluteFill
        style={{
          // justifyContent: "center",
          // alignItems: "center",
          top: "100px",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            height: 30,
            width: 30,
            borderRadius: 30 / 2,
            backgroundColor: "#00bcd4",
          }}
        />
      </AbsoluteFill>
    );
  };