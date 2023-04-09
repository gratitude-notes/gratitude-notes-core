import { BsArrowLeft } from "react-icons/bs";
import Editor from "./Editor";

interface WriteNoteModalState {
    setVisible: "visible" | "hidden",
    handleReturn: () => void,
    handleSubmit: () => void
}

const WriteNoteModal: React.FC<WriteNoteModalState> = ({setVisible, handleReturn, handleSubmit}) => {

    return (
        <>
            <div className={`${setVisible} z-50 absolute h-screen w-screen bg-white
                            sm:h-[300px] sm:w-[520px] sm:rounded-3xl sm:top-20 sm:m-auto
                            sm:mx-auto sm:left-0 sm:right-0`}>
                <div className="flex flex-col">
                    <div className="relative flex justify-between p-1">
                        <button onClick={handleReturn} className="px-2">
                            <BsArrowLeft size={20}/>
                        </button>
                        <button onClick={handleSubmit} className="text-white bg-black rounded-full px-6 py-2">
                            Write
                        </button>
                     </div>

                    <Editor />
                </div>
            </div>

            {/* TRANSPARENT BACKGROUND ON LARGE SCREENS */}
            <div className={`${setVisible} absolute z-40 h-screen w-screen bg-black opacity-40`} />
        </>
    );
}

export default WriteNoteModal;