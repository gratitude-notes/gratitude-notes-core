import { BsArrowLeft } from "react-icons/bs";
import Editor from "./Editor";

interface WriteNoteModalState {
    setVisible: "visible" | "hidden",
    handleChange: () => void
}

const WriteNoteModal: React.FC<WriteNoteModalState> = ({setVisible, handleChange}) => {

    return (
        <div className={`${setVisible} z-50 fixed top-0 w-screen h-screen bg-white`}>
            <div className="flex flex-col">
                <div className="flex justify-between p-1">
                    <button onClick={handleChange} className="px-2">
                        <BsArrowLeft size={20}/>
                    </button>
                    <button onClick={handleChange} className="text-white bg-black rounded-full px-6 py-2">
                        Write
                    </button>
                </div>

                <Editor />
            </div>
        </div>
    );
}

export default WriteNoteModal;