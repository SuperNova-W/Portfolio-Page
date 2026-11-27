import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { logoFor } from '../data/keyboardSkills';
import { cn } from '../lib/cn';

/** Glassy card that sits over the 3D scene. */
export const Card = ({ className, children, ...props }) => (
    <div
        className={cn(
            'pointer-events-auto group rounded-xl border border-border bg-black/70 text-card-foreground shadow-sm backdrop-blur-md',
            'transition-[border-color,box-shadow] duration-300 hover:border-white/20 hover:shadow-md',
            className
        )}
        {...props}
    >
        {children}
    </div>
);

/** Technology pill; the logo is muted until the card is hovered. */
export const TechBadge = ({ name }) => {
    const logo = logoFor(name);
    return (
        <span className="inline-flex items-center gap-1.5 rounded-md border border-transparent bg-secondary/40 px-2.5 py-0.5 text-xs font-normal text-muted-foreground transition-colors group-hover:text-foreground/90">
            {logo && (
                <img
                    src={logo}
                    alt=""
                    className="h-3.5 w-3.5 object-contain opacity-50 transition duration-300 group-hover:opacity-100"
                />
            )}
            {name}
        </span>
    );
};

/** Tech pills. `limit` shows the first few and a "+N" count for the rest. */
export const TechList = ({ items, className, limit }) => {
    const shown = limit ? items.slice(0, limit) : items;
    const hidden = items.length - shown.length;
    return (
        <p className={cn('flex flex-wrap gap-2', className)}>
            {shown.map((item, index) => (
                <React.Fragment key={item}>
                    <TechBadge name={item} />
                    {index < shown.length - 1 && <span className="sr-only"> / </span>}
                </React.Fragment>
            ))}
            {hidden > 0 && (
                <span className="inline-flex items-center rounded-md bg-secondary/40 px-2.5 py-0.5 text-xs text-muted-foreground">
                    +{hidden}
                </span>
            )}
        </p>
    );
};

/** "View details →" footer for cards that open a detail panel. */
export const ViewMore = ({ label = 'View details' }) => (
    <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
        {label}
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
        </span>
    </span>
);

/** Pill-shaped outbound link with the template's arrow nudge. */
export const PillLink = ({ href, children, variant = 'solid' }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
            'group/link inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
            variant === 'solid'
                ? 'bg-primary text-primary-foreground hover:bg-primary/80'
                : 'border border-white/15 text-foreground hover:bg-white/10'
        )}
    >
        {children}
        <FiArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
    </a>
);

/** Date range with a live pulse when it runs to "Present". */
export const DateTag = ({ children }) => {
    const active = /Present/.test(children);
    return (
        <span
            className={cn(
                'inline-flex shrink-0 items-center gap-2.5 text-xs md:flex-row-reverse',
                active ? 'text-foreground' : 'text-muted-foreground'
            )}
        >
            <span className="relative flex h-2 w-2 shrink-0">
                {active && <span className="absolute inset-0 rounded-full bg-emerald-500/60 motion-safe:animate-ping" />}
                <span
                    className={cn(
                        'relative h-2 w-2 rounded-full',
                        active ? 'bg-emerald-500' : 'border border-muted-foreground/50 bg-card'
                    )}
                />
            </span>
            {children}
        </span>
    );
};
