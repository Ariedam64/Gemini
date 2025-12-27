import { AnimatedSprite, Assets, Container, type Spritesheet } from 'pixi.js';
import { HarvestType } from '@/common/games/Quinoa/systems/flora';
import { Rarity } from '@/common/games/Quinoa/systems/rarity';
import type { QuinoaFrameContext } from '@/Quinoa/components/QuinoaCanvas/interfaces';
import type {
  PlantVisualFeature,
  PlantVisualFeatureContext,
} from './PlantVisualFeature';

/**
 * Renders a looping animation for celestial plants while they are growing.
 *
 * Shows the CelestialGrowing spritesheet animation on all celestial plants
 * (Starweaver, DawnCelestial, MoonCelestial) until they reach maturity.
 * Animation timing is synchronized across all plants using server time.
 */
export class CelestialGrowingAnimationFeature implements PlantVisualFeature {
  public readonly container: Container;

  private readonly animatedSprite: AnimatedSprite | null = null;

  /**
   * Determines if this feature should be created for the given plant context.
   * Only applies to celestial plants with an immatureTileRef.
   */
  static shouldCreate(context: PlantVisualFeatureContext): boolean {
    const { blueprint } = context;
    const plantBlueprint = blueprint.plant;

    // Only applies to multiple harvest plants (all celestials are multiple harvest)
    if (plantBlueprint.harvestType !== HarvestType.Multiple) {
      return false;
    }

    // Must have immatureTileRef
    if (!plantBlueprint.immatureTileRef) {
      return false;
    }

    // Must be a celestial rarity species
    return blueprint.seed.rarity === Rarity.Celestial;
  }

  constructor(_context: PlantVisualFeatureContext) {
    this.container = new Container({
      label: 'CelestialGrowingAnimation',
      zIndex: 1, // Render on top of the plant body
    });

    // Get animation frame names from spritesheet data and create AnimatedSprite
    const spritesheet = Assets.get<Spritesheet>('sprites-0.json');
    const frameNames =
      spritesheet.data.animations?.['sprite/animation/CelestialGrowing'];
    if (!frameNames) {
      console.warn('CelestialGrowing animation frames not found');
      return;
    }

    this.animatedSprite = AnimatedSprite.fromFrames(frameNames);
    this.animatedSprite.anchor.set(0.5, _context.bodyVisual.anchor.y);
    this.animatedSprite.visible = false;
    this.animatedSprite.loop = true;
    this.animatedSprite.animationSpeed = 0.3;
    this.animatedSprite.play();

    this.container.addChild(this.animatedSprite);
  }

  /**
   * Updates the animation frame based on server time.
   * Only visible when the plant is not yet mature.
   */
  update(_context: QuinoaFrameContext, isPlantMature: boolean): void {
    if (!this.animatedSprite) return;
    this.animatedSprite.visible = !isPlantMature;
  }

  destroy(): void {
    this.container.destroy({ children: true });
  }
}
