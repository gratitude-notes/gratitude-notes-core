import DotMenu from "./DotMenu";
import KeyWordItem from "./KeyWordItem";
import LikeButton from "./LikeButton";

interface FeedNoteItemType {
    date: string,
    time: string,
    note: string,
    score: number,
    keywordsArray: string[]
}

const NoteItem: React.FC<FeedNoteItemType> = ({date, time, note, score, keywordsArray}) => {  
    return (
        <ul className="mb-2">
            <div className="bg-white border border-black rounded-lg shadow hover:bg-gray-100">
                {/* Header */}
                <div className="relative">
                    <div className="absolute top-2 right-2">
                        <DotMenu />
                    </div>
                </div>

                {/* Main Content */}
                <div className="pl-6 pt-6 pr-6">
                    <p className="font-normal text-gray-700 break-words dark:text-gray-400">{note}</p>
                    <KeyWordItem keywords={keywordsArray} />
                </div>

                {/* Footer */}
                <div className="relative pl-6 pt-2 pr-6 pb-6">
                    <div className="absolute left-6">
                        <LikeButton />
                    </div>
                    <div className="absolute right-6">
                        <time className="block text-sm font-normal leading-none text-gray-400">{date} {time}</time>
                    </div>
                </div>
            </div>
        </ul>
    )
  }
  
  export default NoteItem;