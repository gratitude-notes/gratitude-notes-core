import { useState } from "react";
import { BsChevronDown, BsSearch } from "react-icons/bs";
import useComponentVisible from "../hooks/useComponentVisible";

const Searchbar: React.FC = () => {  

    const [currentSearchCatergory, setCurrentSearchCatergory] = useState("Search by");
    const [search, setSearch] = useState('');

    const updateCurrentSearch = (current: string) => {
        if ((current === "Favorites") || (current === "Keywords") || (current === "Scores")) setCurrentSearchCatergory(current);
        else setCurrentSearchCatergory("Search by");
    }

    const searchDropdownVisible = useComponentVisible(false);

    const handleSearchDropdown = () => {
        (searchDropdownVisible.isComponentVisible) ? searchDropdownVisible.setComponentVisible(false) : searchDropdownVisible.setComponentVisible(true);
    }

    const searchDropdownState = (searchDropdownVisible.isComponentVisible) ? "visible" : "hidden";
    
    const handleSearchButton = () => {

        setCurrentSearchCatergory("Search by");
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
          console.log('✅ Enter key pressed');
        }
    
        // 👇️ access input value from state
        console.log(search);
    
        // 👇️ access input value from event object
        // console.log(event.target.value)
      };

    const searchInputState = (currentSearchCatergory === "Search by") ? true : false;

    return (
        <div ref={searchDropdownVisible.ref} className="relative px-2 xl:px-0">
            <form className="p-1 flex flex-wrap border border-gray-400 dark:border-gray-600 rounded-lg xl:border-0 items-center text-md font-semibold text-black dark:text-white">
                <div onClick={handleSearchDropdown} className="gap-2 flex hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md cursor-pointer items-center">
                    <div>{currentSearchCatergory}</div>
                    <BsChevronDown />
                </div>

                <input className="flex-grow px-1 border border-gray-400 dark:border-gray-600 text-black rounded-lg" type="search" name="search"
                        placeholder={`Search${(currentSearchCatergory === "Search by") ? "" : " " + currentSearchCatergory}...`}
                        disabled={(searchInputState === true) ? true : false}
                        onChange={event => setSearch(event.target.value)}
                        onKeyDown={handleKeyDown}/>
            </form>

            {/* Dropdown Menu */}
            <div className={`${searchDropdownState} absolute top-full z-50`}>
                <div className="flex flex-col gap-1 bg-white dark:bg-gray-800 rounded-md text-black dark:text-white shadow-lg shadow-gray-900">
                    <div onClick={() => {updateCurrentSearch("Favorites"); handleSearchDropdown();}}
                        className="cursor-pointer p-2 text-sm
                                    hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in">
                        Favorites
                    </div>
                    <div onClick={() => {updateCurrentSearch("Keywords"); handleSearchDropdown();}}
                        className="cursor-pointer p-2 text-sm
                                    hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in">
                        Keywords
                    </div>
                    <div onClick={() => {updateCurrentSearch("Scores"); handleSearchDropdown();}}
                        className="cursor-pointer p-2 text-sm
                                    hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in">
                        Scores
                    </div>      
                </div>
            </div>
        </div>
    );
}

export default Searchbar;