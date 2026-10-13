import React, { useEffect, useRef, useState } from 'react';
import { RevealContext } from './RevealContext';
import Typer from './Typer';

/**
 * A titled section. The first time it scrolls into view it fades into place and
 * releases every Typer inside it to start typing. The title sits in the left
 * gutter on wide screens.
 */
const Section = ({ id, title, children }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return undefined;

        // On a phone 10% of a long section can be most of the screen, or more
        // than fits on it at all, so cap what has to show at a fifth of the
        // viewport.
        const threshold = Math.min(0.1, (window.innerHeight * 0.2) / Math.max(node.offsetHeight, 1));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold, rootMargin: '0px 0px -40px 0px' }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id={id}
            ref={ref}
            className={`section reveal${visible ? ' visible' : ''}`}
        >
            <RevealContext.Provider value={visible}>
                <h2 className="section-title">
                    <Typer text={title} speed={40} maxDuration={400} />
                </h2>
                {children}
            </RevealContext.Provider>
        </section>
    );
};

export default Section;
