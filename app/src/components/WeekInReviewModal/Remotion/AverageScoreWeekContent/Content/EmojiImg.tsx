import { Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

const EmojiImg: React.FC<{ emojiIcon: string;}> = ({
  emojiIcon,
}) => {
  const frame = useCurrentFrame();

  const { width } = useVideoConfig();

  const rotate = interpolate(frame, [0, 0.5], [0, 2]);

  return (
    <div
      style={{
        position: "absolute",
        top: "35%",
        left: "50%",
        transform: "translate(-50%, -35%)",
      }}
    >
      <Img
        src={emojiIcon}
        alt="emoji"
        style={{
          width: width / 1,
          borderRadius: `${width / 2}%`,
          //border: `50px solid`,
          transform: `rotate(${rotate}deg)`,
        }}
      />
    </div>
  );
};

export default EmojiImg;