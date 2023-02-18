import React from "react";

const OpeningTitle = React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} className="center-display-flex-container">
        <h1>Gratitude Notes</h1>
        <p>Welcome to Gratitude Notes.</p>
    </div>
));
export default OpeningTitle; 