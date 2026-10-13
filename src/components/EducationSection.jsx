import React from 'react';
import Section from './Section';
import Typer from './Typer';

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
        <Section id="education" title="Education">
            {education.map((edu, index) => {
                const base = 120 + index * 90;
                const tail = base + 140 + edu.points.length * 70;

                return (
                    <div className="entry" key={`${edu.school}-${edu.duration}`}>
                        <div className="entry-head">
                            <div>
                                <div className="entry-role">
                                    <Typer text={edu.degree} delay={base} />
                                </div>
                                <div className="entry-org">
                                    <Typer text={`${edu.school} — ${edu.location}`} delay={base + 60} />
                                </div>
                            </div>
                            <div className="entry-date">
                                <Typer text={edu.duration} delay={base + 100} />
                            </div>
                        </div>
                        <ul>
                            {edu.points.map((point, pointIndex) => (
                                <li key={point}>
                                    <Typer text={point} delay={base + 140 + pointIndex * 70} />
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </Section>
    );
};

export default EducationSection;
