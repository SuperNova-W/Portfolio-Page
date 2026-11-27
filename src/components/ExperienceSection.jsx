import React from 'react';
import Section from './Section';
import { Reveal } from './Reveal';
import { Link } from 'react-router-dom';
import { Card, DateTag, TechList, ViewMore } from './ui';

// eslint-disable-next-line react-refresh/only-export-components
export const experiences = [
    {
        slug: 'grantuity',
        summary: 'Cut p95 database latency 94% and built a Go ingestion service pulling from 22 grant data sources.',
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
        slug: 'app-dev-club',
        summary: 'Run a 30-student ML bootcamp and built internal tooling, a homelab and security fixes for the club platform.',
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
        slug: 'mitsubishi-electric',
        summary: 'Shipped a package-return scheduling app and cut driver-matching latency 31% with geospatial indexing.',
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
        slug: 'sorcea-labs',
        summary: 'Built an ingredient-based product recommendation engine serving 3,000+ users in under 100ms.',
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
        slug: 'brown-uri-research',
        summary: 'Built a multi-agent RAG chatbot for PKD patients with 98.3% clinician agreement, published at IEEE AIxMHC.',
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
        slug: 'iot-smart-bottle',
        summary: 'Designed an IoT smart-bottle accessory end to end and presented it at IEEE MIT URTC 2024.',
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
        slug: 'wearable-health-analytics',
        summary: 'Built activity-recognition models that detect ADHD patterns from smartwatch sensor data.',
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
        slug: 'clinical-dashboard',
        summary: 'Built a Flutter dashboard for real-time clinical monitoring with automated patient-data sync.',
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

/** Company name without the tagline, e.g. "Grantuity" or "App Dev Club LLC @ UMD". */
// eslint-disable-next-line react-refresh/only-export-components
export const shortCompany = (company) => company.split(' — ')[0];

const ExperienceSection = () => {
    return (
        <Section id="experience" title="Experience" keyboard="aside">
            <ul className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 px-4 md:grid-cols-2 md:px-8">
                {experiences.map((exp, index) => (
                    <Reveal as="li" key={exp.slug} delay={(index % 2) * 0.06} className="flex">
                        <Link
                            to={`/experience/${exp.slug}`}
                            state={{ fromSite: true }}
                            className="flex w-full rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
                        >
                            <Card className="flex w-full flex-col p-5 md:p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0 space-y-1">
                                        <h3 className="font-display text-base font-bold leading-snug tracking-tight md:text-lg">
                                            {exp.title}
                                        </h3>
                                        <p className="text-sm font-medium text-muted-foreground">{shortCompany(exp.company)}</p>
                                    </div>
                                    <DateTag>{exp.duration}</DateTag>
                                </div>
                                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{exp.summary}</p>
                                <TechList items={exp.technologies} limit={4} className="mt-5" />
                                <ViewMore label="View details" />
                            </Card>
                        </Link>
                    </Reveal>
                ))}
            </ul>
        </Section>
    );
};

export default ExperienceSection;
