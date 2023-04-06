import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useState } from "react";
import { BsMicMute, BsMicFill } from "react-icons/bs";
import Soundwave from "../../assets/Soundwave.gif";

import {
    SUPPORT_SPEECH_RECOGNITION,
    SPEECH_TO_TEXT_COMMAND
} from "./plugins/SpeechToTextPlugin"

const SpeechToTextButton: React.FC = () => {
    const [editor] = useLexicalComposerContext();
    const [isSpeechToText, setIsSpeechToText] = useState<boolean>(false);

    const toggleSpeechToText = () => {
        editor.dispatchCommand(SPEECH_TO_TEXT_COMMAND, !isSpeechToText);
        setIsSpeechToText(!isSpeechToText);
    }

    return (
        <div>
            {
                SUPPORT_SPEECH_RECOGNITION && 
                <button onClick={toggleSpeechToText}>
                    {(isSpeechToText) ?
                        <div className="relative">
                            <BsMicFill size={20}/>
                            <img className="absolute inset-0 opacity-75" src={Soundwave} alt="recording in progress..."/>
                        </div>
                    :
                        <BsMicMute size={20} /> }
                </button>
            }
        </div>
    )
}

export default SpeechToTextButton;