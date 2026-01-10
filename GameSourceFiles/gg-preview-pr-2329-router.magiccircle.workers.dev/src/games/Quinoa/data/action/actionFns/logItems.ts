import { getDefaultStore } from 'jotai';
import type { FaunaSpeciesId } from '@/common/games/Quinoa/systems/fauna';
import type { FloraSpeciesId } from '@/common/games/Quinoa/systems/flora';
import { sendQuinoaMessage } from '@/games/Quinoa/utils/sendQuinoaMessage';
import { activeModalAtom } from '@/Quinoa/atoms/modalAtom';
import { newLogsToAnimateAtom } from '@/Quinoa/components/modals/journal/store';
import { hasNewLogsAtom, newLogsAtom } from '../../../atoms/miscAtoms';

const { get, set } = getDefaultStore();

export function logItems() {
  const newLogs = get(newLogsAtom);
  const hasNewLogs = get(hasNewLogsAtom);
  if (!hasNewLogs || !newLogs) {
    console.warn('No new logs found');
    return;
  }
  const flatNewLogs = [
    ...Object.entries(newLogs.allNewCropVariants).map(
      ([speciesId, variants]) => ({
        speciesId: speciesId as FloraSpeciesId,
        variants,
      })
    ),
    ...Object.entries(newLogs.newPetVariants).map(([speciesId, variants]) => ({
      speciesId: speciesId as FaunaSpeciesId,
      variants,
    })),
  ];
  set(newLogsToAnimateAtom, flatNewLogs);
  set(activeModalAtom, 'journal');
  sendQuinoaMessage({
    type: 'LogItems',
  });
}
