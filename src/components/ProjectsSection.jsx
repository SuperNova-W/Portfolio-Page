import React from 'react';
import Section from './Section';
import Typer from './Typer';

const projects = [
    {
        title: 'Arrakis — Real-Time Market Signal Platform',
        description:
            'Platform producing sector-specific ETF recommendations (buy, sell or hold) alongside a confidence level, achieving a 1.30 net Sharpe ratio after transaction costs. Uses C++ and Apache Kafka for real-time market data ingestion, handling 340K+ updates/sec at 42ms end-to-end latency, with live feeds over WebSocket via Boost::Beast and an ML pipeline combining FinBERT with price data to predict next-day direction using XGBoost.',
        liveLink: 'https://arrakis-ten.vercel.app/',
        technologies: ['C++', 'Apache Kafka', 'Boost::Beast', 'Docker', 'FinBERT', 'XGBoost'],
    },
    {
        title: 'RoadLens — CNN Road-Damage Classification',
        description:
            'End-to-end CNN classification model for longitudinal, transverse and alligator cracks plus potholes. Fine-tuned a 20.3M-parameter ImageNet-pretrained EfficientNetV2-S at 256×256 resolution to 93.6% validation accuracy, wrapped in a B2G road-maintenance platform.',
        liveLink: 'https://roadlens.vercel.app/',
        technologies: ['Python', 'EfficientNetV2-S', 'CNN', 'Transfer Learning'],
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
        <Section id="projects" title="Projects">
            <ul className="list">
                {projects.map((project, index) => {
                    const base = 120 + index * 110;

                    return (
                        <li key={project.title}>
                            <div className="line">
                                <a
                                    className="link"
                                    href={project.liveLink || project.repoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="index">{String(index + 1).padStart(2, '0')}</span>
                                    <span className="title">
                                        <Typer text={project.title} delay={base} />
                                    </span>
                                </a>
                            </div>
                            <p className="note">
                                <Typer text={project.description} delay={base + 80} />
                            </p>
                            <p className="tech">
                                <Typer text={project.technologies.join(' / ')} delay={base + 160} />
                            </p>
                            <div className="actions">
                                {project.liveLink && (
                                    <a className="link" href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                        <span className="title">
                                            <Typer text="Live" delay={base + 220} />
                                        </span>
                                    </a>
                                )}
                                {project.repoLink && (
                                    <a className="link" href={project.repoLink} target="_blank" rel="noopener noreferrer">
                                        <span className="title">
                                            <Typer text="Repository" delay={base + 260} />
                                        </span>
                                    </a>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </Section>
    );
};

export default ProjectsSection;
