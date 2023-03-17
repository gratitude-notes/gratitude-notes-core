import { BsSearch, BsBell, BsHouseDoor } from 'react-icons/bs';

type SidebarItem = {
    icon: string,
    title: string
}

const LeftSidebarItem: React.FC<SidebarItem> = ({icon, title}) => {  
    return (
        <div className="hidden sm:flex gap-4 mx-auto">
            <div className="my-auto">
                {
                    {
                        'BsSearch': <BsSearch size={20}/>,
                        'BsBell': <BsBell size={20}/>,
                        'BsHouseDoor': <BsHouseDoor size={20}/>
                    }[icon]
                }
            </div>
            <div className="hidden lg:flex">
                <h1 className="text-xl">{title}</h1>
            </div>
        </div>
    )
  }
  
  export default LeftSidebarItem;