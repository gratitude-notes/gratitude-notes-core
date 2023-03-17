import { BsPencil } from "react-icons/bs";
import useComponentVisible from "../../hooks/useComponentVisible";
import LeftSidebarItem from "./LeftSidebarItem";
import LeftSidebarWriteNote from "./LeftSidebarWriteNote";

interface WriteNoteModalChange {
  handleWriteNoteModal: () => void
}

const LeftSidebar: React.FC<WriteNoteModalChange> = ({handleWriteNoteModal}) => {
    return (
      <div className="relative flex flex-col gap-8 pt-4 border border-gray-400 w-0 sm:w-16 lg:w-96">
        <LeftSidebarItem icon={"BsHouseDoor"} title={"Home"}/>
        <LeftSidebarItem icon={"BsSearch"} title={"Search"}/>
        <LeftSidebarItem icon={"BsBell"} title={"Notifications"}/>
        <LeftSidebarWriteNote handleWriteNoteModal={handleWriteNoteModal}/>
      </div>
    )
  }
  
  export default LeftSidebar;