import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonFooter, IonButton, IonTextarea, IonText, IonIcon, IonLabel} from '@ionic/react';
import './Write-Note.css';
import '../theme/variables.css'
import React, {useState} from 'react';
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

const NoteItem = styled(IonItem)`
  --background: var(--ion-color-secondary); 
`

const NoteTextarea = styled(IonTextarea)`
  --background: var(--ion-color-secondary); 
  --color: var(--ion-color-light); 
  font-family: Open_Sans;
  width: 25rem;
`

const NoteLabel = styled(IonLabel)`
  font-family: Open_Sans;
`

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

  const [note, setNote] = useState<string>("");

  const handleUpdateNote = (e: any) => {
    const newNote = e.detail.value;
    console.log(newNote)
    setNote(newNote);
  };

  return (
    <IonPage>

      <GNLogoHeader />

      <IonContent color="primary">
        
        <NoteContainer>
          <NoteItem counter={true} counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}>
            <NoteLabel position='stacked' color={'light'}><h1>Note for Today</h1></NoteLabel>
            <NoteTextarea value={note} onIonChange={(e) => handleUpdateNote(e)} maxlength={250} autoGrow={true} rows={10} autofocus={true}/>
          </NoteItem>
          
          <SumbitNoteButton>Submit Note</SumbitNoteButton>
        </NoteContainer>

      </IonContent>
    </IonPage>
  );
}

export default Write_Note;