import { useState } from "react";

type FeedSelectorProps = {
    feedSelection: string,
    handleFeedSelectorChange: (selection: string) => void
}

const FeedSelector: React.FC<FeedSelectorProps> = ({feedSelection, handleFeedSelectorChange}) => {  
    const [currentfeedSelection, setCurrentfeedSelection] = useState(feedSelection);

    return (
        <div className="grid grid-cols-3 px-2 text-center text-black dark:text-white">
            <div onClick={() => {handleFeedSelectorChange("Personal"); setCurrentfeedSelection("Personal"); }} 
                className={`${currentfeedSelection === "Personal" ? "border-b-2 border-b-cyan-500" : "text-gray-400"} hover:bg-gray-200 hover:dark:bg-gray-900 cursor-pointer`}>
                Personal
            </div>
            <div onClick={() => {handleFeedSelectorChange("Favorites"); setCurrentfeedSelection("Favorites"); }}
                className={`${currentfeedSelection === "Favorites" ? "border-b-2 border-b-cyan-500" : "text-gray-400"} hover:bg-gray-200 hover:dark:bg-gray-900 cursor-pointer`}>
                Favorites
            </div>
            <div onClick={() => {handleFeedSelectorChange("Public"); setCurrentfeedSelection("Public"); }}
                className={`${currentfeedSelection === "Public" ? "border-b-2 border-b-cyan-500" : "text-gray-400"} hover:bg-gray-200 hover:dark:bg-gray-900 cursor-pointer`}>
                Public
            </div>
        </div>
    );
}

export default FeedSelector;