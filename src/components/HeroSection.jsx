import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import profilePicture from '../assets/profilePicture.jpeg';
import { BlurIn, BoxReveal } from './Reveal';
import ScrollDownIcon from './ScrollDownIcon';
import { usePreloader } from './Preloader';
import { cn } from '../lib/cn';

const GREETING = "Hi, I'm Yashwant Ponnaganti";

const SUMMARY =
    'Computer science student at the University of Maryland building production AI/ML systems — multi-agent RAG pipelines, real-time data infrastructure and cloud-native backends on AWS and GCP.';

const CREDENTIALS =
    "BS Computer Science (Honors, ML Track) & Applied Mathematics · Expected Spring 2028 · GPA 3.92 · FIRE Honors · Presidential Scholarship · Dean's List · 5x Hackathon Winner · 2x IEEE Publications";

// "Hi, I'm" sits above the name, which is set huge across two lines.
const [HELLO_A, HELLO_B, ...NAME] = GREETING.split(' ');

const socials = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yashwant-ponnaganti/', Icon: FaLinkedin },
    { label: 'GitHub', href: 'https://github.com/SuperNova-W', Icon: FaGithub },
    { label: 'Email', href: 'mailto:yash.ponnaganti@gmail.com', Icon: HiOutlineMail },
];

const iconButton =
    'inline-flex h-11 w-11 items-center justify-center rounded-md border border-input bg-background/40 backdrop-blur-sm transition-colors hover:bg-accent';

const HeroSection = () => {
    const { isLoading } = usePreloader();

    return (
        <section id="about" data-keyboard="hero" className="relative min-h-[100dvh] w-full">
            <div className="grid min-h-[100dvh] md:grid-cols-2">
                <div
                    className={cn(
                        'z-[2] flex flex-col items-start justify-start md:justify-center',
                        'px-6 pb-40 pt-28 sm:px-10 md:p-16 lg:p-20 xl:p-28'
                    )}
                >
                    {!isLoading && (
                        <div id="home" className="flex max-w-2xl flex-col">
                            <BlurIn delay={0.4}>
                                <div className="mb-6 flex items-center gap-4">
                                    <img
                                        className="h-14 w-14 rounded-full object-cover ring-1 ring-white/20 md:h-16 md:w-16"
                                        src={profilePicture}
                                        alt="Yashwant Ponnaganti"
                                    />
                                    <h2 className="font-sans text-sm tracking-[0.2em] text-zinc-400">
                                        About
                                    </h2>
                                </div>
                            </BlurIn>
                            <h1 aria-label={GREETING}>
                                <BlurIn delay={0.7}>
                                    <span className="block font-sans text-base font-medium text-zinc-400 sm:text-xl">
                                        {HELLO_A} {HELLO_B}
                                    </span>
                                </BlurIn>
                                <BlurIn delay={1}>
                                    <span
                                        className={cn(
                                            '-ml-[3px] block font-display font-bold leading-[0.95] tracking-tight text-foreground',
                                            'text-[2.6rem] sm:text-6xl lg:text-[4.25rem] 2xl:text-8xl'
                                        )}
                                    >
                                        {NAME.map((part) => (
                                            <span key={part} className="block">
                                                {part}
                                            </span>
                                        ))}
                                    </span>
                                </BlurIn>
                            </h1>
                            <BlurIn delay={1.2}>
                                <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">{SUMMARY}</p>
                            </BlurIn>
                            <BlurIn delay={1.4}>
                                <p className="mt-4 flex max-w-xl flex-wrap gap-2 text-xs text-zinc-400">
                                    {CREDENTIALS.split(' · ').map((item, index) => (
                                        <span
                                            key={item}
                                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm"
                                        >
                                            {item}
                                            <span className="sr-only">{index < CREDENTIALS.split(' · ').length - 1 ? ' · ' : ''}</span>
                                        </span>
                                    ))}
                                </p>
                            </BlurIn>
                            <div className="mt-8 flex gap-3">
                                {socials.map(({ label, href, Icon }, index) => (
                                    <BoxReveal key={label} delay={1.8 + index * 0.1}>
                                        <a
                                            className={iconButton}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            title={label}
                                        >
                                            <Icon size={20} />
                                        </a>
                                    </BoxReveal>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="hidden md:block" />
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                <ScrollDownIcon />
            </div>
        </section>
    );
};

export default HeroSection;
