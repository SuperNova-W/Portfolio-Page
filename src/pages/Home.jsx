
import React from 'react';
import '../css/main.css';

// Import components
import CursorSpotlight from '../components/CursorSpotlight';
import BackgroundBlobs from '../components/BackgroundBlobs';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import TechnologiesAndSkillsSection from '../components/TechnologiesAndSkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import ContactSection from '../components/ContactSection';
import ProjectsSection from '../components/ProjectsSection';
import CertificationsSection from '../components/CertificationsSection';
import Footer from '../components/Footer';

function Home() {
    return (
        <div className="home">
            <CursorSpotlight />
            <BackgroundBlobs />
            <Navigation />
            <HeroSection />
            <TechnologiesAndSkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <CertificationsSection />
            <ContactSection />
            <Footer />
        </div>
    );
}

export default Home;
