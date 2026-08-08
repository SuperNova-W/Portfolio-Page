import React from 'react';
import Section from './Section';
import Typer from './Typer';

const certifications = [
    { title: 'ASME ISHOW Finalist — NeoTex', issuer: '$10K pre-seed + accelerator' },
    { title: 'AWS Certified Cloud Practitioner', issuer: 'AWS' },
    { title: 'AWS Certified Developer – Associate', issuer: 'AWS' },
    { title: '5x Hackathon Winner', issuer: 'See below' },
    { title: 'Presidential Scholarship', issuer: 'UMD' },
    { title: "Dean's List – All Semesters", issuer: 'UMD' },
    { title: 'FIRE Honors Program', issuer: 'UMD' },
];

const hackathons = [
    '1st — AgentVerse',
    '1st — Ctrl-V',
    '1st — Hackdays Prayagraj',
    '1st — Hack in Krishnagiri',
    '2nd — GDSC HackDay',
];

const CertificationsSection = () => {
    return (
        <Section id="awards" title="Awards">
            <ul className="list two-col">
                {certifications.map((certification, index) => (
                    <li key={certification.title}>
                        <Typer text={certification.title} delay={120 + index * 70} />
                        <span className="issuer">
                            <Typer text={certification.issuer} delay={160 + index * 70} />
                        </span>
                    </li>
                ))}
            </ul>
            <p className="entry-tech hackathon-line">
                <Typer
                    text={`Hackathon wins — ${hackathons.join(' / ')}`}
                    delay={120 + certifications.length * 70}
                />
            </p>
        </Section>
    );
};

export default CertificationsSection;
