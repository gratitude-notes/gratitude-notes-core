import { signOut } from "@firebase/auth";
import { fb_auth } from "../../lib/Firebase";

export const SignOutButton = () => {
    const handleClick = () => {
        signOut(fb_auth);
    }

    return (
        <button onClick={handleClick} className="px-4 py-2 text-white bg-black rounded-full text-md">
            Sign Out
        </button>
    )
}
  