import LeftSidebarItem from "./LeftSidebarItem";
import LeftSidebarWriteNote from "./LeftSidebarWriteNote";


const LeftSidebar: React.FC = () => {
  
    return (
      <div className="flex flex-col gap-8 pt-4 border border-gray-400 w-0 sm:w-16 lg:w-96">
        <LeftSidebarItem icon={"BsHouseDoor"} title={"Home"}/>
        <LeftSidebarItem icon={"BsSearch"} title={"Search"}/>
        <LeftSidebarItem icon={"BsBell"} title={"Notifications"}/>
        <LeftSidebarWriteNote />
      </div>
    )
  }
  
  export default LeftSidebar;