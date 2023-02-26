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
  
    let myString = '{"ops":[{"insert":"Note"},{"attributes":{"header":1},"insert":"\n"},{"attributes":{"bold":true},"insert":"Cool day"},{"attributes":{"list":"ordered"},"insert":"\n"},{"attributes":{"italic":true},"insert":"Awesome"},{"attributes":{"list":"ordered"},"insert":"\n"}]}'; 
    myString = myString.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
    myString = JSON.parse(myString);

    const quillModules = {
        toolbar: false
    }

    return (
        <ReactQuill theme='snow' modules={quillModules} readOnly={true} value={myString}/>
    );
}

export default Retrieve_Delta;

const styles = {
  
}