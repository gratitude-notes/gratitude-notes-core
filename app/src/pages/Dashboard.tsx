import { useContext } from "react";

import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";
import './Dashboard.css';
import './global.css';
import '../theme/variables.css';
import logo from '../assets/GNlogo.svg';

import { logout } from "../lib/AuthFunctions";
import { AuthContext } from "../lib/AuthContext";

const Dashboard: React.FC = () => {
    return (
        <IonPage>
            <IonHeader className="header">
                <IonToolbar className="header-toolbar">
                    <IonIcon id="GNlogoIcon" icon={logo} size="large"></IonIcon>
                    <IonButton onClick={logout}>Logout</IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="content">
                {/* <button id="add-note-btn" className="my-button">Add a Note for Today</button> */}
            </IonContent>
            <IonFooter className="footer">
                <div className="container">
                    <IonTitle id="featured-note-title">Featured Note</IonTitle>
                    <div className="secondary-container">
                        <IonText id="featured-note-date-text">From date: 1/1/2023</IonText>
                        <IonText id="featured-note-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</IonText>
                    </div>
                </div>
            </IonFooter>
        </IonPage>
    );
}

export default Dashboard;