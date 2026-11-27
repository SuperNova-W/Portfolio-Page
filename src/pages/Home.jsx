import React from 'react';

import Preloader from '../components/Preloader';
import SmoothScroll from '../components/SmoothScroll';
import AnimatedBackground from '../components/AnimatedBackground';
import { useLocation } from 'react-router-dom';
import GridBackground from '../components/fx/GridBackground';
import GradientBlobs from '../components/fx/GradientBlobs';
import CursorFX from '../components/fx/CursorFX';
import TerminalOverlay from '../components/terminal/TerminalOverlay';
import TerminalShortcut from '../components/terminal/TerminalShortcut';
import PagePeel from '../components/terminal/PagePeel';
import DetailOverlay from '../components/DetailOverlay';
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
import { usePreloader } from '../components/Preloader';

function Home() {
    const { ready, reducedMotion } = usePerfProfile();
    const terminalOpen = useLocation().pathname === '/terminal';

    return (
        <Preloader>
            <SmoothScroll enabled={ready && !reducedMotion} />
            {/* Background + cursor ported from anhdtran-portfolio. Particles.jsx is
                still in components/ if you want it back. */}
            <GradientBlobs />
            <GridBackground />
            <Overlays terminalOpen={terminalOpen} />
            <TerminalShortcut />
            {terminalOpen && <TerminalOverlay />}
            <DetailOverlay />
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

/** Cursor + page peel wait for the preloader and step aside for the terminal. */
function Overlays({ terminalOpen }) {
    const { isLoading } = usePreloader();
    return (
        <>
            <CursorFX active={!isLoading && !terminalOpen} />
            <PagePeel hidden={isLoading} />
        </>
    );
}

export default Home;
