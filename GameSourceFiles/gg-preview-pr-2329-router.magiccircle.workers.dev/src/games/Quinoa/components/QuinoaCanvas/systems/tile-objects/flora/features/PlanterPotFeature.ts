import { Container, Sprite } from 'pixi.js';
import { toolsDex } from '@/common/games/Quinoa/systems/tools';
import type { QuinoaFrameContext } from '@/Quinoa/components/QuinoaCanvas/interfaces';
import { getTextureFromTileRef } from '../../../../legacy/tile-mappings';
import type {
  PlantVisualFeature,
  PlantVisualFeatureContext,
} from './PlantVisualFeature';

/**
 * Renders a planter pot beneath plants.
 * Used for isolated rendering (e.g., inventory/UI) when renderPlanterPot is true.
 * Works for both mature and immature plants.
 */
export class PlanterPotFeature implements PlantVisualFeature {
  public readonly container: Container;
  private readonly sprite: Sprite;

  /**
   * Determines if this feature should be created for the given plant context.
   */
  static shouldCreate(context: PlantVisualFeatureContext): boolean {
    return (
      context.isolateRendering === true && context.renderPlanterPot === true
    );
  }

  constructor(_context: PlantVisualFeatureContext) {
    this.container = new Container({
      label: 'PlanterPot',
      zIndex: -10,
    });

    const texture = getTextureFromTileRef(toolsDex.PlanterPot.tileRef);

    this.sprite = new Sprite({
      label: 'planter-pot',
      texture,
      anchor: { x: 0.5, y: 0.2 },
      position: { x: 0, y: 0 },
      angle: 0,
      alpha: 1,
    });
    this.container.addChild(this.sprite);
  }

  update(_context: QuinoaFrameContext, _isPlantMature: boolean): void {
    // Planter pot is always visible regardless of maturity
  }

  destroy(): void {
    this.container.destroy({ children: true });
  }
}
