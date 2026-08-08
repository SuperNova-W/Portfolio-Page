import React from 'react';
import Section from './Section';
import Typer from './Typer';

const publications = [
    {
        title: 'An IoT Smart-Bottle Accessory for Hydration Tracking and Haptic Feedback',
        authors: 'Y. Ponnaganti et al.',
        venue: 'IEEE MIT Undergraduate Research Technology Conference (URTC)',
        year: '2024',
        description:
            'Presented the design and validation of an IoT smart-bottle accessory, covering CAD prototyping, haptic feedback telemetry and an international user study with 92 participants.',
        link: '',
    },
];

const PublicationsSection = () => {
    return (
        <Section id="publications" title="Publications">
            {publications.map((publication, index) => {
                const base = 120 + index * 90;

                return (
                    <div className="entry" key={publication.title}>
                        <div className="entry-head">
                            <div>
                                <div className="entry-role">
                                    {publication.link ? (
                                        <a
                                            className="link"
                                            href={publication.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <span className="title">
                                                <Typer text={publication.title} delay={base} />
                                            </span>
                                        </a>
                                    ) : (
                                        <Typer text={publication.title} delay={base} />
                                    )}
                                </div>
                                <div className="entry-org">
                                    <Typer
                                        text={`${publication.authors} — ${publication.venue}`}
                                        delay={base + 60}
                                    />
                                </div>
                            </div>
                            <div className="entry-date">
                                <Typer text={publication.year} delay={base + 100} />
                            </div>
                        </div>
                        <ul>
                            <li>
                                <Typer text={publication.description} delay={base + 140} />
                            </li>
                        </ul>
                    </div>
                );
            })}
        </Section>
    );
};

export default PublicationsSection;
