import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressProvider } from './context/ProgressContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TrackPage from './pages/TrackPage';
import CertificatePage from './pages/CertificatePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
    return (
        <ProgressProvider>
            <Router>
                <div className="bg-gray-900 min-h-screen font-sans text-white" dir="rtl">
                    <Header />
                    <main className="flex-grow">
                        <AnimatePresence mode="wait">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/track/:id" element={<TrackPage />} />
                                <Route path="/certificate/:title" element={<CertificatePage />} />
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </AnimatePresence>
                    </main>
                    <Footer />
                </div>
            </Router>
        </ProgressProvider>
    );
}

export default App;