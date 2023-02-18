import React from "react";

const Reviews = React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} className="center-display-flex-container">
        <h1>Reviews</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores excepturi officiis exercitationem mollitia velit esse sequi labore, sapiente nesciunt! Eligendi quasi dolorem, accusantium ab rem sapiente asperiores inventore autem obcaecati.</p>
    </div>
));
export default Reviews; 