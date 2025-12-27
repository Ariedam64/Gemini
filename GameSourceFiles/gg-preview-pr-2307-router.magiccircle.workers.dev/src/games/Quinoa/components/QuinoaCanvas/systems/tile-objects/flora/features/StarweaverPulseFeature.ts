import { Container } from 'pixi.js';
import type { QuinoaFrameContext } from '@/Quinoa/components/QuinoaCanvas/interfaces';
import type { GrowingCropVisual } from '../visuals/GrowingCropVisual';
import type {
  PlantVisualFeature,
  PlantVisualFeatureContext,
} from './PlantVisualFeature';

/**
 * Applies a heartbeat-style pulse animation to Starweaver crops.
 *
 * When the plant is mature, this feature applies a rhythmic scale and rotation
 * pulse to all crops, creating a magical "breathing" effect unique to
 * Starweaver plants.
 *
 * Unlike other features, this one doesn't render anything itself - it only
 * manipulates the existing crop visuals.
 */
export class StarweaverPulseFeature implements PlantVisualFeature {
  public readonly container: Container;

  private readonly cropVisuals: GrowingCropVisual[];

  /**
   * Determines if this feature should be created for the given plant context.
   */
  static shouldCreate(context: PlantVisualFeatureContext): boolean {
    return context.plant.species === 'Starweaver';
  }

  constructor(context: PlantVisualFeatureContext) {
    this.cropVisuals = context.cropVisuals;

    // Empty container - this feature only manipulates existing crops
    this.container = new Container({
      label: 'StarweaverPulseFeature',
    });
  }

  /**
   * Applies the pulse effect to all crops when the plant is mature.
   */
  update(context: QuinoaFrameContext, isPlantMature: boolean): void {
    if (!isPlantMature) {
      return;
    }

    for (const cropVisual of this.cropVisuals) {
      const baseScale = cropVisual.getCurrentBaseScale();
      this.applyPulse(cropVisual, context.serverTime, baseScale);
    }
  }

  /**
   * Applies the heartbeat-style animation to a single crop.
   */
  private applyPulse(
    cropVisual: GrowingCropVisual,
    serverTime: number,
    baseScale: number
  ): void {
    const cycleDuration = 2500;
    const timeInCycle = serverTime % cycleDuration;

    const beat1Start = 0;
    const beat1Duration = 2500;
    const beat2Start = 2700;
    const beat2Duration = 1500;

    let pulseFactor = 0;

    if (timeInCycle >= beat1Start && timeInCycle < beat1Start + beat1Duration) {
      const progress = (timeInCycle - beat1Start) / beat1Duration;
      pulseFactor = Math.sin(progress * Math.PI);
    } else if (
      timeInCycle >= beat2Start &&
      timeInCycle < beat2Start + beat2Duration
    ) {
      const progress = (timeInCycle - beat2Start) / beat2Duration;
      pulseFactor = Math.sin(progress * Math.PI) * 0.6;
    }

    const scalePulseFactor = pulseFactor ** 0.5;
    const scalePulse = 1 + 0.1 * scalePulseFactor;
    const rotationAmount = 4;

    cropVisual.setAngle(rotationAmount * (serverTime / 1000));
    const pulsedScale = baseScale * scalePulse;
    cropVisual.setScale(pulsedScale);
  }

  destroy(): void {
    this.container.destroy({ children: true });
  }
}
