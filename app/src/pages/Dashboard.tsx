import FeedList from "../components/FeedList";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import Slider from "../components/ScoreSlider";
import SearchBar from "../components/searchBar";
import LikeButton from "../components/LikeButton";

const Dashboard: React.FC = () => {  
  return (
    <div className="flex flex-col bg-white dark:bg-slate-800">
      {/* <LeftSidebar /> */}
      <FeedList />
      {/* <RightSidebar /> */}

      <Slider />
      <SearchBar/>
      <div>
        <LikeButton></LikeButton>
      </div>
    
      
    </div>
  )
}

export default Dashboard;