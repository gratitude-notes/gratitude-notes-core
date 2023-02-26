import React, {useState} from 'react';
import { IonRange, IonIcon } from '@ionic/react';
import { happy, sad } from 'ionicons/icons';
import './Sliderbar.css';

const marks = [
  { value: -5, label: '-5' },
  { value: -4, label: '-4' },
  { value: -3, label: '-3' },
  { value: -2, label: '-2' },
  { value: -1, label: '-1' },
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
];

//const tickLabels = marks.map((mark) => mark.label);

const SliderBar: React.FC = () =>  {

  const [value, setValue] = useState(0);

  return (
  
      <IonRange
        pin={true}
        pinFormatter={(value: number) => `${value}`}
        snaps={true} ticks={true} min={-5} max={5}
        activeBarStart={0}
        step={1}
        onIonChange={e => setValue(e.detail.value as number)}
        
        //value={value}
    >
      <IonIcon slot="start" icon={sad}></IonIcon>
      <IonIcon slot="end" icon={happy}></IonIcon>
    </IonRange>
  
    );

};
export default SliderBar; 
