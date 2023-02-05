import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonText, IonButton, IonIcon} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import React from 'react'
import {addCircleOutline} from 'ionicons/icons'

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gratitude Notes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonText>Welcome to Gratitude Notes!</IonText>
        <IonList>
          {Array(10)
          .fill(0)
          .map((_, i) =>(
          <IonItem>
            <IonText>List Item {i} </IonText>
          </IonItem>
          ))}
        </IonList>
        <IonButton expand="full" color="primary">
          <IonIcon slot="start" icon={addCircleOutline}></IonIcon>
            Add Notes
        </IonButton>
        <IonButton color="tertiary" routerLink="/login"> Click to Go to Login Page</IonButton>
        <IonButton color="secondary" routerLink="/register"> Click to Go to Register Page</IonButton>
      </IonContent>
      {/* <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent> */}
    </IonPage>
  );
};

export default Home;
