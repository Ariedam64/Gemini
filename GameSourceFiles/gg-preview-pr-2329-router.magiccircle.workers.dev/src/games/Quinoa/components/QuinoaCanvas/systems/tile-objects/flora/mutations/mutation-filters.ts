import type { BLEND_MODES, Filter } from 'pixi.js';
import {
  ColorGradientFilter,
  type ColorGradientFilterOptions,
} from 'pixi-filters';
import {
  type MutationId,
  mutationsDex,
} from '@/common/games/Quinoa/systems/mutation';
import type { TileRef } from '@/common/games/Quinoa/world/tiles/ref';
import {
  MutationOverlayTiles,
  MutationTiles,
} from '@/common/games/Quinoa/world/tiles/spritesheets';
import { ColorBlendPreserveAlphaFilter } from '../../../../pixi/filters/ColorBlendPreserveAlphaFilter';
import { ColorOverlayFilter } from '../../../../pixi/filters/ColorOverlayFilter';

const rainbowFilterOptions = {
  type: ColorGradientFilter.LINEAR,
  angle: 130,
  stops: [
    { offset: 0, color: '#FF1744', alpha: 1 },
    { offset: 0.2, color: '#FF9100', alpha: 1 },
    { offset: 0.4, color: '#FFEA00', alpha: 1 },
    { offset: 0.6, color: '#00E676', alpha: 1 },
    { offset: 0.8, color: '#2979FF', alpha: 1 },
    { offset: 1, color: '#D500F9', alpha: 1 },
  ],
} as const satisfies ColorGradientFilterOptions;

export type MutationFilterBlueprint = {
  /** Filters to apply for color effects */
  filters: Filter | Filter[];
  /** Alternative filters for tall plants (e.g., different gradient angle) */
  tallPlantFilters?: Filter | Filter[];
  /** Blend mode when stacking - mutations with this are applied last */
  stackBlendMode?: BLEND_MODES;
  /** Icon tile for mutation indicator */
  iconTileRef?: TileRef;
  /** Override icon for tall plants */
  tallPlantIconOverrideTileRef?: TileRef;
  /** Texture overlay for tall plants (e.g., ice crystals) */
  overlayTileRef?: TileRef;
};

/**
 * Visual effect configurations for each mutation type.
 *
 * Mutation color filters stack by default. Special behavior can be configured:
 * - `stackBlendMode` - Applied last with this blend mode (e.g., Rainbow uses 'multiply')
 * - `tallPlantFilters` - Alternative filters for tall plants
 * - `overlayTileRef` - Texture overlay for tall plants (ice crystals, puddles)
 *
 * NOTE: Colors should match mutationColors in constants/colors.ts
 */
export const MutationVisualEffectsDex: Record<
  MutationId,
  MutationFilterBlueprint
> = {
  Rainbow: {
    filters: [
      new ColorGradientFilter({ ...rainbowFilterOptions }),
      new ColorBlendPreserveAlphaFilter(),
    ],
    tallPlantFilters: [
      new ColorGradientFilter({ ...rainbowFilterOptions, angle: 0 }),
      new ColorBlendPreserveAlphaFilter(),
    ],
  },
  Gold: {
    filters: new ColorOverlayFilter({ color: 'rgb(235, 200, 0)', alpha: 0.7 }),
  },
  Wet: {
    filters: new ColorOverlayFilter({
      color: 'rgb(50, 180, 200)',
      alpha: 0.25,
    }),
    iconTileRef: mutationsDex.Wet.tileRef,
    tallPlantIconOverrideTileRef: MutationTiles.Puddle,
    overlayTileRef: MutationOverlayTiles.WetTallPlant,
  },
  Chilled: {
    filters: new ColorOverlayFilter({
      color: 'rgb(100, 160, 210)',
      alpha: 0.45,
    }),
    iconTileRef: mutationsDex.Chilled.tileRef,
    overlayTileRef: MutationOverlayTiles.ChilledTallPlant,
  },
  Frozen: {
    filters: new ColorOverlayFilter({
      color: 'rgb(100, 130, 220)',
      alpha: 0.5,
    }),
    iconTileRef: mutationsDex.Frozen.tileRef,
    overlayTileRef: MutationOverlayTiles.FrozenTallPlant,
  },
  Dawnlit: {
    filters: new ColorOverlayFilter({ color: 'rgb(209, 70, 231)', alpha: 0.5 }),
    iconTileRef: mutationsDex.Dawnlit.tileRef,
  },
  Ambershine: {
    filters: new ColorOverlayFilter({ color: 'rgb(190, 100, 40)', alpha: 0.5 }),
    iconTileRef: mutationsDex.Ambershine.tileRef,
  },
  Dawncharged: {
    filters: new ColorOverlayFilter({ color: 'rgb(140, 80, 200)', alpha: 0.5 }),
    iconTileRef: mutationsDex.Dawncharged.tileRef,
  },
  Ambercharged: {
    filters: new ColorOverlayFilter({ color: 'rgb(170, 60, 25)', alpha: 0.5 }),
    iconTileRef: mutationsDex.Ambercharged.tileRef,
  },
};
