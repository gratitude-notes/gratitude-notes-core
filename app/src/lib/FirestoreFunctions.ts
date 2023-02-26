import { useContext } from "react"
import { arrayUnion, doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore"
import { fb_firestore } from "../config/Firebase"
import { AuthContext } from "./AuthContext"

export const writeNote = async (note: string, currentUserID: string) => {

    const date = new Date();                                                            // Sat Feb 25 2023 21:23:42 GMT-0500 (Eastern Standard Time)
    const dateStr = [date.getMonth(), date.getDate(), date.getFullYear()].join(" ");    // 1 25 2023
    let timeStr = [date.getHours(), date.getMinutes(), date.getSeconds()].join(":");    // 9:23:42
    timeStr = [timeStr, (date.getHours() >= 12) ? "PM" : "AM"].join(" ");               // 9:23:42 PM

    try {
        const docRef = doc(fb_firestore, "users", currentUserID, "notes", dateStr);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) { // no notes for today yet
            await setDoc(doc(fb_firestore, "users", currentUserID, "notes", dateStr), {
                noteData: [{
                    note: note,
                    time: timeStr,
                    score: 5
                }],
                noteCount: 1
            });
        } else {    // at least one note for today
            await updateDoc(doc(fb_firestore, "users", currentUserID, "notes", dateStr), {
                noteData: arrayUnion({
                    note: note,
                    time: timeStr,
                    score: -5
                }),
                noteCount: increment(1)
            });
        }
    } catch (e) {
        console.error(e);
    }
}