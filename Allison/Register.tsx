import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonText, IonButton, IonIcon, IonInput,} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import React, {useState, useEffect} from 'react'
import {addCircleOutline} from 'ionicons/icons'
import {Link} from 'react-router-dom'
import {toast} from '../toast'

const Register: React.FC = () => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    async function register() {
        //console.log(username, password, confirmPassword)
        if(password !== confirmPassword){
          return toast('Passwords do not match')
        }
        if(username.trim() === '' || password.trim() === '') {
          return toast('Username and password are required')
        }
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonText>Welcome to Register Page!</IonText>
        <IonInput 
            placeholder="Username?" 
            onIonChange={(e:any) => setUserName(e.target.value)}
        />
        <IonInput 
            type="password"
            placeholder="Password?"
            onIonChange={(e:any) => setPassword(e.target.value)}
            />
         <IonInput 
            type="password"
            placeholder="Confirm Password?"
            onIonChange={(e:any) => setConfirmPassword(e.target.value)}
            />
        <IonButton onClick={register}>Register</IonButton>
        <p>
            Already have an account? <Link to="/login">Login</Link>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Register;
