import React from "react";
import "../css/projects.css";

const projects = [
  {
    title: "HandShook",
    eyebrow: "AI-Assisted Handshake Job Application Automation",
    description: "Built a Chrome MV3 extension with React and TypeScript to automate eligible Handshake applications, backed by a Spring Boot service for persistence and user management. Added duplicate prevention, audit logging, and OpenAI-powered document generation while keeping the application flow privacy-conscious and transparent.",
    liveLink: "https://handshook.netlify.app/",
    repoLink: "https://github.com/SuperNova-W/HandshakeJobApplier",
    technologies: ["React", "TypeScript", "Chrome MV3", "Java", "Spring Boot", "MongoDB", "OpenAI API"]
  },
  {
    title: "Lendr",
    eyebrow: "Location-Based Peer-to-Peer Item Lending Marketplace",
    description: "Built a full-stack lending marketplace with a 24-endpoint TypeScript/Express API on AWS Lambda and an Expo/React Native client for iOS, Android, and web. Implemented PostGIS discovery, Supabase-backed JWT APIs, transactional workflows, and role-based authorization for secure peer-to-peer lending.",
    liveLink: "https://lentit.netlify.app/",
    repoLink: "https://github.com/SuperNova-W/Lendr-2.0",
    technologies: ["TypeScript", "Express", "AWS Lambda", "Expo", "React Native", "PostgreSQL", "PostGIS", "Supabase"]
  },
  {
    title: "College Tracker App",
    eyebrow: "College Planning Dashboard",
    description: "Built a student-focused web app for tracking colleges, deadlines, costs, facts, and supplemental prompts in one place. The experience centers around a visual deadline timeline so application planning stays easy to scan.",
    repoLink: "https://github.com/SuperNova-W/CollegeTracker",
    technologies: ["React", "Vite", "CSS", "Supabase"]
  },
  {
    title: "Portfolio Page",
    eyebrow: "Personal Portfolio",
    description: "Designed and built a responsive portfolio site to showcase experience, selected projects, certifications, and technical skills with a polished React interface.",
    liveLink: "https://yashwantponnaganti.netlify.app",
    repoLink: "https://github.com/yashwant-creator/PortfolioPage",
    technologies: ["React", "Vite", "CSS", "GitHub"]
  },
];

const ProjectsSection = () => {
  return (
  <section className="projects-section" id="projects">
      <h2>Projects</h2>
      <div className="projects-list">
        {projects.map((project, idx) => (
          <div className="project-card" key={idx}>
            <span className="project-eyebrow">{project.eyebrow}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-technologies">
              {project.technologies.map((tech, tIdx) => (
                <span className="tech-button" key={tIdx}>{tech}</span>
              ))}
            </div>
            <div className="project-links">
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">View Project</a>
              )}
              {project.repoLink && (
                <a
                  href={project.repoLink}
                  className="project-link-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Repo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
