import { IonContent, IonPage, IonItem, IonTextarea, IonLabel, IonButton} from '@ionic/react';
import './Write-Note.css';
import '../theme/variables.css'
import React, {useState} from 'react';
import styled from 'styled-components';
import GNLogoHeader from '../components/global/gnlogo-header/GNLogoHeader';
import { writeNote } from '../lib/FirestoreFunctions';
import { useAuth } from '../lib/AuthContext';

const SumbitNoteButton = styled.button`
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

const Write_Note: React.FC = () => {
  const currentUser = useAuth();
  const [note, setNote] = useState<string>("");

  const handleUpdateNote = (e: any) => {
    const newNote = e.detail.value;
    console.log(newNote)
    setNote(newNote);
  };

  return (
    <IonPage>

      <GNLogoHeader />

      <IonContent>

        <div style={styles.noteContainer}>
          <IonItem color='primary' counter={true} counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}>
            <IonLabel color='light' style={styles.noteLabel} position='stacked'><h1>Note for Today</h1></IonLabel>
            <IonTextarea  color='light' style={styles.noteTextarea} value={note} onIonChange={(e) => handleUpdateNote(e)} maxlength={250} autoGrow={true} rows={10} autofocus={true}/>
          </IonItem>

          <IonButton color="tertiary" onClick={() => {writeNote(note, `${currentUser.user_id}`); setNote('SUBMITTED');}}>Submit Note</IonButton>  
          <IonButton color="tertiary" routerLink="/"> Return to Dashboard</IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
}

export default Write_Note;

const styles = {
  noteContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  } as React.CSSProperties,
  noteLabel: {
    fontFamily: 'Open_Sans'
  } as React.CSSProperties,
  noteTextarea: {
    fontFamily: 'Open_Sans',
    width: '300px'
  } as React.CSSProperties
}