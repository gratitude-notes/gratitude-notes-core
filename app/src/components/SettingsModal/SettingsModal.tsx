import { BsArrowLeft } from "react-icons/bs";

interface SettingsModalState {
    setVisible: "visible" | "hidden",
    handleChange: () => void
}

const SettingsModal: React.FC<SettingsModalState> = ({setVisible, handleChange}) => {

    return (
        <>
            <div className={`${setVisible} absolute z-50 h-screen w-screen bg-white
                            sm:h-[80%] sm:w-[550px] sm:rounded-3xl sm:top-20 sm:left-0 sm:right-0 sm:mx-auto
                            dark:bg-gray-800`}>
                {/* HEADER */}
                <div className="flex justify-between p-4 text-black dark:text-white">
                    <button onClick={handleChange}>
                        <BsArrowLeft size={20}/>
                    </button>
                    <h1>Settings Page</h1>
                </div>
            </div>

    
            {/* TRANSPARENT BACKGROUND ON LARGE SCREENS */}
            <div className={`${setVisible} absolute -z-50 sm:z-40 h-screen w-screen bg-black opacity-40`} />
        </>
    );
}

export default SettingsModal;