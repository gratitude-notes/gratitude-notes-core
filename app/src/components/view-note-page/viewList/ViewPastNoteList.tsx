import styled from "styled-components";
import { IonItem, IonLabel, IonList, IonListHeader, IonButton, IonHeader, IonPage, IonToolbar, IonContent, IonTitle, IonButtons, IonInput, IonModal } from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';
import React, { useState, useEffect } from 'react';
import CreateModal from '../modalFolderView/CreateModal';
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80%;
`

//const ViewPastNoteList = React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => (
const ViewPastNoteList: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [notes, setNotes] = useState([]);
    const [date, setDate] = useState('');
  
    const handleShowModal = () => {
      setShowModal(true);
    };
  
    const handleHideModal = () => {
      setShowModal(false);
    };
  
    return (
      <IonList>
        <IonListHeader>
          <IonLabel>Date: 2/20/2023</IonLabel>
        </IonListHeader>
        <IonItem onClick={handleShowModal}>
          <IonLabel>Today I am feeling happy because I got the modal component working. I am happy happy.</IonLabel>
        </IonItem>
        <IonItem onClick={handleShowModal}>
          <IonLabel>Now, I am sad because I know Dinesh will not love it.</IonLabel>
        </IonItem>
        <CreateModal isOpen={showModal} onDidDismiss={handleHideModal} />
      </IonList>
    );
  };
export default ViewPastNoteList; 
