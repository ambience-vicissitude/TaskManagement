/**
 * Footer Component
 * - has a link to home
 * - designed to simply provide a way to navigate back to the home page from any other page in the app
 * - this closes the 'navigable routes' loop, ensuring users can always return to the starting point of the SPA
 * 
 * @updated Sep 2025
 * @author bling 
 * @returns rendering
 */

import React from 'react';

function FooterComponent() {
    return (
        <footer className="bg-gray-100 border-t border-gray-300 py-4 mt-12 w-full">
            <div className="container mx-auto text-center">
                <a
                    href="/"
                    className="font-bold text-blue-600 hover:underline"
                >
                    Go to Home
                </a>
            </div>
        </footer>
    );
}

export default React.memo(FooterComponent);
