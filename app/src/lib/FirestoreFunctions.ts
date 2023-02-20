import { useContext } from "react"
import { doc, setDoc } from "firebase/firestore"
import { fb_firestore } from "../config/Firebase"
import { AuthContext } from "./AuthContext"

export const writeNote = async (noteData: string, currentUserID: string) => {

    try {
        const docRef = await setDoc(doc(fb_firestore, "users", currentUserID), {
            note: noteData
        });
    } catch (e) {
        console.error(e);
    }
}