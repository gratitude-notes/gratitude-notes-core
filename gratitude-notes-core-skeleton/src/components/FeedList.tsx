import FeedItem from "./FeedItem";


const FeedList: React.FC = () => {  
    return (
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
            <FeedItem />
            <FeedItem /> 
            <FeedItem />               
        
        </ol>
    )
  }
  
  export default FeedList;