import { BsBrightnessHigh, BsMoonStars } from 'react-icons/bs'
import { MdDevices } from 'react-icons/md'

const ThemeButton: React.FC = () => {
    return (
        <button className="className=h-full px-2 py-2 ml-2 bg-gray-700 rounded-lg hover:bg-gray-700">
            <span>
                <BsMoonStars size={20} fill={'white'}/>
            </span>
        </button>
    );
}

export default ThemeButton;