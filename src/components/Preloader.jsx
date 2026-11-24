import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import gsap from 'gsap';
import { usePerfProfile } from '../hooks/usePerfProfile';

const PreloaderContext = createContext({ isLoading: true, loadingPercent: 0, bypassLoading: () => {} });

// eslint-disable-next-line react-refresh/only-export-components
export const usePreloader = () => useContext(PreloaderContext);

const LOADING_TIME = 2.5;
const ease = [0.76, 0, 0.24, 1];

/** Full-screen splash that masks the 3D scene while it loads, then curls away. */
const Loader = () => {
    const { loadingPercent } = usePreloader();
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    const { width: w, height: h } = size;
    const initialPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + 300} 0 ${h} L0 0`;
    const targetPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} L0 0`;

    return (
        <motion.div
            className="preloader"
            initial={{ top: 0 }}
            exit={{ top: '-100dvh', transition: { duration: 0.8, ease, delay: 0.2 } }}
            aria-hidden="true"
        >
            {w > 0 && (
                <>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.75, transition: { duration: 1, delay: 0.2 } }}>
                        {(loadingPercent - (loadingPercent % 5)).toFixed(0)} %
                    </motion.p>
                    <svg>
                        <motion.path
                            initial={{ d: initialPath }}
                            exit={{ d: targetPath, transition: { duration: 0.7, ease, delay: 0.3 } }}
                        />
                    </svg>
                </>
            )}
        </motion.div>
    );
};

const Preloader = ({ children }) => {
    const { disable3D, ready } = usePerfProfile();
    const [isLoading, setIsLoading] = useState(true);
    const [loadingPercent, setLoadingPercent] = useState(0);
    const tween = useRef(null);
    const progress = useRef({ value: 0 });

    const bypassLoading = useCallback(() => {
        tween.current?.progress(0.99).kill();
        setLoadingPercent(100);
        setIsLoading(false);
    }, []);

    // Nothing to wait for when the 3D scene is skipped.
    useEffect(() => {
        if (ready && disable3D) bypassLoading();
    }, [ready, disable3D, bypassLoading]);

    useEffect(() => {
        tween.current = gsap.to(progress.current, {
            value: 100,
            duration: LOADING_TIME,
            ease: 'power1.inOut',
            onUpdate: () => setLoadingPercent(progress.current.value),
            onComplete: () => setIsLoading(false),
        });
        return () => tween.current?.kill();
    }, []);

    return (
        <PreloaderContext.Provider value={{ isLoading, loadingPercent, bypassLoading }}>
            <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence>
            {children}
        </PreloaderContext.Provider>
    );
};

export default Preloader;
