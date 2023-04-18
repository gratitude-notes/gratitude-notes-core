import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

const SignInButton = () => {
    const handleClick = async () => {
        await FirebaseAuthentication.signInWithGoogle({
          mode: "redirect",
          scopes: ['https://www.googleapis.com/auth/userinfo.email'],
        });
    }

    return (
      <button onClick={handleClick} className="px-4 py-2 text-white bg-cyan-500 rounded-full text-md">
        Sign In
      </button>
    )
}

export default SignInButton;