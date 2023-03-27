import useUserBullets, { NoteBullet } from "../../hooks/useUserBullets";
import FeedNoteItem from "./FeedNoteItem/FeedNoteItem";

const FeedList: React.FC = () => {
  const { bullets } = useUserBullets();
  console.log(bullets);
  return (
    <ol className="w-full overflow-y-scroll bg-white dark:bg-gray-800 sm:pb-0
                  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
      {bullets?.map((bullet: NoteBullet, index: number) => (
        <FeedNoteItem key={index} bulletJSON={bullet.bulletJSON} keywords={bullet.keywords} score={bullet.score} timestamp={bullet.timestamp} />
      ))}
    </ol>
  )
}

export default FeedList;