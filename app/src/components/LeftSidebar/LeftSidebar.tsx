import LeftSidebarItem from "./LeftSidebarItem";
import LeftSidebarWriteNote from "./LeftSidebarWriteNote";

interface LeftSideBarProps {
  handleSearchModal: () => void,
  handleWriteNoteModal: () => void,
  handleWeekReviewModal: () => void
}

const LeftSidebar: React.FC<LeftSideBarProps> = ({handleSearchModal, handleWriteNoteModal, handleWeekReviewModal}) => {
    return (
      <div className="relative h-fit flex flex-col gap-8 py-4 bg-white rounded-tl-2xl rounded-bl-2xl w-0 sm:w-16 lg:w-96 dark:bg-gray-800">
        <LeftSidebarItem icon={"BsHouseDoor"} title={"Home"} handleClick={() => console.log("Home clicked on Left Sidebar.")}/>
        <LeftSidebarItem icon={"BsSearch"} title={"Search"} handleClick={handleSearchModal}/>
        <LeftSidebarItem icon={"BsBell"} title={"Notifications"} handleClick={handleWeekReviewModal}/>
        <LeftSidebarWriteNote handleWriteNoteModal={handleWriteNoteModal}/>
      </div>
    )
  }
  
  export default LeftSidebar;