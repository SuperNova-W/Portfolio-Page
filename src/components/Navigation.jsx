import React from 'react';
import Typer from './Typer';

const links = [
    { href: '#about', label: 'About' },
    { href: '#education', label: 'Education' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#publications', label: 'Publications' },
    { href: '#awards', label: 'Awards' },
    { href: '#contact', label: 'Contact' },
];

const Navigation = () => {
    return (
        <header className="header">
            <svg className="logo" viewBox="0 0 32 32" aria-label="YP">
                <path d="M4 7 L11 17 L18 7" />
                <path d="M11 17 L11 25" />
            </svg>
            <nav className="header-nav">
                {links.map((link, index) => (
                    <a className="link" key={link.href} href={link.href}>
                        <span className="title">
                            <Typer text={link.label} delay={600 + index * 90} maxDuration={300} />
                        </span>
                    </a>
                ))}
            </nav>
        </header>
    );
};

export default Navigation;
