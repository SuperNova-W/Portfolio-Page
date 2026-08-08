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

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
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
