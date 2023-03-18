import FeedList from "../components/Feed/FeedList";
import LeftSidebar from "../components/LeftSidebar/LeftSidebar";
import WriteNoteModal from "../components/WriteNoteModal";
import RightSidebar from "../components/RightSidebar/RightSidebar";
import useComponentVisible from "../hooks/useComponentVisible";
import WeekCard from "../components/WeekCard";
import Navbar from "../components/Navbar/Navbar";
import { BsPencil } from "react-icons/bs";

const Dashboard: React.FC = () => { 
  const { ref, isComponentVisible, setComponentVisible } = useComponentVisible(false);    

  const handleFAB = () => {
      (isComponentVisible) ? setComponentVisible(false) : setComponentVisible(true);
  }

  const modalVisible = (isComponentVisible) ? "visible" : "hidden";
  
  return (
    <div ref={ref}>
      <div className="relative overflow-y-scroll h-screen w-screen flex flex-col bg-white dark:bg-gray-800">
        <Navbar />

        <div className="h-full flex flex-col gap-2 pt-2">
          <WeekCard />
          <div className="relative h-full flex lg:px-40 xl:px-64">
            <LeftSidebar handleWriteNoteModal={handleFAB}/>
            <FeedList />
            <RightSidebar />
          </div>
        </div>

        <WriteNoteModal setVisible={modalVisible} handleChange={handleFAB}/>
      </div>

      {/* WRITE NOTE FAB (Small screens only) */}
      <button onClick={handleFAB} className="absolute bottom-3 right-3 sm:hidden bg-cyan-500 rounded-full p-4">
        <BsPencil size={25} color="white"/>
      </button>
    </div>
  );
}

export default Dashboard;