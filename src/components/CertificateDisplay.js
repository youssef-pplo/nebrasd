import React from 'react';

const CertificateDisplay = React.forwardRef(({ trackTitle, studentName, date }, ref) => {
    return (
        <div ref={ref} className="w-full max-w-4xl mx-auto bg-gray-900 text-white font-sans shadow-2xl rounded-lg border-4 border-cyan-400 p-4 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
            <div className="relative z-10 flex flex-col items-center text-center">

                <div className="mb-4 sm:mb-6">
                    <h1 className="text-3xl sm:text-5xl font-bold text-cyan-400 tracking-wider">Certificate of Completing</h1>
                    <p className="text-lg sm:text-2xl text-gray-300 mt-2">Certificate of Completion</p>
                </div>

                <p className="text-base sm:text-lg text-gray-400 my-4 sm:my-6">هذه الشهادة تُمنح إلى</p>
                <p className="text-2xl sm:text-4xl font-extrabold text-white tracking-widest border-b-2 border-cyan-500 pb-2 px-8">
                    {studentName || 'اسم الطالب'}
                </p>

                <p className="text-base sm:text-lg text-gray-400 my-4 sm:my-6 max-w-2xl">
                    لإتمامه بنجاح متطلبات مسار
                </p>
                <h2 className="text-xl sm:text-3xl font-semibold text-cyan-400 mb-8 sm:mb-12">
                    {trackTitle}
                </h2>

                <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-8 border-t border-gray-700 pt-6">
                    <div className="text-center mb-4 sm:mb-0">
                        <p className="font-bold text-lg text-cyan-400">منصة نبراس</p>
                        <p className="text-sm text-gray-500">Nebras Platform</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold text-gray-300">{date}</p>
                        <p className="text-sm text-gray-500">Date</p>
                    </div>
                </div>

            </div>
            {/* Decorative corner elements */}
            <div className="absolute top-2 left-2 w-16 h-16 border-t-4 border-l-4 border-cyan-400 rounded-tl-lg"></div>
            <div className="absolute top-2 right-2 w-16 h-16 border-t-4 border-r-4 border-cyan-400 rounded-tr-lg"></div>
            <div className="absolute bottom-2 left-2 w-16 h-16 border-b-4 border-l-4 border-cyan-400 rounded-bl-lg"></div>
            <div className="absolute bottom-2 right-2 w-16 h-16 border-b-4 border-r-4 border-cyan-400 rounded-br-lg"></div>
        </div>
    );
});

export default CertificateDisplay;

