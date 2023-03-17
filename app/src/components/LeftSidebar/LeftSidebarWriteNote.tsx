import { BsPencil } from 'react-icons/bs';


const LeftSidebarWriteNote: React.FC = () => {  
    return (
        <div className="hidden sm:flex mx-auto">
            <button className="hidden lg:inline w-40 font-bold text-white bg-black rounded-full p-2">
                Write
            </button>
            <button className="hidden sm:flex lg:hidden bg-black rounded-full p-2">
                <BsPencil size={20} color="white"/>
            </button>
        </div>
    )
  }
  
  export default LeftSidebarWriteNote;