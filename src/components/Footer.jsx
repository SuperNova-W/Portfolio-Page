import React from 'react';
import Typer from './Typer';

const socials = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yashwant-ponnaganti/' },
    { label: 'GitHub', href: 'https://github.com/SuperNova-W' },
    { label: 'Email', href: 'mailto:yash.ponnaganti@gmail.com' },
];

const Footer = () => {
    return (
        <footer className="footer">
            <div className="status">
                <Typer
                    text="Open to internship and new-grad software engineering roles"
                    delay={900}
                    maxDuration={800}
                />
            </div>
            <div className="social">
                {socials.map((social, index) => (
                    <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">
                        <Typer text={social.label} delay={1100 + index * 90} maxDuration={300} />
                    </a>
                ))}
            </div>
        </footer>
    );
};

export default Footer;
