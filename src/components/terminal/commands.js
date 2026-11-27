import { education } from '../EducationSection';
import { experiences } from '../ExperienceSection';
import { projects } from '../ProjectsSection';
import { skills } from '../SkillsSection';
import { publications } from '../PublicationsSection';
import { certifications, hackathons } from '../CertificationsSection';
import { contacts } from '../ContactSection';
import { isMuted, setMuted } from '../../lib/keyclick';

/**
 * A small read-only zsh. The filesystem is built from the section components,
 * so editing the site updates the shell too.
 *
 * Output line: { type: 'command'|'response'|'error'|'system'|'accent', text,
 *                columns?: [l, r], href?, segments?: [{ text, tone }], grid? }
 */

export const HOME = '/home/visitor';
const BOOT = Date.now();

/* ------------------------------------------------------------------ */
/* Filesystem                                                          */
/* ------------------------------------------------------------------ */

const slug = (s) =>
    s
        .toLowerCase()
        .replace(/&/g, ' ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
const dir = (children = {}) => ({ type: 'dir', children });
const file = (lines, extra = {}) => ({ type: 'file', lines, ...extra });
const H = (text) => ({ type: 'accent', text });
const M = (text) => ({ type: 'system', text });
const yearOf = (s) => (s.match(/\d{4}/) || [''])[0];

function put(children, base, ext, node) {
    let name = `${base}${ext}`;
    for (let i = 2; children[name]; i++) name = `${base}-${i}${ext}`;
    children[name] = node;
}

function buildFs() {
    const root = dir();
    const c = root.children;

    c['README.md'] = file([
        H('# Yashwant Ponnaganti — portfolio'),
        '',
        "You're in a read-only shell. Some things to try:",
        '',
        '  ls -la              list everything here',
        '  cd projects         move into a folder',
        '  cat arrakis.md      read a file',
        '  open arrakis.md     open its live demo in a new tab',
        '  tree                see the whole filesystem',
        '  grep kafka          search every file',
        '',
        "Type 'help' for the full list of commands.",
    ]);

    c['about.txt'] = file([
        H('About'),
        '',
        "Hey! I'm Yash, a CS (Honors, ML Track) & Applied Math student at the University of Maryland.",
        'I build backend systems, data pipelines and ML that run fast in production.',
        '',
        M('GPA 3.92 · FIRE Honors · Presidential Scholarship · 5x hackathon winner · 2x IEEE publications'),
    ]);

    const edu = dir();
    education.forEach((e) =>
        put(
            edu.children,
            slug(e.school),
            '.txt',
            file([
                H(e.degree),
                M(`${e.school} — ${e.location} · ${e.duration}`),
                '',
                ...e.stats.map((s) => `${s.label}: ${s.value}`),
                '',
                H('Relevant coursework'),
                ...e.coursework.flatMap((g) => [`${g.group}:`, ...g.items.map((i) => `  - ${i}`)]),
            ])
        )
    );
    c.education = edu;

    const exp = dir();
    experiences.forEach((e) => {
        const short = e.company.split(/ — | @ |, | & /)[0];
        put(
            exp.children,
            `${slug(short)}-${yearOf(e.duration)}`,
            '.txt',
            file(
                [
                    H(e.title),
                    M(`${e.company} · ${e.duration}`),
                    '',
                    ...e.points.map((p) => `• ${p}`),
                    '',
                    M(`stack: ${e.technologies.join(' · ')}`),
                    ...(e.link ? [`${e.link.label.toLowerCase()}: ${e.link.url}`] : []),
                ],
                { link: e.link?.url }
            )
        );
    });
    c.experience = exp;

    const proj = dir();
    projects.forEach((p) =>
        put(
            proj.children,
            slug(p.title.split(' — ')[0]),
            '.md',
            file(
                [
                    H(`# ${p.title}`),
                    ...(p.award ? [M(`★ ${p.award}`)] : []),
                    '',
                    p.description,
                    '',
                    M(`stack: ${p.technologies.join(' · ')}`),
                    ...(p.liveLink ? [`live: ${p.liveLink}`] : []),
                    ...(p.repoLink ? [`repo: ${p.repoLink}`] : []),
                ],
                { link: p.liveLink || p.repoLink }
            )
        )
    );
    c.projects = proj;

    const sk = dir();
    skills.forEach((s) => put(sk.children, slug(s.label), '.txt', file([H(s.label), '', ...s.items.map((i) => `- ${i}`)])));
    c.skills = sk;

    const pubs = dir();
    publications.forEach((p) => {
        const head = p.title.includes(':')
            ? p.title.split(':')[0]
            : p.title
                  .replace(/^(an?|the) /i, '')
                  .split(' ')
                  .slice(0, 3)
                  .join(' ');
        put(
            pubs.children,
            slug(head),
            '.txt',
            file(
                [H(p.title), M(`${p.authors} — ${p.venue}, ${p.year}`), '', p.description, ...(p.link ? ['', `paper: ${p.link}`] : [])],
                { link: p.link || undefined }
            )
        );
    });
    c.publications = pubs;

    c['awards.txt'] = file([
        H('Awards & certifications'),
        '',
        ...certifications.map((a) => `• ${a.title}  (${a.issuer})`),
        '',
        H('Hackathons'),
        ...hackathons.map((h) => `  ${h}`),
    ]);

    c['contact.txt'] = file([
        H('Contact'),
        '',
        ...contacts.map((x) => ({ type: 'response', text: '', columns: [x.label, x.text], href: x.href })),
    ]);

    c['.secret'] = file([M('# you found a dotfile.'), "there's a command `help` won't show you.", "it's what UMD fans call themselves."]);

    return root;
}

const FS = buildFs();

/* ------------------------------------------------------------------ */
/* Paths                                                               */
/* ------------------------------------------------------------------ */

/** Resolve a path against cwd (an array of names under HOME). */
export function resolve(cwd, input = '') {
    let rest = input;
    let parts;
    if (!rest) return { parts: [...cwd] };
    if (rest === '~') return { parts: [] };
    if (rest.startsWith('~/')) {
        parts = [];
        rest = rest.slice(2);
    } else if (rest === HOME || rest.startsWith(`${HOME}/`)) {
        parts = [];
        rest = rest.slice(HOME.length);
    } else if (rest.startsWith('/')) {
        return { error: 'denied', parts: null };
    } else {
        parts = [...cwd];
    }
    for (const seg of rest.split('/')) {
        if (!seg || seg === '.') continue;
        if (seg === '..') {
            if (!parts.length) return { error: 'denied', parts: null };
            parts.pop();
        } else parts.push(seg);
    }
    return { parts };
}

export function getNode(parts) {
    let node = FS;
    for (const p of parts) {
        if (node.type !== 'dir' || !node.children[p]) return null;
        node = node.children[p];
    }
    return node;
}

export const displayPath = (parts) => (parts.length ? `~/${parts.join('/')}` : '~');
const absPath = (parts) => (parts.length ? `${HOME}/${parts.join('/')}` : HOME);

const entries = (node, all) =>
    Object.keys(node.children)
        .filter((n) => all || !n.startsWith('.'))
        .sort((a, b) => a.replace(/^\./, '').localeCompare(b.replace(/^\./, '')));

const toneFor = (name, node) => (node.type === 'dir' ? 'dir' : name.startsWith('.') ? 'hidden' : 'file');
const sizeOf = (node) =>
    node.type === 'dir'
        ? 4096
        : node.lines.reduce((n, l) => n + (typeof l === 'string' ? l : l.text || (l.columns || []).join('  ')).length + 1, 0);

const toLine = (l) => (typeof l === 'string' ? { type: 'response', text: l } : l);

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Split a command line into words, honouring '…' and "…". */
export function tokenize(input) {
    const out = [];
    const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
    let m;
    while ((m = re.exec(input))) out.push(m[1] ?? m[2] ?? m[3]);
    return out;
}

function splitFlags(args) {
    const flags = new Set();
    const rest = [];
    for (const a of args) {
        if (a.startsWith('-') && a.length > 1) [...a.slice(1)].forEach((f) => flags.add(f));
        else rest.push(a);
    }
    return { flags, rest };
}

const err = (text) => [{ type: 'error', text }];
const stamp = () => {
    const d = new Date();
    return `${d.toLocaleString('en-US', { month: 'short' })} ${String(d.getDate()).padStart(2)} ${d
        .toTimeString()
        .slice(0, 5)}`;
};

function uptime() {
    const s = Math.floor((Date.now() - BOOT) / 1000);
    const m = Math.floor(s / 60);
    return m ? `${m} min${m === 1 ? '' : 's'}, ${s % 60} secs` : `${s} secs`;
}

const LINKS = Object.fromEntries(contacts.map((x) => [x.label.toLowerCase(), x.href]));

function openUrl(url) {
    if (url.startsWith('mailto:')) window.location.href = url;
    else window.open(url, '_blank', 'noopener,noreferrer');
}

/* ------------------------------------------------------------------ */
/* Commands                                                            */
/* ------------------------------------------------------------------ */

const COMMANDS = {
    help: {
        usage: 'help',
        description: 'List available commands',
        run: () => [
            { type: 'accent', text: 'Available commands' },
            ...Object.values(COMMANDS)
                .filter((cmd) => !cmd.hidden)
                .map((cmd) => ({ type: 'response', text: '', columns: [cmd.usage, cmd.description] })),
            { type: 'response', text: '' },
            {
                type: 'system',
                text: '↑/↓ history  ·  Tab completes commands & paths  ·  Ctrl+C cancel  ·  Ctrl+L clear  ·  Esc exit',
            },
        ],
    },

    ls: {
        usage: 'ls [-la] [path]',
        description: 'List directory contents',
        run: (args, ctx) => {
            const { flags, rest } = splitFlags(args);
            const targets = rest.length ? rest : [''];
            const out = [];
            targets.forEach((t, ti) => {
                const { parts, error } = resolve(ctx.cwd, t);
                const node = error ? null : getNode(parts);
                if (error) return out.push({ type: 'error', text: `ls: ${t}: Permission denied` });
                if (!node) return out.push({ type: 'error', text: `ls: ${t}: No such file or directory` });
                if (targets.length > 1) out.push({ type: 'response', text: `${ti ? '\n' : ''}${t}:` });

                let list;
                if (node.type === 'file') list = [[parts[parts.length - 1], node]];
                else {
                    list = entries(node, flags.has('a')).map((n) => [n, node.children[n]]);
                    if (flags.has('a')) list = [['.', node], ['..', node], ...list];
                }

                if (flags.has('l')) {
                    if (node.type === 'dir') out.push({ type: 'response', text: `total ${list.length * 8}` });
                    list.forEach(([name, n]) => {
                        const perm = n.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--';
                        out.push({
                            type: 'response',
                            segments: [
                                {
                                    text: `${perm}  1 visitor  staff  ${String(sizeOf(n)).padStart(5)}  ${stamp()}  `,
                                    tone: 'muted',
                                },
                                { text: name, tone: toneFor(name, n) },
                            ],
                        });
                    });
                } else if (list.length) {
                    out.push({
                        type: 'response',
                        grid: true,
                        segments: list.map(([name, n]) => ({
                            text: n.type === 'dir' && name !== '.' && name !== '..' ? `${name}/` : name,
                            tone: toneFor(name, n),
                        })),
                    });
                }
                return undefined;
            });
            return out;
        },
    },

    cd: {
        usage: 'cd [path]',
        description: 'Change directory (cd .. / cd ~ / cd -)',
        run: (args, ctx) => {
            const target = args[0];
            if (target === '-') {
                const prev = ctx.prevCwd;
                ctx.setCwd(prev);
                return [{ type: 'response', text: displayPath(prev) }];
            }
            const { parts, error } = target ? resolve(ctx.cwd, target) : { parts: [] };
            if (error) return err(`cd: permission denied: ${target}`);
            const node = getNode(parts);
            if (!node) return err(`cd: no such file or directory: ${target}`);
            if (node.type !== 'dir') return err(`cd: not a directory: ${target}`);
            ctx.setCwd(parts);
            return [];
        },
    },

    pwd: {
        usage: 'pwd',
        description: 'Print working directory',
        run: (_, ctx) => [{ type: 'response', text: absPath(ctx.cwd) }],
    },

    cat: {
        usage: 'cat <file>…',
        description: 'Print file contents',
        run: (args, ctx) => {
            if (!args.length) return err('usage: cat <file> ...');
            return args.flatMap((a) => {
                const { parts, error } = resolve(ctx.cwd, a);
                const node = error ? null : getNode(parts);
                if (error) return err(`cat: ${a}: Permission denied`);
                if (!node) return err(`cat: ${a}: No such file or directory`);
                if (node.type === 'dir') return err(`cat: ${a}: Is a directory`);
                return node.lines.map(toLine);
            });
        },
    },

    tree: {
        usage: 'tree [path]',
        description: 'Show the directory tree',
        run: (args, ctx) => {
            const { parts, error } = resolve(ctx.cwd, args[0]);
            const node = error ? null : getNode(parts);
            if (!node || node.type !== 'dir') return err(`tree: ${args[0] || '.'}: not a directory`);
            const out = [{ type: 'response', segments: [{ text: args[0] || '.', tone: 'dir' }] }];
            let dirs = 0;
            let files = 0;
            const walk = (n, prefix) => {
                const names = entries(n, false);
                names.forEach((name, i) => {
                    const child = n.children[name];
                    const last = i === names.length - 1;
                    out.push({
                        type: 'response',
                        segments: [
                            { text: `${prefix}${last ? '└── ' : '├── '}`, tone: 'muted' },
                            { text: name, tone: toneFor(name, child) },
                        ],
                    });
                    if (child.type === 'dir') {
                        dirs++;
                        walk(child, `${prefix}${last ? '    ' : '│   '}`);
                    } else files++;
                });
            };
            walk(node, '');
            out.push({ type: 'system', text: `\n${dirs} directories, ${files} files` });
            return out;
        },
    },

    open: {
        usage: 'open <file|url>',
        description: 'Open a project, paper or link (also: github, linkedin, email)',
        run: (args, ctx) => {
            const a = args[0];
            if (!a) return err('usage: open <file | url | github | linkedin | email>');
            let url = LINKS[a.toLowerCase()];
            if (!url && /^https?:\/\//.test(a)) url = a;
            if (!url) {
                const { parts, error } = resolve(ctx.cwd, a);
                const node = error ? null : getNode(parts);
                if (!node) return err(`open: ${a}: No such file or directory`);
                if (node.type === 'dir') return err(`open: ${a}: Is a directory (try: ls ${a})`);
                if (!node.link) return err(`open: ${a}: nothing to open (try: cat ${a})`);
                url = node.link;
            }
            openUrl(url);
            return [{ type: 'system', text: `Opening ${url} …` }];
        },
    },

    grep: {
        usage: 'grep <pattern> [path]',
        description: 'Search files recursively (case-insensitive)',
        run: (args, ctx) => {
            const { rest } = splitFlags(args);
            const [pattern, target] = rest;
            if (!pattern) return err('usage: grep <pattern> [path]');
            const { parts, error } = resolve(ctx.cwd, target);
            const start = error ? null : getNode(parts);
            if (!start) return err(`grep: ${target}: No such file or directory`);
            const needle = pattern.toLowerCase();
            const out = [];
            const walk = (n, path) => {
                if (n.type === 'file') {
                    n.lines.forEach((l) => {
                        const text = typeof l === 'string' ? l : l.text || (l.columns || []).join('  ');
                        const at = text.toLowerCase().indexOf(needle);
                        if (at === -1) return;
                        out.push({
                            type: 'response',
                            segments: [
                                { text: path, tone: 'path' },
                                { text: ':', tone: 'muted' },
                                { text: ` ${text.slice(0, at)}` },
                                { text: text.slice(at, at + needle.length), tone: 'match' },
                                { text: text.slice(at + needle.length) },
                            ],
                        });
                    });
                } else {
                    entries(n, false).forEach((name) => walk(n.children[name], path ? `${path}/${name}` : name));
                }
            };
            walk(start, start.type === 'file' ? target : '');
            if (!out.length) return [{ type: 'system', text: `no matches for "${pattern}"` }];
            return out.length > 60 ? [...out.slice(0, 60), { type: 'system', text: `… ${out.length - 60} more` }] : out;
        },
    },

    neofetch: {
        usage: 'neofetch',
        description: 'System info',
        run: () => {
            const art = [
                '__   __ ____  ',
                '\\ \\ / /|  _ \\ ',
                ' \\ V / | |_) |',
                '  | |  |  __/ ',
                '  |_|  |_|    ',
                '              ',
                '              ',
                '              ',
                '              ',
            ];
            const langs = skills[0]?.items.slice(0, 5).join(', ');
            const info = [
                [null, 'visitor@yashwant'],
                [null, '----------------'],
                ['OS', 'PortfolioOS (dark mode only)'],
                ['Host', 'University of Maryland, College Park'],
                ['Uptime', uptime()],
                ['Shell', 'zsh (read-only)'],
                ['Languages', langs],
                ['Focus', 'backend · data pipelines · ML'],
                ['Contact', 'yash.ponnaganti@gmail.com'],
            ];
            return art.map((a, i) => {
                const [k, v] = info[i] || [null, ''];
                return {
                    type: 'response',
                    segments: [
                        { text: `${a}   `, tone: 'art' },
                        ...(k ? [{ text: `${k}: `, tone: 'key' }, { text: v }] : [{ text: v, tone: i === 0 ? 'key' : 'muted' }]),
                    ],
                };
            });
        },
    },

    whoami: { usage: 'whoami', description: 'Print current user', run: () => [{ type: 'response', text: 'visitor' }] },

    echo: {
        usage: 'echo <text>',
        description: 'Print text',
        run: (args, ctx) => {
            const env = { $USER: 'visitor', $HOME: HOME, $SHELL: '/bin/zsh', $PWD: absPath(ctx.cwd) };
            return [{ type: 'response', text: args.map((a) => env[a] ?? a).join(' ') }];
        },
    },

    date: { usage: 'date', description: 'Print the date', run: () => [{ type: 'response', text: new Date().toString() }] },

    history: {
        usage: 'history',
        description: 'Show command history',
        run: (_, ctx) => ctx.history.map((h, i) => ({ type: 'response', text: `${String(i + 1).padStart(5)}  ${h}` })),
    },

    man: {
        usage: 'man <command>',
        description: 'Show the manual for a command',
        run: (args) => {
            const cmd = COMMANDS[args[0]];
            if (!args[0]) return err('What manual page do you want?');
            if (!cmd || cmd.hidden) return err(`No manual entry for ${args[0]}`);
            return [
                { type: 'accent', text: 'NAME' },
                { type: 'response', text: `     ${args[0]} — ${cmd.description}` },
                { type: 'accent', text: 'SYNOPSIS' },
                { type: 'response', text: `     ${cmd.usage}` },
            ];
        },
    },

    sound: {
        usage: 'sound [on|off]',
        description: 'Turn keyboard sounds on or off',
        run: (args) => {
            const arg = (args[0] || '').toLowerCase();
            if (arg === 'on' || arg === 'off') setMuted(arg === 'off');
            else if (arg) return err('usage: sound [on|off]');
            return [{ type: 'system', text: `keyboard sounds: ${isMuted() ? 'off' : 'on'}` }];
        },
    },

    clear: { usage: 'clear', description: 'Clear the screen (Ctrl+L)', run: () => [] },
    exit: { usage: 'exit', description: 'Close the terminal (Esc)', run: () => [] },

    /* ---- hidden ---- */
    theme: {
        hidden: true,
        run: () => [{ type: 'system', text: 'Dark mode is the only mode here. 🌙' }],
    },
    uname: { hidden: true, run: () => [{ type: 'response', text: 'PortfolioOS 1.0.0 yashwant arm64' }] },
    sudo: {
        hidden: true,
        run: () => err('visitor is not in the sudoers file. This incident will be reported.'),
    },
    rm: {
        hidden: true,
        run: (args) =>
            args.some((a) => a.includes('r')) && args.some((a) => a.includes('f'))
                ? [{ type: 'system', text: 'nice try. 🙂' }]
                : err('rm: read-only file system'),
    },
    terps: { hidden: true, run: () => [{ type: 'accent', text: 'Fear the Turtle! 🐢' }] },
};

const ALIASES = { mute: ['sound', 'off'], unmute: ['sound', 'on'] };

const READ_ONLY = ['mkdir', 'touch', 'mv', 'cp', 'chmod', 'vim', 'vi', 'nano', 'emacs'];

export const COMMAND_NAMES = Object.keys(COMMANDS).filter((n) => !COMMANDS[n].hidden);

/** Run one command line. ctx: { cwd, prevCwd, setCwd, history }. */
export function executeCommand(input, ctx) {
    let [cmd, ...args] = tokenize(input.trim());
    if (!cmd) return [];
    if (ALIASES[cmd.toLowerCase()]) [cmd, ...args] = ALIASES[cmd.toLowerCase()];
    const name = cmd.toLowerCase();
    const def = COMMANDS[name];
    if (def) return def.run(args, ctx);
    if (READ_ONLY.includes(name)) return err(`${name}: read-only file system`);

    // A folder or file name typed as a command: point at the right one.
    const here = getNode(ctx.cwd);
    const hit = here?.children?.[cmd] || here?.children?.[cmd.replace(/\/$/, '')];
    if (hit) return err(`zsh: command not found: ${cmd}  (did you mean \`${hit.type === 'dir' ? 'cd' : 'cat'} ${cmd}\`?)`);
    return err(`zsh: command not found: ${cmd}`);
}

/**
 * Tab completion. Returns { value, options } — options is set when several
 * candidates match, so the shell can list them like zsh does.
 */
export function complete(value, cwd) {
    const endsWithSpace = /\s$/.test(value);
    const words = value.trimStart().split(/\s+/);
    if (endsWithSpace) words.push('');

    const commonPrefix = (xs) =>
        xs.reduce((p, x) => {
            let i = 0;
            while (i < p.length && p[i] === x[i]) i++;
            return p.slice(0, i);
        });

    if (words.length <= 1) {
        const w = (words[0] || '').toLowerCase();
        if (!w) return { value };
        const m = COMMAND_NAMES.filter((c) => c.startsWith(w));
        if (m.length === 1) return { value: `${m[0]} ` };
        if (m.length > 1) return { value: commonPrefix(m), options: m.map((t) => ({ text: t })) };
        return { value };
    }

    const last = words[words.length - 1];
    const slash = last.lastIndexOf('/');
    const dirPart = slash >= 0 ? last.slice(0, slash + 1) : '';
    const base = slash >= 0 ? last.slice(slash + 1) : last;
    const { parts } = resolve(cwd, dirPart || '.');
    const node = parts ? getNode(parts) : null;
    if (!node || node.type !== 'dir') return { value };

    const names = entries(node, base.startsWith('.')).filter((n) => n.startsWith(base));
    const head = value.slice(0, value.length - last.length);
    if (names.length === 1) {
        const child = node.children[names[0]];
        return { value: `${head}${dirPart}${names[0]}${child.type === 'dir' ? '/' : ' '}` };
    }
    if (names.length > 1) {
        return {
            value: `${head}${dirPart}${commonPrefix(names)}`,
            options: names.map((n) => ({
                text: node.children[n].type === 'dir' ? `${n}/` : n,
                tone: toneFor(n, node.children[n]),
            })),
        };
    }
    return { value };
}

export function welcomeLines() {
    const d = new Date();
    const when = `${d.toLocaleDateString('en-US', { weekday: 'short' })} ${d.toLocaleDateString('en-US', {
        month: 'short',
    })} ${String(d.getDate()).padStart(2)} ${d.toTimeString().slice(0, 8)}`;
    return [
        { type: 'system', text: `Last login: ${when} on ttys001` },
        { type: 'accent', text: "Welcome to Yashwant Ponnaganti's portfolio." },
        { type: 'response', text: "Type 'ls' to look around, 'cat README.md' to get started, or 'help' for all commands." },
        { type: 'response', text: '' },
    ];
}
