
import { useEffect, useState } from "react";
import { ComponentVisbilityProps } from "../../hooks/useComponentVisible";
import { ViewState } from "../../pages/Dashboard";
import WriteNoteForm from "../Editor/WriteNoteForm";

// interface WriteNoteModalState {
//     visible: ComponentVisbilityProps,
//     handleChange: () => void
// }

type WriteNoteModalState = {
    updateViewState: (state: ViewState) => void
}

const WriteNoteModal: React.FC<WriteNoteModalState> = ({updateViewState}) => {

    return (    
        <div className={`md:px-[100px] lg:px-[200px] flex flex-col gap-6 flex-grow`}>
            {/* WRITE NOTE */}
            <WriteNoteForm {...{updateViewState}}/>

            {/* IMAGES */}
            {/* <div className="px-2">
                IMAGES INNER DIV
                <div className="flex gap-2 overflow-x-scroll sm:justify-center sm:scrollbar-none
                                scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
                    <div className="w-20 aspect-square rounded-xl flex justify-center items-center border-2 border-black bg-pink-200">
                        Image 1
                    </div>
                    <div className="w-20 aspect-square rounded-xl flex justify-center items-center border-2 border-black bg-pink-200">
                        Image 2
                    </div>
                    <div className="w-20 aspect-square rounded-xl flex justify-center items-center border-2 border-black bg-pink-200">
                        Image 3
                    </div>
                    <div className="w-20 aspect-square rounded-xl flex justify-center items-center border-2 border-black bg-pink-200">
                        Image 4
                    </div>
                </div>
            </div> */}
            {/* SCORE */}
            <div className="flex justify-center">
                <input type="range" min="-5" max="5" className="w-1/2 cursor-pointer"/>
            </div> 
        </div>
    );
}

export default WriteNoteModal;