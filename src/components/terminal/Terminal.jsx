import React, { memo, useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { useTerminal } from './useTerminal';
import { TerminalInput, TerminalOutput } from './TerminalIO';

function readClock(now, tz) {
    const date = now.toLocaleDateString('en-US', { timeZone: tz, weekday: 'short', month: 'short', day: 'numeric' });
    const clock = now.toLocaleTimeString('en-US', {
        timeZone: tz,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });
    const off =
        new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'longOffset' })
            .formatToParts(now)
            .find((p) => p.type === 'timeZoneName')?.value ?? 'GMT';
    const utc = off === 'GMT' ? 'UTC+00:00' : off.replace('GMT', 'UTC').replace('-', '−');
    return `${date}, ${clock} · ${utc}`;
}

const Clock = memo(function Clock() {
    const [time, setTime] = useState(() => readClock(new Date(), 'America/New_York'));
    useEffect(() => {
        const id = setInterval(() => setTime(readClock(new Date(), 'America/New_York')), 1000);
        return () => clearInterval(id);
    }, []);
    return (
        <div className="mb-3 select-none text-center font-mono text-[10px] tracking-widest text-white/50 sm:text-[11px]">
            <p>College Park, MD — {time}</p>
        </div>
    );
});

// Only visible if someone minimizes the window.
const BEHIND = [
    { text: '// behind the window', className: 'text-white/30' },
    { text: 'nobody ever looks back here.' },
    { text: 'since you did: try `ls -a` back in there.' },
];

function BehindTheWindow({ shown }) {
    return (
        <div
            aria-hidden={!shown}
            className="pointer-events-none absolute inset-0 flex select-none flex-col items-center justify-center gap-2 px-6 pb-16 text-center font-mono text-xs text-white/55 sm:text-sm"
        >
            {BEHIND.map((line, i) => (
                <p
                    key={i}
                    style={{ transitionDelay: shown ? `${250 + i * 450}ms` : '0ms' }}
                    className={`transition-[opacity,transform] duration-500 motion-reduce:transition-none ${
                        shown ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
                    } ${line.className ?? ''}`}
                >
                    {line.text}
                </p>
            ))}
        </div>
    );
}

const LIGHT =
    'flex h-3 w-3 cursor-pointer items-center justify-center rounded-full text-black/70 transition-all hover:brightness-110';
const GLYPH = 'hidden group-hover/lights:block group-focus-within/lights:block';

/** macOS-style terminal window, ported from anhdtran-portfolio (MIT). */
export default function Terminal({ onExit }) {
    const { history, cwd, handleSubmit, handleKeyDown, inputRef, outputRef } = useTerminal(onExit);
    const [maximized, setMaximized] = useState(false);
    const [minimized, setMinimized] = useState(false);

    const toggleMaximize = () => {
        setMaximized((m) => !m);
        inputRef.current?.focus();
    };

    // Commit the restore synchronously so focus lands inside the same gesture
    // (iOS only raises the keyboard for a focus within the user's tap).
    const restore = useCallback(
        (typed = '') => {
            flushSync(() => setMinimized(false));
            const input = inputRef.current;
            if (!input) return;
            if (typed.trim()) input.setValue(input.getValue() + typed);
            input.focus();
        },
        [inputRef]
    );

    // While minimized, any non-modifier key brings the window back and the
    // keystroke carries over into the prompt.
    useEffect(() => {
        if (!minimized) return undefined;
        const onKey = (e) => {
            if (e.key === 'Escape') return onExit();
            if (e.metaKey || e.ctrlKey || e.altKey) return undefined;
            if (e.key !== 'Enter' && e.key.length > 1) return undefined;
            e.preventDefault();
            restore(e.key.length === 1 ? e.key : '');
            return undefined;
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [minimized, onExit, restore]);

    return (
        <div
            className={`fixed inset-0 flex flex-col items-center justify-center transition-[padding] duration-300 ${
                maximized ? 'p-2 sm:p-3' : 'p-4 sm:p-8'
            }`}
            onClick={() => !minimized && inputRef.current?.focus()}
        >
            <BehindTheWindow shown={minimized} />

            {!maximized && <Clock />}

            <div
                inert={minimized}
                aria-hidden={minimized}
                className={`relative flex w-full origin-bottom flex-col overflow-hidden rounded-xl border border-white/[0.08] shadow-2xl shadow-black/60 transition-[max-width,height,transform,opacity] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none ${
                    maximized ? 'h-full max-w-full' : 'h-[75vh] max-w-3xl sm:h-[min(75vh,600px)]'
                } ${minimized ? 'pointer-events-none translate-y-[45vh] scale-[0.08] opacity-0' : ''}`}
            >
                <div
                    className="flex h-11 shrink-0 select-none items-center bg-[#2a2a2c] px-4"
                    onDoubleClick={toggleMaximize}
                >
                    <div className="group/lights flex items-center gap-2">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onExit();
                            }}
                            className={`${LIGHT} bg-[#ff5f57]`}
                            aria-label="Close"
                            title="Close"
                        >
                            <span className={`${GLYPH} text-[8px] font-bold leading-none`}>&#x2715;</span>
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setMinimized(true);
                            }}
                            className={`${LIGHT} bg-[#febc2e]`}
                            aria-label="Minimize"
                            title="Minimize"
                        >
                            <svg viewBox="0 0 12 12" className={`${GLYPH} h-2 w-2`} aria-hidden>
                                <path d="M2 6h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleMaximize();
                            }}
                            className={`${LIGHT} bg-[#28c840]`}
                            aria-label={maximized ? 'Exit full screen' : 'Enter full screen'}
                            aria-pressed={maximized}
                            title={maximized ? 'Exit full screen' : 'Enter full screen'}
                        >
                            <svg viewBox="0 0 12 12" className={`${GLYPH} h-2 w-2`} aria-hidden>
                                {maximized ? (
                                    <path d="M5.5 1.5v4h-4zM6.5 10.5v-4h4z" fill="currentColor" />
                                ) : (
                                    <path d="M1.5 6.5v-5h5zM10.5 5.5v5h-5z" fill="currentColor" />
                                )}
                            </svg>
                        </button>
                    </div>
                    <span className="flex-1 text-center font-mono text-xs tracking-wide text-white/60">
                        visitor@yashwant — zsh
                    </span>
                    <div className="w-[52px]" />
                </div>

                <div className="flex min-h-0 flex-1 flex-col bg-[#1a1a1d] font-mono text-sm text-white">
                    <TerminalOutput ref={outputRef} history={history} />
                    <TerminalInput ref={inputRef} cwd={cwd} onSubmit={handleSubmit} onKeyDown={handleKeyDown} />
                </div>
            </div>

            {!maximized && (
                <p
                    className={`mt-4 select-none font-mono text-[10px] text-white/50 transition-opacity duration-300 sm:text-xs ${
                        minimized ? 'opacity-0' : ''
                    }`}
                >
                    &copy; {new Date().getFullYear()} Yashwant Ponnaganti
                </p>
            )}

            {/* Dock chip: where the window goes when minimized. */}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    restore();
                }}
                tabIndex={minimized ? 0 : -1}
                aria-hidden={!minimized}
                aria-label="Restore terminal"
                className={`fixed bottom-6 left-1/2 flex -translate-x-1/2 cursor-pointer items-center gap-2.5 rounded-xl border border-white/10 bg-[#2a2a2c]/80 py-2 pl-2 pr-3.5 font-mono text-xs text-white/70 shadow-lg shadow-black/20 backdrop-blur-md transition-[opacity,transform,color] duration-300 hover:text-white motion-reduce:transition-none ${
                    minimized ? 'translate-y-0 opacity-100 delay-150' : 'pointer-events-none translate-y-4 opacity-0'
                }`}
            >
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1a1a1d] text-[11px] leading-none text-[#28c840]">
                    &gt;_
                </span>
                <span className="whitespace-nowrap">
                    zsh — <span className="[@media(pointer:coarse)]:hidden">click or type</span>
                    <span className="hidden [@media(pointer:coarse)]:inline">tap</span> to restore
                </span>
            </button>
        </div>
    );
}
