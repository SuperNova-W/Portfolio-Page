import React, { useCallback, useEffect, useRef, useState } from 'react';
import { loadKeys, typeBurst } from '../../lib/keyclick';

const BOOT_LINES = [
    { text: 'BIOS v2.4.1 ... OK', delay: 120 },
    { text: 'Memory check: 16384 MB ... OK', delay: 200 },
    { text: 'Loading kernel ........................ done', delay: 350 },
    { text: 'Mounting /dev/portfolio ... OK', delay: 180 },
    { text: 'Initializing network interfaces ... OK', delay: 220 },
    { text: 'Loading user profile: visitor@yashwant ... OK', delay: 280 },
    { text: 'Starting terminal session ...', delay: 400 },
    { text: 'Go Terps!', delay: 85 },
];

/** Boot-sequence splash before the terminal opens. Click or press Enter/Esc/Space to skip. */
export default function TerminalIntro({ onComplete }) {
    const [fading, setFading] = useState(false);
    const [visibleLines, setVisibleLines] = useState(0);
    const timers = useRef([]);
    const finished = useRef(false);
    const silence = useRef(() => {});

    const finish = useCallback(() => {
        if (finished.current) return;
        finished.current = true;
        timers.current.forEach(clearTimeout);
        timers.current = [];
        silence.current();
        setFading(true);
        timers.current.push(setTimeout(onComplete, 500));
    }, [onComplete]);

    useEffect(() => {
        let elapsed = 0;
        BOOT_LINES.forEach((line, i) => {
            elapsed += line.delay;
            timers.current.push(setTimeout(() => setVisibleLines(i + 1), elapsed));
        });
        // Mechanical typing under the boot lines (the audio context was unlocked
        // by the click, keypress or drag that opened the terminal).
        let cancelled = false;
        loadKeys().then(() => {
            if (!cancelled && !finished.current) silence.current = typeBurst(0.04, elapsed / 1000);
        });
        timers.current.push(setTimeout(finish, elapsed + 600));
        const onKey = (e) => {
            if (e.key === 'Enter' || e.key === ' ') finish();
        };
        document.addEventListener('keydown', onKey);
        const pending = timers.current;
        return () => {
            cancelled = true;
            pending.forEach(clearTimeout);
            silence.current();
            document.removeEventListener('keydown', onKey);
        };
    }, [finish]);

    const progress = (visibleLines / BOOT_LINES.length) * 100;

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={finish}
            className={`fixed inset-0 z-10 flex cursor-pointer select-none flex-col bg-[#0a0a0b] outline-none transition-opacity duration-500 ${
                fading ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
        >
            <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 sm:px-12">
                <div className="space-y-1.5 font-mono text-xs sm:text-sm">
                    {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                        <div key={i} className="text-white duration-300 animate-in fade-in">
                            <span className="mr-2 text-white/30">[{String(i).padStart(2, '0')}]</span>
                            {line.text}
                        </div>
                    ))}
                    {visibleLines > 0 && visibleLines < BOOT_LINES.length && (
                        <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-white/70" />
                    )}
                </div>
            </div>

            <div className="px-6 pb-8 sm:px-12">
                <div className="mx-auto h-1 w-full max-w-2xl overflow-hidden rounded-full bg-white/10">
                    <div
                        className="h-full rounded-full bg-white/70 transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="mt-3 text-center text-[10px] uppercase tracking-[0.3em] text-white/50">
                    Click anywhere to skip
                </p>
            </div>
        </div>
    );
}
