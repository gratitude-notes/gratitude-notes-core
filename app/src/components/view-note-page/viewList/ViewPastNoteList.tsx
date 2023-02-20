import styled from "styled-components";
import { IonItem, IonLabel, IonList, IonListHeader, IonButton, IonHeader, IonPage, IonToolbar, IonContent, IonTitle, IonButtons, IonInput, IonModal } from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';
import React, { useState, useRef } from 'react';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80%;
`


function Example() {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [message, setMessage] = useState(
    'This modal example uses triggers to automatically open a modal when the button is clicked.'
  );

  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inline Modal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton id="open-modal" expand="block">
          Open
        </IonButton>
        <p>{message}</p>
        <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Welcome</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="stacked">Enter your name</IonLabel>
              <IonInput ref={input} type="text" placeholder="Your name" />
            </IonItem>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}




const ViewPastNoteList = React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => (
  //<ListContainer>

    <IonList>
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
      <IonItem onClick = {() => Example()}>
        <IonLabel>Mega Man X</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>The Legend of Zelda</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Pac-Man</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Super Mario World Note Here akda;dkfad;fkdjfkd;fkdjflkdsjf;dkjfakljfkajfkdjfa</IonLabel>
      </IonItem>
    </IonList>
    //</ListContainer>
));
export default ViewPastNoteList; 