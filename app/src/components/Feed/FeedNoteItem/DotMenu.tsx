import useComponentVisible from '../../../hooks/useComponentVisible';
import { BsShare, BsThreeDots, BsTrash } from 'react-icons/bs'

const DotMenu: React.FC = () => {  
        const { ref, isComponentVisible, setComponentVisible } = useComponentVisible(false);    

        const handleDropdownButton = () => {
            (isComponentVisible) ? setComponentVisible(false) : setComponentVisible(true);
        }

        const handleDelete = () => {
            console.log("Delete clicked on a FeedNoteItem")
        }

        const handleShare = () => {
            console.log("Share clicked on a FeedNoteItem")
        }

        const twVisible = (isComponentVisible) ? "visible" : "hidden";

        return (
            <div ref={ref} className="absolute top-1 right-4 select-none">
                {(isComponentVisible)
                    ?
                    <button onClick={handleDropdownButton} className="text-cyan-500">
                        <BsThreeDots size={20}/>
                    </button>
                    :
                    <button onClick={handleDropdownButton} className="dark:text-gray-400">
                        <BsThreeDots size={20}/>
                    </button>
                }

                {/* Dropdown Menu */}
                <div className={`${twVisible} absolute top-4 right-0 z-50 rounded-lg border border-gray-400 dark:border-gray-600`}>
                    <div className="flex flex-col gap-1 bg-gray-200 dark:bg-gray-900 rounded-lg text-black dark:text-white">
                        <div onClick={handleDelete}
                            className="px-2 py-[2px] flex gap-2 hover:text-gray-500 dark:hover:text-gray-300 cursor-pointer items-center">
                            <h1 className="text-sm">Delete</h1>
                            <BsTrash size={17}/>
                        </div>
                        <div onClick={handleShare}
                            className="px-2 py-[2px] flex gap-2 hover:text-gray-500 dark:hover:text-gray-300 cursor-pointer items-center">
                            <h1 className="text-sm">Share</h1>
                            <BsShare size={17}/>
                        </div>
                    </div>
                </div>
            </div>
        )
  }
  
  export default DotMenu;


