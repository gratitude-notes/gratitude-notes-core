import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonModal, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { useContext, useRef } from "react";
import './Landing.css';
import './global.css';
import '../theme/variables.css';
import logo from '../assets/GNlogo.svg';
import { close } from 'ionicons/icons';
import { AuthContext } from "../AuthData";
import styled from 'styled-components';
import ToolbarHeader from "../components/landing-page/toolbar-header/ToolbarHeader";
import About from "../components/landing-page/about/About";
import OpeningTitle from "../components/landing-page/opening-title/OpeningTitle";
import Reviews from "../components/landing-page/reviews/Reviews";
import FAQ from "../components/landing-page/faq/FAQ";
import Contact from "../components/landing-page/contact/Contact";
import { modalController } from '@ionic/core';

const Toolbar = styled(IonToolbar)`
    --background: var(--ion-color-primary);
    text-align: right;
    height: 75px;
`

const GNlogoIcon = styled(IonIcon)`
    color: var(--ion-color-secondary);
    position: fixed;
    top: 1rem;
    left: 1rem;
    cursor: pointer; 
    font-size: 2.5rem;
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

const LoginModal = styled(IonModal)`
    --max-width: 20rem;
    --max-height: 30rem;
    --border-radius: 50px;
    --background: var(--ion-color-secondary);
`

const CloseIcon = styled(IonIcon)`
    font-size: 2rem;
    position: fixed;
    top: 1rem;
    right: 1rem;
    color: var(--ion-color-light);
    cursor: pointer;
`

const LoginModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 2rem;
`

const ContinueWithServiceBtn = styled.button`
    background-color: var(--ion-color-light); 
    border-radius: 29px; 
    border: 1px solid var(--ion-color-light); 
    color: var(--ion-color-secondary); 
    font-family: Montserrat;
    font-size: 0.85rem; 
    padding: 0.75rem 1.5rem;
    cursor: pointer; 
    transition: 0.3s; 
    margin: 1rem;

    :hover {
        background-color: var(--ion-color-primary); 
        color: var(--ion-color-secondary); 
        border-color: var(--ion-color-primary); 
        transition: 0.3s; 
    }
`

const Landing: React.FC = () => {
    const userContext = useContext(AuthContext);

    const openingTitleRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const reviewsRef = useRef<HTMLDivElement>(null);
    const faqRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    
    return (
        <IonPage>
            {/* <ToolbarHeader ref={{ aboutRef: this.aboutRef, reviewsRef: this.reviewsRef } }></ToolbarHeader> */}

            <IonHeader>
                <Toolbar>
                    <GNlogoIcon onClick={() => openingTitleRef.current?.scrollIntoView({behavior: 'smooth'})} icon={logo}/>
                    <ToolbarButton onClick={() => aboutRef.current?.scrollIntoView({behavior: 'smooth'})}>About</ToolbarButton>
                    <ToolbarButton onClick={() => reviewsRef.current?.scrollIntoView({behavior: 'smooth'})}>Reviews</ToolbarButton>
                    <ToolbarButton onClick={() => faqRef.current?.scrollIntoView({behavior: 'smooth'})}>FAQ</ToolbarButton>
                    <ToolbarButton onClick={() => contactRef.current?.scrollIntoView({behavior: 'smooth'})}>Contact</ToolbarButton>
                    <LoginButton id="login-btn">Login</LoginButton>
                </Toolbar>
            </IonHeader>

            <IonContent color="primary">

                <OpeningTitle ref={openingTitleRef}/>
                <About ref={aboutRef}/>
                <Reviews ref={reviewsRef}/>
                <FAQ ref={faqRef}/>
                <Contact ref={contactRef}/>

                <LoginModal id="login-modal" trigger="login-btn" backdropDismiss={false}>
                    <CloseIcon icon={close} onClick={async () => await modalController.dismiss()}></CloseIcon>

                    <LoginModalContainer className="center-display-flex-container">
                        <IonText color="light">
                            <h3>Login</h3>
                        </IonText>
                        <IonText color="light">
                            <p>By continuing, you are agreeing to set up a Gratitude Notes account and agreeing to our User Agreement and Privacy Policy.</p>
                        </IonText>
                        <ContinueWithServiceBtn id="login-google-btn">Continue with Google</ContinueWithServiceBtn>
                        <ContinueWithServiceBtn id="login-apple-btn">Continue with Apple</ContinueWithServiceBtn>
                    </LoginModalContainer>
                </LoginModal>

            </IonContent>
        </IonPage>
    );
}

export default Landing;