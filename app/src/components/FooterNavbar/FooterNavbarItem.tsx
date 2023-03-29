import {  BsCalendarWeek, BsHouseDoorFill, BsPlusSquare, BsGear } from 'react-icons/bs';

type FooterItem = {
    icon: string
}

const FooterNavbarItem: React.FC<FooterItem> = ({icon}) => {  

    const renderIcon = () => {
        switch(icon) {
            case "BsCalendarWeek": return <BsCalendarWeek size={25}/>;
            case "BsPlusSquare": return <BsPlusSquare size={25}/>;
            case "BsHouseDoorFill": return <BsHouseDoorFill size={25}/>;
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