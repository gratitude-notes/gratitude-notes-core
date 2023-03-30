import useUserBullets, { NoteBullet } from "../../hooks/useUserBullets";
import Searchbar from "../Searchbar";
import FeedNoteItem from "./FeedNoteItem/FeedNoteItem";

const FeedList: React.FC = () => {
  const { bullets } = useUserBullets();

  return (
    <ol className="bg-white dark:bg-gray-800
                  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
      {/* SEARCH FOR MOBILE */}
      <div className="xl:hidden">
        <Searchbar />
      </div>

      {/* BULLETS LIST */}
      {bullets?.map((bullet: NoteBullet, index: number) => (
        <FeedNoteItem key={index} {...bullet} />
      ))}
    </ol>
  )
}

export default FeedList;