import React, { useState, useEffect, createContext, useContext } from 'react';
import { tracksData } from '../data/tracksData';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
    const [progress, setProgress] = useState({});

    useEffect(() => {
        try {
            const savedProgress = localStorage.getItem('nebrasProgress');
            if (savedProgress) {
                setProgress(JSON.parse(savedProgress));
            }
        } catch (error) {
            console.error("Failed to load progress from localStorage:", error);
        }
    }, []);

    const updateProgress = (trackId, isFinalQuiz, sessionId) => {
        const newProgress = { ...progress };

        if (!newProgress[trackId]) {
            newProgress[trackId] = { sessions: {}, finalQuiz: false };
        }

        if (isFinalQuiz) {
            newProgress[trackId].finalQuiz = true;
        } else if (sessionId) {
            if (!newProgress[trackId].sessions) {
                newProgress[trackId].sessions = {};
            }
            newProgress[trackId].sessions[sessionId] = true;
        }

        setProgress(newProgress);
        try {
            localStorage.setItem('nebrasProgress', JSON.stringify(newProgress));
        } catch (error) {
            console.error("Failed to save progress to localStorage:", error);
        }
    };
    
    const isTrackCompleted = (trackId) => {
        return !!(progress[trackId] && progress[trackId].finalQuiz);
    };

    const isSessionCompleted = (trackId, sessionId) => {
        return !!(progress[trackId] && progress[trackId].sessions && progress[trackId].sessions[sessionId]);
    };

    const areAllSessionsCompleted = (trackId) => {
        const track = tracksData.find(t => t.id === trackId);
        if (!track || !progress[trackId]) return false;
        if (!track.sessions) return false;
        return track.sessions.every(session => progress[trackId].sessions && progress[trackId].sessions[session.id]);
    };

    return (
        <ProgressContext.Provider value={{ progress, updateProgress, isTrackCompleted, isSessionCompleted, areAllSessionsCompleted }}>
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgress = () => useContext(ProgressContext);

