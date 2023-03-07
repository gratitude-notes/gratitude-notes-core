import FeedList from "../components/FeedList";

const Dashboard: React.FC = () => {  
  return (
    <div className="flex h-screen bg-green-300 dark:bg-slate-600">
      <FeedList />
    </div>
  )
}

export default Dashboard;