import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div className="flex flex-col items-center justify-center h-[60vh] text-white text-center">
        <h1 className="text-9xl font-bold text-purple-500">404</h1>
        <h2 className="text-4xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-gray-400 mt-2">Sorry, we couldn't find the page you're looking for.</p>
        <Link to="/" className="mt-8 bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
            Back to Homepage
        </Link>
    </div>
);

export default NotFoundPage;