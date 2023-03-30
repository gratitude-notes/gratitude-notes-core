import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { ComponentVisbilityProps } from "../../hooks/useComponentVisible";
import { ViewState } from "../../pages/Dashboard";
import DeleteAccountModal from "./DeleteAccountModal";
import SettingsProfile from "./SettingsProfile";


type SettingsModalState = {
    updateViewState: (state: ViewState) => void
}

const SettingsModal: React.FC<SettingsModalState> = ({updateViewState}) => {

    const [locationSharingEnabled, setLocationSharingEnabled] = useState(false);

    function handleToggleLocationSharing() {
        setLocationSharingEnabled(!locationSharingEnabled);
        if (locationSharingEnabled) {
            console.log('Location sharing is now disabled.');
          } else {
            console.log('Location sharing is now enabled.');
          }
      }


    return (
        <div className={`py-2 px-4 md:px-[100px] lg:px-[200px] flex flex-col gap-6 flex-grow overflow-y-auto`}>
            {/* HEADER AND PROFILE */}
            <div className="flex justify-between text-black dark:text-white">
                <button onClick={() => updateViewState("Home")}><BsArrowLeft size={20}/></button>
                <h1 className="text-xl font-bold text-black dark:text-white justify-end">Settings</h1>
            </div>
            <SettingsProfile />
            <hr />

            {/* OVERFLOW DIV */}
            <div className="overflow-y-auto
                            scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
                <div className="justify-center text-center py-1">
                    <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only" checked={locationSharingEnabled} onChange={handleToggleLocationSharing}/>
                    <div className="w-11 h-6 bg-cyan-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 dark:peer-focus:ring-cyan-800 rounded-full peer dark:bg-cyan-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-500"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Location Sharing</span>
                    </label>
                </div>
                <div className="justify-center text-center py-1">
                    <DeleteAccountModal />
                </div>

                {/* USED FOR EXAMPLE PURPOSES TO SHOW OVERFLOW DIV IN ACTION */}
                <div className="h-[1000px] bg-red-500"></div>
            </div>
        </div>
    );
}

export default SettingsModal;