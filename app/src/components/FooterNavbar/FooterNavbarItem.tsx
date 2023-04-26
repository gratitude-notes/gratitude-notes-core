import React from 'react';
import {
    BsCalendarWeek,
    BsHouseDoorFill,
    BsPlusSquare,
    BsGear,
    BsHouseDoor,
    BsPlusSquareFill,
    BsCalendarWeekFill,
    BsGearFill,
} from 'react-icons/bs';

type FooterItem = {
    icon: string;
};

const FooterNavbarItem: React.FC<FooterItem> = ({ icon }) => {
    const renderIcon = () => {
        switch (icon) {
            case 'BsHouseDoorFill':
                return <BsHouseDoorFill size={25} />;
            case 'BsHouseDoor':
                return <BsHouseDoor size={25} />;

            case 'BsPlusSquare':
                return <BsPlusSquare size={25} />;
            case 'BsPlusSquareFill':
                return <BsPlusSquareFill size={25} />;

            case 'BsCalendarWeek':
                return <BsCalendarWeek size={25} />;
            case 'BsCalendarWeekFill':
                return <BsCalendarWeekFill size={25} />;

            case 'BsGear':
                return <BsGear size={25} />;
            case 'BsGearFill':
                return <BsGearFill size={25} />;
        }
    };

    return <div className="sm:hidden">{renderIcon()}</div>;
};

export default FooterNavbarItem;
