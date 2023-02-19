// interface ToolbarProps {
//     topRef: React.RefObject<HTMLDivElement>;
//     aboutRef: React.RefObject<HTMLDivElement>;
//     // reviewsRef: React.RefObject<HTMLDivElement>;
//     // faqRef: React.RefObject<HTMLDivElement>;
//     // contactRef: React.RefObject<HTMLDivElement>;
// }


// const ToolbarHeader: React.FC<ToolbarProps> = ({topRef}: ToolbarProps, {aboutRef}: ToolbarProps) => {
    
    
    
//     return (<div></div>);
// }

// export default ToolbarHeader;

import { IonButton, IonHeader, IonIcon, IonToolbar } from "@ionic/react";
import React from "react";
import styled from 'styled-components';
import logo from '../../assets/GNlogo.svg';

const Toolbar = styled(IonToolbar)`
    --background: var(--ion-color-primary);
    text-align: right;
`

const GNlogoIcon = styled(IonIcon)`
    color: var(--ion-color-secondary);
    position: fixed;
    top: 0.5rem;
    left: 0.5rem;
    cursor: pointer; 
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

const scrollToRef = (elementRef: any) => {
    elementRef.current.scrollIntoView({behavior: 'smooth'});
}

const ToolbarHeader = React.forwardRef((props, aboutRef: React.Ref<HTMLDivElement>) => (

    <IonHeader className="ion-no-border">
        <Toolbar>
            {/* <GNlogoIcon onClick={() => scrollToRef(ref)} icon={logo} size="large"/> */}
            <ToolbarButton onClick={() => scrollToRef(aboutRef)}>About</ToolbarButton>
            {/* <ToolbarButton onClick={() => scrollToRef(reviewsRef)}>Reviews</ToolbarButton>
            <ToolbarButton onClick={() => scrollToRef(faqRef)}>FAQ</ToolbarButton>
            <ToolbarButton onClick={() => scrollToRef(contactRef)}>Contact</ToolbarButton> */}
            <LoginButton id="login-btn">Login</LoginButton>
        </Toolbar>
    </IonHeader>
));
export default ToolbarHeader; 