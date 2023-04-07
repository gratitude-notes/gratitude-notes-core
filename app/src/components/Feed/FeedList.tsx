import { useState } from "react";
import useUserBullets, { NoteBullet } from "../../hooks/useUserBullets";
import SearchBar from "../SearchBar";
import FeedNoteItem from "./FeedNoteItem/FeedNoteItem";
import useComponentVisible from "../../hooks/useComponentVisible";
import { BsQuestion } from "react-icons/bs";

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
      const bulletScore = bullet.score?.toString();

      return  bulletTextContent.includes(value) ||
              bulletDay?.includes(value) ||
              bulletMonth?.includes(value) ||
              bulletDate?.includes(value) ||
              bulletYear?.includes(value) ||
              bulletScore?.includes(value);
    })
    setSearch(() => ({
      query: e.target.value,
      bulletsList: results || []
    }));
  }

  const searchGuideVisible = useComponentVisible(false);

  const handleSearchHowTo = () => {
    (searchGuideVisible.isComponentVisible) ? searchGuideVisible.setComponentVisible(false) : searchGuideVisible.setComponentVisible(true);
  }

  const searchGuideVisibility = (searchGuideVisible.isComponentVisible) ? "visible" : "hidden";

  return (
    <ol className="bg-white dark:bg-gray-800
                  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
      {/* SEARCH */}
      <div ref={searchGuideVisible.ref} className="flex gap-2 px-2 pt-1">
        <SearchBar handleSearchChange={handleSearchChange}/>
        <button onClick={handleSearchHowTo}
                className={`${searchGuideVisible.isComponentVisible ? "bg-gray-200 dark:bg-gray-900 outline outline-1 outline-gray-400" : ""}
                hover:outline hover:outline-1 hover:outline-gray-400 rounded-lg dark:text-white`}>
          <BsQuestion size={27}/>
        </button>
      </div>

      {/* SEARCH GUIDE */}
      <div className={`${searchGuideVisibility} bg-gray-200 dark:bg-gray-900 rounded-lg mx-2 mt-1`}>
        <div className="px-3 dark:text-white">
          <h1 className="text-lg text-center">How to search:</h1>
          <hr className="border border-gray-400 dark:border-gray-600"/>

          <h1 className="text-sm text-center"><strong>Search by...</strong></h1>
          <div className="flex justify-center pb-2">
            <ul className="list-disc text-sm">
              <li><strong>Content</strong> - ex: "apple"</li>
              <li><strong>Day</strong> - ex: "Monday"</li>
              <li><strong>Month</strong> - ex: "March"</li>
              <li><strong>Date</strong> - ex: "15"</li>
              <li><strong>Year</strong> - ex: "2020"</li>
              <li><strong>Score</strong> - ex: -2, -1, 0, 1, 2</li>
            </ul>
          </div>
         

        </div>
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