
import { $createParagraphNode, $getRoot, $getSelection, $isRangeSelection, createCommand, EditorState, FORMAT_TEXT_COMMAND, LexicalCommand } from 'lexical';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {CharacterLimitPlugin} from '@lexical/react/LexicalCharacterLimitPlugin';
import { useCallback, useEffect, useState } from 'react';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import clsx from 'clsx';
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa'
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode, $isListNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { CodeNode } from "@lexical/code";
import { setPersistence } from 'firebase/auth';
import { TRANSFORMERS } from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
// import {useSharedHistoryContext} from './SharedHistoryContext';
// import {useSettings} from './SettingsContext';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import {CheckListPlugin} from '@lexical/react/LexicalCheckListPlugin';
import {ClearEditorPlugin} from '@lexical/react/LexicalClearEditorPlugin';
//import { FloatingMenuPlugin } from "./plugins/FloatingMenu";


const EDITOR_NODES = [
    HeadingNode,
    LinkNode,
    ListNode,
    ListItemNode,
    QuoteNode,
  ];

  
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
    const [isUnderline, setIsUnderline] = useState(false)
    const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>('paragraph');
    

    const updateToolbar = useCallback(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
            setIsBold(selection.hasFormat('bold'))
            setIsItalic(selection.hasFormat('italic'))
            setIsUnderline(selection.hasFormat('underline'))
        }
        
        // if (element === null) {
        //     element = anchorNode.getTopLevelElementOrThrow();
        //   }
    
        //   const elementKey = element.getKey();
        //   const elementDOM = activeEditor.getElementByKey(elementKey);
        // if (elementDOM !== null) {
        //     setSelectedElementKey(elementKey);
        //     if ($isListNode(element)) {
        //       const parentList = $getNearestNodeOfType<ListNode>(
        //         anchorNode,
        //         ListNode,
        //       );
        //       const type = parentList
        //         ? parentList.getListType()
        //         : element.getListType();
        //       setBlockType(type);
        //     } else {
        //       const type = $isHeadingNode(element)
        //         ? element.getTag()
        //         : element.getType();
        //       if (type in blockTypeToBlockName) {
        //         setBlockType(type as keyof typeof blockTypeToBlockName);
        //       }
        //     }
        //   }
        
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

const Editor: React.FC = () => {

    //const {historyState} = useSharedHistoryContext();
    // const {
    //   settings: {
    //     isCollab,
    //     isAutocomplete,
    //     isMaxLength,
    //     isCharLimit,
    //     isCharLimitUtf8,
    //     isRichText,
    //     showTreeView,
    //     showTableOfContents,
    //   },
    // } = useSettings();

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
        onError(error: Error) {
            throw error;
        },
    }

    // {(isCharLimit || isCharLimitUtf8) && (
    //     <CharacterLimitPlugin
    //       charset={isCharLimit ? 'UTF-16' : 'UTF-8'}
    //       maxLength={40}
    //     />
    //   )}

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
                <ListPlugin />
                <CheckListPlugin />
                {/* <LocalStoragePlugin namespace={props.config.namespace} /> */}
                {/* <MarkdownShortcutPlugin transformers={TRANSFORMERS} /> */}
                <OnChangePlugin onChange={onChange}/>
                {/* <ListPlugin></ListPlugin>
                <HistoryPlugin />
                <CheckListPlugin /> */}
            </LexicalComposer>
        </div>
    ) 
}

export default Editor;

function $isHeadingNode(element: any) {
    throw new Error('Function not implemented.');
}
function setSelectedElementKey(elementKey: any) {
    throw new Error('Function not implemented.');
}

