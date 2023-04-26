import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage: React.FC = () => {
    const error = useRouteError();
    console.error(error);

    // Error Object Example: { status: 404, statusText: "Not Found", internal: true, data: 'Error: No route matches URL "/anything"', error: Error }

    return (
        <div>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
        </div>
    );
};

export default ErrorPage;
