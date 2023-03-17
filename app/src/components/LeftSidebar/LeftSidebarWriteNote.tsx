import { BsPencil } from 'react-icons/bs';
import useComponentVisible from '../../hooks/useComponentVisible';

interface WriteNoteModalChange {
    handleWriteNoteModal: () => void
  }

const LeftSidebarWriteNote: React.FC<WriteNoteModalChange> = ({handleWriteNoteModal}) => {  
    return (
        <>
            <div className="hidden sm:flex mx-auto">
                <button onClick={() => handleWriteNoteModal()} className="hidden lg:inline w-40 font-bold text-white bg-black rounded-full p-2">
                    Write
                </button>
                <button onClick={() => handleWriteNoteModal()} className="hidden sm:flex lg:hidden bg-black rounded-full p-2">
                    <BsPencil size={20} color="white"/>
                </button>
            </div>
        </>
    )
  }
  
  export default LeftSidebarWriteNote;