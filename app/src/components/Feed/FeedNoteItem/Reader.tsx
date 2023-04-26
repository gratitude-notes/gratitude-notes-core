import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ListItemNode, ListNode } from '@lexical/list';
import { OverflowNode } from '@lexical/overflow';
import { HeadingNode } from '@lexical/rich-text';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React from 'react';

const OnLoadPlugin = ({ noteJSON, isLoading }: { noteJSON: string; isLoading: boolean }): null => {
    if (!isLoading) {
        const [editor] = useLexicalComposerContext();
        const readerState = editor.parseEditorState(noteJSON);

        useEffect(() => editor.setEditorState(readerState), [noteJSON]);
    }

    return null;
};

const Reader: React.FC<{ noteJSON: string }> = ({ noteJSON }: { noteJSON: string }) => {
    const initialConfig = {
        namespace: 'noteViewer',
        theme: {
            paragraph: 'text-black dark:text-white', // Change text color based on color theme
            text: {
                underline: 'underline',
                bold: 'font-bold',
                italic: 'italic',
            },
            list: {
                ul: 'ml-4 list-disc text-black dark:text-white',
                listitem: 'mt-1 mb-1 ml-6 mr-6',
            },
            heading: {
                h1: 'text-4xl text-black dark:text-white',
                h2: 'text-2xl text-black dark:text-white',
            },
        },
        nodes: [ListNode, ListItemNode, HeadingNode, OverflowNode],
        editable: false,
        onError(error: Error) {
            throw error;
        },
    };

    const [isLoading, setLoading] = useState(false);

    return (
        <LexicalComposer {...{ initialConfig }}>
            <RichTextPlugin
                contentEditable={
                    <ContentEditable
                        className={clsx('outline-none rounded-md p-1', isLoading ? 'hidden' : 'visible')}
                    />
                }
                placeholder={
                    <div
                        className={clsx(
                            'top-0 left-0 text-gray-400 pointer-events-none p-1',
                            !isLoading ? 'hidden' : 'visible'
                        )}
                    >
                        Loading... / Skeleton Here
                    </div>
                }
                ErrorBoundary={LexicalErrorBoundary}
            />
            <OnLoadPlugin {...{ isLoading, noteJSON }} />
        </LexicalComposer>
    );
};

export default Reader;
