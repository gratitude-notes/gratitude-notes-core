import { IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useContext } from "react";
import { AuthContext } from "../Auth";

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
                <p>{`${userContext.loggedIn}`}</p>
            </IonContent>
        </IonPage>
    );
}

export default Dashboard;