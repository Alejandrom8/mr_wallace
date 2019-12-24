import React from 'react';

function ErrorBoundary(props){  
    return (
        <div>
            <h1>{props.message}</h1>
            <h2>{props.error.status}</h2>
            <pre>{props.error.stack}</pre>
        </div>
    );
}

export default ErrorBoundary;