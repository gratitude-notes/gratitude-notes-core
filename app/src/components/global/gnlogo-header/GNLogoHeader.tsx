import { IonHeader, IonIcon, IonToolbar } from "@ionic/react";
import styled from 'styled-components';
import logo from '../../../assets/GNlogo.svg';

const GNlogoIcon = styled(IonIcon)`
    color: var(--ion-color-secondary);
    position: fixed;
    top: 1rem;
    left: 1rem;
    cursor: pointer; 
    font-size: 2.5rem;
`

const Toolbar = styled(IonToolbar)`
    --background: var(--ion-color-primary);
    text-align: right;
    height: 75px;
`


const GNLogoHeader: React.FC = () => {

    return (
        <IonHeader>
            <Toolbar>
                <GNlogoIcon icon={logo}/>
            </Toolbar>
        </IonHeader>
    );
}

export default GNLogoHeader;