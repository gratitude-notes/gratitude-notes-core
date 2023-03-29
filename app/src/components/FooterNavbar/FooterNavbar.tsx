import FooterNavbarItem from './FooterNavbarItem';

type FooterNavbarType =  {
    updateViewState: (state: string) => void
}

const FooterNavbar: React.FC<FooterNavbarType> = ({updateViewState}) => {
    return (
        <footer>
            <nav>
                <div className="h-14 sm:hidden flex justify-between items-center px-6
                            border-t border-gray-400 text-black dark:text-white bg-white dark:bg-gray-800">
                    <div onClick={() => updateViewState("Home")}
                        className="cursor-pointer">
                        <FooterNavbarItem icon={"BsHouseDoorFill"}/>
                    </div>
                    <div onClick={() => updateViewState("Write")}
                        className="cursor-pointer">
                            <FooterNavbarItem icon={"BsPlusSquare"}/>
                    </div>
                    <div onClick={() => updateViewState("Week Review")}
                        className="cursor-pointer">
                        <FooterNavbarItem icon={"BsCalendarWeek"}/>
                    </div>
                    <div onClick={() => updateViewState("Settings")}
                        className="cursor-pointer">
                        <FooterNavbarItem icon={"BsGear"}/>
                    </div>
                </div>
            </nav>
        </footer>
      
    )
  }
  
  export default FooterNavbar;