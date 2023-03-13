import { Toaster } from "react-hot-toast"

import { SessionWrapper } from "./lib/Session";
import { MainView } from "./components/MainView/MainView";

const App: React.FC = () => {
    return (
        <SessionWrapper>
            <MainView />
            <Toaster/>
        </SessionWrapper>
    )
}

export default App;