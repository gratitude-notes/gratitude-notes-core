import { BsArrowLeft } from "react-icons/bs";
import { ComponentVisbilityProps } from "../../hooks/useComponentVisible";
import Editor from "../Editor/Editor";

interface WriteNoteModalState {
    visible: ComponentVisbilityProps,
    handleChange: () => void
}

const WriteNoteModal: React.FC<WriteNoteModalState> = ({visible, handleChange}) => {
    // const editorRef: any = useRef();
    
    // if (editorRef.current !== undefined && editorRef.current !== null) {
    //       const latestEditorState = editorRef.current.getEditorState();
    //       console.log(latestEditorState);
    // }

    const isDivVisibleTag = (visible.isComponentVisible) ? "visible" : "hidden";

    return (
        <>
            <div 
                ref={visible.ref} 
                className={`${isDivVisibleTag} z-50 absolute h-screen w-screen bg-white
                            sm:h-[80%] sm:w-[550px] sm:rounded-3xl sm:top-20 sm:left-0 sm:right-0 sm:mx-auto
                            dark:bg-gray-800`}
            >
                {/* WRITE h-50% */}
                <div className="h-1/2">
                    {/* HEADER */}
                    <div className="h-[12.5%] flex justify-between p-2 text-black dark:text-white">
                        <button onClick={handleChange} className="px-2">
                            <BsArrowLeft size={20}/>
                        </button>
                        <button onClick={handleChange} className="font-bold text-white bg-cyan-500 rounded-full px-6">
                            Write
                        </button>
                    </div>

                    {/* MAIN CONTENT */}
                    <div className="h-[87.5%]">
                        <Editor />
                    </div>
                </div>

                {/* IMAGES h-20% */}
                <div className="h-1/5 w-full px-4 pt-8">
                    {/* IMAGES INNER DIV */}
                    <div className="h-full flex flex-row gap-2 overflow-x-scroll sm:justify-center sm:scrollbar-none
                                    scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
                        {/* IMAGE 1 */}
                        <div className="aspect-square rounded-xl flex justify-center items-center border-2 border-black">
                            Image 1
                        </div>
                        {/* IMAGE 2 */}
                        <div className="aspect-square rounded-xl flex justify-center items-center border-2 border-black">
                            Image 2
                        </div>
                        {/* IMAGE 3 */}
                        <div className="aspect-square rounded-xl flex justify-center items-center border-2 border-black">
                            Image 3
                        </div>
                        {/* IMAGE 4 */}
                        <div className="aspect-square rounded-xl flex justify-center items-center border-2 border-black">
                            Image 4
                        </div>
                    </div>
                </div>

                {/* SCORE h-30% */}
                {/* <div className="h-[30%] border border-red-500 flex justify-center">
                    <input type="range" min="-5" max="5"
                            className="w-1/2 cursor-pointer"/>
                </div> */}
            </div>

    
            {/* TRANSPARENT BACKGROUND ON LARGE SCREENS */}
            <div className={`${isDivVisibleTag} absolute z-40 h-screen w-screen bg-black opacity-40`} />
        </>
    );
}

export default WriteNoteModal;


// POTENTIAL MOBILE DESIGN WITH SCORE
// <>
//             <div className={`${setVisible} flex z-50 absolute h-screen w-screen bg-white border border-orange-400
//                             sm:h-[400px] sm:w-[520px] sm:rounded-3xl sm:top-20 sm:left-0 sm:right-0 sm:mx-auto
//                             dark:bg-gray-800`}>
//                 {/* WRITE */}
//                 <div className="flex-[5] border border-red-400">
//                     {/* HEADER */}
//                     <div className="relative flex justify-between p-2 text-black dark:text-white">
//                         <button onClick={handleChange} className="px-2">
//                             <BsArrowLeft size={20}/>
//                         </button>
//                         <button onClick={handleChange} className="font-bold text-white bg-cyan-500 rounded-full px-6 py-2">
//                             Write
//                         </button>
//                     </div>
//                     {/* MAIN CONTENT */}
//                     <Editor />
//                 </div>
//                 {/* SCORE */}
//                 <div className="flex-1 bg-black">
// 
//                 </div>
//             </div>
// 
//     
//             {/* TRANSPARENT BACKGROUND ON LARGE SCREENS */}
//             <div className={`${setVisible} absolute z-40 h-screen w-screen bg-black opacity-40`} />
// </>