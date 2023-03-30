import useComponentVisible from '../../hooks/useComponentVisible';
import { signOut } from "@firebase/auth";
import { fb_auth } from "../../lib/Firebase";
import { useSession } from '../../lib/Session';
import SettingsModal from '../SettingsModal/SettingsModal';
import { BsGearFill } from 'react-icons/bs';


const AvatarButton: React.FC = () => {
    const { ref, isComponentVisible, setComponentVisible } = useComponentVisible(false);    
    const session = useSession();

    const handleDropdown = () => {
        (isComponentVisible) ? setComponentVisible(false) : setComponentVisible(true);
    }

    const dropdownVisbile = (isComponentVisible) ? "visible" : "hidden";

    const handleSettingsButton = () => {
        (settingsModalVisible.isComponentVisible) ? settingsModalVisible.setComponentVisible(false) : settingsModalVisible.setComponentVisible(true);
    }


    const settingsModalVisible = useComponentVisible(false);

    const handleClick = () => {
        signOut(fb_auth);
    }

    const handleSettingsClick = () => {
        console.log("Settings clicked");
        
    }

    return (
        <div ref={ref} className="relative text-black dark:text-white">
            <div id="avatarButton" onClick={handleDropdown} className="relative cursor-pointer w-10 h-10 overflow-hidden rounded-full">
                <img src={`${session?.user?.photoURL}`} alt="" />
            </div>

            {/* Dropdown Menu */}
            <div className={`${dropdownVisbile} absolute top-full right-0 z-50`}>
                <div className="flex flex-col gap-1 bg-white dark:bg-gray-800 rounded-md text-black dark:text-white shadow-lg shadow-gray-900">
                    <div className="whitespace-nowrap border-b border-gray-400 px-2 py-2 text-sm">
                        Welcome, <br /> {`${session?.user?.displayName}`}
                    </div>
                    <div onClick={handleSettingsClick}
                        className="flex gap-2 cursor-pointer p-2 text-sm
                                    hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in">
                        <BsGearFill size={20}/>                            
                        <span>Settings</span>
                    </div>
                    <div onClick={handleClick}
                        className="flex gap-2 cursor-pointer p-2 text-sm
                                    hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in">
                        <span>Sign Out</span>
                    </div>          
                </div>
            </div>

        </div>
    );
}

export default AvatarButton;