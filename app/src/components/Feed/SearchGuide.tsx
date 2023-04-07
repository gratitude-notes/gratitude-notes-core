
const SearchGuide: React.FC = () => {  

    return (
        <div className={`bg-gray-200 dark:bg-gray-900 rounded-lg mx-2 mt-1`}>
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
    );
}

export default SearchGuide;