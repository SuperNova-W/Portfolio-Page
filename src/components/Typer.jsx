import React, { useContext, useEffect, useRef, useState } from 'react';
import { RevealContext } from './RevealContext';

/**
 * Types text out one character at a time once its section is in view. The most
 * recently typed characters are held at low opacity (.temp) so the leading edge
 * fades in as it lands.
 *
 * Per-character speed is capped so long strings never outstay their welcome:
 * a 400 character bullet finishes in the same maxDuration as a short heading.
 *
 * With reserveSpace the element is sized to its finished text up front, so the
 * page never reflows while typing. The hero opts out to let its cursor trail
 * the text as it grows.
 */
const Typer = ({
    text,
    speed = 14,
    maxDuration = 700,
    delay = 0,
    tempLength = 2,
    reserveSpace = true,
    onDone,
}) => {
    const active = useContext(RevealContext);
    const [count, setCount] = useState(0);
    const doneRef = useRef(false);

    useEffect(() => {
        if (!active) return undefined;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setCount(text.length);
            if (onDone) onDone();
            return undefined;
        }

        const perChar = Math.max(1, Math.min(speed, maxDuration / Math.max(text.length, 1)));
        const total = perChar * text.length;

        let frame;
        let start;

        const step = (now) => {
            if (start === undefined) start = now;

            const elapsed = now - start - delay;

            if (elapsed >= 0) {
                setCount(Math.min(text.length, Math.round(elapsed / perChar)));
            }

            if (elapsed < total) {
                frame = requestAnimationFrame(step);
            } else if (!doneRef.current) {
                doneRef.current = true;
                if (onDone) onDone();
            }
        };

        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, text, speed, maxDuration, delay]);

    // Once every character has landed there is no leading edge left to fade,
    // so the whole string goes solid rather than stranding the last few
    // characters at .temp opacity.
    const complete = count >= text.length;
    const split = complete ? text.length : Math.max(0, count - tempLength);
    const solid = text.slice(0, split);
    const temp = text.slice(split, count);

    const live = (
        <span className="typer-live" aria-hidden="true">
            {solid}
            <span className="temp">{temp}</span>
        </span>
    );

    return (
        <span className={`typer${reserveSpace ? ' reserved' : ''}`}>
            {reserveSpace && (
                <span className="typer-ghost" aria-hidden="true">
                    {text}
                </span>
            )}
            {live}
            <span className="sr-only">{text}</span>
        </span>
    );
};

export default Typer;
