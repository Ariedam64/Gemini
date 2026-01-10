import { ItemType } from '../inventory';
import { MutationId } from '../mutation';

type JournalType = ItemType.Produce | ItemType.Pet;

const cropJournalVariants: JournalVariant[] = [
  'Normal',
  'Wet',
  'Chilled',
  'Frozen',
  'Dawnlit',
  'Ambershine',
  'Gold',
  'Rainbow',
  'Dawncharged',
  'Ambercharged',
  'Max Weight',
];

const petJournalVariants: JournalVariant[] = [
  'Normal',
  'Gold',
  'Rainbow',
  'Max Weight',
];

type JournalVariant = 'Normal' | 'Max Weight' | MutationId;

export {
  type JournalType,
  type JournalVariant,
  cropJournalVariants,
  petJournalVariants,
};
