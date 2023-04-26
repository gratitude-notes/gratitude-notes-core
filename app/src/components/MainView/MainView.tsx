import { Routes, Route } from "react-router"
import { useSession } from "../../lib/Session";
import Dashboard from "../../pages/Dashboard"
import Landing from "../../pages/Landing"
import UserPublicBoard from "../../pages/UserPublicBoard"
import Promo from "../../pages/Promo";

export const MainView: React.FC = () => {
    const session = useSession();

    return (
        <Routes>
            <Route 
                path="/"
                element={(session?.user) ? <Dashboard /> : <Promo />}
            />
            <Route 
                path="/users/:userID/public" 
                element={<UserPublicBoard />}/>
        </Routes>
    )
}