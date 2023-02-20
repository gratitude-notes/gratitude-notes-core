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

function DisplayCard(){
  
}


const ViewPastNoteList = React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => (
  //<ListContainer>

    <IonList>
      <IonListHeader>
        <IonLabel>Date</IonLabel>
      </IonListHeader>
      <IonItem>
      <IonButton 
        color="primary" 
        onClick={ () => DisplayCard() }
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