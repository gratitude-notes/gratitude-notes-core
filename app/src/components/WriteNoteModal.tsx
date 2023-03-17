import Editor from "./Editor";

interface WriteNoteModalState {
    setVisible: "visible" | "hidden",
    handleChange: () => void
}

const WriteNoteModal: React.FC<WriteNoteModalState> = ({setVisible, handleChange}) => {

    return (
        <div className={`${setVisible} z-50 fixed top-0 w-screen h-screen bg-white`}>
            <div className="flex flex-col">
                <div className="h-20">
                    <button onClick={handleChange} type="button" className="absolute top-3 left-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <button onClick={handleChange} type="button" className="absolute top-3 right-2.5 text-white bg-black rounded-full p-2">
                        Send my note
                    </button>
                </div>

                <Editor />
            </div>
            
        
        </div>
    );
}

export default WriteNoteModal;