import useNoteData from "../../hooks/useNoteData";
import FeedNoteItem from "./FeedNoteItem/FeedNoteItem";

const FeedList: React.FC = () => {

  const { notes } = useNoteData();

  return (
    <ol className="w-full">
      {notes?.map((bullet, index) => (
        <FeedNoteItem key={index} {...bullet} />
      ))}
    </ol>
  )
}

export default FeedList;