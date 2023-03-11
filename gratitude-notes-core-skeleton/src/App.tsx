import { Toaster } from "react-hot-toast"

import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Routes } from "react-router-dom";

import { fb_auth } from "./lib/Firebase";
import { AuthContext } from "./lib/AuthContext";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
    const [user, loading, error] = useAuthState(fb_auth);

    return (
        <AuthContext.Provider value={{user}}>
            <Navbar />
            <Routes>
                <Route 
                    path="/"
                    element={(user) ? <Dashboard /> : <Landing />}
                />
            </Routes>
            <Toaster/>
        </AuthContext.Provider>
    )
}

export default App;