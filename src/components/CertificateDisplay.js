import React from 'react';
import { TrophyIcon } from '../icons/Icons';

const CertificateDisplay = React.forwardRef(({ trackTitle, studentName, date }, ref) => (
    <div ref={ref} className="bg-gray-50 text-gray-900 p-8 md:p-12 rounded-lg shadow-2xl max-w-4xl mx-auto border-8 border-purple-300" style={{ direction: 'ltr' }}>
        <div className="border-2 border-purple-500 p-8 rounded-md text-center relative">
            <div className="absolute top-4 right-4"><TrophyIcon size={48} className="text-yellow-500" /></div>
            <div className="absolute top-4 left-4"><TrophyIcon size={48} className="text-yellow-500" /></div>
            <h1 className="text-5xl font-bold text-purple-800">Certificate of Completion</h1>
            <p className="text-xl mt-8">This is to certify that</p>
            <p className="text-4xl font-extrabold text-cyan-700 my-6 tracking-wider">{studentName || 'Your Name Here'}</p>
            <p className="text-xl">has successfully completed the track</p>
            <p className="text-3xl font-bold text-purple-800 my-4">{trackTitle}</p>
            <div className="mt-12 flex justify-between items-center">
                <div><p className="font-bold">Issue Date</p><p>{date}</p></div>
                <div><p className="font-bold">Nebras Platform</p><p className="text-sm">Your Gateway to Tech Knowledge</p></div>
            </div>
            <div className="absolute bottom-2 right-2 left-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500"></div>
        </div>
    </div>
));

export default CertificateDisplay;