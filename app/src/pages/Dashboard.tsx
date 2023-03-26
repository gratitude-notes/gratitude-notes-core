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
import WebNotification from "../components/WeekInReviewModal/WebNotification"

const Dashboard: React.FC = () => { 

  const searchModalVisible = useComponentVisible(false);
  const settingsModalVisible = useComponentVisible(false);
  const weekInReviewModalVisible = useComponentVisible(false);
  const writeModalVisible = useComponentVisible(false);
  const notificationVisible = useComponentVisible(false);
  
  const handleWriteButton = () => {
    (writeModalVisible.isComponentVisible) ? writeModalVisible.setComponentVisible(false) : writeModalVisible.setComponentVisible(true);
  }

  const handleSettingsButton = () => {
    (settingsModalVisible.isComponentVisible) ? settingsModalVisible.setComponentVisible(false) : settingsModalVisible.setComponentVisible(true);
  }

  const handleWeekInReviewModal = () => {
    (weekInReviewModalVisible.isComponentVisible) ? weekInReviewModalVisible.setComponentVisible(false) : weekInReviewModalVisible.setComponentVisible(true);
  }

  const handleSearchButton = () => {
    (searchModalVisible.isComponentVisible) ? searchModalVisible.setComponentVisible(false) : searchModalVisible.setComponentVisible(true);
  }

  const handleNotification = () => {
    (notificationVisible.isComponentVisible) ? notificationVisible.setComponentVisible(false) : notificationVisible.setComponentVisible(true);
  }

  
  return (
    <div>
      <div className="h-screen w-screen flex flex-col bg-white dark:bg-gray-800">
        <Navbar />
        
        <div className="py-2">
          <WeekCard />
        </div>

        <div className="overflow-hidden relative flex lg:px-40 xl:px-64">
            <LeftSidebar handleSearchModal={handleSearchButton}
                         handleWriteNoteModal={handleWriteButton}
                         handleWeekInReviewModal={handleWeekInReviewButton}
            />
            <FeedList />
            <RightSidebar />
        </div>

        <SearchModal visible={searchModalVisible} handleChange={handleSearchButton} />
        <WriteNoteModal visible={writeModalVisible} handleChange={handleWriteButton} />
        <SettingsModal visible={settingsModalVisible} handleChange={handleSettingsButton}/>
        <WeekInReviewModal visible={weekInReviewModalVisible} handleChange={handleWeekInReviewModal}/>
        <WebNotification visible={notificationVisible} handleChange={handleNotification}></WebNotification>
        
        

        {/* FOOTER NAVBAR (Small screens only) */}
        <div className="z-50 sm:hidden">
          <FooterNavbar handleSearchModal={handleSearchButton}
                        handleWriteNoteModal={handleWriteButton}
                        handleSettingsModal={handleSettingsButton}
                        handleWeekInReviewModal={handleWeekInReviewModal}/>
        </div>

      </div>

      {/* WRITE NOTE FAB (Small screens only) */}
      {/* <button onClick={handleWriteButton} className="absolute bottom-[84px] right-[16px] sm:hidden bg-cyan-500 rounded-full p-4">
        <BsPencil size={25} color="white"/>
      </button> */}
    </div>
  );
}

export default Dashboard;