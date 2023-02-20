import React, { useState } from 'react';
import { IonButton, IonModal, IonContent, IonHeader, IonTitle, IonToolbar, IonTextarea } from '@ionic/react';



interface Props {
  isOpen: boolean;
  onDidDismiss: () => void;
}

const CreateModal: React.FC<Props> = ({ isOpen, onDidDismiss }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>2/20/2023</IonTitle>
          <IonButton onClick={onDidDismiss}>Close Modal</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>This is where the note data is located</p>
      </IonContent>
    </IonModal>
  );
};

export default CreateModal;