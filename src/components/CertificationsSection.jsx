import React from 'react';
import { FaAws, FaAward, FaCertificate, FaTrophy } from 'react-icons/fa';
import '../css/certifications.css';

const certifications = [
    {
        title: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        type: 'Certification',
        Icon: FaAws,
    },
    {
        title: 'AWS Certified Developer - Associate',
        issuer: 'Amazon Web Services',
        type: 'Certification',
        Icon: FaAws,
    },
    {
        title: 'AI/ML Certificate',
        issuer: 'Artificial Intelligence & Machine Learning',
        type: 'Certificate',
        Icon: FaCertificate,
    },
    {
        title: '2x Hackathon Winner',
        issuer: 'Competitive software build events',
        type: 'Award',
        Icon: FaTrophy,
    },
    {
        title: 'Presidential Scholarship Recipient',
        issuer: 'University of Maryland, College Park',
        type: 'Academic Award',
        Icon: FaAward,
    },
    {
        title: "Dean's List - All Semesters",
        issuer: 'University of Maryland, College Park',
        type: 'Academic Award',
        Icon: FaAward,
    },
    {
        title: 'FIRE Honors Program',
        issuer: 'University of Maryland, College Park',
        type: 'Honors Program',
        Icon: FaCertificate,
    },
];

const CertificationsSection = () => {
    return (
        <section className="certifications-section" id="certifications">
            <h2 className="section-title">Certifications & Awards</h2>
            <div className="certifications-grid">
                {certifications.map((certification) => {
                    const CertificationIcon = certification.Icon;

                    return (
                        <article className="certification-card" key={certification.title}>
                            <div className="certification-icon" aria-hidden="true">
                                <CertificationIcon size={24} />
                            </div>
                            <div className="certification-content">
                                <span className="certification-type">{certification.type}</span>
                                <h3>{certification.title}</h3>
                                <p>{certification.issuer}</p>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default CertificationsSection;
