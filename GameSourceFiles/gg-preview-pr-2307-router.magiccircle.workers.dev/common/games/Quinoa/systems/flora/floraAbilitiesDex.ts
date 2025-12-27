import * as v from 'valibot';
import { SpecialPlantsTiles } from '../../world/tiles';
import { WeatherId } from '../weather';
import type { FloraAbilityBlueprint } from './flora-blueprints';

export const floraAbilitiesDex = {
  // ===== WEATHER ABILITIES =====
  // Abilities that trigger during specific weather conditions
  MoonKisser: {
    name: 'Amberbinder',
    trigger: 'weather',
    baseParameters: {
      mutationChancePerMinute: 25,
      requiredWeather: WeatherId.AmberMoon,
      sourceMutation: 'Ambershine',
      targetMutation: 'Ambercharged',
      tileRadius: 1,
      activationTileRef: SpecialPlantsTiles.MoonCelestialActivationTile,
    },
  },
  DawnKisser: {
    name: 'Dawnbinder',
    trigger: 'weather',
    baseParameters: {
      mutationChancePerMinute: 25,
      requiredWeather: WeatherId.Dawn,
      sourceMutation: 'Dawnlit',
      targetMutation: 'Dawncharged',
      tileRadius: 1,
      activationTileRef: SpecialPlantsTiles.DawnCelestialActivationTile,
    },
  },
} as const satisfies Record<Capitalize<string>, FloraAbilityBlueprint>;

export type FloraAbilityId = keyof typeof floraAbilitiesDex;
export const floraAbilityIds = Object.keys(
  floraAbilitiesDex
) as FloraAbilityId[];
export const FloraAbilityIdSchema = v.picklist(floraAbilityIds);

type NonEmptyBaseParameters<T> = T extends Record<string, never> ? never : T;

export type FloraAbilityBaseParameters = {
  [K in FloraAbilityId]: NonEmptyBaseParameters<
    (typeof floraAbilitiesDex)[K]['baseParameters']
  >;
}[FloraAbilityId] extends infer U
  ? U extends Record<string, unknown>
    ? keyof U
    : never
  : never;
