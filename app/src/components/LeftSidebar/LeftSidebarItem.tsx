import { BsGear, BsCalendarWeek, BsHouseDoor } from 'react-icons/bs';
import { ViewState } from '../../pages/Dashboard';

type SidebarItem = {
    icon: string,
    title: ViewState,
    updateViewState: (state: ViewState) => void
}

const LeftSidebarItem: React.FC<SidebarItem> = ({icon, title, updateViewState}) => {  

    const renderIcon = () => {
        switch(icon) {
            case "BsCalendarWeek": return <BsCalendarWeek size={20}/>;
            case "BsHouseDoor": return <BsHouseDoor size={20}/>;
            case "BsGear": return <BsGear size={20}/>;
        }
    }

    return (
        <div onClick={() => updateViewState(title)}
            className="cursor-pointer hidden sm:flex gap-4 mx-auto select-none">
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