import React, { useEffect, useRef } from 'react';
import { cn } from '../lib/cn';

/** Drifting star field that leans gently toward the cursor. */
const Particles = ({ className = '', quantity = 100, staticity = 50, ease = 50, maxDpr = 2 }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!quantity) return undefined;
        const canvas = canvasRef.current;
        const container = containerRef.current;
        const context = canvas.getContext('2d');
        const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
        const mouse = { x: 0, y: 0 };
        const size = { w: 0, h: 0 };
        let circles = [];
        let frame = 0;

        const make = () => ({
            x: Math.floor(Math.random() * size.w),
            y: Math.floor(Math.random() * size.h),
            translateX: 0,
            translateY: 0,
            size: Math.floor(Math.random() * 2) + 0.1,
            alpha: 0,
            targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
            dx: (Math.random() - 0.5) * 0.2,
            dy: (Math.random() - 0.5) * 0.2,
            magnetism: 0.1 + Math.random() * 4,
        });

        const resize = () => {
            size.w = container.offsetWidth;
            size.h = container.offsetHeight;
            canvas.width = size.w * dpr;
            canvas.height = size.h * dpr;
            canvas.style.width = `${size.w}px`;
            canvas.style.height = `${size.h}px`;
            context.setTransform(dpr, 0, 0, dpr, 0, 0);
            circles = Array.from({ length: quantity }, make);
        };

        const draw = (c) => {
            context.translate(c.translateX, c.translateY);
            context.beginPath();
            context.arc(c.x, c.y, c.size, 0, 2 * Math.PI);
            context.fillStyle = `rgba(255, 255, 255, ${c.alpha})`;
            context.fill();
            context.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const remap = (value, s1, e1, s2, e2) => Math.max(0, ((value - s1) * (e2 - s2)) / (e1 - s1) + s2);

        const animate = () => {
            context.clearRect(0, 0, size.w, size.h);
            circles.forEach((c, i) => {
                const edge = Math.min(
                    c.x + c.translateX - c.size,
                    size.w - c.x - c.translateX - c.size,
                    c.y + c.translateY - c.size,
                    size.h - c.y - c.translateY - c.size
                );
                const fade = remap(edge, 0, 20, 0, 1);
                if (fade > 1) c.alpha = Math.min(c.alpha + 0.02, c.targetAlpha);
                else c.alpha = c.targetAlpha * fade;
                c.x += c.dx;
                c.y += c.dy;
                c.translateX += (mouse.x / (staticity / c.magnetism) - c.translateX) / ease;
                c.translateY += (mouse.y / (staticity / c.magnetism) - c.translateY) / ease;
                if (c.x < -c.size || c.x > size.w + c.size || c.y < -c.size || c.y > size.h + c.size) {
                    circles[i] = make();
                }
                draw(c);
            });
            frame = requestAnimationFrame(animate);
        };

        const onMove = (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left - size.w / 2;
            const y = event.clientY - rect.top - size.h / 2;
            if (Math.abs(x) < size.w / 2 && Math.abs(y) < size.h / 2) {
                mouse.x = x;
                mouse.y = y;
            }
        };

        const onVisibility = () => {
            cancelAnimationFrame(frame);
            if (!document.hidden) animate();
        };

        resize();
        animate();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMove);
        document.addEventListener('visibilitychange', onVisibility);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [quantity, staticity, ease, maxDpr]);

    return (
        <div
            ref={containerRef}
            className={cn('bg-gradient-to-tl from-black via-zinc-600/20 to-black', className)}
            aria-hidden="true"
        >
            <canvas ref={canvasRef} />
        </div>
    );
};

export default Particles;
