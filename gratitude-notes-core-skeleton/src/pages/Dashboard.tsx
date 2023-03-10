import AddNoteFAB from "../components/AddNoteFAB";
import FeedList from "../components/FeedList";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

const Dashboard: React.FC = () => {  
  return (
    <div className="flex h-screen bg-white dark:bg-slate-800">
      <LeftSidebar />
      <FeedList />
      <RightSidebar />
      <AddNoteFAB />
    </div>
  )
}

export default Dashboard;