import useNoteData from "../../hooks/useNoteData";
import WriteNoteFAB from "../WriteNoteFAB";
import FeedNoteItem from "./FeedNoteItem/FeedNoteItem";

const FeedList: React.FC = () => {

  const { notes } = useNoteData();

  return (
    <ol className="w-full overflow-y-scroll">
      {notes?.map((bullet, index) => (
        <FeedNoteItem key={index} {...bullet} />
      ))}
    </ol>
  )
}

export default FeedList;