import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import { keyDown, keyUp, unlockKeys } from '../../lib/keyclick';

const SOUNDING = new Set(['Backspace', 'Delete', 'Enter', 'Tab']);
const sounds = (e) => !e.metaKey && !e.ctrlKey && !e.altKey && (e.key.length === 1 || SOUNDING.has(e.key));
const heavy = (e) => e.key === ' ' || e.key === 'Enter';

const URL_RE = /(https?:\/\/[^\s]+)/g;
const LINK_CLASS =
    'underline decoration-dotted underline-offset-2 transition-colors hover:text-sky-300 hover:decoration-solid';

function TermLink({ href, children }) {
    const external = !href.startsWith('mailto:');
    return (
        <a href={href} className={LINK_CLASS} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            {children}
        </a>
    );
}

/** Text with every URL turned into a link. */
function Linkified({ text }) {
    return text.split(URL_RE).map((part, i) => (i % 2 === 1 ? <TermLink key={i} href={part}>{part}</TermLink> : part));
}

/** zsh-style prompt: visitor@yashwant:~/projects$ */
export function Prompt({ cwd }) {
    return (
        <span className="shrink-0">
            <span className="hidden font-semibold text-emerald-400 sm:inline">visitor@yashwant</span>
            <span className="hidden text-white/60 sm:inline">:</span>
            <span className="font-semibold text-sky-400">{cwd}</span>
            <span className="text-white/80">$&nbsp;</span>
        </span>
    );
}

const LINE_TONE = {
    accent: 'text-white font-semibold',
    system: 'text-white/50',
    error: 'text-red-400',
    response: 'text-white/90',
};

const SEG_TONE = {
    dir: 'text-sky-400 font-semibold',
    file: 'text-white/90',
    hidden: 'text-white/40',
    muted: 'text-white/40',
    key: 'text-emerald-400 font-semibold',
    art: 'text-emerald-400',
    path: 'text-fuchsia-400',
    match: 'text-yellow-300 font-semibold',
};

function Segments({ segments }) {
    return segments.map((s, i) => (
        <span key={i} className={SEG_TONE[s.tone] ?? ''}>
            {s.text}
        </span>
    ));
}

function Line({ line }) {
    if (line.type === 'command') {
        return (
            <div className="whitespace-pre-wrap break-words">
                <Prompt cwd={line.cwd ?? '~'} />
                <span className="text-white">{line.text}</span>
            </div>
        );
    }
    if (line.segments && line.grid) {
        return (
            <div className="flex flex-wrap gap-x-6 text-xs sm:text-sm">
                <Segments segments={line.segments} />
            </div>
        );
    }
    if (line.segments) {
        return (
            <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm">
                <Segments segments={line.segments} />
            </pre>
        );
    }
    if (line.columns) {
        return (
            <div className="flex text-xs sm:text-sm">
                <span className="inline-block w-36 shrink-0 text-emerald-400 sm:w-52">{line.columns[0]}</span>
                <span className="min-w-0 break-words text-white/70">
                    {line.href ? <TermLink href={line.href}>{line.columns[1]}</TermLink> : line.columns[1]}
                </span>
            </div>
        );
    }
    return (
        <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm">
            <Linkified text={line.text} />
        </pre>
    );
}

export const TerminalOutput = memo(
    forwardRef(function TerminalOutput({ history }, ref) {
        return (
            <div ref={ref} data-lenis-prevent className="flex-1 overflow-y-auto px-4 pb-2 pt-4 sm:px-5">
                {history.map((line, i) => (
                    <div key={i} className={`min-h-6 leading-6 ${LINE_TONE[line.type] ?? LINE_TONE.response}`}>
                        <Line line={line} />
                    </div>
                ))}
            </div>
        );
    })
);

export const TerminalInput = memo(
    forwardRef(function TerminalInput({ cwd, onSubmit, onKeyDown }, ref) {
        const inputRef = useRef(null);

        useImperativeHandle(ref, () => ({
            getValue: () => inputRef.current?.value ?? '',
            setValue: (v) => {
                if (inputRef.current) inputRef.current.value = v;
            },
            focus: () => inputRef.current?.focus(),
        }));

        return (
            <div className="flex shrink-0 items-center px-4 pb-3 pt-1 text-white sm:px-5">
                <Prompt cwd={cwd} />
                <input
                    ref={inputRef}
                    type="text"
                    aria-label="Terminal command"
                    defaultValue=""
                    onKeyDown={(e) => {
                        unlockKeys();
                        if (sounds(e) && !e.repeat) keyDown(heavy(e));
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            onSubmit(inputRef.current?.value ?? '');
                        } else {
                            onKeyDown(e, inputRef.current?.value ?? '');
                        }
                    }}
                    onKeyUp={(e) => sounds(e) && keyUp(heavy(e))}
                    className="min-w-0 flex-1 bg-transparent font-mono text-sm text-white caret-emerald-400 outline-none"
                    autoFocus
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                />
            </div>
        );
    })
);
