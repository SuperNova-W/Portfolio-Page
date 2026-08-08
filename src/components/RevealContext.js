import { createContext } from 'react';

/**
 * Tells descendant Typers whether their section has scrolled into view yet.
 * Defaults to true so a Typer used outside a Section types immediately.
 */
export const RevealContext = createContext(true);
