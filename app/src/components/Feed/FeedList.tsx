import { RefObject, useRef, useState } from "react";
import useUserBullets, { FeedViews, NoteBullet } from "../../hooks/useUserBullets";
import SearchBar from "../SearchBar";
import FeedNoteItem from "./FeedNoteItem/FeedNoteItem";
import useComponentVisible from "../../hooks/useComponentVisible";
import { BsQuestion } from "react-icons/bs";
import SearchGuide from "./SearchGuide";
import SearchDropdown from "./SearchDropdown";
import FeedSelector from "./FeedSelector";

const FeedList: React.FC = () => {
  const [feedSelection, setFeedSelection] = useState<FeedViews>("Personal"); // personal, favorite, public
  const { bullets } = useUserBullets(feedSelection);
  const [searchCategory, setSearchCategory] = useState("All");
  const [search, setSearch] = useState({
    query: "",
    bulletsList: bullets
  });

  const listRef: RefObject<HTMLOListElement> = useRef(null);

  const handleTopOfList = () => {
    listRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const handleFeedSelectorChange = (selection: FeedViews) => {
    setFeedSelection(selection);
  }

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
    const searchQuery = e.target.value.toLowerCase();

    const results = bullets?.filter((bullet: NoteBullet) => {
      const bulletTextContent = bullet.bulletTextContent.toLowerCase();
      const bulletDay = dayMap.get(bullet.timestamp.toDate().getDay());
      const bulletMonth = monthMap.get(bullet.timestamp.toDate().getMonth());
      const bulletDate = bullet.timestamp.toDate().getDate().toString();
      const bulletYear = bullet.timestamp.toDate().getFullYear().toString();
      const bulletScore = bullet.score?.toString();

      switch (searchCategory.toLowerCase()) {
        // Advanced searching
        case "content": return bulletTextContent.includes(searchQuery);
        case "day": return bulletDay?.includes(searchQuery);
        case "month": return bulletMonth?.includes(searchQuery);
        case "date": return bulletDate?.includes(searchQuery);
        case "year": return bulletYear?.includes(searchQuery);
        case "score": return bulletScore === searchQuery;

        // General searching (All)
        default: {
          return  bulletTextContent.includes(searchQuery) ||
                  bulletDay?.includes(searchQuery) ||
                  bulletMonth?.includes(searchQuery) ||
                  bulletDate?.includes(searchQuery) ||
                  bulletYear?.includes(searchQuery) ||
                  bulletScore === searchQuery;
        }
      }
    })
    setSearch(() => ({
      query: e.target.value,
      bulletsList: results || []
    }));
  }

  const handleSearchCategoryChange = (category: string) => {
    setSearchCategory(category);
  }

  const searchGuideVisible = useComponentVisible(false);

  const handleSearchHowTo = () => {
    (searchGuideVisible.isComponentVisible) ? searchGuideVisible.setComponentVisible(false) : searchGuideVisible.setComponentVisible(true);
    handleTopOfList();
  }

  return (
    <ol ref={listRef} className="bg-white dark:bg-gray-800
                  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
      
      <div className="sticky -top-[1px] pb-1 bg-white dark:bg-gray-800 z-40 border-b border-black dark:border-gray-400">
        {/* FEED SELECTOR */}
        <FeedSelector handleTopOfList={handleTopOfList} feedSelection={feedSelection} handleFeedSelectorChange={handleFeedSelectorChange}/>

        {/* SEARCH */}
        <div ref={searchGuideVisible.ref} className="flex gap-1 px-2 pt-1">
          <SearchDropdown handleSearchCategoryChange={handleSearchCategoryChange}/>
          <SearchBar searchCategory={searchCategory} handleSearchChange={handleSearchChange}/>
          <button onClick={handleSearchHowTo}
                  className={`${searchGuideVisible.isComponentVisible ? "bg-gray-200 dark:bg-gray-900 outline outline-1 outline-gray-400" : ""}
                  hover:outline hover:outline-1 hover:outline-gray-400 rounded-lg dark:text-white`}>
            <BsQuestion size={27}/>
          </button>
        </div>
      </div>

      {/* SEARCH GUIDE */}
      {(searchGuideVisible.isComponentVisible) ? <SearchGuide /> : <></> }

      {(search.query === "")
        ?
          <>
            {/* NO QUERY -> show all bullets */}
            {bullets?.map((bullet: NoteBullet, index: number) => (
              <FeedNoteItem key={index} {...bullet} />
            ))}
          </>
        :
          (search.bulletsList?.length === 0)
              ?
                <div className="text-center dark:text-white pt-10 px-2">
                  <h1 className="font-bold">Nothing matches this search criteria.</h1>
                  <h1>Continue searching if you are trying to do an advanced search or try a new search.</h1>
                </div>
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