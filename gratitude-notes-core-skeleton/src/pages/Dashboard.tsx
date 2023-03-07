import FeedList from "../components/FeedList";

const Dashboard: React.FC = () => {  
  return (
    <div className="h-screen bg-green-300 dark:bg-slate-600">
      <FeedList />
    </div>
  )
}

export default Dashboard;