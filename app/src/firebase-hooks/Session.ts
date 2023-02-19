import { IonButton } from "@ionic/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useFirebase } from "../FirebaseComponents"

export async function useLogout() {
    const { auth } = useFirebase();
    await auth.signOut();
}

export async function useGoogleSSOLogin() {
    const { auth } = useFirebase();

    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");

    await signInWithPopup(auth, provider)
}