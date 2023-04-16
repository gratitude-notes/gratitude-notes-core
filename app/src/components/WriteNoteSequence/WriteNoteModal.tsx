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
        </div>
    );
}

export default WriteNoteModal;