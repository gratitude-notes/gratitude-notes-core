import DotMenu from "../components/DotMenu";
interface NoteData {
    date: string,
    time: string,
    note: string,
    score: number
}

const NoteItem: React.FC<NoteData> = ({date, time, note, score}) => {  
    
    return (
        <ul className="mb-1">
            <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <DotMenu></DotMenu>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{date} {time}</time>
                <p className="font-normal text-gray-700 dark:text-gray-400">{note}</p>
                <h3 className="text-sm text-right font-semibold text-gray-900 dark:text-white">Score: {score}</h3>
            </a>
        </ul>
    )
  }
  
  export default NoteItem;
