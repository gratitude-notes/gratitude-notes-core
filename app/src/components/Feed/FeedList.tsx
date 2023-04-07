import { useState } from "react";
import useUserBullets, { NoteBullet } from "../../hooks/useUserBullets";
import SearchBar from "../SearchBar";
import FeedNoteItem from "./FeedNoteItem/FeedNoteItem";
import useComponentVisible from "../../hooks/useComponentVisible";

const FeedList: React.FC = () => {
  const { bullets } = useUserBullets();
  const [search, setSearch] = useState({
    query: "",
    bulletsList: bullets
  });

  const dayMap = new Map<Number, string>();
  dayMap.set(0, "sunday");
  dayMap.set(1, "monday");
  dayMap.set(2, "tuesday");
  dayMap.set(3, "wednesday");
  dayMap.set(4, "thursday");
  dayMap.set(5, "friday");
  dayMap.set(6, "saturday");

  const monthMap = new Map<Number, string>();
  monthMap.set(0, "january");
  monthMap.set(1, "february");
  monthMap.set(2, "march");
  monthMap.set(3, "april");
  monthMap.set(4, "may");
  monthMap.set(5, "june");
  monthMap.set(6, "july");
  monthMap.set(7, "august");
  monthMap.set(8, "september");
  monthMap.set(9, "october");
  monthMap.set(10, "november");
  monthMap.set(11, "december");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const results = bullets?.filter((bullet: NoteBullet) => {
      if (e.target.value === "") return bullets;
      
      const value = e.target.value.toLowerCase();
      const bulletTextContent = bullet.bulletTextContent.toLowerCase();
      const bulletDay = dayMap.get(bullet.timestamp.toDate().getDay());
      const bulletMonth = monthMap.get(bullet.timestamp.toDate().getMonth());
      const bulletDate = bullet.timestamp.toDate().getDate().toString();
      const bulletYear = bullet.timestamp.toDate().getFullYear().toString();

      return  bulletTextContent.includes(value) ||
              bulletDay?.includes(value) ||
              bulletMonth?.includes(value) ||
              bulletDate?.includes(value) ||
              bulletYear?.includes(value);
    })
    setSearch(() => ({
      query: e.target.value,
      bulletsList: results || []
    }));
  }

  const searchHowToVisible = useComponentVisible(false);

  return (
    <ol className="bg-white dark:bg-gray-800
                  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
      {/* SEARCH FOR MOBILE */}
      <div className="px-2 xl:hidden">
        <SearchBar handleSearchChange={handleSearchChange}/>
      </div>

      {(search.query === "")
        ?
          <>
            {/* NO QUERY -> show all bullets */}
            {bullets?.map((bullet: NoteBullet, index: number) => (
              <FeedNoteItem key={index} {...bullet} />
            ))}
          </>
        :
          <>
            {/* QUERIED LIST */}
            {search.bulletsList?.map((bullet: NoteBullet, index: number) => (
              <FeedNoteItem key={index} {...bullet} />
            ))}
          </>
      }

    </ol>
  )
}

export default FeedList;