import React from 'react';
import { Toaster } from 'react-hot-toast'

// Default implementation, that you can customize
function Root({ children }) {

    return (
        <>
            <Toaster />
            {children}
        </>
    );
}

export default Root;