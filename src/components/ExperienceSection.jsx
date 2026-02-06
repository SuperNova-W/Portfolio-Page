import React from 'react';

const ExperienceSection = () => {
    const experiences = [
        {
            title: "Backend Intern",
            company: "Sorcea",
            duration: "Jan 2026 – PRESENT",
            type: "Part time - Remote",
            description: `Currently helping migrate from AWS DynamoDB architecture to Neo4j Graph database.
\nBuilding a louvain clustering algorithm to build recommendation engine for product search.
`,
            technologies: ["Neo4j", "Cypher", "Python", "Machine Learning", "NoSQL"],
            links: []
        },
        {
            title: "Software + ML Engineer",
            subtitle: "(Intern till Dec 2025, now part-time SWE)",
            company: "Brown University & University of Rhode Island",
            duration: "June 2025 – PRESENT",
            type: "Part time - Remote",
            description: `Architected a production-ready RAG system for PKD research using FastAPI and Docker, achieving a 2-3s baseline latency for standard queries via OpenAI text-embeddings-3-small.
\nEngineered a Stepback Query Decomposition mode that improved retrieval context breadth with only a 500ms overhead, maintaining a highly responsive 3.5s average total response time.
\nDeveloped a Chain-of-Thought (CoT) reasoning engine for complex queries, managing multi-step query decomposition and synthesis across 2-5 reasoning steps for high-depth academic analysis.
\nOptimized infrastructure costs by deploying to GCP Cloud Run with auto-scaling (2 vCPUs, 2GB RAM), maintaining a 3s average request duration under active usage and implementing scale-to-zero logic.
\nReduced system RAM overhead and eliminated re-computation latency by migrating from ephemeral FAISS to a Persistent ChromaDB architecture with 1536-dimension vector indices.
`,
            technologies: ["GCP", "Docker", "ChromaDB", "OpenAI API", "FastAPI", "Python", "RAG", "FAISS"],
            links: []
        },

        {
            title: "Engineering Intern (Hardware)",
            company: "University of Rhode Island, Biomedical Engineering",
            duration: "June 2024 – Aug 2024",
            location: "Kingston, RI",
            description: `Led development of an IoT smart-bottle accessory; presented research at IEEE MIT URTC 2024.
\nOwned end-to-end hardware lifecycle: CAD design, 3D prototyping, and haptic feedback telemetry integration.
\nValidated product-market fit via international research with 92 participants, mapping requirements to hardware specs.
`,
            technologies: ["IoT", "Hardware Design", "IEEE", "3D Printing", "CAD"],
            links: []
        },

        {
            title: "ML Research Intern",
            company: "University of Rhode Island, Biomedical Engineering",
            duration: "June 2023 – Aug 2023",
            location: "Kingston, RI",
            description: `Helped build a HAR model for ADHD detection, reaching 62% accuracy using noisy accelerometer/gyroscope data.
\nHelped deploy K-NN and Clustering models to transform raw smartwatch data into actionable clinical activity insights.
`,
            technologies: ["Python", "Machine Learning", "K-NN", "Clustering"],
            links: []
        },
        {
            title: "Student Volunteer (Software Engineering)",
            company: "University of Rhode Island, Biomedical Engineering",
            duration: "June 2022 – Aug 2022",
            location: "Kingston, RI",
            description: `Built a Flutter analytics dashboard for real-time clinical monitoring and health data visualization.
\nArchitected a data sync layer using Firebase/Google Sheets API, automating patient metric ingestion from distributed sources.
`,
            technologies: ["Flutter", "Firebase", "Google Sheets API"],
            links: []
        },

    ];

    return (
        <section id="experience" className="experience-section">
            <h2 className="section-title">Experience</h2>
            <div className="timeline">
                <div className="timeline-line"></div>
                {experiences.map((exp, index) => (
                    <div key={index} className="timeline-item">
                        <div className="timeline-date">{exp.duration}</div>
                        <div className="experience-card">
                            <div className="experience-header">
                                <h3 className="experience-title">{exp.title}</h3>
                                <p className="experience-company">{exp.company}</p>
                            </div>
                            <div className="experience-description">
                                <p>{exp.description}</p>
                            </div>
                            <div className="experience-technologies">
                                {exp.technologies.map((tech, techIndex) => (
                                    <span key={techIndex} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                            {exp.links.length > 0 && (
                                <div className="experience-links">
                                    {exp.links.map((link, linkIndex) => (
                                        <a key={linkIndex} href={link.url} className="experience-link" target="_blank" rel="noopener noreferrer">
                                            {link.text}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ExperienceSection;
