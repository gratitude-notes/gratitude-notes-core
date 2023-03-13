import { getRedirectResult, GoogleAuthProvider, signInWithRedirect } from "@firebase/auth";
import { fb_auth } from "../../lib/Firebase";

export const SignInButton = () => {
    const handleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        
        await signInWithRedirect(fb_auth, provider);
        
        const result = await getRedirectResult(fb_auth);
        if (result?.user) {
          console.log(result.user);
        }
    }

    return (
      <button onClick={handleClick} className="px-4 py-2 text-white bg-black rounded-full text-md">
        Sign In
      </button>
    )
}