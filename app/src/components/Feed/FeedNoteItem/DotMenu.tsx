import useComponentVisible from '../../../hooks/useComponentVisible';
import { BsThreeDots } from 'react-icons/bs'

const DotMenu: React.FC = () => {  
        const { ref, isComponentVisible, setComponentVisible } = useComponentVisible(false);    

        const handleDropdownButton = () => {
            (isComponentVisible) ? setComponentVisible(false) : setComponentVisible(true);
        }

        const twVisible = (isComponentVisible) ? "visible" : "hidden";

        return (
            <div ref={ref} className="absolute top-1 right-1">
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
                <div className={`${twVisible} absolute top-4 right-0 z-40 rounded-lg bg-gray-200 dark:bg-gray-600`}>
                    <div className="flex flex-col gap-1 px-2">
                        <button className="text-left hover:text-gray-500 dark:hover:text-gray-300 dark:text-white">
                            Edit
                        </button>
                        <button className="text-left hover:text-gray-500 dark:hover:text-gray-300 dark:text-white">
                            Delete
                        </button>
                        <button className="text-left hover:text-gray-500 dark:hover:text-gray-300 dark:text-white">
                            Share
                        </button>
                    </div>
                </div>
            </div>
        )
  }
  
  export default DotMenu;


