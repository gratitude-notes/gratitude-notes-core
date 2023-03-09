import React, {useState} from 'react';
import { IonRange, IonIcon } from '@ionic/react';
import { happy, sad } from 'ionicons/icons';
import './Sliderbar.css';


//const tickLabels = marks.map((mark) => mark.label);

const SliderBar: React.FC = () =>  {

  const [value, setValue] = useState(0);

  return (

      <IonRange
        onIonChange={e => setValue(e.detail.value as number)}
        min={-5} max={5} pin={true} ticks={true} snaps={true} step={1}
    >
      <IonIcon slot="start" icon={sad}></IonIcon>
      <IonIcon slot="end" icon={happy}></IonIcon>
    </IonRange>

    );

};
export default SliderBar; 