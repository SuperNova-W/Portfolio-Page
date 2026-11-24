import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, useReducedMotion } from 'motion/react';

/** Fades in from a blur. */
export const BlurIn = ({ children, className, delay = 0, duration = 1 }) => {
    const reduce = useReducedMotion();
    return (
        <motion.div
            initial={reduce ? false : { filter: 'blur(10px)', opacity: 0 }}
            animate={{ filter: 'blur(0px)', opacity: 1 }}
            transition={{ duration: reduce ? 0 : duration, delay: reduce ? 0 : delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

/** Slides content up from behind a mask the first time it scrolls into view. */
export const BoxReveal = ({ children, width = 'fit-content', duration = 0.5, delay = 0, className }) => {
    const reduce = useReducedMotion();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const controls = useAnimation();

    useEffect(() => {
        if (reduce || inView) controls.start('visible');
    }, [inView, controls, reduce]);

    return (
        <div ref={ref} className={className} style={{ position: 'relative', width, overflow: 'hidden' }}>
            <motion.div
                variants={{ hidden: { opacity: 0, y: 75 }, visible: { opacity: 1, y: 0 } }}
                initial={reduce ? 'visible' : 'hidden'}
                animate={controls}
                transition={{ duration: reduce ? 0 : duration, delay }}
            >
                {children}
            </motion.div>
        </div>
    );
};

/** Rises into place once, when scrolled into view. */
export const Reveal = ({ children, className, delay = 0, duration = 0.5, as = 'div' }) => {
    const reduce = useReducedMotion();
    const Component = motion[as];
    return (
        <Component
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </Component>
    );
};
