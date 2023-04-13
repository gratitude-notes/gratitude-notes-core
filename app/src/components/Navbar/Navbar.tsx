import { useSession } from "../../lib/Session";
import ThemeButton from "./ThemeButton";
import AvatarButton from "./AvatarButton";
import SignInButton from "./SignInButton";
import { ViewState } from "../../pages/Dashboard";
import DOSE_logo_png from "../../assets/logo/DOSE_logo.png";
import Streaks from "../WeekInReviewModal/Streaks";

type AuthButtonProps = {
  updateViewState: (state: ViewState) => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({updateViewState}) => {
  const session = useSession();  

  if (session?.user) {
    return (
      <>
        <Streaks />
        <ThemeButton />
        <AvatarButton updateViewState={updateViewState}/>
      </>
    )
  }
  else {
    return (
      <>
        <ThemeButton />
        <SignInButton />
      </>
    )
  }
}

type NavbarProps = {
  updateViewState: (state: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({updateViewState}) => {
  return (
    <header>
      <nav>
        <div className="flex p-4 justify-between
                        bg-white z-40 shadow-md shadow-gray-400 dark:shadow-gray-900  dark:bg-gray-800">
                          
          {/* DOSE logo */}
          <div className="flex items-center">
            <img className="w-20" src={DOSE_logo_png} alt="" />
          </div>

          {/* END BUTTONS */}
          <div className="flex w-full gap-4 justify-end items-center">
            <AuthButton updateViewState={updateViewState}/>
          </div>
        </div>
      </nav>
    </header>
  )
}
  
export default Navbar;