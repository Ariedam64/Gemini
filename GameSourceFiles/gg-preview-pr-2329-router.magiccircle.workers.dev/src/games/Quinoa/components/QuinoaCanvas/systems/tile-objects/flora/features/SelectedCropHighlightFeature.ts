import { getDefaultStore } from 'jotai';
import { Container, type Filter } from 'pixi.js';
import { HarvestType } from '@/common/games/Quinoa/systems/flora/HarvestType';
import type { GridPosition } from '@/common/games/Quinoa/world/map';
import { myCurrentGrowSlotIndexAtom } from '@/Quinoa/atoms/myAtoms';
import type { QuinoaFrameContext } from '@/Quinoa/components/QuinoaCanvas/interfaces';
import { getInteractionActiveHighlightFilter } from '../../../../pixi/filters/interactionHighlightFilter';
import type { GrowingCropVisual } from '../visuals/GrowingCropVisual';
import type {
  PlantVisualFeature,
  PlantVisualFeatureContext,
} from './PlantVisualFeature';

const { get } = getDefaultStore();

/**
 * Highlights the currently selected grow slot with an outline when the
 * local player is standing on the plant's tile.
 */
export class SelectedCropHighlightFeature implements PlantVisualFeature {
  public readonly container: Container;

  private readonly cropVisuals: GrowingCropVisual[];
  private readonly worldPosition: GridPosition;
  private readonly baseFilters: Map<number, Filter[] | null> = new Map();
  private highlightedIndex: number | null = null;

  static shouldCreate(context: PlantVisualFeatureContext): boolean {
    return (
      context.blueprint.plant.harvestType === HarvestType.Multiple &&
      context.worldPosition !== undefined &&
      context.cropVisuals.length > 1
    );
  }

  constructor(context: PlantVisualFeatureContext) {
    const { cropVisuals, worldPosition } = context;
    if (!worldPosition) {
      throw new Error('SelectedCropOutlineFeature requires worldPosition');
    }

    this.container = new Container({ label: 'SelectedCropOutlineFeature' });
    this.cropVisuals = cropVisuals;
    this.worldPosition = worldPosition;
  }

  update(context: QuinoaFrameContext): void {
    const isPlayerOnPlant =
      context.playerPosition.x === this.worldPosition.x &&
      context.playerPosition.y === this.worldPosition.y;

    if (!isPlayerOnPlant) {
      this.clearHighlight();
      return;
    }

    const selectedIndex = get(myCurrentGrowSlotIndexAtom);
    this.applyHighlight(selectedIndex);
    // outlineFilter.thickness = Math.round(context.zoomLevel * 15);
  }

  destroy(): void {
    this.clearHighlight();
    this.container.destroy({ children: true });
  }

  private applyHighlight(index: number | null): void {
    if (index === this.highlightedIndex) {
      return;
    }

    if (this.highlightedIndex !== null) {
      this.restoreFilters(this.highlightedIndex);
    }

    if (index === null) {
      this.highlightedIndex = null;
      return;
    }

    const crop = this.cropVisuals[index];
    if (!crop) {
      this.highlightedIndex = null;
      return;
    }

    if (!this.baseFilters.has(index)) {
      const existingFilters = crop.getInteractionTarget().filters;
      this.baseFilters.set(
        index,
        existingFilters ? [...existingFilters] : null
      );
    }

    const baseFilters = this.baseFilters.get(index) ?? null;
    const highlightFilter = getInteractionActiveHighlightFilter();
    // Apply the highlight only to the crop sprite, not mutation icon sprites.
    crop.getInteractionTarget().filters = baseFilters
      ? [...baseFilters, highlightFilter]
      : [highlightFilter];

    this.highlightedIndex = index;
  }

  private clearHighlight(): void {
    if (this.highlightedIndex === null) {
      return;
    }
    this.restoreFilters(this.highlightedIndex);
    this.highlightedIndex = null;
  }

  private restoreFilters(index: number): void {
    const crop = this.cropVisuals[index];
    if (!crop) {
      return;
    }
    const baseFilters = this.baseFilters.get(index) ?? null;
    crop.getInteractionTarget().filters = baseFilters ?? null;
  }
}
