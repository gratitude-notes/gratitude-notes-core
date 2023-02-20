import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonText} from '@ionic/react';
import { useContext, useRef } from "react";
import './View-Notes.css';
import '../theme/variables.css'
import React, {useState, useEffect} from 'react';
import SearchBar from "../components/view-note-page/SearchBar";
import ViewList from "../components/view-note-page/viewList/ViewPastNoteList";

const View_Notes: React.FC = () => {

  const searchbar = useRef<HTMLDivElement>(null);
  const viewlist = useRef<HTMLDivElement>(null);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gratitude Notes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div id="notes-container">
          <SearchBar ref={searchbar}/>
          <ViewList ref={viewlist}/>
        </div>
      </IonContent>

      <IonFooter>
        <IonToolbar>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default View_Notes;



      {/* <IonList>
      <IonListHeader>
        <IonLabel>Date</IonLabel>
      </IonListHeader>
      <IonItem>
        <IonButton 
          id = "viewBtn"
          color="primary" 
          expand="full"
          fill="clear"
          >
            New Note
      </IonButton>
      </IonItem>
      <IonItem>
        <IonLabel>Mega Man X</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>The Legend of Zelda</IonLabel>
      </IonItem>
      <IonItem onClick={() => console.log("hi")}>
        <IonLabel>Pac-Man</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Super Mario World Note Here akda;dkfad;fkdjfkd;fkdjflkdsjf;dkjfakljfkajfkdjfa</IonLabel>
      </IonItem>
    </IonList>


      
        <ViewNotesModal id="login-modal" trigger="viewBtn" backdropDismiss={true}>

                    <ViewListContainer className="center-display-flex-container">
                        <IonText color="light">
                            <h3>Login</h3>
                        </IonText>
                        <IonText color="light">
                            <p>By continuing, you are agreeing to set up a Gratitude Notes account and agreeing to our User Agreement and Privacy Policy.</p>
                        </IonText>
                    </ViewListContainer>
          </ViewNotesModal>
      </IonContent>

      <IonFooter>
        <IonToolbar>
        </IonToolbar>
      </IonFooter>
    </IonPage> */}