import { fb_auth } from "../config/Firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');

    fb_auth.useDeviceLanguage();
    const result = signInWithPopup(fb_auth, provider).then(() => {return true}).catch((err) => {return false});

    return result;
}

export const logout = async () => {
    await fb_auth.signOut();
}