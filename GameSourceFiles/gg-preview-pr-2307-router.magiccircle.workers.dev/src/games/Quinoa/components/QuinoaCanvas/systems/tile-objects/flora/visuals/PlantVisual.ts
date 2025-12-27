import { Container } from 'pixi.js';
import type { FloraSpeciesBlueprint } from '@/common/games/Quinoa/systems/flora';
import type { PlantTileObject } from '@/common/games/Quinoa/user-json-schema/current';
import type { GridPosition } from '@/common/games/Quinoa/world/map';
import type { QuinoaFrameContext } from '@/Quinoa/components/QuinoaCanvas/interfaces';
import { AreaIndicatorFeature } from '../features/AreaIndicatorFeature';
import { CelestialActiveAnimationFeature } from '../features/CelestialActiveAnimationFeature';
import { CelestialGrowingAnimationFeature } from '../features/CelestialGrowingAnimationFeature';
import { ImmatureFeature } from '../features/ImmatureFeature';
import type {
  PlantVisualFeature,
  PlantVisualFeatureClass,
  PlantVisualFeatureContext,
} from '../features/PlantVisualFeature';
import { SelectedCropHighlightFeature } from '../features/SelectedCropHighlightFeature';
import { StarweaverPulseFeature } from '../features/StarweaverPulseFeature';
import { TopLayerFeature } from '../features/TopLayerFeature';
import type { GrowingCropVisual } from './GrowingCropVisual';
import { PlantBodyVisual } from './PlantBodyVisual';

/**
 * All available plant visual features.
 * Each feature's shouldCreate() determines if it applies to a given plant.
 */
const PLANT_FEATURES: PlantVisualFeatureClass[] = [
  ImmatureFeature,
  TopLayerFeature,
  StarweaverPulseFeature,
  AreaIndicatorFeature,
  CelestialGrowingAnimationFeature,
  CelestialActiveAnimationFeature,
  SelectedCropHighlightFeature,
];

/**
 * Options for configuring a PlantVisual instance.
 */
export interface PlantVisualOptions {
  /** Plant data used to drive growth and slots. */
  plant: PlantTileObject;
  /** Flora blueprint for this species. */
  blueprint: FloraSpeciesBlueprint;
  /** Force the plant to render at its maximum target scale regardless of growth progress */
  forceMaxScale?: boolean;
  /** World position of the plant (required for area indicator features). */
  worldPosition?: GridPosition;
  /**
   * When true, renders in isolation (e.g., for inventory/UI) rather than
   * as part of the world scene. Skips GlobalRenderLayers attachment.
   */
  isolateRendering?: boolean;
}

/**
 * Draws a plant body, crops, and dirt patch into a Pixi container.
 */
export class PlantVisual {
  /** Root container hosting all plant sprites. */
  public container: Container;

  private readonly plant: PlantTileObject;
  private readonly blueprint: FloraSpeciesBlueprint;
  private readonly worldPosition: GridPosition | undefined;
  private readonly isolateRendering: boolean;

  // Sub-components
  public readonly bodyVisual: PlantBodyVisual;
  private features: PlantVisualFeature[] = [];

  /**
   * Create a PlantVisual for the provided plant data.
   */
  constructor(options: PlantVisualOptions) {
    const {
      plant,
      blueprint,
      forceMaxScale = false,
      worldPosition,
      isolateRendering = false,
    } = options;
    this.plant = plant;
    this.blueprint = blueprint;
    this.worldPosition = worldPosition;
    this.isolateRendering = isolateRendering;

    this.container = new Container({
      sortableChildren: true,
      label: `${blueprint.plant.name} Visual`,
    });

    // 1. Initialize Body (includes crops as children)
    this.bodyVisual = new PlantBodyVisual({ plant, blueprint, forceMaxScale });
    this.container.addChild(this.bodyVisual.container);

    // 2. Add Features
    this.addFeatures();
  }

  /**
   * Update sprite transforms for the current frame.
   */
  update(context: QuinoaFrameContext): void {
    // Plant maturity (maturedAt) is when the plant body finishes growing.
    // This is distinct from crop maturity (slots[].endTime) which is when
    // individual crops are ready to harvest.
    const isPlantMature = this.plant.maturedAt <= context.serverTime;

    // 1. Update Body (includes crops)
    this.bodyVisual.update(context.serverTime);

    // 2. Update Features
    for (const feature of this.features) {
      feature.update(context, isPlantMature);
    }
  }

  /**
   * Destroy the Pixi container hierarchy.
   */
  destroy(): void {
    for (const feature of this.features) {
      feature.destroy();
    }
    this.container.destroy({ children: true });
  }

  /**
   * Creates and adds all applicable features for this plant.
   * Each feature's shouldCreate() determines if it applies.
   */
  private addFeatures(): void {
    const context: PlantVisualFeatureContext = {
      blueprint: this.blueprint,
      plant: this.plant,
      bodyVisual: this.bodyVisual,
      cropVisuals: this.bodyVisual.crops,
      worldPosition: this.worldPosition,
      isolateRendering: this.isolateRendering,
    };

    for (const FeatureClass of PLANT_FEATURES) {
      if (FeatureClass.shouldCreate(context)) {
        const feature = new FeatureClass(context);
        this.container.addChild(feature.container);
        this.features.push(feature);
      }
    }
  }

  /**
   * Exposes crop visuals so callers can manage interactions externally.
   */
  getCropVisuals(): readonly GrowingCropVisual[] {
    return this.bodyVisual.crops;
  }
}
