import useComponentVisible from '../../hooks/useComponentVisible';
import { signOut } from "@firebase/auth";
import { fb_auth } from "../../lib/Firebase";
import { useSession } from '../../lib/Session';


const SettingsProfile: React.FC = () => {
    const { ref, isComponentVisible, setComponentVisible } = useComponentVisible(false);    
    const session = useSession();

    return (
        <div ref={ref} className="relative text-black dark:text-white">
            <div className="justify-center align-text: text-center">
                <div id="avatarButton" className="object-position: center justify-center align-text: text-center w-30 h-30 overflow-hidden rounded">
                    <img src={`${session?.user?.photoURL}`} alt="" />
                </div>
            </div>
            <div className="whitespace-nowrap border-gray-400 px-2 py-2 text-sm">
                {`${session?.user?.displayName}`}
            </div>
            <div className="whitespace-nowrap border-gray-400 px-2 py-2 text-sm">
                {`${session?.user?.email}`}
            </div>

        
        </div>
    );
}

export default SettingsProfile;