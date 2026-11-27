import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TerminalIntro from './TerminalIntro';
import Terminal from './Terminal';

/**
 * Full-screen terminal shown at /terminal, on top of the home page so closing
 * it doesn't reload the 3D scene. Opened with the nav button or Ctrl/⌘ + `.
 */
export default function TerminalOverlay() {
    const navigate = useNavigate();
    const location = useLocation();
    const [booted, setBooted] = useState(false);
    const [exiting, setExiting] = useState(false);
    const exitingRef = useRef(false);
    // 'default' means /terminal was the first page loaded, so there's no
    // in-app entry to go back to.
    const cameFromSite = useRef(location.key !== 'default');

    const handleExit = useCallback(() => {
        if (exitingRef.current) return;
        exitingRef.current = true;
        setExiting(true);
        setTimeout(() => {
            if (cameFromSite.current) navigate(-1);
            else navigate('/', { replace: true });
        }, 300);
    }, [navigate]);

    const handleBooted = useCallback(() => setBooted(true), []);

    useEffect(() => {
        if (booted) return undefined;
        const onKey = (e) => e.key === 'Escape' && handleExit();
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [booted, handleExit]);

    // Keep the page underneath from scrolling.
    useEffect(() => {
        const prev = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';
        return () => {
            document.documentElement.style.overflow = prev;
        };
    }, []);

    return (
        <div
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio terminal"
            className={`fixed inset-0 z-[2100] bg-[#0a0a0b] transition-all duration-300 ${
                exiting ? 'scale-[0.98] opacity-0' : 'scale-100 opacity-100'
            }`}
        >
            {booted ? <Terminal onExit={handleExit} /> : <TerminalIntro onComplete={handleBooted} />}
        </div>
    );
}
