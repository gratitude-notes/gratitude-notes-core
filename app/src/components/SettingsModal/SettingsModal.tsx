import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { ComponentVisbilityProps } from "../../hooks/useComponentVisible";
import DeleteAccountModal from "./DeleteAccountModal";

interface SettingsModalState {
    visible: ComponentVisbilityProps,
    handleChange: () => void,
}

const SettingsModal: React.FC<SettingsModalState> = ({visible, handleChange}) => {

    const isDivVisibleTag = (visible.isComponentVisible) ? "visible" : "hidden";

    const [locationSharingEnabled, setLocationSharingEnabled] = useState(false);

    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

    function handleToggleLocationSharing() {
        setLocationSharingEnabled(!locationSharingEnabled);
        if (locationSharingEnabled) {
            console.log('Location sharing is now disabled.');
          } else {
            console.log('Location sharing is now enabled.');
          }
      }

      function handleOpenDeleteAccountModal() {
        setShowDeleteAccountModal(true);
      }
    
      function handleCloseDeleteAccountModal() {
        setShowDeleteAccountModal(false);
      }

    return (
        <>
            <div
                ref={visible.ref}
                className={`${isDivVisibleTag} absolute z-50 h-screen w-screen bg-white
                            sm:h-[80%] sm:w-[550px] sm:rounded-3xl sm:top-20 sm:left-0 sm:right-0 sm:mx-auto
                            dark:bg-gray-800`}
            >
                {/* HEADER */}
                <div className="flex content-center justify-between p-4 text-black dark:text-white">
                    <button onClick={handleChange}>
                        <BsArrowLeft size={20}/>
                    </button>
                </div>
                <div className="h-[87.5%] justify-center">
                    <h1 className="font-bold; text-center text-white">Settings</h1>
                    <div className="justify-center align-text: text-center">
                        
                        <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" checked={locationSharingEnabled} onChange={handleToggleLocationSharing}/>
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Location Sharing</span>
                        </label>

                    </div>
                    <DeleteAccountModal></DeleteAccountModal>
                    {/* <div className="justify-center align-text: text-center">
                        <button onClick={handleOpenDeleteAccountModal} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white ">Delete Account</button>
                    </div> */}

                    
                </div>
            </div>

    
            {/* TRANSPARENT BACKGROUND ON LARGE SCREENS */}
            <div className={`${isDivVisibleTag} absolute -z-50 sm:z-40 h-screen w-screen bg-black opacity-40`} />
        </>
    );
}

export default SettingsModal;