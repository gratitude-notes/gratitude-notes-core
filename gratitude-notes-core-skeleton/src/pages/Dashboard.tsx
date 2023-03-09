import FeedList from "../components/FeedList";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import Slider from "../components/ScoreSlider";

const Dashboard: React.FC = () => {  
  return (
    <div className="flex h-screen bg-white dark:bg-slate-800">
      <LeftSidebar />
      {/* <FeedList /> */}
      <RightSidebar />
      <div className="App">
      <Slider />
      </div>
    </div>
  )
}

export default Dashboard;