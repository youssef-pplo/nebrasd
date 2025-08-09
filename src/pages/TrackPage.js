import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tracksData } from '../data/tracksData';
import Quiz from '../components/Quiz';
import { useProgress } from '../context/ProgressContext';
import { CheckCircleIcon, ArrowLeftIcon, ArrowRightIcon } from '../icons/Icons';

const TrackPage = () => {
    const { id } = useParams();
    const track = tracksData.find(t => t.id === id);
    const navigate = useNavigate();
    const { isSessionCompleted, areAllSessionsCompleted } = useProgress();

    const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
    const sessionListRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const activeSessionElement = sessionListRef.current?.children[currentSessionIndex];
        if (activeSessionElement) {
            activeSessionElement.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [id, currentSessionIndex]);

    if (!track) {
        return (
            <div className="text-center py-20 text-white">
                <h2 className="text-3xl">المسار غير موجود</h2>
                <button onClick={() => navigate('/')} className="mt-4 bg-purple-500 px-6 py-2 rounded-lg">العودة للرئيسية</button>
            </div>
        );
    }
    
    if (!track.sessions || track.sessions.length === 0) {
        return <div className="text-center py-20 text-white">هذا المسار لا يحتوي على جلسات بعد.</div>;
    }

    const currentSession = track.sessions[currentSessionIndex];
    const allSessionsCompleted = areAllSessionsCompleted(track.id);

    const handleNext = () => {
        if (currentSessionIndex < track.sessions.length - 1) {
            setCurrentSessionIndex(currentSessionIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentSessionIndex > 0) {
            setCurrentSessionIndex(currentSessionIndex - 1);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-6 py-12"
        >
            <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, type: 'spring' }}>
                <span className="text-lg bg-cyan-500/20 text-cyan-300 px-4 py-1 rounded-full">{track.category}</span>
                <h1 className="text-4xl md:text-5xl font-bold text-white my-4">{track.title}</h1>
                <p className="text-lg text-gray-300 max-w-3xl mb-8">{track.description}</p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-3/4">
                    <h2 className="text-3xl font-bold text-white mb-4">{currentSession.title}</h2>
                    <motion.div 
                        key={currentSession.videoId}
                        className="aspect-video rounded-xl overflow-hidden shadow-2xl shadow-cyan-500/20" 
                        initial={{ scale: 0.9, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }} 
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${currentSession.videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </motion.div>

                    <div className="mt-8 flex justify-between items-center">
                        <button onClick={handlePrev} disabled={currentSessionIndex === 0} className="flex items-center gap-2 px-6 py-2 bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors">
                            <ArrowLeftIcon size={20} />
                            <span>السابق</span>
                        </button>
                        <span className="text-gray-400">{currentSessionIndex + 1} / {track.sessions.length}</span>
                        <button onClick={handleNext} disabled={currentSessionIndex === track.sessions.length - 1} className="flex items-center gap-2 px-6 py-2 bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors">
                            <span>التالي</span>
                            <ArrowRightIcon size={20} />
                        </button>
                    </div>

                    <Quiz
                        key={currentSession.id}
                        trackId={track.id}
                        quiz={currentSession.quiz}
                        isFinalQuiz={false}
                        sessionId={currentSession.id}
                        handleNext={handleNext}
                        currentSessionIndex={currentSessionIndex}
                        totalSessions={track.sessions.length}
                    />
                </div>
                <div className="lg:w-1/4">
                    <h2 className="text-2xl font-bold text-white mb-4">أجزاء المسار</h2>
                    <ul ref={sessionListRef} className="space-y-2 lg:max-h-[calc(100vh-15rem)] overflow-y-auto pr-2 custom-scrollbar">
                        {track.sessions.map((session, index) => (
                            <li
                                key={session.id}
                                onClick={() => setCurrentSessionIndex(index)}
                                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${currentSessionIndex === index ? 'bg-purple-600 border-purple-400' : 'bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-purple-500'}`}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-sm">{session.title}</span>
                                    {isSessionCompleted(track.id, session.id) && <CheckCircleIcon size={20} className="text-green-400 flex-shrink-0" />}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {allSessionsCompleted && (
                <div className="mt-16 pt-10 border-t-2 border-gray-700">
                    <h2 className="text-4xl font-bold text-white mb-8 text-center">🎉 الاختبار النهائي للمسار 🎉</h2>
                    <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">لقد أكملت جميع أجزاء المسار بنجاح. الآن، اختبر معلوماتك الشاملة للحصول على شهادة الإتمام.</p>
                    <Quiz
                        trackId={track.id}
                        quiz={track.finalQuiz}
                        isFinalQuiz={true}
                    />
                </div>
            )}
        </motion.div>
    );
};

export default TrackPage;

