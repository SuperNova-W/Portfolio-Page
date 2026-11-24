import React from 'react';

import Preloader from '../components/Preloader';
import SmoothScroll from '../components/SmoothScroll';
import AnimatedBackground from '../components/AnimatedBackground';
import Particles from '../components/Particles';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import EducationSection from '../components/EducationSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import PublicationsSection from '../components/PublicationsSection';
import CertificationsSection from '../components/CertificationsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { usePerfProfile } from '../hooks/usePerfProfile';

function Home() {
    const { ready, reducedMotion, particleCount, maxDpr } = usePerfProfile();

    return (
        <Preloader>
            <SmoothScroll enabled={ready && !reducedMotion} />
            {ready && particleCount > 0 && (
                <Particles className="fixed inset-0 -z-10" quantity={particleCount} maxDpr={maxDpr} />
            )}
            <AnimatedBackground />
            <Navigation delay={0.4} />
            <main className="canvas-overlay-mode relative">
                <HeroSection />
                <EducationSection />
                <ExperienceSection />
                <ProjectsSection />
                <SkillsSection />
                <PublicationsSection />
                <CertificationsSection />
                <ContactSection />
            </main>
            <Footer />
        </Preloader>
    );
}

export default Home;
