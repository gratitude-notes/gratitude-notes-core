import { useState } from "react";
import { BsChevronDown, BsSearch } from "react-icons/bs";

const Searchbar: React.FC = () => {  

    const [currentSearch, setCurrentSearch] = useState("Search by");

    const updateCurrentSearch = (current: string) => {
        if ((current === "Keywords") || (current === "Score")) setCurrentSearch(current);
        else setCurrentSearch("Search by");
    }

    return (
        <form className="border border-red-500 flex flex-wrap gap-1 items-center text-md font-semibold text-black dark:text-white">
            <div className="cursor-pointer flex gap-2 items-center">
                <div>{currentSearch}</div>
                <BsChevronDown />
            </div>
            <input className="flex-grow" type="search" name="search" placeholder={`Search for${(currentSearch === "Search by") ? "" : " " + currentSearch}...`}/>
            <BsSearch className="cursor-pointer" size={20}/>
        </form>
    );
}

export default Searchbar;