import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tracksData, categories } from '../data/tracksData';
import TrackCard from '../components/TrackCard';
import { MagnifyingGlassIcon } from '../icons/Icons';

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('الكل');

    const filteredTracks = tracksData.filter(track => {
        const matchesCategory = selectedCategory === 'الكل' || track.category === selectedCategory;
        const matchesSearch = track.title.toLowerCase().includes(searchTerm.toLowerCase()) || track.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-6 py-12"
        >
            <div className="text-center mb-12">
                <motion.h1 
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, type: 'spring' }}
                    className="text-5xl md:text-6xl font-extrabold text-white mb-4"
                >
                    بوابتك نحو <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">إتقان التقنية</span>
                </motion.h1>
                <motion.p 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
                    className="text-xl text-gray-300 max-w-3xl mx-auto"
                >
                    منصة نبراس تقدم مسارات تعليمية مجانية باللغة العربية في أحدث المجالات التقنية. ابدأ رحلتك اليوم!
                </motion.p>
            </div>

            <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-10"
            >
                <div className="relative flex-grow mb-6">
                    <input
                        type="text"
                        placeholder="ابحث عن مسار..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg py-3 pr-12 pl-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                    />
                    <MagnifyingGlassIcon size={24} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <button onClick={() => setSelectedCategory('الكل')} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${selectedCategory === 'الكل' ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>الكل</button>
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${selectedCategory === cat ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>{cat}</button>
                    ))}
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {filteredTracks.length > 0 ? (
                        filteredTracks.map((track, index) => <TrackCard key={track.id} track={track} index={index} />)
                    ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-400 text-xl col-span-full mt-8">
                            لا توجد مسارات تطابق بحثك.
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default HomePage;