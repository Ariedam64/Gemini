import { atom } from 'jotai';
import type { FaunaSpeciesId } from '@/common/games/Quinoa/systems/fauna';
import type { FloraSpeciesId } from '@/common/games/Quinoa/systems/flora';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type {
  JournalType,
  JournalVariant,
} from '@/common/games/Quinoa/systems/journal';

export const newLogsToAnimateAtom = atom<
  {
    speciesId: FloraSpeciesId | FaunaSpeciesId;
    variants: JournalVariant[];
  }[]
>([]);

export const activeSpeciesIdAtom = atom<FloraSpeciesId | FaunaSpeciesId | null>(
  null
);
export const activeJournalTypeAtom = atom<JournalType>(ItemType.Produce);
