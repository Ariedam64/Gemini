import { atom } from 'jotai';
import type { QuinoaEngine } from '../components/QuinoaCanvas/QuinoaEngine';

export const quinoaEngineAtom = atom<QuinoaEngine | null>(null);
export const quinoaInitializationErrorAtom = atom<Error | null>(null);
