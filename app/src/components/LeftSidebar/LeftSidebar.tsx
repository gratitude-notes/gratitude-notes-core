import LeftSidebarItem from "./LeftSidebarItem";
import LeftSidebarWriteNote from "./LeftSidebarWriteNote";

interface WriteNoteModalChange {
  handleWriteNoteModal: () => void
}

const LeftSidebar: React.FC<WriteNoteModalChange> = ({handleWriteNoteModal}) => {
    return (
      <div className="relative h-fit flex flex-col gap-8 py-4 bg-white rounded-tl-2xl rounded-bl-2xl w-0 sm:w-16 lg:w-96 dark:bg-gray-800">
        <LeftSidebarItem icon={"BsHouseDoor"} title={"Home"}/>
        <LeftSidebarItem icon={"BsSearch"} title={"Search"}/>
        <LeftSidebarItem icon={"BsBell"} title={"Notifications"}/>
        <LeftSidebarWriteNote handleWriteNoteModal={handleWriteNoteModal}/>
      </div>
    )
  }
  
  export default LeftSidebar;