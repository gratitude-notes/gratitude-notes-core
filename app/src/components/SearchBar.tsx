
type SearchbarProps = {
    searchCategory: string;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({searchCategory, handleSearchChange}) => {  

    return (
        <input id="searchbar" className="w-full px-2 py-1
                        bg-gray-200 dark:bg-gray-900 
                        focus:bg-white focus:dark:bg-gray-800
                        focus:border-none focus:outline-2 focus:outline-cyan-500
                        text-black dark:text-white 
                        rounded-lg
                        select-none"
                        type="search" placeholder={`Search by ${searchCategory.toLowerCase()}`} onChange={handleSearchChange}/>
    );
}

export default Searchbar;