const KeyWordItem: React.FC<{keywords : string[]}> = ({keywords} : {keywords : string[]}) => {  
    
    return (
        <div>
            {keywords.map((keyword: string, index) => (
                <div key={index} className="inline-block bg-gray-200 rounded-full m-0.5 px-2 py-0.5 text-sm font-semibold text-cyan-500">#{keyword}</div>
            ))}
        </div>
    )
  }
  
  export default KeyWordItem;