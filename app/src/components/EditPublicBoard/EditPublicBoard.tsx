import { ViewState } from "../../pages/Dashboard";
import { BsArrowLeft } from "react-icons/bs";

type EditPublicBoardProps = {
    updateViewState: (state: ViewState) => void
}

const EditPublicBoard: React.FC<EditPublicBoardProps> = ({updateViewState}) => {
    return (
        <div className={`py-2 px-4 md:px-[100px] lg:px-[200px] flex flex-col gap-6 flex-grow overflow-y-auto`}>
            {/* HEADER */}
            <div className="flex justify-between text-black dark:text-white">
                <button onClick={() => updateViewState("Home")}><BsArrowLeft size={20}/></button>
                <h1 className="text-xl font-bold text-black dark:text-white justify-end">Edit Your Public Board</h1>
            </div>

            {/* OVERFLOW DIV */}
            <div className="bg-red-500 w-full h-96 overflow-y-auto
                            scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
                            
            </div>
        </div>
    )
}

export default EditPublicBoard;