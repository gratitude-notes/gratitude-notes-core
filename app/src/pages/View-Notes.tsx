import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonText} from '@ionic/react';
import './View-Notes.css';
import '../theme/variables.css'
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import GNLogoHeader from '../components/global/gnlogo-header/GNLogoHeader';

const NoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const View_Notes: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gratitude Notes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <NoteContainer>
            
        </NoteContainer>
      </IonContent>

      <IonFooter>
        <IonToolbar>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default View_Notes;


