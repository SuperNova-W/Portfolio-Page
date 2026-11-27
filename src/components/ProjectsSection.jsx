import React from 'react';
import Section from './Section';
import { Reveal } from './Reveal';
import { Link } from 'react-router-dom';
import { Card, TechList, ViewMore } from './ui';

// eslint-disable-next-line react-refresh/only-export-components
export const projects = [
    {
        slug: 'arrakis',
        summary: 'Real-time ETF signal platform: a C++/Kafka pipeline at 340K+ events/sec with a 1.30 net Sharpe ratio.',
        title: 'Arrakis — Real-Time Market Signal Platform',
        award: '1st place — Ctrl-V Hackathon',
        description:
            'Platform producing sector-specific ETF recommendations (buy, sell or hold) alongside a confidence level, achieving a 1.30 net Sharpe ratio after transaction costs. A C++20 Finnhub WebSocket to Kafka ingestion path (Boost.Beast) feeds a sector ETF signal engine sustaining 340K+ events/sec under synthetic load at 42ms p95 / 48ms p99, with duplicate and out-of-order trades handled through per-symbol watermarks, 5s lateness and 15-minute dedup, and an ML pipeline combining FinBERT with price data to predict next-day direction using XGBoost.',
        liveLink: 'https://arrakis-ten.vercel.app/',
        technologies: ['C++20', 'Apache Kafka', 'Boost.Beast', 'Docker', 'FinBERT', 'XGBoost'],
    },
    {
        slug: 'roadlens',
        summary: 'Two-stage CNN pipeline that finds and classifies road damage at 0.87 AP and 0.93 macro F1.',
        title: 'RoadLens — CNN Road-Damage Recognition',
        award: '1st place — AgentVerse Hackathon · IEEE MIT URTC publication',
        description:
            'Two-stage road-damage pipeline for longitudinal, transverse and alligator cracks plus potholes: a class-agnostic YOLO26n ensemble (640/960px, union NMS) localizes damage at 0.87 AP@0.50, and a fine-tuned EfficientNetV2-S classifies each crop at 0.93 macro F1, wrapped in a B2G road-maintenance platform. The accompanying IEEE MIT URTC study showed the model encoded country/domain cues it was never trained on.',
        liveLink: 'https://roadlens.vercel.app/',
        technologies: ['Python', 'YOLO26n', 'EfficientNetV2-S', 'CNN', 'Transfer Learning'],
    },
    {
        slug: 'handshook',
        summary: 'Chrome extension that automates eligible Handshake applications, backed by a Spring Boot service.',
        title: 'HandShook',
        description:
            'Chrome MV3 extension automating eligible Handshake applications, backed by a Spring Boot service with duplicate prevention, audit logging and OpenAI-powered document generation.',
        liveLink: 'https://handshook.netlify.app/',
        repoLink: 'https://github.com/SuperNova-W/HandshakeJobApplier',
        technologies: ['React', 'TypeScript', 'Spring Boot', 'MongoDB'],
    },
    {
        slug: 'lendr',
        summary: 'Peer-to-peer lending marketplace for iOS, Android and web on a serverless TypeScript API.',
        title: 'Lendr',
        description:
            'Peer-to-peer lending marketplace with a 24-endpoint TypeScript/Express API on AWS Lambda and an Expo client for iOS, Android and web, using PostGIS discovery and Supabase JWT auth.',
        liveLink: 'https://lentit.netlify.app/',
        repoLink: 'https://github.com/SuperNova-W/Lendr-2.0',
        technologies: ['TypeScript', 'AWS Lambda', 'React Native', 'PostGIS'],
    },
    {
        slug: 'college-tracker',
        summary: 'Tracks colleges, deadlines, costs and essay prompts in one place on a visual timeline.',
        title: 'College Tracker',
        description:
            'Web app for tracking colleges, deadlines, costs and supplemental prompts in one place, centered on a visual deadline timeline.',
        repoLink: 'https://github.com/SuperNova-W/CollegeTracker',
        technologies: ['React', 'Vite', 'Supabase'],
    },
    {
        slug: 'portfolio-page',
        summary: 'This site: React and Vite with a 3D keyboard, a fluid cursor and a terminal you can peel open.',
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
                {projects.map((project, index) => {
                    const [name, tagline] = project.title.split(' — ');
                    return (
                        <Reveal as="li" key={project.slug} delay={(index % 3) * 0.08} className="flex">
                            <Link
                                to={`/projects/${project.slug}`}
                                state={{ fromSite: true }}
                                className="flex w-full rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
                            >
                                <Card className="relative flex w-full flex-col overflow-hidden p-6 ring-1 ring-white/5">
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                                    />
                                    <div className="flex items-baseline gap-3">
                                        <span className="font-display text-sm text-muted-foreground">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <h3 className="font-display text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-white">
                                            {name}
                                        </h3>
                                    </div>
                                    {tagline && <p className="mt-1 text-sm text-muted-foreground">{tagline}</p>}
                                    {project.award && (
                                        <p className="mt-3 w-fit rounded-lg bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                                            {project.award.split(' · ')[0]}
                                        </p>
                                    )}
                                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
                                    <TechList items={project.technologies} limit={4} className="mt-5" />
                                    <ViewMore label="View project" />
                                </Card>
                            </Link>
                        </Reveal>
                    );
                })}
            </ul>
        </Section>
    );
};

export default ProjectsSection;
