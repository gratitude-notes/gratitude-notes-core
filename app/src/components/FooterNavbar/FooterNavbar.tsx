import FooterNavbarItem from './FooterNavbarItem';

const FooterNavbar: React.FC = () => {
    return (
      <div className="flex justify-between items-center px-8 h-14 border-t border-gray-400 text-black dark:text-white">
            <div className="">
                <FooterNavbarItem icon={"BsHouseDoor"}/>
            </div>
            <div>
                <FooterNavbarItem icon={"BsSearch"}/>
            </div>
            <div onClick={() => console.log('Add clicked in Footer Navbar.')}
                className="cursor-pointer">
                    <FooterNavbarItem icon={"BsPlusSquare"}/>
            </div>
            <div>
                <FooterNavbarItem icon={"BsBell"}/>
            </div>
            <div>
                <FooterNavbarItem icon={"BsGear"}/>
            </div>
      </div>
    )
  }
  
  export default FooterNavbar;