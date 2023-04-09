import SadEmoji from "../../assets/emojis/sad_emoji.png";
import SlightlySadEmoji from "../../assets/emojis/slightly_sad_emoji.png";
import NeutralEmoji from "../../assets/emojis/neutral_emoji.png";
import SlightlyHappyEmoji from "../../assets/emojis/slightly_happy_emoji.png";
import HappyEmoji from "../../assets/emojis/happy_emoji.png";

const SearchGuide: React.FC = () => {  

    return (
        <div className={`bg-gray-200 dark:bg-gray-900 rounded-lg mx-2 mt-1`}>
            <div className="px-3 dark:text-white">
                <h1 className="text-lg text-center">How to search:</h1>
                <hr className="border border-gray-400 dark:border-gray-600"/>
                <div className="py-1">
                    <h1 className="text-sm text-center"><strong>Search by all</strong></h1>
                    <h1 className="text-sm text-center">Type anything to search your past - ex: "oranges"</h1>
                </div>
                <hr className="border border-gray-400 dark:border-gray-600"/>
                <div className="py-1">
                    <h1 className="text-sm text-center"><strong>Advanced Search</strong></h1>
                    <h1 className="text-sm"><strong>Search by...</strong></h1>
                    <div className="flex flex-col gap-2 pb-2">
                        <ul className="list-disc text-sm pl-4">
                            <li><strong>content</strong> - ex: "happy"</li>
                            <li><strong>day</strong> - ex: "monday"</li>
                            <li><strong>month</strong> - ex: "march"</li>
                            <li><strong>date</strong> - ex: "15"</li>
                            <li><strong>year</strong> - ex: "2020"</li>
                            <li><strong>score</strong> - ex: "2"</li>
                        </ul>
                        <div className="text-sm grid grid-cols-6 grid-rows-2 gap-2 text-center dark:text-white">
                            <h1 className="font-bold">Score</h1>
                            <h1>-2</h1>
                            <h1>-1</h1>
                            <h1>0</h1>
                            <h1>1</h1>
                            <h1>2</h1>
                            <h1 className="font-bold">Emoji</h1>
                            <img className="w-[25px] mx-auto" src={SadEmoji} alt="sad emoji..."/>
                            <img className="w-[25px] mx-auto" src={SlightlySadEmoji} alt="slightly sad emoji..."/>
                            <img className="w-[25px] mx-auto" src={NeutralEmoji} alt="neutral emoji..."/>
                            <img className="w-[25px] mx-auto" src={SlightlyHappyEmoji} alt="slightly happy emoji..."/>
                            <img className="w-[25px] mx-auto" src={HappyEmoji} alt="happy emoji..."/>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default SearchGuide;

