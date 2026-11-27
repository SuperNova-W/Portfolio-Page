import React from 'react';
import Section from './Section';
import { Reveal } from './Reveal';
import { Card, DateTag } from './ui';

// eslint-disable-next-line react-refresh/only-export-components
export const education = [
    {
        school: 'University of Maryland',
        degree: 'B.S. Computer Science (Honors) & Applied Mathematics',
        duration: 'Expected Spring 2028',
        location: 'College Park, MD',
        stats: [
            { value: '3.92', label: 'GPA' },
            { value: 'Every semester', label: "Dean's List" },
            { value: 'Presidential', label: 'Scholarship' },
            { value: 'CS Honors · FIRE', label: 'Honors programs' },
        ],
        coursework: [
            {
                group: 'Computer Science',
                items: [
                    'Data Structures & Algorithms',
                    'Algorithms',
                    'Object-Oriented Programming II',
                    'Introduction to Computer Systems (C/Assembly)',
                    'Organization of Programming Languages (Rust/OCaml)',
                    'Computer Networks',
                    'Discrete Structures',
                    'Computer Science Honors Seminar',
                ],
            },
            {
                group: 'Data & Machine Learning',
                items: ['Introduction to Machine Learning', 'Introduction to Data Science'],
            },
            {
                group: 'Mathematics',
                items: [
                    'Introduction to Linear Algebra',
                    'Applications of Linear Algebra',
                    'Calculus III',
                    'Advanced Calculus I',
                    'Introduction to Probability Theory',
                ],
            },
        ],
    },
];

const Stat = ({ value, label }) => (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors group-hover:border-white/15">
        <p className="font-display text-base font-bold leading-tight text-foreground md:text-lg">{value}</p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
    </div>
);

const CourseGroup = ({ group, items }) => (
    <div className="grid gap-3 md:grid-cols-[12rem_1fr] md:gap-6">
        <h4 className="pt-1 font-sans text-sm font-medium text-foreground/90">{group}</h4>
        <ul className="flex flex-wrap gap-2">
            {items.map((course) => (
                <li
                    key={course}
                    className="rounded-md bg-secondary/40 px-2.5 py-1 text-xs text-muted-foreground transition-colors group-hover:text-foreground/85"
                >
                    {course}
                </li>
            ))}
        </ul>
    </div>
);

const EducationSection = () => {
    return (
        <Section id="education" title="Education" keyboard="aside">
            <div className="mx-auto w-full max-w-4xl px-4 md:px-8">
                {education.map((edu, index) => (
                    <Reveal key={`${edu.school}-${edu.duration}`} delay={index * 0.1}>
                        <Card className="p-6 md:p-10">
                            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                                <div className="space-y-2">
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                        {edu.school} · {edu.location}
                                    </p>
                                    <h3 className="font-display text-xl font-bold leading-snug tracking-tight md:text-2xl">
                                        {edu.degree}
                                    </h3>
                                </div>
                                <DateTag>{edu.duration}</DateTag>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
                                {edu.stats.map((stat) => (
                                    <Stat key={stat.label} {...stat} />
                                ))}
                            </div>

                            <div className="mt-10 border-t border-white/10 pt-8">
                                <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Relevant coursework</h4>
                                <div className="mt-6 space-y-6">
                                    {edu.coursework.map((g) => (
                                        <CourseGroup key={g.group} {...g} />
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </Reveal>
                ))}
            </div>
        </Section>
    );
};

export default EducationSection;
