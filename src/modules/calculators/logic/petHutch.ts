// src/modules/calculators/logic/petHutch.ts
// Pet Hutch capacity & upgrade calculators - verified from game source
// (function Qs in QuinoaView-ClnqnHhW.js)

import { MGData } from "../../data";

// Game hardcodes this literal in Qs(). Not present in MGData.
const HUTCH_BASE_CAPACITY = 25;
export const HUTCH_MAX_LEVEL = 10;

interface HutchUpgrade {
  targetLevel: number;
  cost: { dustQuantity: number };
  capacityBonus: number;
}

export interface HutchNextUpgrade {
  targetLevel: number;
  dustCost: number;
  capacityAfter: number;
}

function getUpgrades(): HutchUpgrade[] {
  const decor = MGData.get("decor") as Record<string, unknown> | null;
  const hutch = decor?.PetHutch as { upgrades?: HutchUpgrade[] } | undefined;
  return hutch?.upgrades ?? [];
}

/**
 * Compute current hutch capacity from the stored capacityLevel (0-10).
 *
 * Formula mirrors game's Qs("PetHutch", level):
 *   25 + sum(upgrade.capacityBonus for upgrade in upgrades if targetLevel <= level)
 *
 * @param capacityLevel Current hutch capacity level (0..HUTCH_MAX_LEVEL)
 * @returns Max items the hutch can hold right now.
 */
export function calculateHutchCapacity(capacityLevel: number): number {
  return HUTCH_BASE_CAPACITY + getUpgrades()
    .filter((u) => u.targetLevel <= capacityLevel)
    .reduce((sum, u) => sum + u.capacityBonus, 0);
}

/**
 * Get info about the next available upgrade tier, or null if maxed.
 *
 * @param capacityLevel Current hutch capacity level (0..HUTCH_MAX_LEVEL)
 * @returns Next upgrade descriptor (target level, dust cost, capacity after), or null.
 */
export function getNextHutchUpgrade(capacityLevel: number): HutchNextUpgrade | null {
  const next = getUpgrades().find((u) => u.targetLevel === capacityLevel + 1);
  if (!next) return null;
  return {
    targetLevel: next.targetLevel,
    dustCost: next.cost?.dustQuantity ?? 0,
    capacityAfter: calculateHutchCapacity(next.targetLevel),
  };
}
