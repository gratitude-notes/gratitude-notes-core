import React from "react";

const FAQ = React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} className="center-display-flex-container">
        <h1>FAQ</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat facilis eos sunt esse laudantium voluptatem, quis adipisci, non molestiae tenetur, pariatur incidunt libero sequi fuga. Eum eveniet eius dolor neque.</p>
    </div>
));
export default FAQ; 