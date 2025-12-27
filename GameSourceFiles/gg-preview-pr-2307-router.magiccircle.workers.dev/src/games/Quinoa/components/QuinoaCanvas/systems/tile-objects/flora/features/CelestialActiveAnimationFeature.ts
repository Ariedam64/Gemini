import { AnimatedSprite, Assets, Container, type Spritesheet } from 'pixi.js';
import { HarvestType } from '@/common/games/Quinoa/systems/flora';
import type { WeatherId } from '@/common/games/Quinoa/systems/weather';
import type { QuinoaFrameContext } from '@/Quinoa/components/QuinoaCanvas/interfaces';
import type {
  PlantVisualFeature,
  PlantVisualFeatureContext,
} from './PlantVisualFeature';

/**
 * Renders a looping animation for celestial plants when their weather ability
 * is active.
 *
 * Shows the CelestialActive spritesheet animation on DawnCelestial and
 * MoonCelestial plants when they are mature AND the required weather condition
 * is active. Animation timing is synchronized across all plants using server
 * time.
 */
export class CelestialActiveAnimationFeature implements PlantVisualFeature {
  public readonly container: Container;

  private readonly animatedSprite: AnimatedSprite | null = null;
  private readonly requiredWeather: WeatherId;

  /**
   * Determines if this feature should be created for the given plant context.
   * Only applies to plants with an activeState weather requirement.
   */
  static shouldCreate(context: PlantVisualFeatureContext): boolean {
    const { blueprint } = context;
    const plantBlueprint = blueprint.plant;

    // Only applies to multiple harvest plants with activeState
    if (plantBlueprint.harvestType !== HarvestType.Multiple) {
      return false;
    }

    // Must have activeState with weatherRequirement
    return !!plantBlueprint.activeState?.weatherRequirement;
  }

  constructor(context: PlantVisualFeatureContext) {
    const { blueprint } = context;
    const plantBlueprint = blueprint.plant;

    if (plantBlueprint.harvestType !== HarvestType.Multiple) {
      throw new Error(
        'CelestialActiveAnimationFeature requires a multiple harvest plant'
      );
    }

    if (!plantBlueprint.activeState?.weatherRequirement) {
      throw new Error(
        'CelestialActiveAnimationFeature requires activeState.weatherRequirement'
      );
    }

    this.requiredWeather = plantBlueprint.activeState.weatherRequirement;

    this.container = new Container({
      label: 'CelestialActiveAnimation',
      zIndex: 1, // Render on top of the plant body
    });

    // Get animation frame names from spritesheet data and create AnimatedSprite
    const spritesheet = Assets.get<Spritesheet>('sprites-0.json');
    const frameNames =
      spritesheet.data.animations?.['sprite/animation/CelestialActive'];
    if (!frameNames) {
      console.warn('CelestialActive animation frames not found');
      return;
    }

    this.animatedSprite = AnimatedSprite.fromFrames(frameNames);
    this.animatedSprite.anchor.set(0.5, context.bodyVisual.anchor.y);
    this.animatedSprite.loop = true;
    this.animatedSprite.animationSpeed = 0.3;
    this.animatedSprite.play();
    this.animatedSprite.visible = false;

    this.container.addChild(this.animatedSprite);
  }

  /**
   * Updates the animation frame based on server time.
   * Only visible when the plant is mature and the required weather is active.
   */
  update(context: QuinoaFrameContext, isPlantMature: boolean): void {
    if (!this.animatedSprite) return;
    this.animatedSprite.visible =
      isPlantMature && context.weatherId === this.requiredWeather;
  }

  destroy(): void {
    this.container.destroy({ children: true });
  }
}
