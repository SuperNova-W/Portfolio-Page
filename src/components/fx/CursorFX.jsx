import React, { Suspense, lazy, memo, useEffect, useState } from 'react';

// Fluid-dye cursor, ported from anhdtran-portfolio (MIT). Loaded lazily so the
// ~1.4k-line simulation never blocks first paint.
const SplashCursor = lazy(() => import('./SplashCursor').then((m) => ({ default: m.SplashCursor })));

// Hoisted so the effect inside SplashCursor doesn't re-initialise on every
// parent render (its default BACK_COLOR is a fresh object each time).
const BACK_COLOR = { r: 0.5, g: 0, b: 0 };

const Fluid = memo(function Fluid() {
    return (
        <Suspense fallback={null}>
            <SplashCursor BACK_COLOR={BACK_COLOR} />
        </Suspense>
    );
});

/**
 * Runs only with a real mouse, without reduced motion or Data Saver, and while
 * `active` is true (e.g. off while the preloader or terminal owns the screen).
 */
const CursorFX = ({ active = true }) => {
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
        const fine = matchMedia('(hover: hover) and (pointer: fine)');
        const reduced = matchMedia('(prefers-reduced-motion: reduce)');
        const update = () =>
            setAllowed(fine.matches && !reduced.matches && !navigator.connection?.saveData);
        update();
        fine.addEventListener('change', update);
        reduced.addEventListener('change', update);
        return () => {
            fine.removeEventListener('change', update);
            reduced.removeEventListener('change', update);
        };
    }, []);

    if (!allowed || !active) return null;
    return <Fluid />;
};

export default CursorFX;
