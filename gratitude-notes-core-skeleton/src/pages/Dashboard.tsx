import FeedList from "../components/FeedList";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import Slider from "../components/ScoreSlider";

const Dashboard: React.FC = () => {  
  return (
    <div className="flex flex-col bg-white dark:bg-slate-800">
      {/* <LeftSidebar /> */}
      <FeedList />
      {/* <RightSidebar /> */}
      <Slider />
      
    </div>
  )
}

export default Dashboard;