import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProgress } from '../context/ProgressContext';
import { CheckCircleIcon, ArrowRightIcon } from '../icons/Icons';

const TrackCard = ({ track, index }) => {
    const { isTrackCompleted } = useProgress();
    const navigate = useNavigate();
    const completed = isTrackCompleted(track.id);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/40 transition-all duration-300 transform hover:-translate-y-2 flex flex-col cursor-pointer"
            onClick={() => navigate(`/track/${track.id}`)}
        >
            <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start">
                    <span className="text-sm bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">{track.category}</span>
                    {completed && <CheckCircleIcon size={24} className="text-green-400" />}
                </div>
                <h3 className="text-2xl font-bold text-white mt-4 mb-2">{track.title}</h3>
                <p className="text-gray-400 text-base flex-grow">{track.description}</p>
                <div className="mt-6 flex items-center justify-between text-cyan-400">
                    <span className="font-semibold">ابدأ التعلم</span>
                    <ArrowRightIcon size={20} />
                </div>
            </div>
            <div className="h-2 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
        </motion.div>
    );
};

export default TrackCard;