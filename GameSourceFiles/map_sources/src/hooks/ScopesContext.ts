import { createContext } from 'react';

/**
 * The ScopesContext keeps track of the current "scope" hierarchy.
 * Internal note: we need to keep this in a separate file to avoid issues with
 * Vite HMR. In particular, defining a context in the same file as its provider
 * seems to cause issues with HMR.
 * More context: https://github.com/vitejs/vite/issues/3301#issuecomment-1192661323
 */
export const ScopesContext = createContext<string[]>([]);
