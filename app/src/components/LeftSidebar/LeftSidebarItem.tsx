import { BsSearch, BsBell, BsHouseDoor } from 'react-icons/bs';

type SidebarItem = {
    icon: string,
    title: string
}

const LeftSidebarItem: React.FC<SidebarItem> = ({icon, title}) => {  

    const renderIcon = () => {
        switch(icon) {
            case "BsSearch": return <BsSearch size={20}/>;
            case "BsBell": return <BsBell size={20}/>;
            case "BsHouseDoor": return <BsHouseDoor size={20}/>;
        }
    }

    return (
        <div className="hidden sm:flex gap-4 mx-auto">
            <div className="my-auto dark:text-white">
                {renderIcon()}
            </div>
            <div className="hidden lg:flex">
                <h1 className="text-xl dark:text-white">{title}</h1>
            </div>
        </div>
    )
  }
  
  export default LeftSidebarItem;