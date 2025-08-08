import React, { useState, useEffect, createContext, useContext } from 'react';

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

    const updateProgress = (trackId) => {
        const newProgress = { ...progress, [trackId]: true };
        setProgress(newProgress);
        try {
            localStorage.setItem('nebrasProgress', JSON.stringify(newProgress));
        } catch (error) {
            console.error("Failed to save progress to localStorage:", error);
        }
    };
    
    const isTrackCompleted = (trackId) => {
        return !!progress[trackId];
    };

    return (
        <ProgressContext.Provider value={{ progress, updateProgress, isTrackCompleted }}>
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgress = () => useContext(ProgressContext);