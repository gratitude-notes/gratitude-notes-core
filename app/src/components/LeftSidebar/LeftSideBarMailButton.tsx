import { BsMailbox, BsMailbox2 } from 'react-icons/bs';
import useComponentVisible from '../../hooks/useComponentVisible';

interface WeekReviewModalchange {
    handleWeekReviewModal: () => void
  }

const LeftSidebarMailButton: React.FC<WeekReviewModalchange> = ({handleWeekReviewModal}) => {  
    return (
        <>
            <div className="hidden sm:flex mx-auto">
                <button onClick={() => handleWeekReviewModal()} className="hidden lg:inline w-40 rounded-full p-2 font-bold text-white bg-cyan-500">
                    <BsMailbox2 size={20} color="white"/>
                    Notifications
                </button>
                <button onClick={() => handleWeekReviewModal()} className="hidden sm:flex lg:hidden rounded-full p-2 bg-cyan-500">
                    <BsMailbox size={20} color="white"/>
                </button>
            </div>
        </>
    )
  }
  
  export default LeftSidebarMailButton;