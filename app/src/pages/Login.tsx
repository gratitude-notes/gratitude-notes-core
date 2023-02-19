import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useGoogleSSOLogin } from "../firebase-hooks/Session";


const signIn = () => {
    
}

const Login: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login Page</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonButton>Sign In</IonButton>
            </IonContent>
        </IonPage>
    );
}

export default Login;