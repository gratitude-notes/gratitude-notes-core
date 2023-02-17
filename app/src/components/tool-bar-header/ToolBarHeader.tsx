import { IonButton, IonHeader, IonIcon, IonToolbar } from "@ionic/react"
import logo from '../../assets/GNlogo.svg';
import styled from "styled-components";

const Toolbar = styled(IonToolbar)`
    --background: var(--ion-color-primary);
    text-align: right;
`

const GNlogoIcon = styled(IonIcon)`
    color: var(--ion-color-secondary);
    position: fixed;
    top: 0.5rem;
    left: 0.5rem;
`

const ToolbarButton = styled(IonButton)`
    text-transform: none;
    --box-shadow: none;
    font-size: 1rem;
    font-family: Montserrat;
    --color: var(--ion-color-secondary);
`

const LoginButton = styled.button`
    background-color: var(--ion-color-secondary); 
    border-radius: 29px; 
    border: 1px solid var(--ion-color-secondary); 
    color: var(--ion-color-light); 
    font-family: Montserrat;
    font-size: 1rem; 
    padding: 0.75rem 1.5rem;
    cursor: pointer; 
    transition: 0.3s; 
    margin: 1rem;

    :hover {
        background-color: var(--ion-color-light); 
        color: var(--ion-color-secondary); 
        border-color: var(--ion-color-secondary); 
        transition: 0.3s; 
    }
`

const ToolBarHeader: React.FC = () => {
    return(
        <IonHeader className="ion-no-border">
            <Toolbar>
                <GNlogoIcon icon={logo} size="large"/>
                <ToolbarButton>About</ToolbarButton>
                <ToolbarButton>FAQ</ToolbarButton>
                <ToolbarButton>Reviews</ToolbarButton>
                <ToolbarButton>Contact</ToolbarButton>

                <LoginButton>Login</LoginButton>
            </Toolbar>
        </IonHeader>
    );
}

export default ToolBarHeader;