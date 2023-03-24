import { Routes, Route } from "react-router"
import { useSession } from "../../lib/Session";
import Dashboard from "../../pages/Dashboard"
import Landing from "../../pages/Landing"
import WeekInReview from "../WeekInReviewModal/WeekInReviewModal";

export const MainView: React.FC = () => {
    const session = useSession();

    return (
        <Routes>
            <Route 
                path="/"
                element={(session?.user) ? <Dashboard /> : <Landing />}
            />
            <Route path="/wordcloud" element={<WeekInReview />} />
        </Routes>
    )
}