import { useSyncExternalStore } from 'react';

// "idle" | "loading" | "ready" | "failed" — shared by the 3D keyboard and the
// sections that make room for it.
let status = 'idle';
const listeners = new Set();

export function setSceneStatus(next) {
    if (status === next) return;
    status = next;
    listeners.forEach((listener) => listener());
}

export function useSceneStatus() {
    return useSyncExternalStore(
        (listener) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
        () => status,
        () => 'idle'
    );
}
