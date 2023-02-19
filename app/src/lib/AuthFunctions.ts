import { fb_auth } from "../config/Firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

export const login = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');

    fb_auth.useDeviceLanguage();
    await signInWithPopup(fb_auth, provider);
}

export const logout = async () => {
    await fb_auth.signOut();
}