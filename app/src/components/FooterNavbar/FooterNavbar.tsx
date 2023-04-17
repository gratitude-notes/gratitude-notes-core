import { useNavigate } from 'react-router-dom';
import { ViewState } from '../../pages/Dashboard';
import FooterNavbarItem from './FooterNavbarItem';

type FooterNavbarType =  {
    updateViewState: (state: ViewState) => void
    currentState: string
}

const FooterNavbar: React.FC<FooterNavbarType> = ({updateViewState, currentState}) => {
    const navigate = useNavigate();

    return (
        <footer>
            <nav>
                <div className="h-14 sm:hidden flex justify-between items-center px-6 fixed bottom-0 w-full
                            border-t border-gray-400 text-black dark:text-white bg-white dark:bg-gray-800">
                    <div onClick={() => navigate("/")}
                        className="cursor-pointer">
                        {(currentState === "Home") ? <FooterNavbarItem icon={"BsHouseDoorFill"}/> : <FooterNavbarItem icon={"BsHouseDoor"}/>}    
                    </div>
                    <div onClick={() => navigate("/write")}
                        className="cursor-pointer">
                        {(currentState === "Write") ? <FooterNavbarItem icon={"BsPlusSquareFill"}/> : <FooterNavbarItem icon={"BsPlusSquare"}/>}    
                    </div>
                    <div onClick={() => updateViewState("Weekly Dosage")}
                        className="cursor-pointer">
                        {(currentState === "Weekly Dosage") ? <FooterNavbarItem icon={"BsCalendarWeekFill"}/> : <FooterNavbarItem icon={"BsCalendarWeek"}/>}
                    </div>
                    <div onClick={() => updateViewState("Settings")}
                        className="cursor-pointer">
                        {(currentState === "Settings") ? <FooterNavbarItem icon={"BsGearFill"}/> : <FooterNavbarItem icon={"BsGear"}/>}
                    </div>
                </div>
            </nav>
        </footer>
      
    )
  }
  
  export default FooterNavbar;