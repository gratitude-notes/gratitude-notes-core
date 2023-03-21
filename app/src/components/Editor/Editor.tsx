import { $getSelection, $isRangeSelection, CAN_REDO_COMMAND, CAN_UNDO_COMMAND, COMMAND_PRIORITY_CRITICAL, FORMAT_TEXT_COMMAND, LexicalEditor, REDO_COMMAND, UNDO_COMMAND } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { ListItemNode, ListNode } from '@lexical/list';
import { OverflowNode } from '@lexical/overflow';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { useCallback, useEffect, useState } from 'react';
import { mergeRegister } from '@lexical/utils';
import clsx from 'clsx';
import { BiUndo, BiRedo } from 'react-icons/bi';
import { RiBold, RiItalic, RiUnderline } from 'react-icons/ri';
import React from 'react';

// TODO: Add types.
// const EditorCapturePlugin = React.forwardRef((props: any, ref: any) => {
//   const [editor] = useLexicalComposerContext();
  
//   useEffect(() => {
//     ref.current = editor;
//     return () => {
//       ref.current = null;
//     };
//   }, [editor, ref]);

//   return null;
// });

const Toolbar = () => {
    
    const [editor] = useLexicalComposerContext()
    const [isBold, setIsBold] = useState(false)
    const [isItalic, setIsItalic] = useState(false)
    const [isUnderline, setIsUnderline] = useState(false)
    const [canUndo, setCanUndo] = useState(false)
    const [canRedo, setCanRedo] = useState(false)
    

    const updateToolbar = useCallback(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
            setIsBold(selection.hasFormat('bold'))
            setIsItalic(selection.hasFormat('italic'))
            setIsUnderline(selection.hasFormat('underline'))
        }
        
    }, [editor])

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({editorState}) => {
                editorState.read(() => {
                    updateToolbar()
                })
            }),
            editor.registerCommand<boolean>(
                CAN_UNDO_COMMAND,
                (payload) => {
                    setCanUndo(payload);
                    return false;
                },
                COMMAND_PRIORITY_CRITICAL
            ),
            editor.registerCommand<boolean>(
                CAN_REDO_COMMAND,
                (payload) => {
                    setCanRedo(payload);
                    return false;
                },
                COMMAND_PRIORITY_CRITICAL
            ),
        );
    }, [editor, updateToolbar])

    return (
        <div className="flex gap-2 mx-auto">
            <button
                disabled={!canUndo}
                className={clsx(
                    "hover:bg-gray-400 rounded-md transition-colors duration-100 ease-in",
                    !canUndo ? "disabled: opacity-50 pointer-events-none" : ""
                )}
                onClick={() => {
                    editor.dispatchCommand(UNDO_COMMAND, undefined)
                }}
            >
                <BiUndo size={25} className="text-black dark:text-white"/>
            </button>
            <button
                disabled={!canRedo}
                className={clsx(
                    "hover:bg-gray-400 rounded-md transition-colors duration-100 ease-in",
                    !canRedo ? "disabled: opacity-50 pointer-events-none" : ""
                )}
                onClick={() => {
                    editor.dispatchCommand(REDO_COMMAND, undefined)
                }}
            >
                <BiRedo size={25} className="text-black dark:text-white"/>
            </button>
            
            {/* DIVIDER */}
            <div className="bg-black dark:bg-white w-[0.5px]"></div>

            <button 
                className={clsx(
                    "hover:bg-gray-400 rounded-md transition-colors duration-100 ease-in",
                    isBold ? 'bg-gray-400' : 'bg-transparent'
                )}
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
                }}
            >
                <RiBold size={25} className="text-black dark:text-white"/>
            </button>
            <button 
                className={clsx(
                    "hover:bg-gray-400 rounded-md transition-colors duration-100 ease-in",
                    isItalic ? 'bg-gray-400' : 'bg-transparent'
                )}
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
                }}
            >
                <RiItalic size={25} className="text-black dark:text-white"/>
            </button>
            <button 
                className={clsx(
                    "hover:bg-gray-400 rounded-md transition-colors duration-100 ease-in",
                    isUnderline ? 'bg-gray-400' : 'bg-transparent'
                )}
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
                }}
            >
                <RiUnderline size={25} className="text-black dark:text-white"/>
            </button>
        </div>
    )
}

const Editor: React.FC = React.forwardRef((props: any, ref: any) => {
        const initialConfig = {
            namespace: "noteEditor",
            theme: {
                paragraph: "text-black dark:text-white", // Change text color based on color theme
                text: {
                    underline: "underline",
                    bold: "font-bold",
                    italic: "italic"
                }
            },
            nodes: [ListNode, ListItemNode, HeadingNode, OverflowNode],
            onError(error: Error) {
                throw error;
            },
        }

        return (
            <div className="bg-white dark:bg-gray-800">
                <LexicalComposer {...{initialConfig}}>
                    {/* EDITOR */}
                    <div className="flex flex-col gap-2 px-4 py-2">
                        <Toolbar />
                        {/* EDITOR INNER */}
                        <div className="relative">
                            <RichTextPlugin 
                                contentEditable={
                                    <ContentEditable className="min-h-[100px] max-h-[255px] overflow-y-scroll outline-none
                                                                scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700" />
                                }
                                placeholder={
                                    <div className="absolute top-0 left-0 text-gray-400 pointer-events-none">
                                        Write your thoughts here...
                                    </div>
                                }
                                ErrorBoundary={LexicalErrorBoundary}
                            />
                            <hr />
                            <div className="text-black dark:text-white">
                                <span>Characters remaining </span><CharacterLimitPlugin charset={"UTF-8"} maxLength={300} />
                            </div>
                        </div>
                    </div>
                    {/* <EditorCapturePlugin {...{ref}} /> */}
                    <ListPlugin />
                    <HistoryPlugin />
                </LexicalComposer>
            </div>
        )
    }
)

export default Editor;