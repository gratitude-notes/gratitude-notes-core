import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import clsx from "clsx";
import { useState } from "react";

const Reader: React.FC<{noteJSON: string}> = ({noteJSON} : {noteJSON: string}) => {
    const initialConfig = {
        namespace: "noteViewer",
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
        editable: false,
        editorState: (noteJSON) ? noteJSON : null,
        
        onError(error: Error) {
            throw error;
        },
    }

    const [isLoading, setLoading] = useState(false);

    return (
        <LexicalComposer {...{initialConfig}}>
             <RichTextPlugin 
                contentEditable={
                    <ContentEditable className={
                        clsx("min-h-[100px] max-h-[255px] overflow-y-scroll outline-none rounded-md p-1", (isLoading) ? "hidden" : "visible")
                    } />
                }
                placeholder={
                    <div className={
                        clsx("top-0 left-0 text-gray-400 pointer-events-none p-1", (!isLoading) ? "hidden" : "visible")
                    }>
                        Loading... / Skeleton Here
                    </div>
                }
                ErrorBoundary={LexicalErrorBoundary}
            />
        </LexicalComposer>
    )
}

export default Reader;