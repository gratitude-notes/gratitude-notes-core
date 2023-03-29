import { useState } from "react";
import { BsChevronDown, BsSearch } from "react-icons/bs";
import useComponentVisible from "../hooks/useComponentVisible";

const Searchbar: React.FC = () => {  

    const [currentSearch, setCurrentSearch] = useState("Search by");

    const updateCurrentSearch = (current: string) => {
        if ((current === "Favorites") || (current === "Keywords") || (current === "Scores")) setCurrentSearch(current);
        else setCurrentSearch("Search by");
    }

    const searchDropdownVisible = useComponentVisible(false);

    const handleSearchDropdown = () => {
        (searchDropdownVisible.isComponentVisible) ? searchDropdownVisible.setComponentVisible(false) : searchDropdownVisible.setComponentVisible(true);
    }

    const searchDropdownState = (searchDropdownVisible.isComponentVisible) ? "visible" : "hidden";
    
    const handleSearchButton = () => {

        setCurrentSearch("Search by");
    }

    return (
        <div ref={searchDropdownVisible.ref} className="relative">
            <form className="py-1 border border-gray-400 rounded-lg px-2 sm:px-0 flex flex-wrap gap-2 items-center text-md font-semibold text-black dark:text-white">
                <div onClick={handleSearchDropdown} className="cursor-pointer flex gap-2 items-center">
                    <div>{currentSearch}</div>
                    <BsChevronDown />
                </div>
                <input className="flex-grow" type="search" name="search" placeholder={`Search${(currentSearch === "Search by") ? "" : " " + currentSearch}...`}/>
                <BsSearch onClick={handleSearchButton} className="cursor-pointer" size={20}/>
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