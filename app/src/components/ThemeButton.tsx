import { BsBrightnessHigh, BsMoonStars } from 'react-icons/bs'
import { MdDevices } from 'react-icons/md'
import useComponentVisible from '../hooks/useComponentVisible';


const ThemeButton: React.FC = () => {
    const { ref, isComponentVisible, setComponentVisible } = useComponentVisible(false);    

    const handleThemeButton = () => {
        (isComponentVisible) ? setComponentVisible(false) : setComponentVisible(true);
    }

    const twVisible = (isComponentVisible) ? "visible" : "invisible";

    return (
        <div ref={ref}>
            <button onClick={handleThemeButton} className="inline-flex px-2 py-2 items-center ml-2 bg-white rounded-lg hover:bg-neutral-200">
                <BsBrightnessHigh aria-hidden="true" size={20}/>
            </button>

            {/* Dropdown Menu */}
            <div className={`${twVisible} absolute right-2 top-11 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                <div className="py-1" role="none">
                    <button className="hover:bg-neutral-200 w-full inline-flex text-gray-700 px-4 py-2 text-sm gap-x-2">
                        <span><BsBrightnessHigh aria-hidden="true" size={20}/></span>
                        Light
                    </button>
                    <button className="hover:bg-neutral-200 w-full inline-flex text-gray-700 px-4 py-2 text-sm gap-x-2">
                        <span><BsMoonStars aria-hidden="true"size={20}/></span>
                        Dark
                    </button>
                    <button className="hover:bg-neutral-200 w-full inline-flex text-gray-700 px-4 py-2 text-sm gap-x-2">
                        <span><MdDevices aria-hidden="true" size={20} /></span>
                        System
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ThemeButton;