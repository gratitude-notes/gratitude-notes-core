interface NoteData {
    date: string,
    time: string,
    note: string,
    score: number
}

const NoteItem: React.FC<NoteData> = ({date, time, note, score}) => {  
    return (
        <li className="mb-1">
            <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                <time className="mb-1 text-sm font-normal leading-none text-gray-400">{date} {time}</time>
                <p className="font-normal text-gray-700 dark:text-gray-400">{note}</p>
                <h3 className="text-sm text-right font-semibold text-gray-900">Score: {score}</h3>
            </a>
        </li>
    )
  }
  
  export default NoteItem;