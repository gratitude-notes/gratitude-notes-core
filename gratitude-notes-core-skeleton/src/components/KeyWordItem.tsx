import { useState } from "react";

//import DotMenu from "../components/DotMenu";
interface Keyword {
    keywords: string[];
}

const keywords = ['react', 'javascript', 'tailwindcss', 'web development', 'frontend'];

const KeyWordItem: React.FC<Keyword> = ({keywords}) => {  
    
    return (
        <ul className="mb-1">
            {keywords.map((keyword: string) => (
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{keyword}</span>
            ))}
        </ul>
    )
  }
  
  export default KeyWordItem;
