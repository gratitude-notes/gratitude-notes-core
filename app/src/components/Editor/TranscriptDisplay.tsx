import React from 'react';

interface Props {
  transcript: string;
}

const TranscriptDisplay: React.FC<Props> = ({ transcript }) => {
  return (
    <p>{transcript}</p>
  );
};

export default TranscriptDisplay;