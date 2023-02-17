import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { useContext } from "react";
import './Landing.css';
import './global.css';
import '../theme/variables.css';
import { AuthContext } from "../AuthData";
import LogoIconHeader from "../components/logo-icon-header/LogoIconHeader";
import ToolBarHeader from "../components/tool-bar-header/ToolBarHeader";

const Landing: React.FC = () => {
    const userContext = useContext(AuthContext);
    return (
        <IonPage>
            <LogoIconHeader />
            <IonContent fullscreen className="content-primary-color">

                <ToolBarHeader />

                <div className="center-display-flex-container">
                    <h1>Gratitude Notes</h1>
                    <p>Welcome to Gratitude Notes.</p>
                    <button id="sign-in-btn" className="my-button">Sign in</button>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Landing;