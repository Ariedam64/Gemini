import { Sprite, Texture } from 'pixi.js';
import { WeatherId } from '@/common/games/Quinoa/systems/weather';
import type { QuinoaFrameContext } from '@/Quinoa/components/QuinoaCanvas/interfaces';
import type {
  DecorVisualFeature,
  DecorVisualFeatureContext,
} from './DecorVisualFeature';

/**
 * Renders a superimposed ornament sprite on MiniWizardTower when Dawn or
 * AmberMoon weather is active.
 *
 * The ornament sprite is added as a child of the base tower sprite, so it
 * overlays on top of the existing decor art. TexturePacker pivot/anchor
 * points ensure proper alignment without manual positioning.
 */
export class MiniWizardTowerOrnamentFeature implements DecorVisualFeature {
  public readonly displayObject: Sprite;

  private lastWeatherId: WeatherId | null = null;

  /**
   * Determines if this feature should be created for the given decor context.
   * Only applies to MiniWizardTower.
   */
  static shouldCreate(context: DecorVisualFeatureContext): boolean {
    return context.decorId === 'MiniWizardTower';
  }

  constructor(context: DecorVisualFeatureContext) {
    const { baseSprite } = context;

    // Create ornament sprite - start hidden
    this.displayObject = new Sprite({
      texture: Texture.EMPTY,
      visible: false,
      label: 'MiniWizardTowerOrnament',
    });

    // Position at (0,0) - TexturePacker anchors handle alignment
    // The ornament will be positioned relative to baseSprite's origin
    this.displayObject.position.set(0, 0);

    // Add as child of base sprite so it renders on top
    // Ensure it renders above the base sprite texture by setting zIndex
    this.displayObject.zIndex = 1;
    baseSprite.addChild(this.displayObject);
  }

  /**
   * Updates ornament visibility and texture based on current weather.
   */
  update(context: QuinoaFrameContext): void {
    const { weatherId } = context;

    // Skip update if weather hasn't changed
    if (weatherId === this.lastWeatherId) {
      return;
    }

    this.lastWeatherId = weatherId;

    // Map weather to ornament frame name
    let frameName: string | null = null;
    if (weatherId === WeatherId.Dawn) {
      frameName = 'sprite/decor/MiniWizardTowerOrnamentDawn';
    } else if (weatherId === WeatherId.AmberMoon) {
      frameName = 'sprite/decor/MiniWizardTowerOrnamentAmberMoon';
    }

    if (frameName) {
      const texture = Texture.from(frameName);
      // Apply TexturePacker anchor if available
      if (texture.defaultAnchor) {
        this.displayObject.anchor.copyFrom(texture.defaultAnchor);
      }
      this.displayObject.texture = texture;
      this.displayObject.visible = true;
    } else {
      // Hide ornament for other weather or no weather
      this.displayObject.visible = false;
    }
  }

  destroy(): void {
    this.displayObject.destroy();
  }
}
