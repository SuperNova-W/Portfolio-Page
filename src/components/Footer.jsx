import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const socials = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yashwant-ponnaganti/', Icon: FaLinkedin },
    { label: 'GitHub', href: 'https://github.com/SuperNova-W', Icon: FaGithub },
    { label: 'Email', href: 'mailto:yash.ponnaganti@gmail.com', Icon: HiOutlineMail },
];

const Footer = () => {
    return (
        <footer className="relative z-[1] flex w-full shrink-0 flex-col items-center gap-4 border-t border-border bg-background/60 px-4 py-6 backdrop-blur-md sm:flex-row sm:justify-between md:px-6">
            <p className="flex items-center gap-2.5 text-xs text-muted-foreground">
                <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inset-0 rounded-full bg-emerald-500/60 motion-safe:animate-ping" />
                    <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Open to internship and new-grad software engineering roles
            </p>
            <nav className="flex gap-1 sm:gap-2">
                {socials.map(({ label, href, Icon }) => (
                    <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                        <Icon size={14} />
                        {label}
                    </a>
                ))}
            </nav>
        </footer>
    );
};

export default Footer;
