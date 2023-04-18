import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

type SlidingSequenceProps = {
  colorHeart: string,
  slidingDirection: string,
  position: string
}

const SlidingSequence: React.FC<SlidingSequenceProps> = ({ colorHeart, slidingDirection, position }) => {
  const { width, height, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();
  
  const contentWidth = width / 2; // Half the width of the video
  const progress = interpolate(frame, [0, durationInFrames], [0, 1]); // Animate for the durationInFrames
  
  const contentPosition = interpolate(
    progress,
    [0, 1],
    [-contentWidth, 0]
  );

  const trailCount = 15; // Number of trailing components
  const trailSpacing = contentWidth / ((trailCount + 1) * 1); // Spacing between the trailing components
  
  const trail = Array.from({ length: trailCount + 1 }, (_, index) => {
    const trailProgress = interpolate(frame, [0, durationInFrames], [0, 1]); // Animate for the first 30 frames
    const trailPosition = interpolate(
      trailProgress,
      [0, 1],
      [-contentWidth + trailSpacing * (index + 1) * 6, trailSpacing * (index + 1) * 6]
    );

    return (
      <div key={index}
          style={{ position: 'absolute',  
                  left: slidingDirection === "Right" ? trailPosition : "", 
                  right: slidingDirection === "Left" ? trailPosition : "" }}>
        <Heart colorHeart={colorHeart} />
      </div>
    );
  });

  return (
    <div className={`fixed ${position === "Bottom" ? "top-[92%]" : "top-0"}`}
      style={{ width, height }}>
      {trail}
      <div style={{ position: 'absolute', 
                  left: slidingDirection === "Right" ? contentPosition : "",
                  right: slidingDirection === "Left" ? contentPosition : "" }}>
        <Heart colorHeart={colorHeart} />
      </div>
    </div>
  );
};

export default SlidingSequence;

const Heart: React.FC<{colorHeart: string}> = ({ colorHeart }) => {
  return (
    <AbsoluteFill>
      {colorHeart === "Red" ? '❤️' : '💛'}
    </AbsoluteFill>
  );
};