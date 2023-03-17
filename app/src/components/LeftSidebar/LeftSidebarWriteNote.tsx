import { BsPencil } from 'react-icons/bs';
import useComponentVisible from '../../hooks/useComponentVisible';
import WriteNoteModal from '../WriteNoteModal';


const LeftSidebarWriteNote: React.FC = () => {  
    const { ref, isComponentVisible, setComponentVisible } = useComponentVisible(false);    

  const handleFAB = () => {
      (isComponentVisible) ? setComponentVisible(false) : setComponentVisible(true);
  }

  const modalVisible = (isComponentVisible) ? "visible" : "hidden";
    return (
        <>
            <div className="hidden sm:flex mx-auto">
                <button onClick={handleFAB} className="hidden lg:inline w-40 font-bold text-white bg-black rounded-full p-2">
                    Write
                </button>
                <button onClick={handleFAB} className="hidden sm:flex lg:hidden bg-black rounded-full p-2">
                    <BsPencil size={20} color="white"/>
                </button>
            </div>

            <WriteNoteModal setVisible={modalVisible} handleChange={handleFAB}/>
        </>
    )
  }
  
  export default LeftSidebarWriteNote;