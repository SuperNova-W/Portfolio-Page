import React from 'react';
import {
    SiPython,
    SiC,
    SiCplusplus,
    SiGo,
    SiTypescript,
    SiReact,
    SiFlutter,
    SiJavascript,
    SiFlask,
    SiFastapi,
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
    SiGooglecloud,
    SiGit,
    SiGithub,
    SiFigma,
} from 'react-icons/si';
import { FaJava, FaAws } from 'react-icons/fa';
import { TbBrandReactNative } from 'react-icons/tb';
import '../css/skills-tooltip.css';
import '../css/technologies-skills.css';

// Each skill maps to an accurate brand icon and its brand color.
// Matplotlib has no brand icon in the icon sets, so it uses a clean inline chart SVG.
const MatplotlibIcon = (props) => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 12L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 12L19 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 12L5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 18a9 9 0 0 1 16 0" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

const SKILLS = [
    { name: 'Python', Icon: SiPython, color: '#3776AB' },
    { name: 'Java', Icon: FaJava, color: '#E76F00' },
    { name: 'C', Icon: SiC, color: '#00599C' },
    { name: 'C++', Icon: SiCplusplus, color: '#00599C' },
    { name: 'Go', Icon: SiGo, color: '#00ADD8' },
    { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
    { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
    { name: 'React', Icon: SiReact, color: '#149ECA' },
    { name: 'React-Native', Icon: TbBrandReactNative, color: '#149ECA' },
    { name: 'Flutter', Icon: SiFlutter, color: '#02569B' },
    { name: 'FastAPI', Icon: SiFastapi, color: '#009688' },
    { name: 'Flask', Icon: SiFlask, color: '#000000' },
    { name: 'Neo4j', Icon: SiNeo4J, color: '#008CC1' },
    { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
    { name: 'Redis', Icon: SiRedis, color: '#FF4438' },
    { name: 'Supabase', Icon: SiSupabase, color: '#3FCF8E' },
    { name: 'Firebase', Icon: SiFirebase, color: '#FFA000' },
    { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
    { name: 'Linux', Icon: SiLinux, color: '#FCC624' },
    { name: 'AWS', Icon: FaAws, color: '#FF9900' },
    { name: 'GCP', Icon: SiGooglecloud, color: '#4285F4' },
    { name: 'TensorFlow', Icon: SiTensorflow, color: '#FF6F00' },
    { name: 'Scikit-learn', Icon: SiScikitlearn, color: '#F7931E' },
    { name: 'Numpy', Icon: SiNumpy, color: '#4DABCF' },
    { name: 'Pandas', Icon: SiPandas, color: '#150458' },
    { name: 'Matplotlib', Icon: MatplotlibIcon, color: '#11557C' },
    { name: 'LangChain', Icon: SiLangchain, color: '#1C3C3C' },
    { name: 'Git', Icon: SiGit, color: '#F05032' },
    { name: 'GitHub', Icon: SiGithub, color: '#181717' },
    { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
];

const TechnologiesAndSkillsSection = () => {
    const SkillItem = ({ name, Icon, color }) => (
        <div className="skill-item">
            <div className="skill-icon">
                <Icon size={40} color={color} aria-label={name} title={name} />
                <span className="skill-tooltip">{name}</span>
            </div>
        </div>
    );

    return (
        <div id="skills" style={{ scrollMarginTop: '80px' }}>
            <h2 className='section-title'>Skills & Technologies</h2>
            <section className="tech-skills-container">
                <div className="skill-items sleek-skill-items">
                    {SKILLS.map((skill) => (
                        <SkillItem key={skill.name} {...skill} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TechnologiesAndSkillsSection;
