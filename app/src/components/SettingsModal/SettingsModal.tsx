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
        <div className={`md:px-[100px] lg:px-[200px] flex flex-col gap-6 flex-grow`}>
            <div className="h-14 py-2 px-4 text-black dark:text-white">
                <button onClick={() => updateViewState("Home")}><BsArrowLeft size={20}/></button>
            </div>

            <div className="h-[87.5%] justify-center">
                    <h1 className="font-bold font-size: 1.25rem line-height: 1.75rem; text-center text-white">Settings</h1>
                    <div className="justify-center align-text: text-center py-1">
                        <SettingsProfile></SettingsProfile>
                    </div>
                    <div className="justify-center align-text: text-center py-1">
                        
                        <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" checked={locationSharingEnabled} onChange={handleToggleLocationSharing}/>
                        <div className="w-11 h-6 bg-cyan-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 dark:peer-focus:ring-cyan-800 rounded-full peer dark:bg-cyan-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-500"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Location Sharing</span>
                        </label>

                    </div>
                    <div className="justify-center align-text: text-center py-1">
                        <DeleteAccountModal />
                    </div>    
            </div>
        </div>
    );
}

export default SettingsModal;

{/* <div className={`md:px-[100px] lg:px-[200px] flex flex-col gap-6 flex-grow`}>
      Week in Review
</div> */}

    //  <>
    //         <div
    //             ref={visible.ref}
    //             className={`${isDivVisibleTag} absolute z-50 h-screen w-screen bg-white
    //                         sm:h-[80%] sm:w-[550px] sm:rounded-3xl sm:top-20 sm:left-0 sm:right-0 sm:mx-auto
    //                         dark:bg-gray-800`}
    //         >
                
    //             <div className="flex content-center justify-between p-4 text-black dark:text-white">
    //                 <button onClick={handleChange}>
    //                     <BsArrowLeft size={20}/>
    //                 </button>
    //             </div>
    //             <div className="h-[87.5%] justify-center">
    //                 <h1 className="font-bold font-size: 1.25rem line-height: 1.75rem; text-center text-white">Settings</h1>
    //                 <div className="justify-center align-text: text-center py-1">
    //                     <SettingsProfile></SettingsProfile>
    //                 </div>
    //                 <div className="justify-center align-text: text-center py-1">
                        
    //                     <label className="relative inline-flex items-center cursor-pointer">
    //                     <input type="checkbox" value="" className="sr-only peer" checked={locationSharingEnabled} onChange={handleToggleLocationSharing}/>
    //                     <div className="w-11 h-6 bg-cyan-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 dark:peer-focus:ring-cyan-800 rounded-full peer dark:bg-cyan-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-500"></div>
    //                     <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Location Sharing</span>
    //                     </label>

    //                 </div>
    //                 <div className="justify-center align-text: text-center py-1">
    //                     <DeleteAccountModal></DeleteAccountModal>
    //                 </div>    
    //             </div>
    //         </div>
    //     </>