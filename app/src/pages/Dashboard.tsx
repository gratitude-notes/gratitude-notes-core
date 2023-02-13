import { IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

const Dashboard: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Dashboard Page</IonTitle>
                </IonToolbar>
            </IonHeader>
        </IonPage>
    );
}

export default Dashboard;