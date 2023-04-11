import { BsArrowLeft } from "react-icons/bs";
import { useParams, Link } from "react-router-dom";

const UserPublicBoard: React.FC = () => {
    let params = useParams();
    const userID = params.userID;

    return (
        <div className={`dark:bg-gray-800 py-2 px-4 md:px-[100px] lg:px-[200px] flex flex-col gap-6`}>
            {/* HEADER */}
            <div className="flex justify-between text-black dark:text-white">
                <Link to="/"><BsArrowLeft size={20}/></Link>
                <h1 className="text-xl font-bold text-black dark:text-white justify-end">{userID} Public Board</h1>
            </div>

            {/* OVERFLOW DIV */}
            <div className="bg-red-500 h-[2000px] overflow-y-auto
                            scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
                            
            </div>
        </div>
    )
}

export default UserPublicBoard;