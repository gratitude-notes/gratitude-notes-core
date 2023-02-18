import React from "react";

const Contact = React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} className="center-display-flex-container">
        <h1>Contact</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore unde perspiciatis dolorum sequi voluptatem tempora recusandae fugit. Fugiat a debitis hic blanditiis adipisci magni ullam similique neque repudiandae nesciunt. Mollitia.</p>
    </div>
));
export default Contact; 