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
import { FaBold, FaItalic, FaRedo, FaUnderline, FaUndo } from 'react-icons/fa';
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
        <div className="sticky z-50 h-10 w-fit left-1/2 transform -translate-x-1/2 px-2 py-2 bg-slate-200 rounded-lg mb-4 gap-x-2 flex items-center">
            <button
                disabled={!canUndo}
                className={clsx(
                    "p-2 hover:bg-neutral-300 transition-colors duration-100 ease-in",
                    !canUndo ? "disabled: opacity-50 pointer-events-none" : ""
                )}
                onClick={() => {
                    editor.dispatchCommand(UNDO_COMMAND, undefined)
                }}
            >
                <FaUndo size={20} className="text-black"/>
            </button>
            <button
                disabled={!canRedo}
                className={clsx(
                    "p-2 hover:bg-neutral-300 transition-colors duration-100 ease-in",
                    !canRedo ? "disabled: opacity-50 pointer-events-none" : ""
                )}
                onClick={() => {
                    editor.dispatchCommand(REDO_COMMAND, undefined)
                }}
            >
                <FaRedo size={20} className="text-black"/>
            </button>
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
            <button 
                className={clsx(
                    "p-2 hover:bg-neutral-300 transition-colors duration-100 ease-in",
                    isUnderline ? 'bg-neutral-300' : 'bg-transparent'
                )}
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
                }}
            >
                <FaUnderline size={20} className="text-black"/>
            </button>
        </div>
    )
}

const Editor: React.FC = React.forwardRef((props: any, ref: any) => {
        const initialConfig = {
            namespace: "noteEditor",
            theme: {
                paragraph: "mb-1 text-green-500", // Done for example purposes
                text: {
                    underline: "underline",
                    bold: "font-semibold",
                    italic: "italic"
                }
            },
            nodes: [ListNode, ListItemNode, HeadingNode, OverflowNode],
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
                    {/* <EditorCapturePlugin {...{ref}} /> */}
                    <CharacterLimitPlugin charset={"UTF-8"} maxLength={300} />
                    <ListPlugin />
                    <HistoryPlugin />
                </LexicalComposer>
            </div>
        )
    }
)

export default Editor;