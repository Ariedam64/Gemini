import { atom } from 'jotai';
import { generateMap } from '@/common/games/Quinoa/world/map';

const now = performance.now();
const map = generateMap();
console.log(`Map generated in ${performance.now() - now}ms`);

export const mapAtom = atom(map);

export const tileSizeAtom = atom(60);
