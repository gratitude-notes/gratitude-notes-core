import { IonContent, IonPage, IonItem, IonTextarea, IonLabel, IonButton, IonText} from '@ionic/react';
import './Write-Note.css';
import '../theme/variables.css'
import React, {useState} from 'react';
import GNLogoHeader from '../components/global/gnlogo-header/GNLogoHeader';
import { writeNote } from '../lib/FirestoreFunctions';
import { useAuth } from '../lib/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { DeltaStatic, Sources } from 'quill';

interface QuillStateType {
  content: string,
  delta: DeltaStatic,
  source: Sources,
  editor: ReactQuill.UnprivilegedEditor
}

const Write_Note: React.FC = () => {
  const currentUser = useAuth();
  const [note, setNote] = useState<string>('');
  const [quillState, setQuillState] = useState<QuillStateType>();

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['image']
    ]
  }

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'image'
  ]

  return (
    <IonPage>

      <GNLogoHeader />

      <IonContent>

        <div style={styles.layout}>
          {/* <IonItem color='primary' counter={true} counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}>
            <IonLabel color='light' style={styles.noteLabel} position='stacked'><h1>Note for Today</h1></IonLabel>
            <IonTextarea  color='light' style={styles.noteTextarea} value={note} onIonChange={(e) => handleUpdateNote(e)} maxlength={250} autoGrow={true} rows={10} autofocus={true}/>
          </IonItem> */}

          <ReactQuill style={styles.quillTextarea} theme='snow'
                      modules={quillModules} formats={quillFormats} value={note}
                      onChange={(content, delta, source, editor) => {
                        setNote(content);
                        setQuillState({ content, delta, source, editor});
                      }}/>

          <div style={styles.buttonContainer}>
            <IonButton color="tertiary"
                        onClick={() => {
                          const delta = quillState?.editor.getContents();
                          console.log('stringified delta', JSON.stringify(delta));
                          console.log('html note', note);
                          writeNote(JSON.stringify(delta), `${currentUser.user_id}`);
                        }}>Submit Note</IonButton>  
            <IonButton color="tertiary" routerLink="/"> Return to Dashboard</IonButton>
          </div>
        </div>

      </IonContent>
    </IonPage>
  );
}

export default Write_Note;

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  } as React.CSSProperties,
  buttonContainer: {
    marginTop: '50px'
  } as React.CSSProperties,
  noteLabel: {
    fontFamily: 'Open_Sans'
  } as React.CSSProperties,
  noteTextarea: {
    fontFamily: 'Open_Sans',
    width: '300px'
  } as React.CSSProperties,
  quillTextarea: {
    height: '300px',
    maxHeight: '500px'
  } as React.CSSProperties
}