import React from "react";
import styled from "styled-components";

const ReviewsHeader = styled.h1`
    margin: 0;
    padding: 0;
    text-align: center;
    font-family: Open_Sans;
    font-size: 8em;
    color: var(--ion-color-light);
`

const ReviewsParagraph = styled.p`
    margin: 0;
    padding: 0;
    text-align: center;
    font-family: Montserrat;
    font-size: 2em;
    color: var(--ion-color-light);
`

const Reviews = React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} className="center-display-flex-container">
        <ReviewsHeader>Reviews</ReviewsHeader>
        <ReviewsParagraph>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores excepturi officiis exercitationem mollitia velit esse sequi labore, sapiente nesciunt! Eligendi quasi dolorem, accusantium ab rem sapiente asperiores inventore autem obcaecati.</ReviewsParagraph>
    </div>
));
export default Reviews; 