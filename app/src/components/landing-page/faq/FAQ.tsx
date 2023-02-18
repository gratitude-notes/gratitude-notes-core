import React from "react";
import styled from "styled-components";

const FAQHeader = styled.h1`
    margin: 0;
    padding: 0;
    text-align: center;
    font-family: Open_Sans;
    font-size: 8em;
    color: var(--ion-color-light);
`

const FAQParagraph = styled.p`
    margin: 0;
    padding: 0;
    text-align: center;
    font-family: Montserrat;
    font-size: 2em;
    color: var(--ion-color-light);
`

const FAQ = React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} className="center-display-flex-container">
        <FAQHeader>FAQ</FAQHeader>
        <FAQParagraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat facilis eos sunt esse laudantium voluptatem, quis adipisci, non molestiae tenetur, pariatur incidunt libero sequi fuga. Eum eveniet eius dolor neque.</FAQParagraph>
    </div>
));
export default FAQ; 