import React from "react";
import styled from "styled-components";

const OpeningTitleHeader = styled.h1`
    margin: 0;
    padding: 0;
    text-align: center;
    font-family: Open_Sans;
    font-size: 8em;
    color: var(--ion-color-light);
`

const OpeningTitleParagraph = styled.p`
    margin: 0;
    padding: 0;
    text-align: center;
    font-family: Montserrat;
    font-size: 2em;
    color: var(--ion-color-light);
`

const OpeningTitle = React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} className="center-display-flex-container">
        <OpeningTitleHeader>Gratitude Notes</OpeningTitleHeader>
        <OpeningTitleParagraph>Welcome to Gratitude Notes.</OpeningTitleParagraph>
    </div>
));
export default OpeningTitle; 