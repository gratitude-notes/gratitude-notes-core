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
                <button onClick={handleThemeButton} className="relative top-0 right-0 bg-white rounded-lg hover:bg-neutral-200">
                    <BsThreeDots aria-hidden="true" size={20}/>
                </button>

                {/* Dropdown Menu */}
                <div className={`${twVisible} absolute top right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                    <div className="py-1" role="none">
                        <button className="hover:bg-neutral-200 w-full inline-flex text-gray-700 px-4 py-2 text-sm gap-x-2">
                            Edit
                        </button>
                        <button className="hover:bg-neutral-200 w-full inline-flex text-gray-700 px-4 py-2 text-sm gap-x-2">
                            Delete
                        </button>
                        <button className="hover:bg-neutral-200 w-full inline-flex text-gray-700 px-4 py-2 text-sm gap-x-2">
                            Share
                        </button>
                    </div>
                </div>
            </div>
        )
  }
  
  export default DotMenu;


