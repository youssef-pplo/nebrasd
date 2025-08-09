import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '../context/ProgressContext';
import { CheckCircleIcon, XCircleIcon, CertificateIcon, ArrowRightIcon } from '../icons/Icons';

const Quiz = ({ trackId, quiz, isFinalQuiz, sessionId, handleNext, currentSessionIndex, totalSessions }) => {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();
    const { updateProgress } = useProgress();

    // Reset state when the session (and thus sessionId) changes
    useEffect(() => {
        setSubmitted(false);
        setSelectedAnswers({});
        setScore(0);
    }, [sessionId]);

    const handleSelectAnswer = (questionIndex, option) => {
        if (submitted) return;
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: option,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let currentScore = 0;
        quiz.forEach((q, index) => {
            if (selectedAnswers[index] === q.correctAnswer) {
                currentScore++;
            }
        });
        setScore(currentScore);
        setSubmitted(true);

        if (currentScore === quiz.length) {
            updateProgress(trackId, isFinalQuiz, sessionId);
        }
    };

    const getOptionClass = (question, option, index) => {
        if (!submitted) {
            return selectedAnswers[index] === option 
                ? 'bg-purple-600 border-purple-400' 
                : 'bg-gray-700 border-gray-600 hover:bg-gray-600';
        }
        if (option === question.correctAnswer) return 'bg-green-500/30 border-green-500';
        if (selectedAnswers[index] === option && option !== question.correctAnswer) return 'bg-red-500/30 border-red-500';
        return 'bg-gray-800 border-gray-700 opacity-70';
    };
    
    const allQuestionsAnswered = Object.keys(selectedAnswers).length === quiz.length;

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">{isFinalQuiz ? "أسئلة الاختبار النهائي" : "اختبر معلوماتك في هذا الجزء"}</h2>
            <form onSubmit={handleSubmit}>
                {quiz.map((q, index) => (
                    <motion.div 
                        key={index} 
                        className="bg-gray-800 p-6 rounded-lg mb-6 shadow-md"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <p className="text-xl font-semibold text-white mb-4">{index + 1}. {q.question}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {q.options.map((option, optionIndex) => (
                                <button
                                    type="button"
                                    key={optionIndex}
                                    onClick={() => handleSelectAnswer(index, option)}
                                    disabled={submitted}
                                    className={`p-4 rounded-lg text-right text-white font-medium border-2 transition-all duration-300 ${getOptionClass(q, option, index)}`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        {submitted && (
                            <div className="mt-4 flex items-center gap-2">
                                {selectedAnswers[index] === q.correctAnswer ? <CheckCircleIcon size={20} className="text-green-400" /> : <XCircleIcon size={20} className="text-red-400" />}
                                <span className="text-sm text-gray-300">الإجابة الصحيحة: {q.correctAnswer}</span>
                            </div>
                        )}
                    </motion.div>
                ))}
                
                {!submitted && (
                    <div className="mt-8 flex justify-center items-center">
                        <button 
                            type="submit"
                            disabled={!allQuestionsAnswered}
                            className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold py-3 px-12 rounded-lg text-xl shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none"
                        >
                            إرسال الإجابات
                        </button>
                    </div>
                )}
            </form>

            <AnimatePresence>
                {submitted && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="mt-10 bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 text-center"
                    >
                        <h3 className="text-3xl font-bold text-white">نتيجتك</h3>
                        <p className="text-6xl font-bold my-4" style={{ color: score === quiz.length ? '#4ade80' : '#f87171' }}>
                            {score} / {quiz.length}
                        </p>
                        {score === quiz.length ? (
                            <>
                                <p className="text-green-300 text-xl mb-6">{isFinalQuiz ? 'ممتاز! لقد أتقنت هذا المسار بنجاح.' : 'أحسنت! إجابتك صحيحة.'}</p>
                                {isFinalQuiz ? (
                                    <button
                                        onClick={() => navigate(`/certificate/${trackId}`)}
                                        className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
                                    >
                                        <CertificateIcon size={24} />
                                        الحصول على الشهادة
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleNext}
                                        disabled={currentSessionIndex === totalSessions - 1}
                                        className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        الدرس التالي
                                        <ArrowRightIcon size={20} />
                                    </button>
                                )}
                            </>
                        ) : (
                            <>
                                <p className="text-yellow-300 text-xl mb-6">لا بأس، حاول مرة أخرى! الممارسة تصنع الإتقان.</p>
                                <button
                                    onClick={() => { setSubmitted(false); setSelectedAnswers({}); setScore(0); }}
                                    className="bg-yellow-500 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105"
                                >
                                    إعادة الاختبار
                                </button>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Quiz;

