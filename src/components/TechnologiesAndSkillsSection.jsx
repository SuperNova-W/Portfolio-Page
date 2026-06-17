import React from 'react';
import {
    SiPython,
    SiC,
    SiCplusplus,
    SiGo,
    SiAngular,
    SiTypescript,
    SiReact,
    SiFlutter,
    SiJavascript,
    SiSpringboot,
    SiExpress,
    SiExpo,
    SiFlask,
    SiFastapi,
    SiMongodb,
    SiNeo4J,
    SiPostgresql,
    SiRedis,
    SiSupabase,
    SiFirebase,
    SiDocker,
    SiLinux,
    SiTensorflow,
    SiScikitlearn,
    SiNumpy,
    SiPandas,
    SiLangchain,
    SiOpenai,
    SiGooglecloud,
    SiServerless,
    SiGit,
    SiGithub,
    SiGithubactions,
    SiApachemaven,
    SiZod,
    SiH3,
} from 'react-icons/si';
import { FaJava, FaAws, FaBrain, FaCloud, FaCode, FaDatabase, FaServer, FaTools } from 'react-icons/fa';
import { TbApi, TbBrandReactNative, TbDatabaseSearch, TbNetwork } from 'react-icons/tb';
import '../css/technologies-skills.css';

const TECHNOLOGY_GROUPS = [
    {
        title: 'Programming Languages',
        Icon: FaCode,
        skills: [
            { name: 'Python', Icon: SiPython, color: '#3776AB' },
            { name: 'Java', Icon: FaJava, color: '#E76F00' },
            { name: 'C', Icon: SiC, color: '#00599C' },
            { name: 'C++', Icon: SiCplusplus, color: '#00599C' },
            { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
            { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
            { name: 'Go', Icon: SiGo, color: '#00ADD8' },
            { name: 'SQL' },
        ],
    },
    {
        title: 'Frameworks & Libraries',
        Icon: FaServer,
        skills: [
            { name: 'FastAPI', Icon: SiFastapi, color: '#009688' },
            { name: 'Flask', Icon: SiFlask, color: '#000000' },
            { name: 'Spring Boot', Icon: SiSpringboot, color: '#6DB33F' },
            { name: 'React', Icon: SiReact, color: '#149ECA' },
            { name: 'React Native', Icon: TbBrandReactNative, color: '#149ECA' },
            { name: 'Expo', Icon: SiExpo, color: '#000020' },
            { name: 'Express', Icon: SiExpress, color: '#000000' },
            { name: 'Angular', Icon: SiAngular, color: '#DD0031' },
            { name: 'Flutter', Icon: SiFlutter, color: '#02569B' },
            { name: 'scikit-learn', Icon: SiScikitlearn, color: '#F7931E' },
            { name: 'TensorFlow', Icon: SiTensorflow, color: '#FF6F00' },
            { name: 'Pandas', Icon: SiPandas, color: '#150458' },
            { name: 'NumPy', Icon: SiNumpy, color: '#4DABCF' },
            { name: 'Zod', Icon: SiZod, color: '#3068B7' },
        ],
    },
    {
        title: 'Backend & Systems',
        Icon: TbApi,
        skills: [
            { name: 'REST APIs' },
            { name: 'System Design' },
            { name: 'Microservices' },
            { name: 'OOP' },
            { name: 'Data Pipelines' },
            { name: 'Async Processing' },
            { name: 'Linux', Icon: SiLinux, color: '#FCC624' },
            { name: 'Chrome Extensions' },
            { name: 'Serverless Architectures', Icon: SiServerless, color: '#FD5750' },
        ],
    },
    {
        title: 'Cloud & DevOps',
        Icon: FaCloud,
        skills: [
            { name: 'AWS', Icon: FaAws, color: '#FF9900' },
            { name: 'Lambda', Icon: FaAws, color: '#FF9900' },
            { name: 'API Gateway', Icon: FaAws, color: '#FF9900' },
            { name: 'EC2', Icon: FaAws, color: '#FF9900' },
            { name: 'S3', Icon: FaAws, color: '#FF9900' },
            { name: 'SageMaker', Icon: FaAws, color: '#FF9900' },
            { name: 'EventBridge', Icon: FaAws, color: '#FF9900' },
            { name: 'GCP Cloud Run', Icon: SiGooglecloud, color: '#4285F4' },
            { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
            { name: 'CI/CD', Icon: SiGithubactions, color: '#2088FF' },
            { name: 'Git', Icon: SiGit, color: '#F05032' },
            { name: 'Serverless Framework', Icon: SiServerless, color: '#FD5750' },
        ],
    },
    {
        title: 'Databases & Storage',
        Icon: FaDatabase,
        skills: [
            { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
            { name: 'PostGIS' },
            { name: 'NoSQL' },
            { name: 'Neo4j', Icon: SiNeo4J, color: '#008CC1' },
            { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
            { name: 'Firebase', Icon: SiFirebase, color: '#FFA000' },
            { name: 'Redis', Icon: SiRedis, color: '#FF4438' },
            { name: 'Supabase', Icon: SiSupabase, color: '#3FCF8E' },
            { name: 'DynamoDB', Icon: FaAws, color: '#FF9900' },
        ],
    },
    {
        title: 'AI & ML Tooling',
        Icon: FaBrain,
        skills: [
            { name: 'LangChain', Icon: SiLangchain, color: '#1C3C3C' },
            { name: 'LlamaIndex' },
            { name: 'Machine Learning' },
            { name: 'Deep Learning' },
            { name: 'RAG', Icon: TbDatabaseSearch, color: '#007EA7' },
            { name: 'LLMs' },
            { name: 'Vector Embeddings' },
            { name: 'Information Retrieval' },
            { name: 'Recommendation Systems', Icon: TbNetwork, color: '#007EA7' },
            { name: 'OpenAI API', Icon: SiOpenai, color: '#412991' },
            { name: 'FAISS' },
            { name: 'ChromaDB' },
        ],
    },
    {
        title: 'Developer Tools',
        Icon: FaTools,
        skills: [
            { name: 'Maven', Icon: SiApachemaven, color: '#C71A36' },
            { name: 'PDFBox' },
            { name: 'OpenPDF' },
            { name: 'Valkey' },
            { name: 'H3', Icon: SiH3, color: '#1F7A8C' },
            { name: 'GitHub', Icon: SiGithub, color: '#181717' },
        ],
    },
];

const TechnologiesAndSkillsSection = () => {
    const getFallbackLabel = (name) => name
        .split(/[\s./-]+/)
        .filter(Boolean)
        .map((part) => part[0])
        .join('')
        .slice(0, 3)
        .toUpperCase();

    const SkillItem = (skill) => {
        const SkillIcon = skill.Icon;

        return (
            <li className="tech-skill-item" title={skill.name}>
                <span className="tech-skill-icon" style={{ color: skill.color || '#007ea7' }} aria-hidden="true">
                    {SkillIcon ? <SkillIcon size={18} /> : getFallbackLabel(skill.name)}
                </span>
                <span>{skill.name}</span>
            </li>
        );
    };

    return (
        <section id="skills" className="technologies-section">
            <h2 className="section-title">Skills & Technologies</h2>
            <div className="tech-skills-container">
                {TECHNOLOGY_GROUPS.map((group) => {
                    const CategoryIcon = group.Icon;

                    return (
                        <article className="tech-category-card" key={group.title}>
                            <div className="tech-category-header">
                                <span className="tech-category-icon" aria-hidden="true">
                                    <CategoryIcon size={22} />
                                </span>
                                <h3>{group.title}</h3>
                            </div>
                            <ul className="tech-skill-list">
                                {group.skills.map((skill) => (
                                    <SkillItem key={skill.name} {...skill} />
                                ))}
                            </ul>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default TechnologiesAndSkillsSection;
