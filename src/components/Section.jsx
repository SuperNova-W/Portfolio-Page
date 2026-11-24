import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { BoxReveal } from './Reveal';
import { cn } from '../lib/cn';

/**
 * A page section with a big display heading. It scales and fades in as it
 * enters the viewport and back out as it leaves. `keyboard` tells the 3D
 * keyboard which pose to take while this section is on screen.
 */
const Section = ({ id, title, keyboard, className, headerClassName, children }) => {
    const reduce = useReducedMotion();
    const ref = useRef(null);
    const { scrollYProgress: enter } = useScroll({ target: ref, offset: ['start end', 'start 0.55'] });
    const { scrollYProgress: leave } = useScroll({ target: ref, offset: ['end 0.45', 'end start'] });
    const opacityIn = useTransform(enter, [0, 1], [0, 1]);
    const opacityOut = useTransform(leave, [0, 1], [1, 0]);
    const scaleIn = useTransform(enter, [0, 1], [0.85, 1]);
    const scaleOut = useTransform(leave, [0, 1], [1, 0.85]);
    const opacity = useTransform(() => Math.min(opacityIn.get(), opacityOut.get()));
    const scale = useTransform(() => Math.min(scaleIn.get(), scaleOut.get()));

    return (
        <section id={id} ref={ref} data-keyboard={keyboard} className={cn('relative scroll-mt-20 py-20 md:py-28', className)}>
            <motion.div style={reduce ? undefined : { opacity, scale }} className="h-full w-full">
                {title && (
                    <a href={`#${id}`} className={cn('mb-12 block md:mb-20', headerClassName)}>
                        <BoxReveal width="100%">
                            <h2 className="text-center text-4xl font-bold text-foreground md:text-7xl">{title}</h2>
                        </BoxReveal>
                    </a>
                )}
                {children}
            </motion.div>
        </section>
    );
};

export default Section;
