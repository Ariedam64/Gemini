import { atom } from 'jotai';
import type { PingTimestamps } from '../types/types';

export const pingTimestampsAtom = atom<PingTimestamps>(new Map());
