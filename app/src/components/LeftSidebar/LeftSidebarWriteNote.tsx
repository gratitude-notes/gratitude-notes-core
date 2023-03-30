import { BsPencil } from 'react-icons/bs';
import useComponentVisible from '../../hooks/useComponentVisible';
import { ViewState } from '../../pages/Dashboard';

// type WriteNoteModalChange = {
//     handleWriteNoteModal: (state: string) => void
//   }

type WriteNoteModalType = {
    updateViewState: (state: ViewState) => void
}

const LeftSidebarWriteNote: React.FC<WriteNoteModalType> = ({updateViewState}) => {  
    return (
        <>
            <div className="hidden sm:flex mx-auto">
                <button onClick={() => updateViewState("Write")} className="hidden md:inline w-40 rounded-full p-2 font-bold text-white bg-cyan-500">
                    Write
                </button>
                <button onClick={() => updateViewState("Write")} className="hidden sm:flex md:hidden rounded-full p-2 bg-cyan-500">
                    <BsPencil size={20} color="white"/>
                </button>
            </div>
        </>
    )
  }
  
  export default LeftSidebarWriteNote;