import { IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useContext } from "react";
import { AuthContext } from "../AuthData";

const Dashboard: React.FC = () => {
    const userContext = useContext(AuthContext);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Dashboard Page</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <p>{`${userContext.logged_in}`}</p>
            </IonContent>
        </IonPage>
    );
}

export default Dashboard;