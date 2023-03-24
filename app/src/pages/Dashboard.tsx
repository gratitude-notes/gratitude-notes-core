import FeedList from "../components/Feed/FeedList";
import LeftSidebar from "../components/LeftSidebar/LeftSidebar";
import WriteNoteModal from "../components/WriteNoteSequence/WriteNoteModal";
import RightSidebar from "../components/RightSidebar/RightSidebar";
import useComponentVisible from "../hooks/useComponentVisible";
import WeekCard from "../components/WeekCard";
import Navbar from "../components/Navbar/Navbar";
import { BsPencil } from "react-icons/bs";
import FooterNavbar from "../components/FooterNavbar/FooterNavbar";

const Dashboard: React.FC = () => { 
  const { ref, isComponentVisible, setComponentVisible } = useComponentVisible(false);

  const handleFAB = () => {
      (isComponentVisible) ? setComponentVisible(false) : setComponentVisible(true);
  }

  const modalVisible = (isComponentVisible) ? "visible" : "hidden";
  
  return (
    <div ref={ref}>
      <div className="h-screen w-screen flex flex-col bg-white dark:bg-gray-800">
        <Navbar />
        
        <div className="py-2">
          <WeekCard />
        </div>

        <div className="overflow-hidden relative flex lg:px-40 xl:px-64">
            <LeftSidebar handleWriteNoteModal={handleFAB}/>
            <FeedList />
            <RightSidebar />
        </div>

        <WriteNoteModal setVisible={modalVisible} handleChange={handleFAB}/>

        {/* FOOTER NAVBAR (Small screens only) */}
        <div className="sm:hidden">
          <FooterNavbar />
        </div>

      </div>

      {/* WRITE NOTE FAB (Small screens only) */}
      {/* <button onClick={handleFAB} className="absolute bottom-[84px] right-[16px] sm:hidden bg-cyan-500 rounded-full p-4">
        <BsPencil size={25} color="white"/>
      </button> */}
    </div>
  );
}

export default Dashboard;