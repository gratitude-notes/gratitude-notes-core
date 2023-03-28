import useUserBullets, { NoteBullet } from "../../hooks/useUserBullets";
import FeedNoteItem from "./FeedNoteItem/FeedNoteItem";

const FeedList: React.FC = () => {
  const { bullets } = useUserBullets();

  return (
    <ol className="flex-grow overflow-y-scroll bg-white dark:bg-gray-800
                  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
      {bullets?.map((bullet: NoteBullet, index: number) => (
        <FeedNoteItem key={index} {...bullet} />
      ))}
      <div className="h-[1000px] bg-red-500">

      </div>
    </ol>
  )
}

export default FeedList;