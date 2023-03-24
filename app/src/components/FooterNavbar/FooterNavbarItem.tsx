import { BsSearch, BsBell, BsHouseDoor, BsPlusSquare, BsGear } from 'react-icons/bs';

type FooterItem = {
    icon: string
}

const FooterNavbarItem: React.FC<FooterItem> = ({icon}) => {  

    const renderIcon = () => {
        switch(icon) {
            case "BsSearch": return <BsSearch size={25}/>;
            case "BsBell": return <BsBell size={25}/>;
            case "BsPlusSquare": return <BsPlusSquare size={25}/>;
            case "BsHouseDoor": return <BsHouseDoor size={25}/>;
            case "BsGear": return <BsGear size={25}/>;
        }
    }

    return (
        <div className="sm:hidden">
            {renderIcon()}
        </div>
    )
  }
  
  export default FooterNavbarItem;