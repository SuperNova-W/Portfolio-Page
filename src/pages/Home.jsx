import React from 'react';
import '../css/main.css';

import Navigation from '../components/Navigation';
import Section from '../components/Section';
import HeroSection from '../components/HeroSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import PublicationsSection from '../components/PublicationsSection';
import CertificationsSection from '../components/CertificationsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

function Home() {
    return (
        <div className="app">
            <Navigation />
            <div className="container">
                <div className="wrapper">
                    <Section id="about" title="About">
                        <HeroSection />
                    </Section>
                    <ExperienceSection />
                    <ProjectsSection />
                    <PublicationsSection />
                    <CertificationsSection />
                    <ContactSection />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
