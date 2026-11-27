import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { FiArrowUpRight } from 'react-icons/fi';
import Section from './Section';
import { Reveal } from './Reveal';
import { Card } from './ui';

// eslint-disable-next-line react-refresh/only-export-components
export const contacts = [
    { label: 'Email', text: 'yash.ponnaganti@gmail.com', href: 'mailto:yash.ponnaganti@gmail.com' },
    {
        label: 'LinkedIn',
        text: 'linkedin.com/in/yashwant-ponnaganti',
        href: 'https://www.linkedin.com/in/yashwant-ponnaganti/',
    },
    { label: 'GitHub', text: 'github.com/SuperNova-W', href: 'https://github.com/SuperNova-W' },
];

const icons = { Email: HiOutlineMail, LinkedIn: FaLinkedin, GitHub: FaGithub };

const ContactSection = () => {
    return (
        <Section id="contact" title="Contact" keyboard="contact" className="min-h-screen">
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 px-4 md:grid-cols-2">
                <Reveal>
                    <Card className="p-6 md:p-8">
                        <ul className="flex flex-col divide-y divide-border">
                            {contacts.map((contact) => {
                                const Icon = icons[contact.label];
                                return (
                                    <li key={contact.label}>
                                        <a
                                            className="group/row flex items-center gap-4 py-5"
                                            href={contact.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-input bg-background/40">
                                                <Icon size={20} />
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span className="block text-sm text-muted-foreground">
                                                    {contact.label}
                                                </span>
                                                <span className="block break-words text-base text-foreground md:text-lg">
                                                    {contact.text}
                                                </span>
                                            </span>
                                            <FiArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5 group-hover/row:text-foreground" />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </Card>
                </Reveal>
            </div>
        </Section>
    );
};

export default ContactSection;
