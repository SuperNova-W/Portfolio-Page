import { useEffect, useMemo, useState } from 'react';

/**
 * How much eye-candy to run. Reduced motion or Data Saver drops the 3D scene,
 * particles and the custom cursor; small screens just scale quality down.
 */
export function usePerfProfile() {
    const [state, setState] = useState({ reducedMotion: false, isMobile: false, saveData: false, ready: false });

    useEffect(() => {
        const motionMq = matchMedia('(prefers-reduced-motion: reduce)');
        const mobileMq = matchMedia('(max-width: 768px)');
        const update = () =>
            setState({
                reducedMotion: motionMq.matches,
                isMobile: mobileMq.matches,
                saveData: Boolean(navigator.connection?.saveData),
                ready: true,
            });
        update();
        motionMq.addEventListener('change', update);
        mobileMq.addEventListener('change', update);
        return () => {
            motionMq.removeEventListener('change', update);
            mobileMq.removeEventListener('change', update);
        };
    }, []);

    return useMemo(() => {
        const { reducedMotion, isMobile, saveData, ready } = state;
        return {
            ready,
            isMobile,
            reducedMotion,
            disable3D: reducedMotion || saveData,
            particleCount: reducedMotion ? 0 : isMobile ? 30 : 100,
            maxDpr: isMobile ? 1.5 : 2,
        };
    }, [state]);
}
