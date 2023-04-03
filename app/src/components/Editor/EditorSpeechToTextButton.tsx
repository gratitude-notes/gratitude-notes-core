import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import clsx from "clsx";
import { useState } from "react";
import { BiMicrophone } from "react-icons/bi";

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
                    <BiMicrophone size={20} className={clsx(!isSpeechToText ? "bg-black" : "bg-red-300")} />
                </button>
            }
        </div>
    )
}

export default SpeechToTextButton;