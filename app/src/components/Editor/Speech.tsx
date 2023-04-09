import { MdKeyboardVoice } from "react-icons/md";
import { useEffect, useState } from 'react';
//api key: 

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
<<<<<<< Updated upstream
const SpeechGrammarList = (window as any).SpeechGrammarList || (window as any).webkitSpeechGrammarList;
const SpeechRecognitionEvent = (window as any).SpeechRecognitionEvent || (window as any).webkitSpeechRecognitionEvent;
const recognition = new SpeechRecognition();

const Speech: React.FC = () => {
=======
const recognition = new SpeechRecognition();

interface SpeechProps {
  onTranscript: (transcript: string) => void;
  onStart: () => void;
}

const Speech: React.FC<SpeechProps> = ({ onTranscript, onStart }) => {
>>>>>>> Stashed changes
  
  const [transcript, setTranscript] = useState('');


  const handleStart = () => {
    recognition.start();
  };

  recognition.onresult = (event: { results: { transcript: any; }[][]; }) => {
    const currentTranscript = event.results[0][0].transcript;
    setTranscript(currentTranscript);
    console.log(transcript);
<<<<<<< Updated upstream
=======
    onTranscript(transcript);
>>>>>>> Stashed changes
  };

  recognition.onerror = (event: any) => {
    console.error('Speech recognition error:', event);
  };


<<<<<<< Updated upstream

  return (
    <>
      <MdKeyboardVoice onClick={handleStart}></MdKeyboardVoice>
=======
  return (
    <>
      <MdKeyboardVoice></MdKeyboardVoice>

      
>>>>>>> Stashed changes
    </>
  );
}

export default Speech;

