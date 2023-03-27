import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HeadingNode } from '@lexical/rich-text';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { ListItemNode, ListNode } from '@lexical/list';
import { OverflowNode } from '@lexical/overflow';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import React, { useRef } from 'react';
import { BsArrowLeft } from "react-icons/bs";
import EditorToolbar from './EditorToolbar';
import { EditorState } from 'lexical';
import { addDoc, collection, Timestamp } from '@firebase/firestore';
import { NoteBullet } from '../../hooks/useUserBullets';
import { useSession } from '../../lib/Session';
import { fb_firestore } from '../../lib/Firebase';

interface FormHandlerProps {
    handleChange: () => void
}

const composeBullet = (bulletJSON: string, score: number, timestamp: Timestamp, keywords: string[]): NoteBullet => {
    return { bulletJSON, score, timestamp, keywords }
}

const WriteNoteForm: React.FC<FormHandlerProps> = ({handleChange}) => {
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
            },
            characterLimit: 'bg-red-400'
        },
        nodes: [ListNode, ListItemNode, HeadingNode, OverflowNode],
        onError(error: Error) {
            throw error;
        },
    }

    const session = useSession();
    const editorStateRef = useRef<EditorState>();

    const onSubmit = () => {
        const newBullet = composeBullet(JSON.stringify(editorStateRef.current), 5, Timestamp.now(), []);
        if (session && session.user) {
            const bulletCollectionRef = collection(fb_firestore, "users", session.user.uid, "notes");
            addDoc(bulletCollectionRef, newBullet)
        }
        handleChange();
    }
        
    return (
        <>
            {/* HEADER */}
            <div className="h-[12.5%] flex justify-between p-2 text-black dark:text-white">
                <button onClick={handleChange} className="px-2">
                    <BsArrowLeft size={20}/>
                </button>
                <button onClick={onSubmit} className="font-bold text-white bg-cyan-500 rounded-full px-6">
                    Write
                </button>
            </div>

            {/* EDITOR */}
            <div className="bg-white dark:bg-gray-800 h-[87.5%]">
                <LexicalComposer {...{initialConfig}}>
                    <div className="h-full flex flex-col px-4">
                        <div className="h-[7.5%]">
                            <EditorToolbar />
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
                    <ListPlugin />
                    <HistoryPlugin />
                    <OnChangePlugin onChange={(editorState: EditorState) => editorStateRef.current = editorState } />
                </LexicalComposer>
            </div>
        </>
    )
}

export default WriteNoteForm;