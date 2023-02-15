import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

const Login: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login Page</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonButton onClick={() => {console.log(process.env.REACT_APP_FB_API_KEY)}}>Sign In</IonButton>
            </IonContent>
        </IonPage>
    );
}

export default Login;