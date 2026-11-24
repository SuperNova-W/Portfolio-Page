import React from 'react';
import Section from './Section';
import { Reveal } from './Reveal';
import { Card, DateTag } from './ui';

const education = [
    {
        school: 'University of Maryland',
        degree: 'B.S. Computer Science (Honors) & Applied Mathematics',
        duration: 'Expected Spring 2028',
        location: 'College Park, MD',
        points: [
            'GPA: 3.92',
            'Coursework: Data Structures & Algorithms, Operating Systems (C/Assembly), Programming Theory (Rust/OCaml)',
        ],
    },
];

const EducationSection = () => {
    return (
        <Section id="education" title="Education" keyboard="aside">
            <div className="mx-auto w-full max-w-4xl px-4 md:px-8">
                {education.map((edu, index) => (
                    <Reveal key={`${edu.school}-${edu.duration}`} delay={index * 0.1}>
                        <Card className="p-6 md:p-8">
                            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                                <div className="space-y-1">
                                    <h3 className="font-display text-lg font-bold tracking-tight md:text-xl">{edu.degree}</h3>
                                    <p className="text-base font-medium text-muted-foreground">{`${edu.school} — ${edu.location}`}</p>
                                </div>
                                <DateTag>{edu.duration}</DateTag>
                            </div>
                            <ul className="ml-4 mt-6 list-outside list-disc space-y-2 text-base leading-relaxed text-muted-foreground">
                                {edu.points.map((point) => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ul>
                        </Card>
                    </Reveal>
                ))}
            </div>
        </Section>
    );
};

export default EducationSection;
