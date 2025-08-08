import React from 'react';

const Footer = () => (
    <footer className="bg-gray-900 border-t border-gray-800 mt-16">
        <div className="container mx-auto px-6 py-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Nebras Platform. All Rights Reserved.</p>
            <p className="text-sm mt-2">by pplo.dev</p>
        </div>
    </footer>
);

export default Footer;