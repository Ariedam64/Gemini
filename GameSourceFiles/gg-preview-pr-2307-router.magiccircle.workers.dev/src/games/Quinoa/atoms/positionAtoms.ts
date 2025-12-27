import { atom } from 'jotai';
import type { Direction, GridPosition } from '@/common/games/Quinoa/world/map';

export const positionAtom = atom<GridPosition | null>(null);
export const lastPositionInMyGardenAtom = atom<GridPosition | null>(null);

export const playerDirectionAtom = atom<Direction>(null);
