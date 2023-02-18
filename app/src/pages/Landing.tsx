import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonModal, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { MutableRefObject, useContext, useEffect, useRef } from "react";
import './Landing.css';
import './global.css';
import '../theme/variables.css';
import logo from '../assets/GNlogo.svg';
import { AuthContext } from "../AuthData";
import styled from 'styled-components';
import ToolbarHeader from "../components/landing-page/toolbar-header/ToolbarHeader";
import About from "../components/landing-page/about/About";
import OpeningTitle from "../components/landing-page/opening-title/OpeningTitle";
import Reviews from "../components/landing-page/reviews/Reviews";
import FAQ from "../components/landing-page/faq/FAQ";
import Contact from "../components/landing-page/contact/Contact";

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

const CloseIcon = styled(IonIcon)`
    color: black;
    size: 5em;
`

const Landing: React.FC = () => {
    const userContext = useContext(AuthContext);

    const openingTitleRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const reviewsRef = useRef<HTMLDivElement>(null);
    const faqRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    const scrollToRef = (elementRef: any) => {
        elementRef.current.scrollIntoView({behavior: 'smooth'});
    }
    
    return (
        <IonPage>
            {/* <ToolbarHeader props={topRef}></ToolbarHeader> */}
            <IonHeader className="ion-no-border">
                <Toolbar>
                    <GNlogoIcon onClick={() => scrollToRef(openingTitleRef)} icon={logo} size="large"/>
                    <ToolbarButton onClick={() => scrollToRef(aboutRef)}>About</ToolbarButton>
                    <ToolbarButton onClick={() => scrollToRef(reviewsRef)}>Reviews</ToolbarButton>
                    <ToolbarButton onClick={() => scrollToRef(faqRef)}>FAQ</ToolbarButton>
                    <ToolbarButton onClick={() => scrollToRef(contactRef)}>Contact</ToolbarButton>
                    <LoginButton id="login-btn">Login</LoginButton>
                </Toolbar>
            </IonHeader>
            <IonContent className="content-primary-color">

                <OpeningTitle ref={openingTitleRef}/>
                <About ref={aboutRef}/>
                <Reviews ref={reviewsRef}/>
                <FAQ ref={faqRef}/>
                <Contact ref={contactRef}/>

                <IonModal id="login-modal" trigger="login-btn" backdropDismiss={false}>
                    {/* <IonButton onClick={closeModal}>Close me</IonButton> */}
                </IonModal>

            </IonContent>

            {/* Auto scroll to next component try */}
            {/* <IonFooter>
                <IonButton >CLICK ME</IonButton>
            </IonFooter> */}
        </IonPage>
    );
}

export default Landing;