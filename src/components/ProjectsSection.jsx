import React from "react";
import "../css/projects.css";

const projects = [
  {
    title: "HandShook",
    description: "A local-first Chrome extension (Manifest V3) that auto-applies to eligible one-click Handshake jobs straight from your logged-in browser session — no credentials ever stored. A localhost-only Spring Boot companion API persists settings, run history, and documents to SQLite, and hosts OpenAI-backed cover-letter and RAG document generation so your API key and files never reach the browser.",
    liveLink: "https://handshook.netlify.app/",
    repoLink: "https://github.com/SuperNova-W/HandshakeJobApplier",
    technologies: ["React", "TypeScript", "Vite", "Java", "Spring Boot", "SQLite", "OpenAI API", "Chrome Extension"]
  },
  {
    title: "Lendr",
    description: "A location-based peer-to-peer item lending marketplace — Airbnb for physical items between neighbors. Users list things they own, nearby users browse and request to borrow them via PostGIS geo-queries, and owners approve or decline. Features Google OAuth2 + JWT auth, S3 photo uploads, map/list browsing with radius filters, and two-way thumbs-up/down ratings tied to completed lends.",
    repoLink: "https://github.com/SuperNova-W/Lendr-2.0",
    technologies: ["React", "TypeScript", "Tailwind", "Node.js", "Express", "PostgreSQL", "PostGIS", "AWS"]
  },
  {
    title: "College Tracker App",
    description: "Full-Stack A web app where a student can:add colleges, see important deadlines in a visual timeline, get basic info about each college (fees, cost of attendance, facts, prompts)",
    repoLink: "https://github.com/SuperNova-W/CollegeTracker",
    technologies: ["React", "Vite", "CSS","SupaBase"]
  },
  {
    title: "Portfolio Page",
    description: "A website that tracks my experience, projects, and skills.",
    liveLink: "https://yashwantponnaganti.netlify.app",
    repoLink: "https://github.com/yashwant-creator/PortfolioPage",
    technologies: ["React", "HTML","CSS","Github"]
  },
  // Add more projects as needed
];

const ProjectsSection = () => {
  return (
  <section className="projects-section" id="projects">
      <h2>Projects</h2>
      <div className="projects-list">
        {projects.map((project, idx) => (
          <div className="project-card" key={idx}>
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
