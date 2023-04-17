import { Routes, Route } from "react-router"
import { useSession } from "../../lib/Session";
import Dashboard from "../../pages/Dashboard"
import Landing from "../../pages/Landing"
import UserPublicBoard from "../../pages/UserPublicBoard"
import WriteNoteModal from "../WriteNoteSequence/WriteNoteModal";
import SettingsModal from "../SettingsModal/SettingsModal";
import WeekInReviewModal from "../WeekInReviewModal/WeekInReviewModal";

export const MainView: React.FC = () => {
    const session = useSession();

    return (
        <Routes>
            <Route path="/write" element={(session?.user) ? <WriteNoteModal updateViewState={()=>{}}/> : <Landing />} />
            <Route path="/settings" element={(session?.user) ? <SettingsModal updateViewState={()=>{}}/> : <Landing />} />
            <Route path="/weeklydosage" element={(session?.user) ? <WeekInReviewModal updateViewState={()=>{}}/> : <Landing />} />
            <Route 
                path="/"
                element={(session?.user) ? <Dashboard /> : <Landing />}
            />
            <Route 
                path="/users/:userID/public" 
                element={<UserPublicBoard />}/>
        </Routes>
    )
}