import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { useContext } from "react";
import './Landing.css';
import './global.css';
import '../theme/variables.css';
import logo from '../assets/GNlogo.svg';
import { AuthContext } from "../AuthData";

const Landing: React.FC = () => {
    const userContext = useContext(AuthContext);
    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonIcon id="GNlogoIcon" icon={logo} size="large"></IonIcon>
            </IonHeader>
            <IonContent fullscreen className="content">
                <div className="container">
                    <h1>Gratitude Notes</h1>
                    <p>Welcome to Gratitude Notes.</p>
                    <button id="sign-in-btn" className="my-button">Sign in</button>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Landing;