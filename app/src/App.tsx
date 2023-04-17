import { Toaster } from "react-hot-toast"

import { SessionWrapper } from "./lib/Session";
import { MainView } from "./components/MainView/MainView";
import { SettingsWrapper } from "./lib/Settings";
import { GlobalWrapper } from "./lib/Global";

const App: React.FC = () => {
    return (
        <SessionWrapper>
            <SettingsWrapper>
                <GlobalWrapper>
                    <MainView />
                    <Toaster/>
                </GlobalWrapper>
            </SettingsWrapper>
        </SessionWrapper>
    )
}

export default App;