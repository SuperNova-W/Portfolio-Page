import { useCallback, useRef, useState } from 'react';
import { complete, displayPath, executeCommand, welcomeLines } from './commands';

export function useTerminal(onExit) {
    const [history, setHistory] = useState(welcomeLines);
    const [cwd, setCwdState] = useState([]);
    const cwdRef = useRef([]);
    const prevCwdRef = useRef([]);
    const commandHistory = useRef([]);
    const historyIndex = useRef(-1);
    const inputRef = useRef(null);
    const outputRef = useRef(null);

    const setCwd = useCallback((parts) => {
        prevCwdRef.current = cwdRef.current;
        cwdRef.current = parts;
        setCwdState(parts);
    }, []);

    const scrollToBottom = useCallback(() => {
        requestAnimationFrame(() => {
            if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
        });
    }, []);

    const echoLine = (text) => ({ type: 'command', text, cwd: displayPath(cwdRef.current) });

    const handleSubmit = useCallback(
        (value) => {
            const trimmed = value.trim();
            const line = echoLine(trimmed);
            inputRef.current?.setValue('');
            historyIndex.current = -1;
            if (trimmed) commandHistory.current = [...commandHistory.current, trimmed];

            const name = trimmed.split(/\s+/)[0]?.toLowerCase();
            if (name === 'exit') return onExit();
            if (name === 'clear') {
                setHistory([]);
                return undefined;
            }

            const output = trimmed
                ? executeCommand(trimmed, {
                      cwd: cwdRef.current,
                      prevCwd: prevCwdRef.current,
                      setCwd,
                      history: commandHistory.current,
                  })
                : [];
            setHistory((prev) => [...prev, line, ...output]);
            scrollToBottom();
            return undefined;
        },
        [scrollToBottom, onExit, setCwd]
    );

    const handleKeyDown = useCallback(
        (e, value) => {
            const cmds = commandHistory.current;
            if (e.ctrlKey && (e.key === 'l' || e.key === 'L')) {
                e.preventDefault();
                setHistory([]);
            } else if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
                e.preventDefault();
                setHistory((prev) => [...prev, echoLine(`${value}^C`)]);
                inputRef.current?.setValue('');
                historyIndex.current = -1;
                scrollToBottom();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (!cmds.length) return;
                const i = historyIndex.current === -1 ? cmds.length - 1 : Math.max(0, historyIndex.current - 1);
                historyIndex.current = i;
                inputRef.current?.setValue(cmds[i]);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex.current === -1) return;
                const i = historyIndex.current + 1;
                if (i >= cmds.length) {
                    historyIndex.current = -1;
                    inputRef.current?.setValue('');
                } else {
                    historyIndex.current = i;
                    inputRef.current?.setValue(cmds[i]);
                }
            } else if (e.key === 'Tab') {
                e.preventDefault();
                if (!value.trim()) return;
                const result = complete(value, cwdRef.current);
                inputRef.current?.setValue(result.value);
                if (result.options) {
                    setHistory((prev) => [
                        ...prev,
                        echoLine(value),
                        { type: 'response', grid: true, segments: result.options },
                    ]);
                    scrollToBottom();
                }
            } else if (e.key === 'Escape') {
                onExit();
            }
        },
        [onExit, scrollToBottom]
    );

    return { history, cwd: displayPath(cwd), handleSubmit, handleKeyDown, inputRef, outputRef };
}
