import { IonHeader, IonIcon, IonToolbar } from "@ionic/react";
import styled from 'styled-components';
import logo from '../../../assets/GNlogo.svg';

const GNLogoHeader: React.FC = () => {

    return (
        <IonHeader>
            <IonToolbar color='primary' style={styles.toolbar}>
                <IonIcon color='light' style={styles.logoIcon} icon={logo}/>
            </IonToolbar>
        </IonHeader>
    );
}

export default GNLogoHeader;

const styles = {
    toolbar: {
        textAlign: 'right',
        height: '75px'
    } as React.CSSProperties,
    logoIcon : {
        position: 'fixed',
        top: '1rem',
        left: '1rem',
        cursor: 'pointer', 
        fontSize: '2.5rem'
    } as React.CSSProperties
}