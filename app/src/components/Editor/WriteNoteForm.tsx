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
import { addDoc, collection, Timestamp, setDoc } from '@firebase/firestore';
import { NoteBullet } from '../../hooks/useUserBullets';
import { useSession } from '../../lib/Session';
import { fb_firestore } from '../../lib/Firebase';
import { ViewState } from '../../pages/Dashboard';


type FormHandlerProps = {
    updateViewState: (state: ViewState) => void
}

const composeBullet = (bulletJSON: string, score: number, timestamp: Timestamp, keywords: string[], isFavorited: boolean): NoteBullet => {
    return { bulletJSON, score, timestamp, keywords, isFavorited }
}

const WriteNoteForm: React.FC<FormHandlerProps> = ({updateViewState}) => {
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

    const onSubmit = async () => {
        const newBullet = composeBullet(JSON.stringify(editorStateRef.current), 5, Timestamp.now(), [], false);
        if (session && session.user) {
            const bulletCollectionRef = collection(fb_firestore, "users", session.user.uid, "notes");
            const newBulletDocRef = await addDoc(bulletCollectionRef, newBullet);
            await setDoc(newBulletDocRef, {bulletDocID: newBulletDocRef.id}, {merge: true});
        }
        updateViewState("Home");
    }
        
    return (
        <div className="flex flex-col text-black dark:text-white">
            <div className="h-14 flex justify-between py-2 px-4 text-black dark:text-white">
                <button onClick={() => updateViewState("Home")} className=""><BsArrowLeft size={20}/></button>
                <button onClick={onSubmit} className="font-bold text-white bg-cyan-500 rounded-full px-6">Write</button>
            </div>
            <div className="px-2 flex-grow bg-white dark:bg-gray-800">
                 <LexicalComposer {...{initialConfig}}>
                    <EditorToolbar />
                    <div className="relative">
                        <RichTextPlugin 
                                    contentEditable={
                                        <ContentEditable className="min-h-[100px] max-h-[200px] overflow-y-scroll outline-none
                                                                    scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700" />
                                    }
                                    placeholder={
                                        <div className="absolute top-0 text-gray-400 pointer-events-none">
                                            Write your thoughts here...
                                        </div>
                                    }
                                    ErrorBoundary={LexicalErrorBoundary}/>
                        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-600"/>
                        <div className="absolute right-0 text-gray-400">
                            <CharacterLimitPlugin charset={"UTF-8"} maxLength={300} />
                        </div>
                    </div>
                    <ListPlugin />
                    <HistoryPlugin />
                    <OnChangePlugin onChange={(editorState: EditorState) => editorStateRef.current = editorState } />
                 </LexicalComposer>
            </div>
        </div>
    )
}

export default WriteNoteForm;