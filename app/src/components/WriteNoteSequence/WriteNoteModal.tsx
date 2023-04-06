
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

            {/* SCORE */}
            {/* <div className="flex justify-center">
                <input type="range" min="-5" max="5" className="w-1/2 cursor-pointer"/>
            </div>  */}
        </div>
    );
}

export default WriteNoteModal;