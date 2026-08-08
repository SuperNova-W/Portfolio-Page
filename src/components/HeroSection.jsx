import React, { useState } from 'react';
import Typer from './Typer';
import profilePicture from '../assets/profilePicture.jpeg';

const GREETING = "Hi, I'm Yashwant Ponnaganti";

const SUMMARY =
    'Computer science student at the University of Maryland building production AI/ML systems — multi-agent RAG pipelines, real-time data infrastructure and cloud-native backends on AWS and GCP.';

const CREDENTIALS =
    "BS Computer Science (ML Track) & Applied Mathematics · Expected Spring 2028 · GPA 3.92 · FIRE Honors · Presidential Scholarship · Dean's List";

const HeroSection = () => {
    const [done, setDone] = useState(false);

    return (
        <div className="intro" id="home">
            <img className="intro-photo" src={profilePicture} alt="Yashwant Ponnaganti" />
            <div className="intro-body">
                <div className="greeting">
                    <span className="name">
                        <Typer
                            text={GREETING}
                            speed={45}
                            maxDuration={Infinity}
                            delay={300}
                            reserveSpace={false}
                            onDone={() => setDone(true)}
                        />
                    </span>
                    <span className={`cursor${done ? ' done' : ''}`} aria-hidden="true" />
                </div>
                <p>
                    <Typer text={SUMMARY} delay={1500} maxDuration={900} />
                </p>
                <p className="meta">
                    <Typer text={CREDENTIALS} delay={2100} maxDuration={700} />
                </p>
            </div>
        </div>
    );
};

export default HeroSection;
