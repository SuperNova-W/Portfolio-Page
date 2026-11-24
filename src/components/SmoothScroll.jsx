import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/** Buttery inertial scrolling (skipped for reduced motion). In-page links glide too. */
const SmoothScroll = ({ enabled = true }) => {
    useEffect(() => {
        if (!enabled) return undefined;
        const lenis = new Lenis({ duration: 2, anchors: { offset: -72 } });
        let frame = requestAnimationFrame(function raf(time) {
            lenis.raf(time);
            frame = requestAnimationFrame(raf);
        });
        return () => {
            cancelAnimationFrame(frame);
            lenis.destroy();
        };
    }, [enabled]);

    return null;
};

export default SmoothScroll;
