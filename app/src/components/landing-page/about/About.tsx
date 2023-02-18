import React from "react";
import styled from "styled-components";

const AboutHeader = styled.h1`
    margin: 0;
    padding: 0;
    text-align: center;
    font-family: Open_Sans;
    font-size: 8em;
    color: var(--ion-color-light);
`

const AboutParagraph = styled.p`
    margin: 0;
    padding: 0;
    text-align: center;
    font-family: Montserrat;
    font-size: 2em;
    color: var(--ion-color-light);
`

const About = React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} className="center-display-flex-container">
        <AboutHeader>About</AboutHeader>
        <AboutParagraph>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed aut sunt perspiciatis expedita quisquam provident, dicta animi, suscipit repellendus, eaque deleniti! Totam, eaque inventore impedit eveniet itaque animi dolores accusantium!</AboutParagraph>
    </div>
));
export default About; 