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
import WebNotification from "../components/WeekInReviewModal/WebNotification"
import { useEffect, useState } from "react";

const screens = ["Home", "Write", "Settings", "Week Review"] as const;
export type ViewState = typeof screens[number];

const Dashboard: React.FC = () => { 

  const [viewState, setViewState] = useState<ViewState>("Home");
  const notificationVisible = useComponentVisible(false);

  const updateViewState = (state: ViewState) => {
    (viewState === state) ? setViewState("Home") : setViewState(state);
  }

  const handleNotification = () => {
    (notificationVisible.isComponentVisible) ? notificationVisible.setComponentVisible(false) : notificationVisible.setComponentVisible(true);
  }

  const renderCurrent = () => {
    switch(viewState) {
        case "Write": return <WriteNoteModal updateViewState={updateViewState} />;
        case "Settings": return <SettingsModal updateViewState={updateViewState}/>;
        case "Week Review": return <WeekInReviewModal updateViewState={updateViewState}/>;
        default: return (
          <>
            <Navbar />
            <WeekCard />

            <div className="flex flex-grow overflow-y-auto
                            scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
              <div className="fixed h-full sm:w-[50px] md:w-[300px] sm:border-r border-gray-400">
                <LeftSidebar updateViewState={updateViewState} />
              </div>
              <div className="w-full sm:pl-[50px] md:pl-[300px] xl:pl-[400px] md:pr-[100px]">
                <FeedList />
              </div>
              <div className="xl:w-[400px]">
                <RightSidebar />
              </div>
            </div>
          </>
        );
    }
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-white dark:bg-gray-800">
      {renderCurrent()}

      {/* Navbar at bottom, only visible on small screens */}
      <FooterNavbar updateViewState={updateViewState} currentState={viewState}/>

      <WebNotification updateViewState={updateViewState}/>
    </div>

  );
}

export default Dashboard;