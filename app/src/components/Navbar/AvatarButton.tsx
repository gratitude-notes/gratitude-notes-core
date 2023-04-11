import useComponentVisible from '../../hooks/useComponentVisible';
import { signOut } from "@firebase/auth";
import { fb_auth } from "../../lib/Firebase";
import { useSession } from '../../lib/Session';
import { BsGear, BsGlobe, BsPencil } from 'react-icons/bs';
import { ViewState } from '../../pages/Dashboard';
import { BiLogOutCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';

type AvatarButtonProps = {
    updateViewState: (state: ViewState) => void;
}

const AvatarButton: React.FC<AvatarButtonProps> = ({updateViewState}) => {
    const { ref, isComponentVisible, setComponentVisible } = useComponentVisible(false);    
    const session = useSession();
    const sessionUid = session?.user?.uid;

    const handleDropdown = () => {
        (isComponentVisible) ? setComponentVisible(false) : setComponentVisible(true);
    }

    const dropdownVisbile = (isComponentVisible) ? "visible" : "hidden";

    const handleClick = () => {
        signOut(fb_auth);
    }

    return (
        <div ref={ref} className="relative text-black dark:text-white">
            <div id="avatarButton" onClick={handleDropdown} className="relative cursor-pointer w-10 h-10 overflow-hidden rounded-full">
            <img src={`${session?.user?.photoURL}`} alt="user photoURL..." referrerPolicy="no-referrer" />
            </div>

            {/* Dropdown Menu */}
            <div className={`${dropdownVisbile} absolute top-full right-0 z-50`}>
                <div className="flex flex-col gap-1 bg-white dark:bg-gray-800 rounded-md text-black dark:text-white shadow-lg shadow-gray-900">
                    <div className="whitespace-nowrap border-b border-gray-400 px-2 py-2 text-sm">
                        Welcome, <br /> {`${session?.user?.displayName}`}
                    </div>
                    <div
                        className="flex gap-2 cursor-pointer p-2 text-sm
                                    hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in">
                        <Link className="flex items-center space-x-2" to={`/users/${sessionUid}/public`}>
                            <BsGlobe size={20} />
                            <span className="whitespace-nowrap">View My Public Board</span>
                        </Link>
                    </div>
                    <div onClick={() => updateViewState("Settings")}
                        className="flex gap-2 cursor-pointer p-2 text-sm
                                    hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in">
                        <BsGear size={20}/>                            
                        <span>Settings</span>
                    </div>
                    <div onClick={handleClick}
                        className="flex gap-2 cursor-pointer p-2 text-sm
                                    hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in">
                        <BiLogOutCircle size={20}/>
                        <span>Sign Out</span>
                    </div>          
                </div>
            </div>

        </div>
    );
}

export default AvatarButton;