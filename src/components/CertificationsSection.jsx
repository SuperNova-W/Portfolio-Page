import React from 'react';
import Section from './Section';
import { Reveal } from './Reveal';
import { Card } from './ui';

// eslint-disable-next-line react-refresh/only-export-components
export const certifications = [
    { title: 'ASME ISHOW Global Accelerator Finalist — NeoTex', issuer: '$10K pre-seed grant' },
    { title: 'AWS Certified Cloud Practitioner', issuer: 'AWS' },
    { title: 'AWS Certified Developer – Associate', issuer: 'AWS' },
    { title: '5x Hackathon Winner', issuer: 'See below' },
    { title: 'Presidential Scholarship', issuer: 'UMD' },
    { title: "Dean's List – All Semesters", issuer: 'UMD' },
    { title: 'FIRE Honors Program', issuer: 'UMD' },
    { title: 'CS Honors Program', issuer: 'UMD' },
    { title: '2x IEEE Publications', issuer: 'AIxMHC 2026 · MIT URTC 2026' },
];

// eslint-disable-next-line react-refresh/only-export-components
export const hackathons = [
    '1st — AgentVerse',
    '1st — Ctrl-V',
    '1st — Hackdays Prayagraj',
    '1st — Hack in Krishnagiri',
    '2nd — GDSC HackDay',
];

const CertificationsSection = () => {
    return (
        <Section id="awards" title="Awards" keyboard="aside">
            <div className="mx-auto w-full max-w-5xl px-4 md:px-8">
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {certifications.map((certification, index) => (
                        <Reveal as="li" key={certification.title} delay={(index % 3) * 0.06} className="flex">
                            <Card className="relative w-full overflow-hidden p-5">
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -top-6 left-6 h-16 w-16 rounded-full bg-white/20 opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-60"
                                />
                                <span className="relative block font-medium leading-snug text-foreground">{certification.title}</span>
                                <span className="relative mt-2 block text-sm text-muted-foreground">
                                    {certification.issuer}
                                </span>
                            </Card>
                        </Reveal>
                    ))}
                </ul>
                <Reveal>
                    <Card className="mt-6 p-5">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            {`Hackathon wins — ${hackathons.join(' / ')}`}
                        </p>
                    </Card>
                </Reveal>
            </div>
        </Section>
    );
};

export default CertificationsSection;
