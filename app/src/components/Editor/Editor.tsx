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
import useComponentVisible from '../../hooks/useComponentVisible';

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

    // DROPDOWN CONTROL
    const { ref, isComponentVisible, setComponentVisible } = useComponentVisible(false);    

    const handleDropdown = () => {
        (isComponentVisible) ? setComponentVisible(false) : setComponentVisible(true);
    }

    const dropdownVisbile = (isComponentVisible) ? "visible" : "hidden";

    const [currentDropdown, setCurrentDropdown] = useState("Normal");

    const handleCurrentDropdown = (item: string) => {
        setCurrentDropdown(item);
    }

    const renderIcon = () => {
        switch(currentDropdown) {
            case "Normal": return <BsTextParagraph size={25}/>;
            case "Heading 1": return <BiHeading size={25}/>;
            case "Heading 2": return <BiHeading size={25}/>;
            case "Bullet List": return <RiListUnordered size={25}/>;
        }
    }

    return (
        <div ref={ref} className="relative flex justify-center items-center cursor-pointer text-black dark:text-white
                                hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in">
            <div onClick={handleDropdown} className="flex gap-2 p-1">   
                {renderIcon()}
                <span>{currentDropdown}</span>
                <BiChevronDown size={25}/>
            </div>

            {/* Dropdown Menu */}
            <div className={`${dropdownVisbile} absolute top-full w-52 left-0 z-50`}>
                <div className="flex flex-col gap-1 bg-white dark:bg-gray-800 rounded-md pt-1 text-black dark:text-white shadow-lg shadow-gray-900">
                    <div onClick={() => {formatParagraph(); handleDropdown(); handleCurrentDropdown("Normal");}}
                        className="flex gap-2 cursor-pointer p-2
                                    hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in">
                        <BsTextParagraph size={25}/>
                        <span>Normal</span>
                    </div>
                    <div onClick={() => {formatHeading('h1'); handleDropdown(); handleCurrentDropdown("Heading 1")}}
                        className="flex gap-2 cursor-pointer p-2
                                    hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in">
                        <BiHeading size={25}/>
                        <span>Heading 1</span>
                    </div>
                    <div onClick={() => {formatHeading('h2'); handleDropdown(); handleCurrentDropdown("Heading 2")}}
                        className="flex gap-2 cursor-pointer p-2
                                    hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in">
                        <BiHeading size={25}/>
                        <span>Heading 2</span>
                    </div>
                    <div onClick={() => {formatBulletList(); handleDropdown(); handleCurrentDropdown("Bullet List")}}
                        className="flex gap-2 cursor-pointer p-2
                                    hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in">
                        <RiListUnordered size={25}/>
                        <span>Bullet List</span>
                    </div>
                </div>
            </div>

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
        <div className="flex gap-2 justify-center">
            <button
                disabled={!canUndo}
                className={clsx(
                    "hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in",
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
                    "hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in",
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

            <BlockFormatPane
                blockType={blockType}
                editor={editor}
            />

            {/* DIVIDER */}
            <div className="bg-black dark:bg-white w-[0.5px]"></div>

            <button 
                className={clsx(
                    "hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in",
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
                    "hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in",
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
                    "hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in",
                    isUnderline ? 'bg-gray-300 dark:bg-gray-600' : 'bg-transparent'
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
                },
                list: {
                    ul: "ml-4 list-disc text-black dark:text-white",
                    listitem: "mt-1 mb-1 ml-6 mr-6"
                },
                heading: {
                    h1: "text-4xl text-black dark:text-white",
                    h2: "text-2xl text-black dark:text-white"
                }
            },
            nodes: [ListNode, ListItemNode, HeadingNode, OverflowNode],
            onError(error: Error) {
                throw error;
            },
        }

        return (
            <div className="h-full bg-white dark:bg-gray-800">
                <LexicalComposer {...{initialConfig}}>
                    {/* EDITOR */}
                    <div className="h-full flex flex-col px-4">
                        <div className="h-[7.5%]">
                            <Toolbar />
                        </div>
                        {/* EDITOR INNER */}
                        <div className="h-[85%] relative">
                            <RichTextPlugin 
                                contentEditable={
                                    <ContentEditable className="h-full overflow-y-scroll outline-none mt-4
                                                                scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700" />
                                }
                                placeholder={
                                    <div className="absolute top-4 left-0 text-gray-400 pointer-events-none">
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