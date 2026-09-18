import React from 'react';
import Section from './Section';
import Typer from './Typer';

const skills = [
    {
        label: 'Languages',
        items: ['Python', 'Java', 'C', 'C++', 'Go', 'TypeScript', 'JavaScript', 'SQL', 'Rust', 'OCaml'],
    },
    {
        label: 'Frameworks & Libraries',
        items: [
            'FastAPI',
            'Spring',
            'Node.js',
            'React.js',
            'React Native',
            'PyTorch',
            'TensorFlow',
            'scikit-learn',
            'Pandas',
            'NumPy',
        ],
    },
    {
        label: 'Infrastructure & Tools',
        items: [
            'AWS',
            'GCP',
            'Docker',
            'Kubernetes',
            'CI/CD',
            'Git',
            'PostgreSQL',
            'Neo4j',
            'Redis',
            'Kafka',
            'Prometheus',
            'Grafana',
            'Jira',
            'Linux',
        ],
    },
    {
        label: 'Focus Areas',
        items: ['Distributed Systems', 'Retrieval-Augmented Generation', 'Computer Vision (YOLO, CNNs)', 'Data Pipelines'],
    },
];

const SkillsSection = () => {
    return (
        <Section id="skills" title="Skills">
            {skills.map((skill, index) => {
                const base = 120 + index * 90;

                return (
                    <div className="skill-row" key={skill.label}>
                        <span className="label">
                            <Typer text={skill.label} delay={base} />
                        </span>
                        <span>
                            <Typer text={skill.items.join(' / ')} delay={base + 60} />
                        </span>
                    </div>
                );
            })}
        </Section>
    );
};

export default SkillsSection;
