import React from 'react';
import Section from './Section';
import Typer from './Typer';

const publications = [
    {
        title: 'CysticCare: An Evaluation-Driven Retrieval-Augmented Generative AI Chatbot Targeted Towards Evidence-Based Patient Education',
        authors: 'M. Seckin, Y. Ponnaganti, A. Shah, R. Sendag, K. Mankodiya',
        venue: 'IEEE AIxMHC',
        year: '2026',
        description:
            'A multi-agent RAG system for ADPKD patient education that routes each question to a standard RAG, chain-of-thought or step-back agent and validates every answer before it reaches the user, plus MedRAGBench, a 286-question clinician-built benchmark on which it reached 98.3% semantic agreement with reference answers and 95.8% appropriate responses.',
        link: 'https://drive.google.com/file/d/1nlEfIwmnSie360cSNjCrunJ7EP3TCHdB/view?usp=sharing',
    },
    {
        title: 'Beyond Fixed Crops: Road-Damage Pixel Ratio and Acquisition-Domain Information in Road-Damage Classification',
        authors: 'Y. Ponnaganti, M. Seckin',
        venue: 'IEEE MIT Undergraduate Research Technology Conference (URTC)',
        year: '2026',
        description:
            'A controlled five-condition crop sweep over 55,006 RDD2022 annotations showing that road-damage pixel ratio behaves as a plateau rather than a single optimum, and that linear recoverability of acquisition domain from frozen embeddings rises as crops tighten — evidence that crop allocation is a measurable preprocessing decision.',
        link: 'https://drive.google.com/file/d/1ownoNlt-_MO82GnFnPzFa6JPMGejgygS/view?usp=sharing',
    },
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
