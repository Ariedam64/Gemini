import { ActionType } from '../actionAtom';

export const PRESS_AND_HOLD_ACTION_SECONDS = 1;

export const PRESS_AND_HOLD_ACTIONS = new Set<ActionType>([
  'instaGrow',
  'removeGardenObject',
  'mutationPotion',
  'wish',
]);
