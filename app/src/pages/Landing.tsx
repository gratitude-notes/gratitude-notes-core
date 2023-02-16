import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useContext } from "react";
import { AuthContext } from "../AuthData";

const Landing: React.FC = () => {
    const userContext = useContext(AuthContext);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Landing Page</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <p>{`${userContext.logged_in}`}</p>
            </IonContent>
        </IonPage>
    );
}

export default Landing;