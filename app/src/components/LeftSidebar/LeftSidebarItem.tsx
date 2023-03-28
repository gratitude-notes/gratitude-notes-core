import { BsSearch, BsCalendarWeek, BsHouseDoor } from 'react-icons/bs';

type SidebarItem = {
    icon: string,
    title: string,
    handleClick: () => void
}

const LeftSidebarItem: React.FC<SidebarItem> = ({icon, title, handleClick}) => {  

    const renderIcon = () => {
        switch(icon) {
            case "BsSearch": return <BsSearch size={20}/>;
            case "BsCalendarWeek": return <BsCalendarWeek size={20}/>;
            case "BsHouseDoor": return <BsHouseDoor size={20}/>;
        }
    }

    return (
        <div onClick={handleClick}
            className="cursor-pointer hidden sm:flex gap-4 mx-auto">
            <div className="my-auto dark:text-white">
                {renderIcon()}
            </div>
            <div className="hidden md:flex">
                <h1 className="whitespace-nowrap text-xl dark:text-white">{title}</h1>
            </div>
        </div>
    )
  }
  
  export default LeftSidebarItem;