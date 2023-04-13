import FeedList from "../components/Feed/FeedList";
import LeftSidebar from "../components/LeftSidebar/LeftSidebar";
import WriteNoteModal from "../components/WriteNoteSequence/WriteNoteModal";
import RightSidebar from "../components/RightSidebar/RightSidebar";
import useComponentVisible from "../hooks/useComponentVisible";
import WeekCard from "../components/WeekCard/WeekCard";
import Navbar from "../components/Navbar/Navbar";
import FooterNavbar from "../components/FooterNavbar/FooterNavbar";
import SettingsModal from "../components/SettingsModal/SettingsModal";
import WeekInReviewModal from "../components/WeekInReviewModal/WeekInReviewModal";
import { RefObject, useEffect, useRef, useState } from "react";
import { useSettings } from "../lib/Settings";
import { useSession } from "../lib/Session";

const screens = ["Home", "Write", "Settings", "Week Review", "Edit Public Board"] as const;
export type ViewState = typeof screens[number];

const Dashboard: React.FC = () => {
  const currentUserSettings = useSettings();
  
  const [viewState, setViewState] = useState<ViewState>("Home");

  const updateViewState = (state: ViewState) => {
    (viewState === state) ? setViewState("Home") : setViewState(state);
  }

  const feedListRef: RefObject<HTMLDivElement> = useRef(null);

  const [isWeekCardVisible, setIsWeekCardVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const feedListNode = feedListRef.current;
      if (feedListNode && feedListNode.scrollTop === 0) {
        setIsWeekCardVisible(true);
      } else {
        setIsWeekCardVisible(false);
      }
    };
    feedListRef?.current?.addEventListener("scroll", handleScroll);
    return () => {
      feedListRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderCurrent = () => {
    switch(viewState) {
        case "Write": return <WriteNoteModal updateViewState={updateViewState} />;
        case "Settings": return <SettingsModal updateViewState={updateViewState}/>;
        case "Week Review": return <WeekInReviewModal updateViewState={updateViewState}/>;
        default: return (
          <>
            <Navbar updateViewState={updateViewState}/>
            
            {/* SMALL AND MEDIUM SCREENS (WeekCard only visible at when at top) */}
            <div className="visible md:hidden">
              {isWeekCardVisible && <WeekCard />}
            </div>
            
            {/* LARGE SCREENS AND ABOVE (WeekCard always visible) */}
            <div className="hidden md:flex md:mx-auto">
              <WeekCard />
            </div>
            

            <div ref={feedListRef} className="flex flex-grow overflow-y-auto
                            scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
              <div className="fixed h-full border-gray-400
                              sm:w-[50px] sm:border-r
                              md:w-[300px]">
                <LeftSidebar updateViewState={updateViewState} />
              </div>
              <div className="w-full
                              sm:pl-[50px]
                              md:pl-[300px]
                              lg:pl-[400px] lg:pr-[100px]
                              xl:pl-[300px] xl:pr-[0px]
                              2xl:pl-[450px] 2xl:pr-[150px]">

                <FeedList />             
                
              </div>
              <div className="xl:pr-[100px] xl:w-[400px]
                              2xl:pr-[200px]">
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
    </div>

  );
}

export default Dashboard;