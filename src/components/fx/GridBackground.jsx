import React, { useEffect, useRef } from 'react';

/**
 * Cell-grid background with a refresh bar sweeping across it, ported from the
 * "instrument matrix" in anhdtran-portfolio (MIT). One fullscreen triangle;
 * the grid is computed per pixel in the fragment shader, so it costs one draw
 * call no matter how many cells are on screen.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2  uRes;
uniform float uCell;
uniform float uTime;
uniform vec3  uInk;
uniform float uAmp;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  vec2 cell  = floor(gl_FragCoord.xy / uCell);
  vec2 local = fract(gl_FragCoord.xy / uCell);

  // Gutter on every side so the field reads as discrete plates.
  float inset =
      step(0.10, local.x) * step(local.x, 0.90) *
      step(0.10, local.y) * step(local.y, 0.90);

  vec2 grid = max(floor(uRes / uCell), vec2(1.0));

  // A refresh bar crossing the field, leaving a decaying trail.
  float sweep = fract(uTime * 0.05 - cell.x / grid.x);
  float band  = smoothstep(0.00, 0.04, sweep) * smoothstep(0.34, 0.06, sweep);
  float idle  = band * step(0.62, hash(cell));

  // Premultiplied output: some GPUs (Apple/Metal) composite a
  // non-premultiplied canvas as solid white.
  float a = clamp(idle * 0.55 * uAmp * inset, 0.0, 1.0);
  gl_FragColor = vec4(uInk * a, a);
}
`;

const CELL_DESKTOP = 13;
const CELL_MOBILE = 8;

// Same grey ink as the original (#83868f).
const INK = [0.514, 0.525, 0.561];

function compile(gl, type, src) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    return shader;
}

const GridBackground = ({ amp = 1 }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;
        const gl = canvas.getContext('webgl', {
            alpha: true,
            antialias: false,
            depth: false,
            stencil: false,
            premultipliedAlpha: true,
            powerPreference: 'low-power',
        });
        if (!gl || gl.isContextLost()) {
            canvas.style.visibility = 'hidden';
            return undefined;
        }
        canvas.style.visibility = '';

        const vs = compile(gl, gl.VERTEX_SHADER, VERT);
        const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
        const program = gl.createProgram();
        if (!vs || !fs || !program) return undefined;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return undefined;
        gl.useProgram(program);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const aPos = gl.getAttribLocation(program, 'aPos');
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        const u = {
            res: gl.getUniformLocation(program, 'uRes'),
            cell: gl.getUniformLocation(program, 'uCell'),
            time: gl.getUniformLocation(program, 'uTime'),
            ink: gl.getUniformLocation(program, 'uInk'),
            amp: gl.getUniformLocation(program, 'uAmp'),
        };
        gl.uniform3fv(u.ink, INK);
        gl.uniform1f(u.amp, amp);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.clearColor(0, 0, 0, 0);

        const resize = () => {
            // Measure the canvas box (pinned to 100lvh), not innerHeight, so a
            // collapsing mobile URL bar doesn't reallocate the buffer mid-scroll.
            const cssW = canvas.clientWidth;
            const cssH = canvas.clientHeight;
            if (!cssW || !cssH) return;
            const dpr = Math.min(window.devicePixelRatio || 1, cssW < 768 ? 1 : 1.5);
            const w = Math.floor(cssW * dpr);
            const h = Math.floor(cssH * dpr);
            if (canvas.width === w && canvas.height === h) return;
            canvas.width = w;
            canvas.height = h;
            gl.viewport(0, 0, w, h);
            gl.uniform2f(u.res, w, h);
            gl.uniform1f(u.cell, (cssW < 640 ? CELL_MOBILE : CELL_DESKTOP) * dpr);
        };
        resize();
        const sizeObserver = new ResizeObserver(resize);
        sizeObserver.observe(canvas);

        const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
        const t0 = performance.now();
        let frame = 0;
        const draw = (now) => {
            gl.uniform1f(u.time, (now - t0) / 1000);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        };
        const loop = (now) => {
            // Stop drawing while the tab is hidden.
            if (!document.hidden) draw(now);
            frame = requestAnimationFrame(loop);
        };
        if (reduced) draw(t0 + 4000);
        else frame = requestAnimationFrame(loop);

        const onLost = (e) => {
            e.preventDefault();
            cancelAnimationFrame(frame);
            canvas.style.visibility = 'hidden';
        };
        canvas.addEventListener('webglcontextlost', onLost);

        return () => {
            cancelAnimationFrame(frame);
            sizeObserver.disconnect();
            canvas.removeEventListener('webglcontextlost', onLost);
            gl.deleteBuffer(buffer);
            gl.deleteProgram(program);
            gl.deleteShader(vs);
            gl.deleteShader(fs);
            // Don't call WEBGL_lose_context here: React's dev double-mount
            // reuses this same canvas, and getContext() would hand back the
            // dead context (which paints the page white).
        };
    }, [amp]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="grid-canvas pointer-events-none fixed inset-x-0 top-0 -z-10 w-full"
        />
    );
};

export default GridBackground;
