import useNoteData from "../../hooks/useNoteData";
import FeedNoteItem from "./FeedNoteItem/FeedNoteItem";

const FeedList: React.FC = () => {
  const { notes } = useNoteData();

  return (
    <ol className="w-full overflow-y-scroll bg-white dark:bg-gray-800 pb-20 sm:pb-0
                  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
      {notes?.map((bullet, index) => (
        <FeedNoteItem key={index} {...bullet} />
      ))}
    </ol>
  )
}

export default FeedList;