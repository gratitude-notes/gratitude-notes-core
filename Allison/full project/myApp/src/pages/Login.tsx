import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonText, IonButton, IonIcon, IonInput} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import React, {useState, useEffect} from 'react'
import {addCircleOutline} from 'ionicons/icons'
import {Link} from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../fireConfig'

async function toast(message:string) {
  const toast = document.createElement('ion-toast');
  toast.message = 'Your settings have been saved.';
  toast.duration = 2000;

  document.body.appendChild(toast);
  return toast.present();
}

async function loginUser(email: string, password: string){
  let loggedIn = true;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("yay")
      loggedIn = true;
      //return true;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, errorCode)
      console.log("no")
      loggedIn = false;
      //return false;
    });
    
}

const Home: React.FC = () => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    async function login() {
      const res = await loginUser(username, password)
      await loginUser(username, password)
      console.log("res", res)
      //console.log("res", res)
      //console.log(`${res ? 'Login Success' : 'Login Failed'}`)
      console.log(username, password)
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonText>Welcome to Login Page!</IonText>
        <IonInput 
            placeholder="Username?" 
            onIonChange={(e:any) => setUserName(e.target.value)}
        />
        <IonInput 
            type="password"
            placeholder="Password?"
            onIonChange={(e:any) => setPassword(e.target.value)}
            />
        <IonButton onClick={login}>Login</IonButton>
        <p>
            Are you knew? <Link to="/register">Register</Link>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Home;
