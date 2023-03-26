import { $isListNode, ListNode } from "@lexical/list"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $isHeadingNode } from "@lexical/rich-text"
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils"
import clsx from "clsx"
import { NodeKey, $getSelection, $isRangeSelection, $isRootOrShadowRoot, CAN_UNDO_COMMAND, COMMAND_PRIORITY_CRITICAL, CAN_REDO_COMMAND, UNDO_COMMAND, REDO_COMMAND, FORMAT_TEXT_COMMAND } from "lexical"
import { $findMatchingParent } from "@lexical/utils"
import { useState, useCallback, useEffect } from "react"
import { BiUndo, BiRedo } from "react-icons/bi"
import { RiBold, RiItalic, RiUnderline } from "react-icons/ri"
import EditorToolbarDropdown from "./EditorToolbarDropdown"

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

const EditorToolbar = () => {
    
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

            <EditorToolbarDropdown
                blockType={blockType}
                editor={editor}
                blockTypeToBlockName={blockTypeToBlockName}
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

export default EditorToolbar;