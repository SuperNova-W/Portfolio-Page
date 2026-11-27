import React from 'react';

/** Three slow-drifting colour washes, ported from anhdtran-portfolio (MIT). */
const blobs = [
    { size: 'h-[300px] w-[300px] sm:h-[600px] sm:w-[600px]', color: '#f2555f', pos: { top: '-10%', left: '-10%' }, delay: '' },
    { size: 'h-[250px] w-[250px] sm:h-[500px] sm:w-[500px]', color: '#5b91f0', pos: { top: '40%', right: '-5%' }, delay: 'animate-blob-delay-2' },
    { size: 'h-[200px] w-[200px] sm:h-[400px] sm:w-[400px]', color: '#3fb972', pos: { bottom: '-5%', left: '30%' }, delay: 'animate-blob-delay-4' },
];

const GradientBlobs = () => (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {blobs.map((b) => (
            <div
                key={b.color}
                className={`animate-blob absolute rounded-full opacity-[0.12] ${b.size} ${b.delay}`}
                style={{ background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`, ...b.pos }}
            />
        ))}
    </div>
);

export default GradientBlobs;
