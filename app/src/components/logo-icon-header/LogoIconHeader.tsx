import { IonHeader, IonIcon } from "@ionic/react";
import '../../pages/global.css';
import './LogoIconHeader.css';
import logo from '../../assets/GNlogo.svg';

const LogoIconHeader: React.FC = () => {
    return(
        <IonHeader className="ion-no-border">
            <IonIcon id="GNlogoIcon" className="GNlogoIcon" icon={logo} size="large"/>
        </IonHeader>
    );
}

export default LogoIconHeader;