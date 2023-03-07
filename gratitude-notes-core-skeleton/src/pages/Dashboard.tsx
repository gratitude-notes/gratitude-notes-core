import FeedList from "../components/FeedList";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

const Dashboard: React.FC = () => {  
  return (
    <div className="flex h-screen bg-white dark:bg-slate-800">
      <LeftSidebar />
      <FeedList />
      <RightSidebar />
    </div>
  )
}

export default Dashboard;