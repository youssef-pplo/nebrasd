import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProgress } from '../context/ProgressContext';
import { tracksData } from '../data/tracksData';
import CertificateDisplay from '../components/CertificateDisplay';
import { DownloadSimpleIcon } from '../icons/Icons';

const CertificatePage = () => {
    const { title: trackId } = useParams();
    const { isTrackCompleted } = useProgress();
    const navigate = useNavigate();
    const track = tracksData.find(t => t.id === trackId);
    const certificateRef = useRef();
    const [studentName, setStudentName] = useState('');
    const [isDownloading, setIsDownloading] = useState(false);
    const [libsLoaded, setLibsLoaded] = useState(false);

    const loadScript = (src) => new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.head.appendChild(script);
    });

    useEffect(() => {
        if (!isTrackCompleted(trackId)) {
            navigate('/');
            return;
        }

        try {
            const savedName = localStorage.getItem('nebrasStudentName');
            if (savedName) setStudentName(savedName);
        } catch (error) {
            console.error("Failed to load name from localStorage:", error);
        }

        if (window.html2canvas) {
            setLibsLoaded(true);
            return;
        }

        loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js')
            .then(() => {
                setLibsLoaded(true);
            }).catch(error => {
                console.error("Failed to load html2canvas library:", error);
                alert("Failed to load library for certificate generation. Please refresh and try again.");
            });

    }, [trackId, isTrackCompleted, navigate]);

    const handleNameChange = (e) => {
        setStudentName(e.target.value);
        try {
            localStorage.setItem('nebrasStudentName', e.target.value);
        } catch (error) {
            console.error("Failed to save name to localStorage:", error);
        }
    };

    const handleDownload = () => {
        if (!certificateRef.current || !studentName) {
            alert('Please enter your name to download the certificate.');
            return;
        }
        setIsDownloading(true);
        
        window.html2canvas(certificateRef.current, { 
            scale: 3, // Increase scale for higher resolution
            useCORS: true,
            backgroundColor: '#111827' // bg-gray-900
        }).then(canvas => {
            const image = canvas.toDataURL('image/png', 1.0); // Get image data URL
            const link = document.createElement('a');
            link.href = image;
            link.download = `Nebras_Certificate_${track.id}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setIsDownloading(false);
        }).catch(err => {
            console.error("Error generating image:", err);
            setIsDownloading(false);
            alert("An error occurred while generating the certificate. Please try again.");
        });
    };

    if (!track) return null;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container mx-auto px-6 py-12">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white">تهانينا!</h1>
                <p className="text-lg text-gray-300 mt-2">لقد حصلت على شهادة إتمام هذا المسار. أدخل اسمك وقم بتنزيلها.</p>
            </div>

            <div className="max-w-md mx-auto mb-10">
                <label htmlFor="studentName" className="block text-white text-lg font-medium mb-2 text-right">اسمك الكامل على الشهادة</label>
                <input id="studentName" type="text" value={studentName} onChange={handleNameChange} placeholder="مثال: أحمد محمد" className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors text-right" />
            </div>
            
            <motion.div 
                initial={{ y: 50, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 0.7, type: 'spring' }}
                className="w-full max-w-4xl mx-auto aspect-[11/8.5]"
            >
                <CertificateDisplay ref={certificateRef} trackTitle={track.title} studentName={studentName} date={new Date().toLocaleDateString('ar-EG')} />
            </motion.div>

            <div className="text-center mt-10">
                <button
                    onClick={handleDownload}
                    disabled={!studentName || isDownloading || !libsLoaded}
                    className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold py-4 px-12 rounded-lg text-xl shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
                >
                    <DownloadSimpleIcon size={28} />
                    {isDownloading ? 'جارٍ التحضير...' : !libsLoaded ? 'تحميل المكتبات...' : 'تنزيل الشهادة (صورة)'}
                </button>
            </div>
        </motion.div>
    );
};

export default CertificatePage;

