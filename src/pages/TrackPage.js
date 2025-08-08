import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tracksData } from '../data/tracksData';
import Quiz from '../components/Quiz';

const TrackPage = () => {
    const { id } = useParams();
    const track = tracksData.find(t => t.id === id);
    const navigate = useNavigate();

    useEffect(() => { window.scrollTo(0, 0); }, []);

    if (!track) {
        return (
            <div className="text-center py-20 text-white">
                <h2 className="text-3xl">المسار غير موجود</h2>
                <button onClick={() => navigate('/')} className="mt-4 bg-purple-500 px-6 py-2 rounded-lg">العودة للرئيسية</button>
            </div>
        );
    }

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
            
            <motion.div className="aspect-video rounded-xl overflow-hidden shadow-2xl shadow-cyan-500/20" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${track.videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </motion.div>

            <Quiz track={track} />
        </motion.div>
    );
};

export default TrackPage;