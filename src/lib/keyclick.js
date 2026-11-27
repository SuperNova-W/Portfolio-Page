/**
 * Mechanical-keyboard sounds for the terminal, built from the same keycap
 * samples the 3D keyboard uses. Every stroke is varied a little (pitch,
 * level, timing) so it reads as a person typing, not a loop.
 */

const SAMPLES = { press: '/assets/keycap-sounds/press.mp3', release: '/assets/keycap-sounds/release.mp3' };
const STORAGE_KEY = 'terminal-sound';

let ctx = null;
let out = null;
let buffers = null;
let loading = null;

const rand = (lo, hi) => lo + Math.random() * (hi - lo);

export function isMuted() {
    try {
        return localStorage.getItem(STORAGE_KEY) === 'off';
    } catch {
        return false;
    }
}

export function setMuted(muted) {
    try {
        localStorage.setItem(STORAGE_KEY, muted ? 'off' : 'on');
    } catch {
        // storage can be unavailable (private mode); sound just won't persist
    }
}

function ensureContext() {
    if (ctx || typeof window === 'undefined') return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    // A gentle low-pass and a touch of compression: warmer, rounder, and no
    // harsh peaks when strokes overlap.
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 7200;
    lowpass.Q.value = 0.4;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.ratio.value = 3;
    out = ctx.createGain();
    out.gain.value = 0.9;
    lowpass.connect(comp).connect(out).connect(ctx.destination);
    out.input = lowpass;
    return ctx;
}

/** Start fetching and decoding the samples. Safe to call repeatedly. */
export function loadKeys() {
    if (loading) return loading;
    const c = ensureContext();
    if (!c) return Promise.resolve(null);
    loading = Promise.all(
        Object.entries(SAMPLES).map(async ([name, url]) => {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`keyclick: HTTP ${res.status}`);
            return [name, await c.decodeAudioData(await res.arrayBuffer())];
        })
    )
        .then((pairs) => {
            buffers = Object.fromEntries(pairs);
            return buffers;
        })
        .catch(() => {
            loading = null;
            return null;
        });
    return loading;
}

/** Call from inside a click/tap/keypress: browsers only allow audio after one. */
export function unlockKeys() {
    const c = ensureContext();
    if (c && c.state === 'suspended') c.resume().catch(() => {});
    loadKeys();
}

function play(kind, when, { rate = 1, gain = 0.4 } = {}) {
    if (!ctx || !buffers?.[kind] || isMuted()) return null;
    const src = ctx.createBufferSource();
    const g = ctx.createGain();
    src.buffer = buffers[kind];
    src.playbackRate.value = rate;
    g.gain.value = gain;
    src.connect(g).connect(out.input);
    src.onended = () => {
        src.disconnect();
        g.disconnect();
    };
    src.start(when);
    return src;
}

/** One keystroke: press now, release a beat later. `heavy` for space/enter. */
export function keyDown(heavy = false) {
    if (!ctx || ctx.state !== 'running') return;
    const t = ctx.currentTime;
    play('press', t, heavy ? { rate: rand(0.78, 0.84), gain: rand(0.5, 0.58) } : { rate: rand(0.94, 1.08), gain: rand(0.32, 0.42) });
}

export function keyUp(heavy = false) {
    if (!ctx || ctx.state !== 'running') return;
    play('release', ctx.currentTime, heavy ? { rate: rand(0.8, 0.86), gain: 0.3 } : { rate: rand(0.95, 1.08), gain: rand(0.18, 0.26) });
}

/**
 * Schedule a run of typing between `from` and `to` seconds from now, at a
 * human pace: uneven gaps, a space every few keys, the odd hesitation.
 * Returns a function that silences anything not yet played.
 */
export function typeBurst(from, to) {
    if (!ctx || !buffers || isMuted()) return () => {};
    const sources = [];
    const t0 = ctx.currentTime;
    let t = t0 + from;
    let sinceSpace = 0;
    while (t < t0 + to) {
        const space = sinceSpace > 2 && Math.random() < 0.28;
        sinceSpace = space ? 0 : sinceSpace + 1;
        const press = space ? { rate: rand(0.78, 0.84), gain: rand(0.48, 0.56) } : { rate: rand(0.93, 1.1), gain: rand(0.28, 0.42) };
        sources.push(play('press', t, press));
        sources.push(play('release', t + rand(0.035, 0.07), { rate: press.rate * rand(0.98, 1.03), gain: press.gain * 0.55 }));
        t += Math.random() < 0.08 ? rand(0.16, 0.26) : rand(0.055, 0.11);
    }
    return () =>
        sources.forEach((s) => {
            try {
                s?.stop();
            } catch {
                // already finished
            }
        });
}
