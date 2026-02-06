import React from 'react';
import ScrollArrow from './ScrollArrow';
import profilePicture from '../assets/profilePicture.jpeg';

const HeroSection = () => {
    return (
        <section id="home" className="hero">
            <div className="hero-content">
                <div className="hero-text">
                    <h1 className="hero-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
                        <img
                            src={profilePicture}
                            alt="Profile"
                            className="hero-profile-pic styled-profile-pic"
                        />
                        <span>
                            Hi, I'm <span className="highlight">Yashwant Ponnaganti</span>
                        </span>
                    </h1>
                    <h2 className="hero-subtitle">Computer Science freshman looking for entry-level experience in end-to-end AIML, web, and mobile development</h2>
                    <p className="hero-description">
                        UMD | BS in Computer Science: ML & Applied Mathematics | Expected May 2028 |
                        Presidential Scholarship Recipient, Dean's List, FIRE
                    </p>
                    <div className="hero-buttons">
                        <a href="#experience" className="btn btn-primary">View My Work</a>
                        <a href="#contact" className="btn btn-secondary">Get In Touch</a>
                    </div>
                </div>
            </div>
            <ScrollArrow targetId="skills" />
        </section>
    );
};

export default HeroSection;
