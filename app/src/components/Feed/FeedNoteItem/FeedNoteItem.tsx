import DotMenu from "./DotMenu";
import KeyWordItem from "./KeyWordItem";
import LikeButton from "./LikeButton";

interface NoteData {
    date: string,
    time: string,
    note: string,
    score: number,
    keywordsStr: string[]
}

const NoteItem: React.FC<NoteData> = ({date, time, note, score, keywordsStr}) => {  
    return (
        <ul className="mb-1">
            <a href="#" className="block p-6 bg-white border border-black rounded-lg shadow hover:bg-gray-100">
            <DotMenu></DotMenu>
                <p className="font-normal text-gray-700 dark:text-gray-400">{note}</p>
                <div>
                <KeyWordItem keywords={keywordsStr}></KeyWordItem>
                </div>
                <time className="block absolute right-10 mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{date} {time}</time>
                <LikeButton />
                {/* <Guage value={score}></Guage> */}
            </a>
        </ul>
    )
  }
  
  export default NoteItem;
