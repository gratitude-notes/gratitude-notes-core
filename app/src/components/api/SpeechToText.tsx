import React, { useState, useEffect } from 'react';
import OpenAI from 'openai-whisper';

function SpeechToText() {
  const [transcription, setTranscription] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (isRecording) {
      OpenAI.start();
    } else {
      OpenAI.stop();
    }
  }, [isRecording]);

  OpenAI.onResult = (result: React.SetStateAction<string>) => {
    setTranscription(result);
  };

  return (
    <div>
      <h1>Speech to Text</h1>
      <button onClick={() => setIsRecording(!isRecording)}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <p>{transcription}</p>
    </div>
  );
}

export default SpeechToText;
