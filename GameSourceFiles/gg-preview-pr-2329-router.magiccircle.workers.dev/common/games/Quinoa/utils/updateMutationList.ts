import { MutationId } from '../systems/mutation';

const growthMutations = ['Rainbow', 'Gold'];
const baseWaterMutations = ['Wet', 'Chilled'];
const upgradedWaterMutations = ['Frozen'];
const baseSunMoonMutations = ['Dawnlit', 'Ambershine'];
const upgradedSunMoonMutations = ['Dawncharged', 'Ambercharged'];

export function updateMutationList(
  mutationToAdd: MutationId,
  existingMutations: MutationId[]
): MutationId[] | undefined {
  // If already exists, don't add
  if (existingMutations.includes(mutationToAdd)) {
    return;
  }
  let newMutationList = [...existingMutations];

  switch (mutationToAdd) {
    case 'Rainbow':
    case 'Gold':
      // Only one growth mutation can be applied
      if (
        existingMutations.some((mutation) => growthMutations.includes(mutation))
      ) {
        return;
      }
      newMutationList.push(mutationToAdd);
      break;

    case 'Wet':
      // If it already has Frozen, can't add
      if (existingMutations.includes('Frozen')) {
        return;
      }
      // If it has Chilled, remove Chilled and upgrade to Frozen
      if (existingMutations.includes('Chilled')) {
        newMutationList = newMutationList.filter((m) => m !== 'Chilled');
        newMutationList.push('Frozen');
      } else {
        newMutationList.push('Wet');
      }
      break;

    case 'Chilled':
      // If it already has Frozen, can't add
      if (existingMutations.includes('Frozen')) {
        return;
      }
      // If it has Wet, remove Wet and upgrade to Frozen
      if (existingMutations.includes('Wet')) {
        newMutationList = newMutationList.filter((m) => m !== 'Wet');
        newMutationList.push('Frozen');
      } else {
        newMutationList.push('Chilled');
      }
      break;

    case 'Frozen':
      // Only one upgraded water mutation can be applied
      if (
        existingMutations.some((mutation) =>
          upgradedWaterMutations.includes(mutation)
        )
      ) {
        return;
      }
      // Remove any base water mutations and add Frozen
      newMutationList = newMutationList.filter(
        (m) => !baseWaterMutations.includes(m)
      );
      newMutationList.push('Frozen');
      break;

    case 'Dawnlit':
      // Can't add if upgraded versions exist
      if (
        existingMutations.some((mutation) =>
          upgradedSunMoonMutations.includes(mutation)
        )
      ) {
        return;
      }
      // Can't add if either base sun/moon mutation already exists
      if (
        existingMutations.some((mutation) =>
          baseSunMoonMutations.includes(mutation)
        )
      ) {
        return;
      }
      newMutationList.push('Dawnlit');
      break;

    case 'Ambershine':
      // Can't add if upgraded versions exist
      if (
        existingMutations.some((mutation) =>
          upgradedSunMoonMutations.includes(mutation)
        )
      ) {
        return;
      }
      // Can't add if either base sun/moon mutation already exists
      if (
        existingMutations.some((mutation) =>
          baseSunMoonMutations.includes(mutation)
        )
      ) {
        return;
      }
      newMutationList.push('Ambershine');
      break;

    case 'Dawncharged':
      // Can't add if it already has an upgraded sun or moon mutation
      if (
        existingMutations.some((mutation) =>
          upgradedSunMoonMutations.includes(mutation)
        )
      ) {
        return;
      }
      // Can't add if it has the base mutation of the OTHER type (Ambershine)
      if (existingMutations.includes('Ambershine')) {
        return;
      }
      // If it has the matching base mutation (Dawnlit), remove it and upgrade
      if (existingMutations.includes('Dawnlit')) {
        newMutationList = newMutationList.filter((m) => m !== 'Dawnlit');
      }
      newMutationList.push('Dawncharged');
      break;

    case 'Ambercharged':
      // Can't add if it already has an upgraded sun or moon mutation
      if (
        existingMutations.some((mutation) =>
          upgradedSunMoonMutations.includes(mutation)
        )
      ) {
        return;
      }
      // Can't add if it has the base mutation of the OTHER type (Dawnlit)
      if (existingMutations.includes('Dawnlit')) {
        return;
      }
      // If it has the matching base mutation (Ambershine), remove it and upgrade
      if (existingMutations.includes('Ambershine')) {
        newMutationList = newMutationList.filter((m) => m !== 'Ambershine');
      }
      newMutationList.push('Ambercharged');
      break;

    default: {
      // Exhaustiveness check - will cause type error if a MutationId is not handled
      const _exhaustiveCheck: never = mutationToAdd;
      return _exhaustiveCheck;
    }
  }

  return newMutationList;
}
