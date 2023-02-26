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



const Retrieve_Delta: React.FC = () => {
  

  return (
    <div>hi</div>
  );
}

export default Retrieve_Delta;

const styles = {
  
}