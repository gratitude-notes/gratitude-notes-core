import { Route, Redirect } from 'react-router-dom';
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
import Login from './pages/Login';
import Landing from './pages/Landing';
import AddNotes from './pages/Add-Note';
import ViewNotes from './pages/View-Notes';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login" render={() => {
          return <Login />
        }} />
        <Route exact path="/add-note" render={() => {
          return <AddNotes />
        }} />
        <Route exact path="/view-notes" render={() => {
          return <ViewNotes />
        }} />
        <Route render={() => <Redirect to="/"/>} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
