import LeftSidebarItem from "./LeftSidebarItem";
import LeftSidebarWriteNote from "./LeftSidebarWriteNote";

interface LeftSidebarHandlers {
  handleSearchModal: () => void,
  handleWriteNoteModal: () => void,
  handleWeekInReviewModal: () => void
}

const LeftSidebar: React.FC<LeftSidebarHandlers> = ({handleSearchModal, handleWriteNoteModal, handleWeekInReviewModal}) => {
    return (
      <div className="flex flex-col gap-8 pt-8">
        <LeftSidebarItem icon={"BsHouseDoor"} title={"Home"} handleClick={() => console.log("Home clicked on Left Sidebar.")}/>
        <LeftSidebarItem icon={"BsSearch"} title={"Search"} handleClick={handleSearchModal}/>
        <LeftSidebarItem icon={"BsCalendarWeek"} title={"Week Review"} handleClick={handleWeekInReviewModal}/>
        <LeftSidebarWriteNote handleWriteNoteModal={handleWriteNoteModal}/>
      </div>
    )
  }
  
  export default LeftSidebar;