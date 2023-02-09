import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar , IonToast, IonText, IonButton, IonInput,} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import React, {useState, useEffect} from 'react'
import {addCircleOutline} from 'ionicons/icons'
import {Link} from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, AuthProvider, getRedirectResult } from "firebase/auth";
import {auth} from '../fireConfig'


// function toast() {
//   const [showToast, setShowToast] = useState(false);

//   return (
//     <>
//       <IonButton onClick={() => setShowToast(true)}>Show Toast</IonButton>
//       <IonToast isOpen={showToast} onDidDismiss={() => setShowToast(false)} message="Hello World!" duration={1500} />
//     </>
//   );
// }

function googleSignInUser(provider: AuthProvider) {
  
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });


}


async function registerUser(email: string, password: string){
  let loggedIn = true;
  //const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
    
}

const Register: React.FC = () => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    async function reg() {
        console.log(username, password, confirmPassword)
        //await registerUser(username, password)
        if(password !== confirmPassword){
          //toast('Passwords do not match')
          //toast();
        }
        if(username.trim() === '' || password.trim() === '') {
          //toast('Username and password are required')
        }
        //else {
          await registerUser(username, password)
        //}
        
    }

    async function googleSignIn(){
      const provider = new GoogleAuthProvider();
      await googleSignInUser(provider)
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
        <IonButton onClick={reg}>Register</IonButton>
        <IonButton onClick={googleSignIn}>Sign in with google</IonButton>
        <p>
            Already have an account? <Link to="/login">Login</Link>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Register;
