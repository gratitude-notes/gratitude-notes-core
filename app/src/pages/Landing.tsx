import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { useContext } from "react";
import './Landing.css';
import './global.css';
import '../theme/variables.css';
import { AuthContext } from "../AuthData";
import ToolBarHeader from "../components/tool-bar-header/ToolBarHeader";
import styled from 'styled-components';

const LoginButton = styled.button`
    background-color: var(--ion-color-secondary); 
    border-radius: 29px; 
    border: 1px solid var(--ion-color-secondary); 
    color: var(--ion-color-light); 
    font-family: Montserrat;
    font-size: 1rem; 
    padding: 0.75rem 1.5rem;
    cursor: pointer; 
    transition: 0.3s; 
    margin: 1rem;

    :hover {
        background-color: var(--ion-color-light); 
        color: var(--ion-color-secondary); 
        border-color: var(--ion-color-secondary); 
        transition: 0.3s; 
    }
`

const Landing: React.FC = () => {
    const userContext = useContext(AuthContext);
    return (
        <IonPage>
            <ToolBarHeader />
            <IonContent fullscreen className="content-primary-color">

                <div className="center-display-flex-container">
                    <h1>Gratitude Notes</h1>
                    <p>Welcome to Gratitude Notes.</p>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Landing;