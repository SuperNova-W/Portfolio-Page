import React from 'react';
import Section from './Section';
import { Reveal } from './Reveal';
import { Card } from './ui';

// eslint-disable-next-line react-refresh/only-export-components
export const publications = [
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
        <Section id="publications" title="Publications" keyboard="aside">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 md:px-8">
                {publications.map((publication, index) => (
                    <Reveal key={publication.title} delay={index * 0.08}>
                        <Card className="p-6 md:p-8">
                            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                                <div className="space-y-2">
                                    <h3 className="font-display text-base font-bold leading-snug tracking-tight md:text-lg">
                                        {publication.link ? (
                                            <a
                                                className="underline decoration-white/20 underline-offset-4 transition-colors hover:decoration-white"
                                                href={publication.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {publication.title}
                                            </a>
                                        ) : (
                                            publication.title
                                        )}
                                    </h3>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        {`${publication.authors} — ${publication.venue}`}
                                    </p>
                                </div>
                                <span className="w-fit shrink-0 rounded-full border border-border px-3 py-0.5 text-xs tracking-widest text-muted-foreground">
                                    {publication.year}
                                </span>
                            </div>
                            <ul className="mt-5">
                                <li className="text-base leading-relaxed text-muted-foreground">{publication.description}</li>
                            </ul>
                        </Card>
                    </Reveal>
                ))}
            </div>
        </Section>
    );
};

export default PublicationsSection;
