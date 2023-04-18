import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type StarsForSequenceProps = {

}

const StarsForSequence: React.FC<StarsForSequenceProps> = ({}) => {
	return (
		<AbsoluteFill
            style={{
                rotate: "1rad",
            }}
            >
            <Explosion>
                    <Shrinking>
                        <Star />
                    </Shrinking>
            </Explosion>
        </AbsoluteFill>
	);
};

export default StarsForSequence;

const AMOUNT = 20;
 
const Explosion: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <AbsoluteFill>
      {new Array(AMOUNT).fill(true).map((_, i) => {
        return (
          <AbsoluteFill key={i}
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

  const Star: React.FC = () => {
    return (
      <AbsoluteFill
        style={{
          fontSize: 100,
          opacity: 0.5
        }}
      >
        ⭐
      </AbsoluteFill>
    );
  };