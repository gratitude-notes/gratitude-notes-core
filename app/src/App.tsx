import { Toaster } from "react-hot-toast"

import { SessionWrapper } from "./lib/Session";
import { MainView } from "./components/MainView/MainView";
import { SettingsWrapper } from "./lib/Settings";

const App: React.FC = () => {
    return (
        <SessionWrapper>
            <SettingsWrapper>
                <MainView />
                <Toaster/>
            </SettingsWrapper>
        </SessionWrapper>
    )
}

export default App;