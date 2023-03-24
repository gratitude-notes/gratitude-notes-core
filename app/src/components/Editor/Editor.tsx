import { $createParagraphNode, $getSelection, $isRangeSelection, CAN_REDO_COMMAND, CAN_UNDO_COMMAND, COMMAND_PRIORITY_CRITICAL, COMMAND_PRIORITY_LOW, EditorState, FORMAT_TEXT_COMMAND, LexicalEditor, REDO_COMMAND, UNDO_COMMAND, $isRootOrShadowRoot, NodeKey } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { $setBlocksType } from '@lexical/selection';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { HeadingNode, HeadingTagType, $createHeadingNode, $isHeadingNode } from '@lexical/rich-text';
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { $isListNode, INSERT_UNORDERED_LIST_COMMAND, ListItemNode, ListNode, REMOVE_LIST_COMMAND } from '@lexical/list';
import { OverflowNode } from '@lexical/overflow';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { useCallback, useEffect, useState } from 'react';
import { mergeRegister, $findMatchingParent, $getNearestNodeOfType } from '@lexical/utils';
import clsx from 'clsx';
import { BiUndo, BiRedo, BiChevronDown, BiHeading } from 'react-icons/bi';
import { RiBold, RiItalic, RiUnderline, RiListUnordered } from 'react-icons/ri';
import React from 'react';
import { BsTextParagraph } from 'react-icons/bs';

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

const blockTypeToBlockName = {
    bullet: 'Bulleted List',
    check: 'Check List',
    code: 'Code Block',
    h1: 'Heading 1',
    h2: 'Heading 2',
    h3: 'Heading 3',
    h4: 'Heading 4',
    h5: 'Heading 5',
    h6: 'Heading 6',
    number: 'Numbered List',
    paragraph: 'Normal',
    quote: 'Quote',
};

const BlockFormatPane = ({editor, blockType} : {editor: LexicalEditor, blockType: keyof typeof blockTypeToBlockName}): JSX.Element => {
    const formatParagraph = () => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createParagraphNode());
            }
        });
      };

    const formatHeading = (headingSize: HeadingTagType) => {
        if (blockType !== headingSize) {
          editor.update(() => {
            const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    $setBlocksType(selection, () => $createHeadingNode(headingSize));
                }
            });
        }
    };

    const formatBulletList = () => {
        if (blockType !== 'bullet') {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }
    };

    return (
        <div className="inline-flex">
            <button
                onClick={formatBulletList}
                className="flex flex-row justify-center items-center text-black dark:text-white hover:bg-gray-300 hover:dark:bg-gray-600 p-1 rounded-md transition-colors duration-100 ease-in"
            >
                <RiListUnordered size={25} className="mr-1"/>
            </button>
            <button
                onClick={() => {formatHeading('h1')}}
                className="flex flex-row justify-center items-center text-black dark:text-white hover:bg-gray-300 hover:dark:bg-gray-600 p-1 rounded-md transition-colors duration-100 ease-in"
            >
                <BiHeading size={25} className="mr-1"/>
            </button>
            <button
                onClick={formatParagraph}
                className="flex flex-row justify-center items-center text-black dark:text-white hover:bg-gray-300 hover:dark:bg-gray-600 p-1 rounded-md transition-colors duration-100 ease-in"
            >
                <BsTextParagraph size={25} className="mr-1"/>
            </button>
        </div>
    )
}

const Toolbar = () => {
    
    const [editor] = useLexicalComposerContext()
    const [isBold, setIsBold] = useState(false)
    const [isItalic, setIsItalic] = useState(false)
    const [isUnderline, setIsUnderline] = useState(false)
    const [canUndo, setCanUndo] = useState(false)
    const [canRedo, setCanRedo] = useState(false)
    const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(null);
    const [blockType, setBlockType] = useState<keyof typeof blockTypeToBlockName>('paragraph');
    

    const updateToolbar = useCallback(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {

            const anchorNode = selection.anchor.getNode();
            let element =
              anchorNode.getKey() === 'root'
                ? anchorNode
                : $findMatchingParent(anchorNode, (e) => {
                    const parent = e.getParent();
                    return parent !== null && $isRootOrShadowRoot(parent);
                  });

            if (element === null) {
                element = anchorNode.getTopLevelElementOrThrow();
            }

            const elementKey = element.getKey();
            const elementDOM = editor.getElementByKey

            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderline(selection.hasFormat('underline'));
            
            if (elementDOM !== null) {
                setSelectedElementKey(elementKey);
                if($isListNode(element)) {
                    const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode);
                    const type = parentList ? parentList.getListType() : element.getListType();
                    setBlockType(type);
                } else {
                    const type = $isHeadingNode(element) ? element.getTag() : element.getType();

                    if (type in blockTypeToBlockName) {
                        setBlockType(type as keyof typeof blockTypeToBlockName);
                    }
                }
            }
        }
        
    }, [editor])

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({editorState}) => {
                editorState.read(() => {
                    updateToolbar();
                });
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
            )
        );
    }, [editor, updateToolbar])

    return (
        <div className="flex gap-2 mx-auto">
            <button
                disabled={!canUndo}
                className={clsx(
                    "hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in p-0.5",
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
                    "hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in p-0.5",
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
                    "hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in p-0.5",
                    isBold ? 'bg-gray-300 dark:bg-gray-600' : 'bg-transparent'
                )}
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
                }}
            >
                <RiBold size={25} className="text-black dark:text-white"/>
            </button>
            <button 
                className={clsx(
                    "hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in p-0.5",
                    isItalic ? 'bg-gray-300 dark:bg-gray-600' : 'bg-transparent'
                )}
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
                }}
            >
                <RiItalic size={25} className="text-black dark:text-white"/>
            </button>
            <button 
                className={clsx(
                    "hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in p-0.5",
                    isUnderline ? 'bg-gray-300 dark:bg-gray-600' : 'bg-transparent'
                )}
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
                }}
            >
                <RiUnderline size={25} className="text-black dark:text-white"/>
            </button>
            
            {/* DIVIDER */}
            <div className="bg-black dark:bg-white w-[0.5px]"></div>

            <BlockFormatPane
                blockType={blockType}
                editor={editor}
            />

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
                },
                list: {
                    ul: "ml-4 list-disc text-black dark:text-white",
                    listitem: "mt-1 mb-1 ml-6 mr-6"
                },
                heading: {
                    h1: "text-4xl text-black dark:text-white",
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
                    <div className="flex flex-col gap-3 px-4 py-2">
                        <Toolbar />
                        {/* EDITOR INNER */}
                        <div className="relative">
                            <RichTextPlugin 
                                contentEditable={
                                    <ContentEditable className="min-h-[100px] max-h-[255px] overflow-y-scroll outline-none rounded-md p-1" />
                                }
                                placeholder={
                                    <div className="absolute top-0 left-0 text-gray-400 pointer-events-none p-1">
                                        Write your thoughts here...
                                    </div>
                                }
                                ErrorBoundary={LexicalErrorBoundary}
                            />
                            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-600"/>
                            <div className="absolute right-0 text-gray-400">
                                <CharacterLimitPlugin charset={"UTF-8"} maxLength={300} />
                            </div>
                        </div>
                    </div>
                    {/* <EditorCapturePlugin {...{ref}} /> */}
                    <ListPlugin />
                    <HistoryPlugin />
                    {/* <OnChangePlugin onChange={(editorState: EditorState, editor: LexicalEditor) => console.log(JSON.stringify(editor.getEditorState())) } /> */}
                </LexicalComposer>
            </div>
        )
    }
)

export default Editor;