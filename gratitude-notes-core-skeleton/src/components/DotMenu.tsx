import useComponentVisible from '../hooks/useComponentVisible';
import { BsBrightnessHigh, BsThreeDots } from 'react-icons/bs'

const DotMenu: React.FC = () => {  

        // <div className="flex justify-end px-4 pt-4">
        //     <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
        //         <span className="sr-only">Open dropdown</span>
        //         <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
        //     </button>
        //     <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        //         <ul className="py-2" aria-labelledby="dropdownButton">
        //         <li>
        //             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
        //         </li>
        //         <li>
        //             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
        //         </li>
        //         <li>
        //             <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
        //         </li>
        //         </ul>
        //     </div>
        // </div>
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


