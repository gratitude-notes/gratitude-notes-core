import { BsPencil } from 'react-icons/bs';


const WriteNoteFAB: React.FC = () => {  
    return (
        <button className="absolute bottom-3 right-3 sm:hidden bg-black rounded-full p-4">
            <BsPencil size={25} color="white"/>
        </button>
    )
  }
  
  export default WriteNoteFAB;