import { useRef } from "react";
import { BsArrowLeft } from "react-icons/bs";
import Editor from "../Editor/Editor";

interface WriteNoteModalState {
    setVisible: "visible" | "hidden",
    handleChange: () => void
}

const WriteNoteModal: React.FC<WriteNoteModalState> = ({setVisible, handleChange}) => {
    // const editorRef: any = useRef();
    
    // if (editorRef.current !== undefined && editorRef.current !== null) {
    //       const latestEditorState = editorRef.current.getEditorState();
    //       console.log(latestEditorState);
    // }

    return (
        <>
            <div className={`${setVisible} z-50 absolute h-screen w-screen bg-white
                            sm:h-[400px] sm:w-[520px] sm:rounded-3xl sm:top-20 sm:left-0 sm:right-0 sm:mx-auto
                            dark:bg-gray-800`}>
                <div className="">
                    {/* HEADER */}
                    <div className="relative flex justify-between p-2 text-black dark:text-white">
                        <button onClick={handleChange} className="px-2">
                            <BsArrowLeft size={20}/>
                        </button>
                        <button onClick={handleChange} className="font-bold text-white bg-cyan-500 rounded-full px-6 py-2">
                            Write
                        </button>
                    </div>
                    {/* MAIN CONTENT */}
                    <Editor />
                </div>
            </div>

            {/* TRANSPARENT BACKGROUND ON LARGE SCREENS */}
            <div className={`${setVisible} absolute z-40 h-screen w-screen bg-black opacity-40`} />
        </>
    );
}

export default WriteNoteModal;