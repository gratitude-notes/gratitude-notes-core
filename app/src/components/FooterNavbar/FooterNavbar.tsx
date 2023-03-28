import FooterNavbarItem from './FooterNavbarItem';

interface FooterNavbarHandlers {
    handleSearchModal: () => void,
    handleWriteNoteModal: () => void,
    handleSettingsModal: () => void,
    handleWeekInReviewModal: () => void
  }

const FooterNavbar: React.FC<FooterNavbarHandlers> = ({handleSearchModal, handleWriteNoteModal, handleSettingsModal, handleWeekInReviewModal}) => {
    return (
        <footer>
            <nav>
                <div className="sm:hidden flex justify-between items-center h-14 px-8
                            border-t border-gray-400 text-black dark:text-white bg-white dark:bg-gray-800">
                    <div onClick={() => console.log('Home clicked in Footer Navbar.')}
                        className="cursor-pointer">
                        <FooterNavbarItem icon={"BsHouseDoorFill"}/>
                    </div>
                    <div onClick={handleSearchModal}
                        className="cursor-pointer">
                        <FooterNavbarItem icon={"BsSearch"}/>
                    </div>
                    <div onClick={handleWriteNoteModal}
                        className="cursor-pointer">
                            <FooterNavbarItem icon={"BsPlusSquare"}/>
                    </div>
                    <div onClick={handleWeekInReviewModal}
                        className="cursor-pointer">
                        <FooterNavbarItem icon={"BsBell"}/>
                    </div>
                    <div onClick={handleSettingsModal}
                        className="cursor-pointer">
                        <FooterNavbarItem icon={"BsGear"}/>
                    </div>
                </div>
            </nav>
        </footer>
      
    )
  }
  
  export default FooterNavbar;