import React from "react";
import styled from "styled-components";

const ContactHeader = styled.h1`
    margin: 0;
    padding: 0;
    text-align: center;
    font-family: Open_Sans;
    font-size: 8em;
    color: var(--ion-color-light);
`

const ContactParagraph = styled.p`
    margin: 0;
    padding: 0;
    text-align: center;
    font-family: Montserrat;
    font-size: 2em;
    color: var(--ion-color-light);
`

const Contact = React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} className="center-display-flex-container">
        <ContactHeader>Contact</ContactHeader>
        <ContactParagraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore unde perspiciatis dolorum sequi voluptatem tempora recusandae fugit. Fugiat a debitis hic blanditiis adipisci magni ullam similique neque repudiandae nesciunt. Mollitia.</ContactParagraph>
    </div>
));
export default Contact; 