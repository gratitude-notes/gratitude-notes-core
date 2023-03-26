import LeftSidebarItem from "./LeftSidebarItem";
import LeftSidebarWriteNote from "./LeftSidebarWriteNote";

interface LeftSidebarHandlers {
  handleSearchModal: () => void,
  handleWriteNoteModal: () => void,
  handleWeekInReviewModal: () => void
}

const LeftSidebar: React.FC<LeftSidebarHandlers> = ({handleSearchModal, handleWriteNoteModal, handleWeekInReviewModal}) => {
    return (
      <div className="relative h-fit flex flex-col gap-8 py-4 bg-white rounded-tl-2xl rounded-bl-2xl w-0 sm:w-16 lg:w-96 dark:bg-gray-800">
        <LeftSidebarItem icon={"BsHouseDoor"} title={"Home"} handleClick={() => console.log("Home clicked on Left Sidebar.")}/>
        <LeftSidebarItem icon={"BsSearch"} title={"Search"} handleClick={handleSearchModal}/>
        <LeftSidebarItem icon={"BsBell"} title={"Notifications"} handleClick={handleWeekInReviewModal}/>
        <LeftSidebarWriteNote handleWriteNoteModal={handleWriteNoteModal}/>
      </div>
    )
  }
  
  export default LeftSidebar;