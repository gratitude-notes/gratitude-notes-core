/* React Imports */
import { Route, Redirect } from 'react-router-dom';

/* Ion Component Imports */
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Firebase Component Imports */
import { useAuthDataInit } from './AuthData';

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
import WriteNote from './pages/Write-Note';
import ViewNotes from './pages/View-Notes';
import Dashboard from './pages/Dashboard';

setupIonicReact();

const PrivateRoutes: React.FC = () => (
  /**
   * Routes for Authorized Users
   * 
   * Accessible Routes: [WriteNote, ViewNotes, Dashboard]
   * Fallback Route: [Dashboard]
   */
  <IonReactRouter>
    <IonRouterOutlet>
      <Route exact path="/write-note" component={WriteNote} />
      <Route exact path="/view-notes" component={ViewNotes} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route path="/" exact component={Dashboard} />
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

          {/* Dashboard should not be a Public Route, just using for design purposes. */}
          {/* <Route exact path="/dashboard" component={Dashboard} /> */}

          {/* Write Note should not be a Public Route, just using for design purposes. */}
          <Route exact path="/write-note" component={WriteNote} />

          <Route exact path="/" component={Landing} />
        </IonRouterOutlet>
    </IonReactRouter>
);

const App: React.FC = () => {
  const { auth_loading, auth } = useAuthDataInit();
  
  return (
    <IonApp>
      { auth?.logged_in ? <PrivateRoutes /> : <PublicRoutes /> }
    </IonApp>
  );
}

export default App;
