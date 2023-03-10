import DotMenu from "../components/DotMenu";
import KeyWordItem from "./KeyWordItem";
interface NoteData {
    date: string,
    time: string,
    note: string,
    score: number,
    keyword: string
}

const NoteItem: React.FC<NoteData> = ({date, time, note, score, keyword}) => {  
    
    return (
        <ul className="mb-1">
            <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <DotMenu></DotMenu>
                <p className="font-normal text-gray-700 dark:text-gray-400">{note}</p>
                <h3 className="text-sm text-right font-semibold text-gray-900 dark:text-white">Score: {score}</h3>
                <div>
                <KeyWordItem keywords={["sad", "happy"]}></KeyWordItem>
                </div>
                <time className="block absolute right-10 mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{date} {time}</time>
            </a>
        </ul>
    )
  }
  
  export default NoteItem;
