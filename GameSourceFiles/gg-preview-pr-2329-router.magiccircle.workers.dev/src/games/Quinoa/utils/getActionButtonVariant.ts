import { getDefaultStore } from 'jotai';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type { ToolId } from '@/common/games/Quinoa/systems/tools';
import { mySelectedItemAtom } from '@/Quinoa/atoms/myAtoms';
import type { ActionType } from '@/Quinoa/data/action/actionAtom';

const { get } = getDefaultStore();

const mutationPotionVariantMapping: Partial<Record<ToolId, string>> = {
  RainbowPotion: 'rainbowPotion',
  GoldPotion: 'goldPotion',
  FrozenPotion: 'frozenPotion',
  WetPotion: 'wetPotion',
  ChilledPotion: 'chilledPotion',
  DawnlitPotion: 'dawnlitPotion',
  AmberlitPotion: 'amberlitPotion',
};

export function getActionButtonVariant(actionType: ActionType) {
  const selectedItem = get(mySelectedItemAtom);

  if (
    actionType === 'mutationPotion' &&
    selectedItem?.itemType === ItemType.Tool &&
    selectedItem.toolId in mutationPotionVariantMapping
  ) {
    return mutationPotionVariantMapping[selectedItem.toolId];
  }
  return actionType;
}
