import FeedList from "../components/Feed/FeedList";
import LeftSidebar from "../components/LeftSidebar";
import WriteNoteModal from "../components/WriteNoteModal";
import RightSidebar from "../components/RightSidebar";
import useComponentVisible from "../hooks/useComponentVisible";
import WeekCard from "../components/WeekCard";
import Navbar from "../components/Navbar/Navbar";

const Dashboard: React.FC = () => { 
  const { ref, isComponentVisible, setComponentVisible } = useComponentVisible(false);    

  const handleFAB = () => {
      (isComponentVisible) ? setComponentVisible(false) : setComponentVisible(true);
  }

  const modalVisible = (isComponentVisible) ? "visible" : "hidden";
  
  return (
    <div ref={ref}>
      <div className="overflow-y-scroll h-screen w-screen flex flex-col">
        <Navbar />

        <div className="h-full flex flex-col gap-2 pt-2">
          <WeekCard />
          <div className="h-full flex md:px-10 xl:px-20">
            <LeftSidebar />
            <FeedList />
            <RightSidebar />
          </div>
        </div>
      </div>

      <button onClick={handleFAB} className="fixed bottom-2 right-2 text-white bg-black rounded-full p-2">
        Write note
      </button>

      <WriteNoteModal setVisible={modalVisible} handleChange={handleFAB}/>
    </div>
  );
}

export default Dashboard;