import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
//import Example from './pages/Example';
import Login from './pages/Login';
import Register from './pages/Register';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBJsQ40vMSJRCfVDE5Vpn9Z4xQ2q75Gh7A",
//   authDomain: "gratitudenotes.firebaseapp.com",
//   projectId: "gratitudenotes",
//   storageBucket: "gratitudenotes.appspot.com",
//   messagingSenderId: "73810251457",
//   appId: "1:73810251457:web:df69847d2adaca2e55ce40"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/login" component={Login} exact></Route>
        <Route path="/register" component={Register} exact></Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;