import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

/** Mouse-wheel hint that disappears once the page is scrolled. */
const ScrollDownIcon = () => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const onScroll = () => setShow(window.scrollY <= 10);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    aria-hidden="true"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                    className="min-h-[50px] w-fit rounded-full border-2 border-white p-1"
                >
                    <motion.div
                        animate={{ y: [0, 25], opacity: [1, 0] }}
                        transition={{ duration: 1, ease: 'easeOut', repeat: Infinity, repeatDelay: 1 }}
                        className="h-3 w-3 rounded-full bg-white"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollDownIcon;
