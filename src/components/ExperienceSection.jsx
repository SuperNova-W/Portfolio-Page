import React from 'react';
import Section from './Section';
import Typer from './Typer';

const experiences = [
    {
        title: 'Software Engineering Intern',
        company: 'Grantuity — centralized platform for grant discovery outreach',
        duration: 'May 2026 – Aug 2026',
        points: [
            'Improved form 990 (annual tax returns) retrieval performance by optimizing PostgreSQL queries across 338K records.',
            'Used EXPLAIN ANALYZE to replace sequential scans with a B-tree index, cutting p95 database latency by 94%, from 1650ms to 99ms.',
            'Built a Go ingestion service for 22 heterogeneous sources — a bounded 16-worker pool with per-source rate limiting, exponential backoff with jitter on 429/5xx, and idempotent upserts so failed jobs replay without duplicates.',
            'Added 26 pytest integration tests and wired them into GitHub Actions for automated pre-merge checks.',
            'Built Prometheus monitoring and Grafana dashboards tracking ingestion throughput, data-quality failures and DB latency.',
        ],
        technologies: ['Go', 'Python', 'PostgreSQL', 'pytest', 'GitHub Actions', 'Prometheus', 'Grafana'],
    },
    {
        title: 'Executive Board Member & Director of Bootcamp',
        company: 'App Dev Club LLC @ UMD',
        duration: 'Jan 2026 – Present',
        points: [
            'Directed a 10-mentor ML Bootcamp for 30 students, teaching NLP and DNNs through hands-on model development.',
            'Built an internal intelligence platform (Dagster, Docker, Nx) analyzing 1,500+ commits across 16 repos, using Git activity and internal surveys to flag stalling projects and surface future technical leaders.',
            'Built a 3-node high-availability homelab with containerized services, CI/CD, monitoring, failover and 5-minute recovery.',
            'Led a 3-person team fixing critical auth, webhook and storage vulnerabilities for the club platform.',
            'Secured Gitea and S3 integrations, added regression tests and eliminated production dependency vulnerabilities.',
        ],
        technologies: ['Dagster', 'Docker', 'Nx', 'Gitea', 'S3', 'Application Security', 'Regression Testing'],
        link: { label: 'See demo', url: 'https://appdevclub.com/' },
    },
    {
        title: 'Software Engineer (Contract, Part-Time)',
        company: 'Mitsubishi Electric',
        duration: 'Feb 2026 – May 2026',
        points: [
            'Shipped a multi-courier package-return scheduling app with a React Native frontend and a FastAPI/PostgreSQL backend, including Stripe payments and QR-code shipping labels.',
            'Built a driver-matching module that reduced PostgreSQL lookup latency by 31%, from 420ms to 290ms, across 10,000+ driver-location records.',
            'Optimized multi-stop pickup routes and package-preview load times with a geospatial pipeline (Uber H3 indexing, Mapbox API) alongside an async Valkey (Redis) caching layer with graceful degradation.',
            'Implemented H3 geospatial indexing shortest-path routing in Python to limit searches to nearby drivers and facilities.',
        ],
        technologies: ['Python', 'FastAPI', 'React Native', 'PostgreSQL', 'Uber H3', 'Mapbox', 'Valkey (Redis)', 'Stripe'],
    },
    {
        title: 'Software Engineering Intern (Part-Time)',
        company: 'Sorcea Labs — market research platform for skincare',
        duration: 'Jan 2026 – May 2026',
        points: [
            'Built a Leiden ML recommendation engine matching and grouping products by their ingredients and descriptions.',
            'Leveraged AWS SageMaker, S3, Lambda and EventBridge to deliver recommendations in under 100ms.',
            'Migrated 96K+ beauty product records from DynamoDB to Neo4j to support product recommendations for 3,000+ users.',
        ],
        technologies: ['Python', 'Neo4j', 'DynamoDB', 'SageMaker', 'Lambda', 'EventBridge', 'S3'],
    },
    {
        title: 'Undergraduate Researcher',
        company: 'Brown University & University of Rhode Island',
        duration: 'May 2025 – Jan 2026',
        points: [
            'Built an AI chatbot for PKD patients over 364 medical papers, helping secure $10K in funding.',
            'Developed a full-stack multi-agent hybrid RAG pipeline using step-back, chain-of-thought and question rewriting subagents.',
            'Developed a 286-question evaluation set with five clinicians, reaching 98.3% agreement with clinician reference answers and 95.8% clinician-rated appropriateness; published at IEEE AIxMHC 2026.',
            'Reduced p95 response latency by 35.6% to 22.1 seconds and average query cost by 28.2% to $0.033 through retrieval pruning and model routing.',
            'Advised by Dr. Ankur Shah (Brown) and Prof. Kunal Mankodiya (URI).',
        ],
        technologies: ['React', 'FastAPI', 'ChromaDB', 'ChatGPT API', 'Docker', 'GCP'],
        link: { label: 'See demo', url: 'https://cysticcare-ai.web.app/' },
    },
    {
        title: 'IoT Hardware Research Intern',
        company: 'University of Rhode Island, Biomedical Engineering',
        duration: 'Jun 2024 – Aug 2024',
        points: [
            'Led development of an IoT smart-bottle accessory and presented the research at IEEE MIT URTC 2024.',
            'Owned the hardware lifecycle end to end: CAD design, 3D prototyping and haptic feedback telemetry.',
            'Validated product-market fit through international research with 92 participants.',
        ],
        technologies: ['IoT', 'CAD', '3D Printing', 'Embedded Systems'],
    },
    {
        title: 'Wearable Health Analytics Research Intern',
        company: 'University of Rhode Island, Biomedical Engineering',
        duration: 'Jun 2023 – Aug 2023',
        points: [
            'Helped build a human activity recognition model for ADHD detection, reaching 72% accuracy on noisy accelerometer and gyroscope data.',
            'Deployed K-NN and clustering models to turn raw smartwatch data into clinical activity insights.',
        ],
        technologies: ['Python', 'Machine Learning', 'K-NN', 'Clustering'],
    },
    {
        title: 'Clinical Software Research Volunteer',
        company: 'University of Rhode Island, Biomedical Engineering',
        duration: 'Jun 2022 – Aug 2022',
        points: [
            'Built a Flutter analytics dashboard for real-time clinical monitoring and health data visualization.',
            'Architected a data sync layer with the Firebase and Google Sheets APIs to automate patient metric ingestion.',
        ],
        technologies: ['Flutter', 'Firebase', 'Google Sheets API'],
    },
];

const ExperienceSection = () => {
    return (
        <Section id="experience" title="Experience">
            {experiences.map((exp, index) => {
                const base = 120 + index * 90;
                const tail = base + 140 + exp.points.length * 70;

                return (
                    <div className="entry" key={`${exp.company}-${exp.duration}`}>
                        <div className="entry-head">
                            <div>
                                <div className="entry-role">
                                    <Typer text={exp.title} delay={base} />
                                </div>
                                <div className="entry-org">
                                    <Typer text={exp.company} delay={base + 60} />
                                </div>
                            </div>
                            <div className="entry-date">
                                <Typer text={exp.duration} delay={base + 100} />
                            </div>
                        </div>
                        <ul>
                            {exp.points.map((point, pointIndex) => (
                                <li key={point}>
                                    <Typer text={point} delay={base + 140 + pointIndex * 70} />
                                </li>
                            ))}
                        </ul>
                        <p className="entry-tech">
                            <Typer text={exp.technologies.join(' / ')} delay={tail + 20} />
                        </p>
                        {exp.link && (
                            <div className="actions entry-actions">
                                <a
                                    className="link"
                                    href={exp.link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="title">
                                        <Typer text={exp.link.label} delay={tail + 60} />
                                    </span>
                                </a>
                            </div>
                        )}
                    </div>
                );
            })}
        </Section>
    );
};

export default ExperienceSection;
