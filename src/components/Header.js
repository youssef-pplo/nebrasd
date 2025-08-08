import React from 'react';
import { Link } from 'react-router-dom';
import { TrophyIcon } from '../icons/Icons';

const Header = () => (
    <header className="bg-gray-900/80 backdrop-blur-sm shadow-lg shadow-purple-500/10 sticky top-0 z-40">
        <nav className="container mx-auto px-6 py-4">
            <Link to="/" className="flex items-center gap-3">
                <TrophyIcon size={36} className="text-purple-400" />
                <h1 className="text-3xl font-bold text-white tracking-wider">نبراس</h1>
            </Link>
        </nav>
    </header>
);

export default Header;