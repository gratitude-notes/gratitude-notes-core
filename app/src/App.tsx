/* React Imports */
import { Route, Redirect } from 'react-router-dom';

/* Ion Component Imports */
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Firebase Component Imports */
import { AuthContext, useAuthInit } from './AuthData';
import { useFirebase, useFirebaseInit } from './Firebase';

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

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import Landing from './pages/Landing';
import AddNotes from './pages/Add-Note';
import ViewNotes from './pages/View-Notes';
import Dashboard from './pages/Dashboard';

setupIonicReact();

const FirebaseInit = () => {
  useFirebaseInit();
  console.log("Test");
}

const PrivateRoutes: React.FC = () => (
  /**
   * Routes for Authorized Users
   * 
   * Accessible Routes: [AddNotes, ViewNotes, Dashboard]
   * Fallback Route: [Dashboard]
   */
  <IonReactRouter>
    <IonRouterOutlet>
      <Route exact path="/add-notes" component={AddNotes} />
      <Route exact path="/view-notes" component={ViewNotes} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route path="/" exact component={Dashboard} />
      <Route render={() => <Redirect to="/"/> } />
    </IonRouterOutlet>
  </IonReactRouter>
);


const PublicRoutes: React.FC = () => (
  /**
   * Routes For Unauthorized Users 
   * 
   * Accessible Routes: [Landing, Login]
   * Fallback Route: [Landing] (Should Change to 404 Page)
   */
    <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/landing" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Landing} />
          <Route render={() => <Redirect to="/"/> } />
        </IonRouterOutlet>
    </IonReactRouter>
);

const App: React.FC = () => {
  const { auth_loading, auth } = useAuthInit();
  
  return (
    <IonApp>
      { false ? <PrivateRoutes /> : <PublicRoutes /> }
    </IonApp>
  );
}

export default App;
