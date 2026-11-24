import React from 'react';
import Section from './Section';
import { Reveal } from './Reveal';
import { Card, PillLink, TechList } from './ui';

const projects = [
    {
        title: 'Arrakis — Real-Time Market Signal Platform',
        award: '1st place — Ctrl-V Hackathon',
        description:
            'Platform producing sector-specific ETF recommendations (buy, sell or hold) alongside a confidence level, achieving a 1.30 net Sharpe ratio after transaction costs. A C++20 Finnhub WebSocket to Kafka ingestion path (Boost.Beast) feeds a sector ETF signal engine sustaining 340K+ events/sec under synthetic load at 42ms p95 / 48ms p99, with duplicate and out-of-order trades handled through per-symbol watermarks, 5s lateness and 15-minute dedup, and an ML pipeline combining FinBERT with price data to predict next-day direction using XGBoost.',
        liveLink: 'https://arrakis-ten.vercel.app/',
        technologies: ['C++20', 'Apache Kafka', 'Boost.Beast', 'Docker', 'FinBERT', 'XGBoost'],
    },
    {
        title: 'RoadLens — CNN Road-Damage Recognition',
        award: '1st place — AgentVerse Hackathon · IEEE MIT URTC publication',
        description:
            'Two-stage road-damage pipeline for longitudinal, transverse and alligator cracks plus potholes: a class-agnostic YOLO26n ensemble (640/960px, union NMS) localizes damage at 0.87 AP@0.50, and a fine-tuned EfficientNetV2-S classifies each crop at 0.93 macro F1, wrapped in a B2G road-maintenance platform. The accompanying IEEE MIT URTC study showed the model encoded country/domain cues it was never trained on.',
        liveLink: 'https://roadlens.vercel.app/',
        technologies: ['Python', 'YOLO26n', 'EfficientNetV2-S', 'CNN', 'Transfer Learning'],
    },
    {
        title: 'HandShook',
        description:
            'Chrome MV3 extension automating eligible Handshake applications, backed by a Spring Boot service with duplicate prevention, audit logging and OpenAI-powered document generation.',
        liveLink: 'https://handshook.netlify.app/',
        repoLink: 'https://github.com/SuperNova-W/HandshakeJobApplier',
        technologies: ['React', 'TypeScript', 'Spring Boot', 'MongoDB'],
    },
    {
        title: 'Lendr',
        description:
            'Peer-to-peer lending marketplace with a 24-endpoint TypeScript/Express API on AWS Lambda and an Expo client for iOS, Android and web, using PostGIS discovery and Supabase JWT auth.',
        liveLink: 'https://lentit.netlify.app/',
        repoLink: 'https://github.com/SuperNova-W/Lendr-2.0',
        technologies: ['TypeScript', 'AWS Lambda', 'React Native', 'PostGIS'],
    },
    {
        title: 'College Tracker',
        description:
            'Web app for tracking colleges, deadlines, costs and supplemental prompts in one place, centered on a visual deadline timeline.',
        repoLink: 'https://github.com/SuperNova-W/CollegeTracker',
        technologies: ['React', 'Vite', 'Supabase'],
    },
    {
        title: 'Portfolio Page',
        description:
            'Responsive personal site presenting experience, selected projects, publications and awards.',
        liveLink: 'https://yashwantponnaganti.netlify.app',
        repoLink: 'https://github.com/SuperNova-W/Portfolio-Page',
        technologies: ['React', 'Vite', 'CSS'],
    },
];

const ProjectsSection = () => {
    return (
        <Section id="projects" title="Projects" keyboard="projects">
            <ul className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                    <Reveal as="li" key={project.title} delay={(index % 3) * 0.08} className="flex">
                        <Card className="relative flex w-full flex-col overflow-hidden p-6 ring-1 ring-white/5">
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                            />
                            <a
                                href={project.liveLink || project.repoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-baseline gap-3"
                            >
                                <span className="font-display text-sm text-muted-foreground">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <h3 className="font-display text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-white">
                                    {project.title}
                                </h3>
                            </a>
                            {project.award && (
                                <p className="mt-3 w-fit rounded-lg bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                                    {project.award}
                                </p>
                            )}
                            <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                            <TechList items={project.technologies} className="mt-5" />
                            <div className="mt-6 flex flex-wrap gap-3">
                                {project.liveLink && <PillLink href={project.liveLink}>Live</PillLink>}
                                {project.repoLink && (
                                    <PillLink href={project.repoLink} variant="outline">
                                        Repository
                                    </PillLink>
                                )}
                            </div>
                        </Card>
                    </Reveal>
                ))}
            </ul>
        </Section>
    );
};

export default ProjectsSection;
