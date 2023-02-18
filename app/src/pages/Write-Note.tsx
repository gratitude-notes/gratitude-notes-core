import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonFooter, IonButton, IonTextarea, IonText} from '@ionic/react';
import './Write-Note.css';
import '../theme/variables.css'
import React, {useState} from 'react';

const Write_Note: React.FC = () => {
  const [notes, setNotes] = useState<string[]>([]);

  const handleUpdateNote = (index: number, e: any) => {
    const newNotes = [...notes];
    newNotes[index] = e.detail.value;
    setNotes(newNotes);
  };

  const handleDeleteNote = (index: number) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gratitude Notes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div id="note-container">
          <IonItem lines="none" counter={true} counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}>
          {/* <IonTextarea className="note-text-area" 
                            value={note}
                            onIonChange={(e) => handleUpdateNote(index, e)}
                            maxlength={150}
                            autoGrow={true}
                            placeholder="Enter note..."/> */}
            
            
          </IonItem>
        </div>

          {/* {notes.map((note, index) => (
            <div key={index}>
              <IonItem lines="none" counter={true} counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}>
                <IonTextarea className="note-text-area" 
                            value={note}
                            onIonChange={(e) => handleUpdateNote(index, e)}
                            maxlength={150}
                            autoGrow={true}
                            placeholder="Enter note..."/>
              </IonItem>
              <IonButton onClick={() => handleDeleteNote(index)}>Delete</IonButton>
              <IonButton onClick={() => setNotes([...notes, ''])}>Add Note</IonButton>
            </div>
          ))}
        </div> */}


        <IonButton onClick={() => setNotes([...notes, ''])}>Add Notes</IonButton>
        <IonText id="notes-disabled-text" hidden={true}>No more notes can be added today.</IonText>
      </IonContent>

      <IonFooter>
        <IonToolbar>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Write_Note;