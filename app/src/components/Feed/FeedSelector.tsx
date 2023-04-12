import { useState } from "react";
import { FeedViews } from "../../hooks/useUserBullets";

type FeedSelectorProps = {
    handleTopOfList: () => void,
    feedSelection: FeedViews,
    handleFeedSelectorChange: (selection: FeedViews) => void
}

const FeedSelector: React.FC<FeedSelectorProps> = ({handleTopOfList, feedSelection, handleFeedSelectorChange}) => {  
    const [currentfeedSelection, setCurrentfeedSelection] = useState(feedSelection);

    return (
        <div className="grid grid-cols-3 px-2 text-center text-black dark:text-white">
            <div onClick={() => {handleFeedSelectorChange("Personal"); setCurrentfeedSelection("Personal"); handleTopOfList();}} 
                className={`${currentfeedSelection === "Personal" ? "border-b-2 border-b-cyan-500" : "text-gray-400"} rounded-t-md hover:bg-gray-200 hover:dark:bg-gray-900 cursor-pointer py-2`}>
                Personal
            </div>
            <div onClick={() => {handleFeedSelectorChange("Favorites"); setCurrentfeedSelection("Favorites"); handleTopOfList(); }}
                className={`${currentfeedSelection === "Favorites" ? "border-b-2 border-b-cyan-500" : "text-gray-400"} rounded-t-md hover:bg-gray-200 hover:dark:bg-gray-900 cursor-pointer py-2`}>
                Favorites
            </div>
            <div onClick={() => {handleFeedSelectorChange("Public"); setCurrentfeedSelection("Public"); handleTopOfList(); }}
                className={`${currentfeedSelection === "Public" ? "border-b-2 border-b-cyan-500" : "text-gray-400"} rounded-t-md hover:bg-gray-200 hover:dark:bg-gray-900 cursor-pointer py-2`}>
                Public
            </div>
        </div>
    );
}

export default FeedSelector;