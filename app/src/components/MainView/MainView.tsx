import { Routes, Route } from "react-router"
import { useSession } from "../../lib/Session";
import Dashboard from "../../pages/Dashboard"
import Landing from "../../pages/Landing"
import UserPublicBoard from "../../pages/UserPublicBoard"

export const MainView: React.FC = () => {
    const session = useSession();
    console.log(session?.user)
    return (
        <Routes>
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