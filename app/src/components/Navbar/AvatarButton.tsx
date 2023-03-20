import useComponentVisible from '../../hooks/useComponentVisible';
import { signOut } from "@firebase/auth";
import { fb_auth } from "../../lib/Firebase";
import { useSession } from '../../lib/Session';


const AvatarButton: React.FC = () => {
    const { ref, isComponentVisible, setComponentVisible } = useComponentVisible(false);    
    const session = useSession();

    const handleDropdown = () => {
        (isComponentVisible) ? setComponentVisible(false) : setComponentVisible(true);
    }

    const dropdownVisbile = (isComponentVisible) ? "visible" : "hidden";

    const handleClick = () => {
        signOut(fb_auth);
    }

    return (
        <div ref={ref}>
            <div id="avatarButton" onClick={handleDropdown} className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <img src={`${session?.user?.photoURL}`} alt="" />
            </div>

            {/* Dropdown Menu */}
            <div className={`${dropdownVisbile} absolute right-12 top-11 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                <div className="py-1" role="none">
                    <h1 className='inline-flex text-gray-700 px-4 py-2 text-sm gap-x-2'>
                        Welcome, <br></br>
                        {`${session?.user?.displayName}`}
                    </h1>
                    <button className="hover:bg-neutral-200 w-full inline-flex text-gray-700 px-4 py-2 text-sm gap-x-2">
                        Dashboard
                    </button>
                    <button className="hover:bg-neutral-200 w-full inline-flex text-gray-700 px-4 py-2 text-sm gap-x-2">
                        Settings
                    </button>              
                    <button onClick={handleClick} className="hover:bg-neutral-200 w-full inline-flex text-gray-700 px-4 py-2 text-sm gap-x-2">
                        Sign Out
                    </button>
                </div>
            </div>

        </div>
    );
}

export default AvatarButton;