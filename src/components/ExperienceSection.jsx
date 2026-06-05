import React from 'react';

const ExperienceSection = () => {
    const experiences = [
        {
            title: "Full Stack Developer (Contract)",
            company: "Mitsubishi Electric",
            duration: "Feb 2026 – May 2026",
            type: "Part time - Remote (~10 hrs/week)",
            description: `Reduced real-time logistics lookup latency by ~33% by building geospatial matching logic with H3 hexagonal indexing to cluster drivers and packages into nearby regions.
\nBuilt backend logic to match packages with nearby drivers using location updates every 10-30 seconds, enabling reliable real-time dispatch.
\nShipped a QR code scanning feature in React Native, streamlining package handling workflows for field users.
`,
            technologies: ["H3", "Python", "FastAPI", "PostgreSQL", "Valkey", "React Native", "AWS"],
            links: []
        },
        {
            title: "Backend Intern",
            company: "Sorcea",
            duration: "Jan 2026 – May 2026",
            type: "Part time - Remote (~10 hrs/week)",
            description: `Migrated 100K+ product records from DynamoDB to Neo4j to better model relationships across products, ingredients, categories, and subcategories.
\nBuilt a recommendation pipeline using TF-IDF similarity, cosine scoring, top-K sparsification, and Leiden community detection, improving product clustering quality across 100K+ items.
\nDeployed the pipeline via AWS SageMaker, EC2 and S3, achieving under 100ms product retrieval for 3,000+ monthly users of a beauty marketing app.
`,
            technologies: ["Neo4j", "Python", "Machine Learning", "AWS SageMaker", "EC2", "Event Bridge", "Lambda", "S3"],
            links: []
        },
        {
            title: "Software Engineer",
            company: "Brown University & University of Rhode Island",
            duration: "June 2025 – Dec 2025",
            type: "Part time - Remote",
            description: `Built a full-stack PKD research platform on GCP Cloud Run (auto-scaling, scale-to-zero) featuring a multi-agent RAG pipeline with step-back query decomposition, question rewriting, and Chain-of-Thought reasoning over 81 research papers with 1536-dimensional embeddings and 3 retrieval modes — directly supporting $50K in secured research funding.
\nDesigned and deployed a scalable document ingestion system using FastAPI, Docker, ChromaDB, and FAISS to convert scientific PDFs into a low-latency searchable RAG corpus.
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
            description: `Helped build a HAR model for ADHD detection, reaching 72% accuracy using noisy accelerometer/gyroscope data.
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
