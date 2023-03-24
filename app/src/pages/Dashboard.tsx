import FeedList from "../components/Feed/FeedList";
import LeftSidebar from "../components/LeftSidebar/LeftSidebar";
import WriteNoteModal from "../components/WriteNoteSequence/WriteNoteModal";
import RightSidebar from "../components/RightSidebar/RightSidebar";
import useComponentVisible from "../hooks/useComponentVisible";
import WeekCard from "../components/WeekCard";
import Navbar from "../components/Navbar/Navbar";
import FooterNavbar from "../components/FooterNavbar/FooterNavbar";
import SettingsModal from "../components/SettingsModal/SettingsModal";
import WeekInReviewModal from "../components/WeekInReviewModal/WeekInReviewModal";
import SearchModal from "../components/SearchModal/SearchModal";

const Dashboard: React.FC = () => { 
  const { ref, isComponentVisible, setComponentVisible } = useComponentVisible(false);

  const handleFAB = () => {
    (isComponentVisible) ? setComponentVisible(false) : setComponentVisible(true);
  }

  const handleSettingsButton = () => {
    (isComponentVisible) ? setComponentVisible(false) : setComponentVisible(true);
  }

  const handleWeekInReviewButton = () => {
    (isComponentVisible) ? setComponentVisible(false) : setComponentVisible(true);
  }

  const handleSearchButton = () => {
    (isComponentVisible) ? setComponentVisible(false) : setComponentVisible(true);
  }

  const modalVisible = (isComponentVisible) ? "visible" : "hidden";
  const settingsModalVisible = (isComponentVisible) ? "visible" : "hidden";
  const weekInReviewModalVisible = (isComponentVisible) ? "visible" : "hidden";
  const searchModalVisible = (isComponentVisible) ? "visible" : "hidden";
  
  return (
    <div ref={ref}>
      <div className="h-screen w-screen flex flex-col bg-white dark:bg-gray-800">
        <Navbar />
        
        <div className="py-2">
          <WeekCard />
        </div>

        <div className="overflow-hidden relative flex lg:px-40 xl:px-64">
            <LeftSidebar handleSearchModal={handleSearchButton}
                        handleWriteNoteModal={handleFAB}
                        handleWeekInReviewModal={handleWeekInReviewButton}/>
            <FeedList />
            <RightSidebar />
        </div>

        {/* <SearchModal setVisible={searchModalVisible} handleChange={handleSearchButton}/> */}

        <WriteNoteModal setVisible={modalVisible} handleChange={handleFAB}/>
        
        {/* <SettingsModal setVisible={settingsModalVisible} handleChange={handleSettingsButton}/> */}

        {/* <WeekInReviewModal setVisible={weekInReviewModalVisible} handleChange={handleWeekInReviewButton}/> */}
        

        {/* FOOTER NAVBAR (Small screens only) */}
        <div className="z-50 sm:hidden">
          <FooterNavbar handleSearchModal={handleSearchButton}
                        handleWriteNoteModal={handleFAB}
                        handleSettingsModal={handleSettingsButton}
                        handleWeekInReviewModal={handleWeekInReviewButton}/>
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