import useComponentVisible from '../../../hooks/useComponentVisible';
import { BsThreeDots } from 'react-icons/bs'

const DotMenu: React.FC = () => {  
        const { ref, isComponentVisible, setComponentVisible } = useComponentVisible(false);    

        const handleThemeButton = () => {
            (isComponentVisible) ? setComponentVisible(false) : setComponentVisible(true);
        }

        const twVisible = (isComponentVisible) ? "visible" : "invisible";

        return (
            <div ref={ref} >
                <button onClick={handleThemeButton} className="rounded-lg hover:bg-cyan-100 dark:text-gray-400">
                    <BsThreeDots size={20}/>
                </button>

                {/* Dropdown Menu */}
                <div className={`${twVisible} absolute right-0 z-40 bg-white shadow-xl rounded-xl border border-black dark:bg-gray-800`}>
                    <div className="py-1" role="none">
                        <button className="hover:cursor-pointer w-full inline-flex px-4 py-2 text-sm gap-x-2 dark:text-white">
                            Edit
                        </button>
                        <button className="hover:cursor-pointer w-full inline-flex px-4 py-2 text-sm gap-x-2 dark:text-white">
                            Delete
                        </button>
                        <button className="hover:cursor-pointer w-full inline-flex px-4 py-2 text-sm gap-x-2 dark:text-white">
                            Share
                        </button>
                    </div>
                </div>
            </div>
        )
  }
  
  export default DotMenu;


