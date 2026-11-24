import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../lib/cn';

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

const ease = [0.76, 0, 0.24, 1];

const Navigation = ({ delay = 0 }) => {
    const [open, setOpen] = useState(false);
    const [hovered, setHovered] = useState(null);

    useEffect(() => {
        if (!open) return undefined;
        const onKey = (event) => event.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    return (
        <motion.header
            className={cn(
                'fixed inset-x-0 top-0 z-[1000] p-4 backdrop-blur-md transition-colors duration-500',
                open ? 'bg-background/80' : 'bg-transparent'
            )}
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ delay, duration: 0.8 }}
        >
            <div className="relative flex items-center justify-between">
                <a href="#about" className="flex items-center" onClick={() => setOpen(false)}>
                    <svg
                        className="h-7 w-7 fill-none stroke-foreground"
                        viewBox="0 0 32 32"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-label="YP"
                    >
                        <path d="M4 7 L11 17 L18 7" />
                        <path d="M11 17 L11 25" />
                    </svg>
                </a>

                <button
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    aria-label="Menu"
                    aria-expanded={open}
                    className="group flex h-8 w-8 items-center justify-center rounded-full"
                >
                    <span className="relative block h-[9px] w-[22px]">
                        <span
                            className={cn(
                                'absolute left-0 h-px w-full bg-foreground transition-all duration-700',
                                open ? 'top-1 rotate-45' : 'top-0'
                            )}
                            style={{ transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }}
                        />
                        <span
                            className={cn(
                                'absolute left-0 h-px w-full bg-foreground transition-all duration-700',
                                open ? 'top-1 -rotate-45' : 'top-2'
                            )}
                            style={{ transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }}
                        />
                    </span>
                </button>
            </div>

            <motion.div
                className="absolute left-0 top-full h-0 w-full bg-black/50"
                animate={{ height: open ? '100dvh' : 0 }}
                transition={{ duration: 1, ease }}
                onClick={() => setOpen(false)}
            />

            <AnimatePresence mode="wait">
                {open && (
                    <motion.nav
                        className="relative overflow-hidden"
                        initial={{ height: 0 }}
                        animate={{ height: 'auto', transition: { duration: 1, ease } }}
                        exit={{ height: 0, transition: { duration: 1, ease } }}
                    >
                        <ul className="flex flex-wrap gap-x-8 gap-y-1 pb-10 pt-10 md:max-w-[85%] md:gap-x-12 md:pb-16">
                            {links.map((link, index) => (
                                <li key={link.href} className="overflow-hidden">
                                    <motion.a
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        onMouseEnter={() => setHovered(index)}
                                        onMouseLeave={() => setHovered(null)}
                                        className={cn(
                                            'block font-display text-3xl font-medium transition-[filter,opacity] duration-300 md:text-6xl',
                                            hovered !== null && hovered !== index && 'opacity-40 blur-[3px]'
                                        )}
                                        initial={{ y: '100%', opacity: 0 }}
                                        animate={{ y: 0, opacity: 1, transition: { duration: 1, ease, delay: 0.3 + index * 0.04 } }}
                                        exit={{ y: '100%', opacity: 0, transition: { duration: 0.7, ease, delay: index * 0.02 } }}
                                    >
                                        {link.label}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Navigation;
