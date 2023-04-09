import { $getRoot, $getSelection, $isRangeSelection, EditorState, FORMAT_TEXT_COMMAND } from 'lexical';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { useCallback, useEffect, useState } from 'react';
import { mergeRegister } from '@lexical/utils';
import clsx from 'clsx';
import { FaBold, FaItalic } from 'react-icons/fa'

const onChange = (editorState: EditorState) => {
    editorState.read(() => {
        const root = $getRoot();
        const selection = $getSelection();
        
        console.log(root, selection);
    })
}

const Toolbar = () => {
    const [editor] = useLexicalComposerContext()
    const [isBold, setIsBold] = useState(false)
    const [isItalic, setIsItalic] = useState(false)

    const updateToolbar = useCallback(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
            setIsBold(selection.hasFormat('bold'))
            setIsItalic(selection.hasFormat('italic'))
        }
        
    }, [editor])

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({editorState}) => {
                editorState.read(() => {
                    updateToolbar()
                })
            })
        )
    }, [editor, updateToolbar])

    return (
        <div className="sticky z-50 h-10 w-fit left-1/2 transform -translate-x-1/2 px-2 py-2 bg-slate-200 rounded-lg mb-4 gap-x-2 flex items-center">
            <button 
                className={clsx(
                    "p-2 hover:bg-neutral-300 transition-colors duration-100 ease-in",
                    isBold ? 'bg-neutral-300' : 'bg-transparent'
                )}
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
                }}
            >
                <FaBold size={20} className="text-black"/>
            </button>
            <button 
                className={clsx(
                    "p-2 hover:bg-neutral-300 transition-colors duration-100 ease-in",
                    isItalic ? 'bg-neutral-300' : 'bg-transparent'
                )}
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
                }}
            >
                <FaItalic size={20} className="text-black"/>
            </button>
        </div>
    )
}

const Editor: React.FC = () => {

    const initialConfig = {
        namespace: "noteEditor",
        theme: {
            paragraph: "mb-1 text-blue-500" // Done for example purposes
        },
        onError(error: Error) {
            throw error;
        },
    }

    return (
        <div className="bg-white relative rounded-sm">
            <LexicalComposer {...{initialConfig}}>
                <Toolbar />
                <RichTextPlugin 
                    contentEditable={
                        <ContentEditable className="h-[450px] justify-center outline-none py-[15px] px-2.5 resize-none overflow-hidden text-ellipsis" />
                    }
                    placeholder={
                        <div className="absolute top-[70px] left-[10px] pointer-events-none select-none text-gray-500">
                            Write your thoughts here...
                        </div>
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <OnChangePlugin onChange={onChange}/>
                <HistoryPlugin />
            </LexicalComposer>
        </div>
    )
}

export default Editor;