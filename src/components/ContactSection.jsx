import React from 'react';
import Section from './Section';
import Typer from './Typer';

const contacts = [
    { label: 'Email', text: 'yash.ponnaganti@gmail.com', href: 'mailto:yash.ponnaganti@gmail.com' },
    {
        label: 'LinkedIn',
        text: 'linkedin.com/in/yashwant-ponnaganti',
        href: 'https://www.linkedin.com/in/yashwant-ponnaganti/',
    },
    { label: 'GitHub', text: 'github.com/SuperNova-W', href: 'https://github.com/SuperNova-W' },
];

const ContactSection = () => {
    return (
        <Section id="contact" title="Contact">
            <ul className="contact-list">
                {contacts.map((contact, index) => (
                    <li key={contact.label}>
                        <span className="label">
                            <Typer text={contact.label} delay={120 + index * 80} />
                        </span>
                        <a className="link" href={contact.href} target="_blank" rel="noopener noreferrer">
                            <span className="title">
                                <Typer text={contact.text} delay={160 + index * 80} />
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </Section>
    );
};

export default ContactSection;
