import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import useComponentVisible from "../../hooks/useComponentVisible";
import { useState } from "react";

type SearcDropdownProps = {
    handleSearchCategoryChange: (category: string) => void;
}

const SearchDropdown: React.FC<SearcDropdownProps> = ({handleSearchCategoryChange}) => {  

    const [dropdownCategory, setDropdownCategory] = useState("All");
    const dropdownVisible = useComponentVisible(false);

    const handleDropdown = () => {
        (dropdownVisible.isComponentVisible) ? dropdownVisible.setComponentVisible(false) : dropdownVisible.setComponentVisible(true);
    }

    const dropdownVisibilityState = (dropdownVisible.isComponentVisible) ? "visible" : "hidden";

    return (
        <div ref={dropdownVisible.ref}
            className="relative flex justify-center items-center">
            <div onClick={handleDropdown}
                className={`${dropdownVisible.isComponentVisible ? "bg-gray-200 dark:bg-gray-900 outline outline-1 outline-gray-400" : ""}
                            gap-2 px-3 py-1 flex items-center hover:outline hover:outline-1 hover:outline-gray-400 rounded-lg dark:text-white cursor-pointer`}>
                <h1>{dropdownCategory}</h1>
                {(dropdownVisible.isComponentVisible) ? <BsChevronRight /> : <BsChevronDown />}
            </div>

            {/* Dropdown Menu */}
            <div className={`${dropdownVisibilityState} absolute top-[112%] w-full z-50 rounded-lg border border-gray-400 dark:border-gray-600`}>
                <div className="flex flex-col gap-1 bg-gray-200 dark:bg-gray-900 rounded-lg text-black dark:text-white">
                    <div onClick={() => {handleSearchCategoryChange("All"); setDropdownCategory("All");}}
                        className={`${dropdownCategory === "All" ? "hidden" : "visible"}
                                    cursor-pointer px-2 py-[2px] text-sm
                                    hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in`}>
                        All
                    </div>
                    <div onClick={() => {handleSearchCategoryChange("Content"); setDropdownCategory("Content");}}
                        className={`${dropdownCategory === "Content" ? "hidden" : "visible"}
                                    cursor-pointer px-2 py-[2px] text-sm
                                    hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in`}>
                        Content
                    </div>
                    <div onClick={() => {handleSearchCategoryChange("Day"); setDropdownCategory("Day");}}
                        className={`${dropdownCategory === "Day" ? "hidden" : "visible"}
                                    cursor-pointer px-2 py-[2px] text-sm
                                    hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in`}>
                        Day
                    </div>
                    <div onClick={() => {handleSearchCategoryChange("Month"); setDropdownCategory("Month");}}
                        className={`${dropdownCategory === "Month" ? "hidden" : "visible"}
                                    cursor-pointer px-2 py-[2px] text-sm
                                    hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in`}>
                        Month
                    </div>
                    <div onClick={() => {handleSearchCategoryChange("Date"); setDropdownCategory("Date");}}
                        className={`${dropdownCategory === "Date" ? "hidden" : "visible"}
                                    cursor-pointer px-2 py-[2px] text-sm
                                    hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in`}>
                        Date
                    </div>   
                    <div onClick={() => {handleSearchCategoryChange("Year"); setDropdownCategory("Year");}}
                        className={`${dropdownCategory === "Year" ? "hidden" : "visible"}
                                    cursor-pointer px-2 py-[2px] text-sm
                                    hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in`}>
                        Year
                    </div> 
                    <div onClick={() => {handleSearchCategoryChange("Score"); setDropdownCategory("Score");}}
                        className={`${dropdownCategory === "Score" ? "hidden" : "visible"}
                                    cursor-pointer px-2 py-[2px] text-sm
                                    hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in`}>
                        Score
                    </div>      
                </div>
            </div>    
        </div>
    );
}

export default SearchDropdown;

{/* <li><strong>Content</strong> - ex: "content:happy"</li>
                            <li><strong>Day</strong> - ex: "day:monday"</li>
                            <li><strong>Month</strong> - ex: "month:march"</li>
                            <li><strong>Date</strong> - ex: "date:15"</li>
                            <li><strong>Year</strong> - ex: "year:2020"</li>
                            <li><strong>Emoji Score</strong> - ex: "score:-2"</li> */}