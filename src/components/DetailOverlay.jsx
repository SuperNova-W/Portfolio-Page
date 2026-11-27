import React, { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiX } from 'react-icons/fi';
import { experiences, shortCompany } from './ExperienceSection';
import { projects } from './ProjectsSection';
import { DateTag, PillLink, TechList } from './ui';

const KINDS = {
    experience: { list: experiences, label: 'Experience', section: 'experience' },
    projects: { list: projects, label: 'Project', section: 'projects' },
};

/** Which detail (if any) the current URL points at: /experience/:slug or /projects/:slug. */
// eslint-disable-next-line react-refresh/only-export-components
export function useDetailMatch() {
    const { pathname } = useLocation();
    const m = matchPath('/:kind/:slug', pathname);
    const kind = m && KINDS[m.params.kind] ? m.params.kind : null;
    if (!kind) return null;
    const { list } = KINDS[kind];
    const index = list.findIndex((item) => item.slug === m.params.slug);
    return index === -1 ? null : { kind, index, item: list[index], list };
}

function ExperienceBody({ item }) {
    return (
        <>
            <p className="text-base font-medium text-muted-foreground md:text-lg">{item.company}</p>
            <div className="mt-3">
                <DateTag>{item.duration}</DateTag>
            </div>
            <p className="mt-8 text-lg leading-relaxed text-foreground/90">{item.summary}</p>
            <h3 className="mt-10 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">Highlights</h3>
            <ul className="ml-4 mt-4 list-outside list-disc space-y-3 text-base leading-relaxed text-muted-foreground">
                {item.points.map((point) => (
                    <li key={point}>{point}</li>
                ))}
            </ul>
            <h3 className="mt-10 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">Stack</h3>
            <TechList items={item.technologies} className="mt-4" />
            {item.link && (
                <div className="mt-10">
                    <PillLink href={item.link.url}>{item.link.label}</PillLink>
                </div>
            )}
        </>
    );
}

function ProjectBody({ item }) {
    const tagline = item.title.split(' — ')[1];
    return (
        <>
            {tagline && <p className="text-base font-medium text-muted-foreground md:text-lg">{tagline}</p>}
            {item.award && (
                <p className="mt-4 w-fit rounded-lg bg-primary px-2.5 py-1 text-xs text-primary-foreground">{item.award}</p>
            )}
            <p className="mt-8 text-lg leading-relaxed text-foreground/90">{item.summary}</p>
            <h3 className="mt-10 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">Overview</h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{item.description}</p>
            <h3 className="mt-10 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">Stack</h3>
            <TechList items={item.technologies} className="mt-4" />
            {(item.liveLink || item.repoLink) && (
                <div className="mt-10 flex flex-wrap gap-3">
                    {item.liveLink && <PillLink href={item.liveLink}>Live</PillLink>}
                    {item.repoLink && (
                        <PillLink href={item.repoLink} variant="outline">
                            Repository
                        </PillLink>
                    )}
                </div>
            )}
        </>
    );
}

/**
 * Full details for one experience or project, opened from its card.
 * Lives at its own URL (shareable), sits over the page so closing it keeps
 * your scroll position, and supports ←/→ to step through and Esc to close.
 */
function Panel({ match }) {
    const navigate = useNavigate();
    const location = useLocation();
    const reduce = useReducedMotion();
    const closeRef = useRef(null);
    const { kind, index, item, list } = match;
    const { label, section } = KINDS[kind];
    const name = kind === 'projects' ? item.title.split(' — ')[0] : item.title;
    const prev = list[(index - 1 + list.length) % list.length];
    const next = list[(index + 1) % list.length];
    const fromSite = Boolean(location.state?.fromSite);

    const close = useCallback(() => {
        if (fromSite) {
            navigate(-1);
        } else {
            // Opened from a shared link: land on the matching section.
            navigate('/', { replace: true });
            requestAnimationFrame(() => document.getElementById(section)?.scrollIntoView());
        }
    }, [fromSite, navigate, section]);

    const go = useCallback(
        (target) => navigate(`/${kind}/${target.slug}`, { replace: true, state: location.state }),
        [kind, navigate, location.state]
    );

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') close();
            else if (e.key === 'ArrowLeft') go(prev);
            else if (e.key === 'ArrowRight') go(next);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [close, go, prev, next]);

    // Keep the page underneath still, and put focus inside the dialog.
    useEffect(() => {
        const prevOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';
        closeRef.current?.focus({ preventScroll: true });
        return () => {
            document.documentElement.style.overflow = prevOverflow;
        };
    }, []);

    const navName = (target) => (kind === 'projects' ? target.title.split(' — ')[0] : shortCompany(target.company));

    return (
        <motion.div
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label={`${label}: ${name}`}
            className="fixed inset-0 z-[1300] overflow-y-auto overscroll-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
        >
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={close} aria-hidden="true" />
            <motion.article
                className="relative mx-auto my-4 w-[calc(100%-2rem)] max-w-3xl rounded-2xl border border-white/10 bg-[#060b17]/95 shadow-2xl shadow-black/60 md:my-16"
                initial={reduce ? false : { y: 24, scale: 0.98 }}
                animate={{ y: 0, scale: 1 }}
                exit={reduce ? undefined : { y: 16, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            >
                <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl border-b border-white/5 bg-[#060b17]/90 px-6 py-4 backdrop-blur-md md:px-10">
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {label} · {index + 1} / {list.length}
                    </span>
                    <button
                        ref={closeRef}
                        type="button"
                        onClick={close}
                        aria-label="Close"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-white/30 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60"
                    >
                        <FiX size={18} />
                    </button>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={item.slug}
                        className="px-6 pb-8 pt-8 md:px-10 md:pb-10"
                        initial={reduce ? false : { opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reduce ? undefined : { opacity: 0, x: -12 }}
                        transition={{ duration: 0.2 }}
                    >
                        <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
                            {name}
                        </h2>
                        <div className="mt-3">
                            {kind === 'experience' ? <ExperienceBody item={item} /> : <ProjectBody item={item} />}
                        </div>
                    </motion.div>
                </AnimatePresence>

                <nav className="grid grid-cols-2 gap-px overflow-hidden rounded-b-2xl border-t border-white/5 bg-white/5">
                    <button
                        type="button"
                        onClick={() => go(prev)}
                        className="group/nav flex items-center gap-3 bg-[#060b17] px-6 py-5 text-left transition-colors hover:bg-white/[0.03] md:px-10"
                    >
                        <FiArrowLeft className="shrink-0 text-muted-foreground transition-transform group-hover/nav:-translate-x-1" />
                        <span className="min-w-0">
                            <span className="block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Previous</span>
                            <span className="block truncate text-sm text-foreground">{navName(prev)}</span>
                        </span>
                    </button>
                    <button
                        type="button"
                        onClick={() => go(next)}
                        className="group/nav flex items-center justify-end gap-3 bg-[#060b17] px-6 py-5 text-right transition-colors hover:bg-white/[0.03] md:px-10"
                    >
                        <span className="min-w-0">
                            <span className="block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Next</span>
                            <span className="block truncate text-sm text-foreground">{navName(next)}</span>
                        </span>
                        <FiArrowRight className="shrink-0 text-muted-foreground transition-transform group-hover/nav:translate-x-1" />
                    </button>
                </nav>
            </motion.article>
        </motion.div>
    );
}

export default function DetailOverlay() {
    const match = useDetailMatch();
    return <AnimatePresence>{match && <Panel key="detail" match={match} />}</AnimatePresence>;
}
