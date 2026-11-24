import React from 'react';
import Section from './Section';
import { Reveal } from './Reveal';
import { Card, TechList } from './ui';
import { useSceneStatus } from '../lib/scene-health';

// Also drives the 3D keyboard (see data/keyboardSkills.js).
// eslint-disable-next-line react-refresh/only-export-components
export const skills = [
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
            'XGBoost',
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
            'Dagster',
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
    const sceneStatus = useSceneStatus();
    const keyboard = sceneStatus === 'ready';

    return (
        <Section id="skills" title="Skills" keyboard="skills" headerClassName={keyboard ? 'sticky top-[70px] z-[1]' : undefined}>
            {/* Room for the 3D keyboard, which settles centre-screen here. */}
            {keyboard && <div aria-hidden="true" className="pointer-events-none h-[70vh] md:h-[110vh]" />}
            <div data-keyboard="aside" className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 px-4 md:grid-cols-2 md:px-8">
                {skills.map((skill, index) => (
                    <Reveal key={skill.label} delay={(index % 2) * 0.08} className="flex">
                        <Card className="w-full p-6">
                            <h3 className="font-sans text-sm tracking-wide text-muted-foreground">{skill.label}</h3>
                            <TechList items={skill.items} className="mt-4" />
                        </Card>
                    </Reveal>
                ))}
            </div>
        </Section>
    );
};

export default SkillsSection;
