import React from 'react';
import { ViewState } from '../../pages/Dashboard';
import LeftSidebarItem from './LeftSidebarItem';
import LeftSidebarWriteNote from './LeftSidebarWriteNote';

type LeftSidebarHandlers = {
    updateViewState: (state: ViewState) => void;
};

const LeftSidebar: React.FC<LeftSidebarHandlers> = ({ updateViewState }) => {
    return (
        <div className="flex flex-col gap-8 pt-8">
            <LeftSidebarItem icon={'BsHouseDoor'} title={'Home'} updateViewState={updateViewState} />
            <LeftSidebarItem icon={'BsCalendarWeek'} title={'Weekly Dosage'} updateViewState={updateViewState} />
            <LeftSidebarItem icon={'BsGear'} title={'Settings'} updateViewState={updateViewState} />
            <LeftSidebarWriteNote updateViewState={updateViewState} />
        </div>
    );
};

export default LeftSidebar;
