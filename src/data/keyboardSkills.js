import { skills } from '../components/SkillsSection';

// Keycap styling for every skill listed in the Skills section. Labels and
// captions shown on the 3D keyboard come straight from that list (skill name +
// its category), so the keyboard never introduces new text.
export const KEYCAPS = {
    Python: { icon: 'python', color: '#2f6fb0' },
    Java: { icon: 'java', color: '#e76f00' },
    C: { icon: 'c', color: '#5c6bc0' },
    'C++': { icon: 'cpp', color: '#00599c' },
    Go: { icon: 'go', color: '#00a7d0' },
    TypeScript: { icon: 'ts', color: '#008fd5' },
    JavaScript: { icon: 'js', color: '#ff9408' },
    SQL: { color: '#336791' },
    Rust: { icon: 'rust', color: '#b7410e' },
    OCaml: { icon: 'ocaml', color: '#ec6813' },
    FastAPI: { icon: 'fastapi', color: '#009688' },
    Spring: { icon: 'spring', color: '#5fa832' },
    'Node.js': { icon: 'nodejs', color: '#00952c' },
    'React.js': { icon: 'react', color: '#00cce8' },
    'React Native': { icon: 'react', color: '#1b6fa8' },
    PyTorch: { icon: 'pytorch', color: '#ee4c2c' },
    TensorFlow: { icon: 'tensorflow', color: '#ff8f00' },
    'scikit-learn': { icon: 'sklearn', color: '#f7931e' },
    Pandas: { icon: 'pandas', color: '#150458' },
    NumPy: { icon: 'numpy', color: '#4dabcf' },
    XGBoost: { color: '#1a7f9c' },
    AWS: { icon: 'aws', color: '#ff9208' },
    GCP: { icon: 'gcp', color: '#4285f4' },
    Docker: { icon: 'docker', color: '#009fe8' },
    Kubernetes: { icon: 'kubernetes', color: '#326ce5' },
    'CI/CD': { color: '#2088ff' },
    Git: { icon: 'git', color: '#ff4622' },
    PostgreSQL: { icon: 'postgres', color: '#146888' },
    Neo4j: { icon: 'neo4j', color: '#018bff' },
    Redis: { icon: 'redis', color: '#dc382d' },
    Kafka: { icon: 'kafka', color: '#333537' },
    Dagster: { color: '#4f43dd' },
    Prometheus: { icon: 'prometheus', color: '#e6522c' },
    Grafana: { icon: 'grafana', color: '#f46800' },
    Jira: { icon: 'jira', color: '#0052cc' },
    Linux: { icon: 'linux', color: '#333537' },
};

/** White text artwork for skills without a logo, in the same 512px format as the logos. */
const textKeycap = (text) => {
    const size = Math.min(230, 1000 / Math.max(text.length, 1));
    const safe = text.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><text x="256" y="256" fill="white" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="${size}" text-anchor="middle" dominant-baseline="central">${safe}</text></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const slug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

// The keyboard is a 6-wide grid, so it holds the three skill lists
// (Focus Areas are longer phrases and stay as text in the section).
export const KEYBOARD_SKILLS = skills
    .filter((group) => group.items.every((item) => KEYCAPS[item]))
    .flatMap((group) =>
        group.items.map((item) => {
            const cap = KEYCAPS[item];
            return {
                name: slug(item),
                label: item,
                shortDescription: group.label,
                color: cap.color,
                icon: cap.icon ? `/assets/keyboard/logos/${cap.icon}.svg` : textKeycap(item),
            };
        })
    );

const ALIASES = { React: 'react', 'Spring Boot': 'spring', 'Machine Learning': null };

/** Local white logo for a technology name, when there is one. */
export const logoFor = (name) => {
    const icon = name in ALIASES ? ALIASES[name] : KEYCAPS[name]?.icon;
    return icon ? `/assets/keyboard/logos/${icon}.svg` : null;
};
