import React from 'react';

const AboutSection = () => {
    return (
        <section id="about" className="about">
            <div className="container">
                <h2 className="section-title">About Me</h2>
                <div className="about-content">
                    <div className="about-text">
                        <p>
                            University of Maryland, College Park |
                            BS in Computer Science: ML & Applied Mathematics | Expected May 2028 |
                            Presidential Scholarship Recipient, Dean's List, FIRE
                        </p>
                        <p>
                        Computer Science freshman with hands-on experience in production-ready AIML systems, 
                        full-stack development, and cloud-native deployment. Adept in agentic RAG architectures, 
                        system design, and building scalable solutions. Passionate about leveraging AI/ML and 
                        software engineering to solve real-world problems across healthcare, research, and 
                        enterprise applications.
                        </p>
                    </div>
                    <div className="about-stats">
                        <div className="stat">
                            <h3>6+</h3>
                            <p>Years Experience</p>
                        </div>
                        <div className="stat">
                            <h3>15+</h3>
                            <p>Projects Completed</p>
                        </div>
                        <div className="stat">
                            <h3>20+</h3>
                            <p>Technologies Mastered</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
