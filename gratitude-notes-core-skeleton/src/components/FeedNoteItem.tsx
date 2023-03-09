import DotMenu from "../components/DotMenu";
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
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography {keyword}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                <time className="block absolute right-10 mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{date} {time}</time>
            </a>
        </ul>
    )
  }
  
  export default NoteItem;
