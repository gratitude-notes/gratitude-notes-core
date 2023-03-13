import FeedList from "../components/FeedList";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import Slider from "../components/ScoreSlider";
import SearchBar from "../components/searchBar";

const Dashboard: React.FC = () => {  
  return (
    <div className="flex flex-col bg-white dark:bg-slate-800">
      {/* <LeftSidebar /> */}
      <FeedList />
      {/* <RightSidebar /> */}

      <Slider />
      <SearchBar/>
      
    </div>
  )
}

export default Dashboard;