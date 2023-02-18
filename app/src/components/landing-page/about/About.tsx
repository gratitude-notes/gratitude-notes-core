import React from "react";


const About = React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} className="center-display-flex-container">
        <h1>About</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed aut sunt perspiciatis expedita quisquam provident, dicta animi, suscipit repellendus, eaque deleniti! Totam, eaque inventore impedit eveniet itaque animi dolores accusantium!</p>
    </div>
));
export default About; 