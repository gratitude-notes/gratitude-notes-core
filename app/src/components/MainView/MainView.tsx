import { Routes, Route } from "react-router"
import { useSession } from "../../lib/Session";
import Dashboard from "../../pages/Dashboard"
import Landing from "../../pages/Landing"

export const MainView: React.FC = () => {
    const session = useSession();

    return (
        <Routes>
            <Route 
                path="/"
                element={(session?.user) ? <Dashboard /> : <Landing />}
            />
        </Routes>
    )
}