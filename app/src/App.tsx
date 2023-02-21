/* React Imports */
import { Route, Redirect } from 'react-router-dom';

/* Ion Component Imports */
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

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
import Landing from './pages/Landing';
import WriteNote from './pages/Write-Note';
import ViewNotes from './pages/View-Notes';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';

/* Auth Context */
import { AuthContext, useAuth, UserAuth } from './lib/AuthContext';

setupIonicReact();

const Routes: React.FC<{ currentUser: UserAuth }> = ({ currentUser}) => {
  if (currentUser.logged_in) {
    return (
      <>
        <Route exact path="/write-note" component={WriteNote} />
        <Route exact path="/view-notes" component={ViewNotes} />
        <Route exact path="/calendar" component={Calendar} />
        <Route exact path="/" component={Dashboard} />
      </>
    );
  } else {
    return (
      <Route exact path="/" component={Landing} />
    );
  }
}

const App: React.FC = () => {
  const currentUser = useAuth();

  return (
    <IonApp>
      <AuthContext.Provider value={currentUser}>
        <IonReactRouter>
          <IonRouterOutlet>
            <Routes {...{currentUser}} />
          </IonRouterOutlet>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
}

export default App;
