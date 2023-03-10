import useComponentVisible from '../hooks/useComponentVisible';
import { useSignInWithGoogle, useSignOut } from "react-firebase-hooks/auth";
import { fb_auth } from "../lib/Firebase";

const AvatarButton: React.FC = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(fb_auth);
    const [signOut, loadingSO, errorSO] = useSignOut(fb_auth);
    const { ref, isComponentVisible, setComponentVisible } = useComponentVisible(false);    

    const handleAvatarButton = () => {
        (isComponentVisible) ? setComponentVisible(false) : setComponentVisible(true);
    }

    const avatarVisible = (isComponentVisible) ? "visible" : "invisible";

    return (
        <div ref={ref}>
            <div id="avatarButton" onClick={handleAvatarButton} className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
            </div>

            {/* Dropdown Menu */}
            <div className={`${avatarVisible} absolute right-2 top-11 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                <div className="py-1" role="none">
                    <button className="hover:bg-neutral-200 w-full inline-flex text-gray-700 px-4 py-2 text-sm gap-x-2">
                        Dashboard
                    </button>
                    <button className="hover:bg-neutral-200 w-full inline-flex text-gray-700 px-4 py-2 text-sm gap-x-2">
                        Settings
                    </button>              
                    <button onClick={() => signOut()} className="hover:bg-neutral-200 w-full inline-flex text-gray-700 px-4 py-2 text-sm gap-x-2">
                        Sign Out
                    </button>
                    {/* {
                    (user) 
                        ?
                        <>
                            <button className="hover:bg-neutral-200 w-full inline-flex text-gray-700 px-4 py-2 text-sm gap-x-2">
                                Dashboard
                            </button>
                            <button className="hover:bg-neutral-200 w-full inline-flex text-gray-700 px-4 py-2 text-sm gap-x-2">
                                Settings
                            </button>              
                            <button onClick={() => signOut()} className="hover:bg-neutral-200 w-full inline-flex text-gray-700 px-4 py-2 text-sm gap-x-2">
                                Sign Out
                            </button>
                        </>
                        :
                        <button className="hover:bg-neutral-200 w-full inline-flex text-gray-700 px-4 py-2 text-sm gap-x-2">
                            Test
                        </button>
                    } */}
                </div>
            </div>
        </div>
    );
}

export default AvatarButton;