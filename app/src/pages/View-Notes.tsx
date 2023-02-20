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