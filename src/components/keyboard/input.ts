import type { KeyboardKey } from "./scene";

const PHYSICAL_ROWS = [
  [..."1234567890"].map((key) => `Digit${key}`),
  ...["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"].map((row) => [...row].map((key) => `Key${key}`)),
];

/** Rendered grid -> physical rows, bottom-aligned so the last rendered row is always Z-row. */
export function defaultShortcut(index: number, columns: number, total: number): string | undefined {
  const rows = Math.ceil(total / columns);
  const row = PHYSICAL_ROWS.length - rows + Math.floor(index / columns);
  return PHYSICAL_ROWS[row]?.[index % columns];
}

/** A key stays down until every input holding it has released. */
export function createKeyInput(
  keys: readonly KeyboardKey[],
  columns: number,
) {
  const listeners = new Set<(key: KeyboardKey, pressed: boolean) => void>();
  const onChange = (key: KeyboardKey, pressed: boolean) => listeners.forEach((listener) => listener(key, pressed));
  const byId = new Map(keys.map((key) => [key.nodeId, key]));
  const heldBySource = new Map<string, string>();
  const held = new Map<string, Set<string>>();
  const shortcuts = new Map<string, KeyboardKey>();
  keys.forEach((key, index) => {
    const code = key.skill.shortcut ?? defaultShortcut(index, columns, keys.length);
    if (!code) return;
    if (shortcuts.has(code)) throw new Error(`Duplicate keyboard shortcut: ${code}`);
    shortcuts.set(code, key);
  });
  const release = (source: string, nodeId?: string) => {
    const id = heldBySource.get(source);
    if (!id || (nodeId !== undefined && id !== nodeId)) return;
    heldBySource.delete(source);
    const sources = held.get(id);
    sources?.delete(source);
    if (sources?.size === 0) {
      held.delete(id);
      onChange(byId.get(id)!, false);
    }
  };
  return {
    shortcuts,
    subscribe(listener: (key: KeyboardKey, pressed: boolean) => void) {
      listeners.add(listener);
      return () => { listeners.delete(listener); };
    },
    press(source: string, id: string) {
      if (!byId.has(id) || heldBySource.get(source) === id) return false;
      release(source);
      heldBySource.set(source, id);
      const sources = held.get(id) ?? new Set<string>();
      const first = sources.size === 0;
      sources.add(source);
      held.set(id, sources);
      if (first) onChange(byId.get(id)!, true);
      return true;
    },
    release,
    releaseAll() {
      for (const source of [...heldBySource.keys()]) release(source);
    },
  };
}

export function isTypingTarget(target: EventTarget | null): boolean {
  return target instanceof Element && Boolean(target.closest("input, textarea, select, [contenteditable]:not([contenteditable='false'])"));
}
