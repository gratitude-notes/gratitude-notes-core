interface Keyword {
    keywords: string[];
}


const KeyWordItem: React.FC<Keyword> = ({keywords}) => {  
    
    return (
        <ul className="mb-1">
            {keywords.map((keyword: string, index) => (
                <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-cyan-500 mr-1">#{keyword}</span>
            ))}
        </ul>
    )
  }
  
  export default KeyWordItem;