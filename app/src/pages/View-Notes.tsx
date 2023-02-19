import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonText} from '@ionic/react';
import './View-Notes.css';
import '../theme/variables.css'
import React, {useState, useEffect} from 'react';

const View_Notes: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gratitude Notes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div id="notes-container">
            <IonText>This is a past note.</IonText>
        </div>
      </IonContent>

      <IonFooter>
        <IonToolbar>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default View_Notes;