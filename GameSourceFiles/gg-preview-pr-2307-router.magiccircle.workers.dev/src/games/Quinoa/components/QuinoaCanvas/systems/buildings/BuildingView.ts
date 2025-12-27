import type * as tiled from '@kayahr/tiled';
import { getDefaultStore } from 'jotai';
import { Bounds, Sprite, type Texture } from 'pixi.js';
import { type ActionType, actionAtom } from '@/Quinoa/data/action/actionAtom';
import { executeAction } from '@/Quinoa/data/action/executeAction/executeAction';
import type { QuinoaFrameContext } from '../../interfaces';
import {
  addFilter,
  getInteractionActiveHighlightFilter,
  getInteractionHoverHighlightFilter,
  removeFilter,
} from '../../pixi/filters/interactionHighlightFilter';
import { calculateZIndex, gridToWorldPixels, ZLayer } from '../../sprite-utils';
import { TileObjectObscuringEffectConfig } from '../tile-objects/doesTileObjectObscureAvatar';

/**
 * Parsed metadata from a Tiled map object.
 */
export interface BuildingMetadata {
  id: number;
  name?: string;
  type?: string;
  /** Action ID triggered by interacting with this building (e.g. "seedShop"). */
  quinoaAction?: string;
  /** Pivot point Y-ratio for z-sorting (0=top, 1=bottom). */
  foregroundYRatio: number;
  /** Whether the building becomes transparent when obscuring the player. */
  isTransparentWhenOccluding: boolean;
  /** Vertical pixel offset applied to avatars standing in the foreground region. */
  avatarYNudgePixels: number;
}

/**
 * Extracts typed metadata from a Tiled map object, applying defaults.
 */
function parseBuildingMetadata(obj: tiled.MapObject): BuildingMetadata {
  const props = obj.properties ?? [];

  const getFloat = (name: string, fallback: number): number => {
    const prop = props.find((p) => p.name === name);
    return typeof prop?.value === 'number' ? prop.value : fallback;
  };

  const getBoolean = (name: string, fallback: boolean): boolean => {
    const prop = props.find((p) => p.name === name);
    return typeof prop?.value === 'boolean' ? prop.value : fallback;
  };

  const getString = (name: string): string | undefined => {
    const prop = props.find((p) => p.name === name);
    return typeof prop?.value === 'string' ? prop.value : undefined;
  };

  return {
    id: obj.id,
    name: obj.name || undefined,
    type: obj.type || undefined,
    quinoaAction: getString('quinoaAction'),
    foregroundYRatio: getFloat('foregroundYRatio', 0.5),
    isTransparentWhenOccluding: getBoolean('isTransparentWhenOccluding', false),
    avatarYNudgePixels: getFloat('avatarYNudgePixels', 0),
  };
}

/**
 * Renders a building from a Tiled object layer.
 * Handles z-sorting, occlusion transparency, and interaction logic.
 */
export class BuildingView {
  private readonly sprite: Sprite;
  private readonly metadata: BuildingMetadata;
  private readonly store = getDefaultStore();
  private readonly buildingAction: string | null;

  private isPlayerInActivationRange = false;
  private isHovering = false;
  private isPressed = false;
  private cleanupInteraction: (() => void) | null = null;

  private occlusionBounds: Bounds | null = null;
  private foregroundBounds: Bounds | null = null;
  private baseAlpha = 1;

  constructor(texture: Texture, obj: tiled.MapObject, layerIndex: number) {
    this.metadata = parseBuildingMetadata(obj);

    this.sprite = new Sprite({
      texture,
      anchor: { x: 0, y: 1 }, // Tiled objects are bottom-left anchored
      position: { x: obj.x, y: obj.y },
      angle: obj.rotation || 0,
      width: obj.width,
      height: obj.height,
      label: `Building (${obj.id}${obj.name ? `: ${obj.name}` : ''})`,
    });

    // Z-Index Calculation
    // We calculate a base z-index based on the Y-position of the sorting pivot.
    // We then offset this by a large multiplier of the layer index to ensure
    // that buildings in higher Tiled layers always render on top of lower ones.
    const width = obj.width ?? 0;
    const height = obj.height ?? 0;
    const sortingPivotY = obj.y - height * this.metadata.foregroundYRatio;
    const baseZIndex = calculateZIndex(sortingPivotY, ZLayer.AboveForeground);
    this.sprite.zIndex = layerIndex * 200_000_000 + baseZIndex;

    // Occlusion Bounds
    if (this.metadata.isTransparentWhenOccluding) {
      this.occlusionBounds = new Bounds(
        obj.x,
        obj.y - height,
        obj.x + width,
        sortingPivotY
      );
    }

    // Foreground Bounds (for avatar nudging)
    if (this.metadata.avatarYNudgePixels !== 0) {
      this.foregroundBounds = new Bounds(
        obj.x,
        sortingPivotY,
        obj.x + width,
        obj.y
      );
    }

    this.buildingAction = this.resolveBuildingAction(
      this.metadata.quinoaAction ?? this.metadata.type
    );
    this.setupInteractivity();
  }

  get displayObject(): Sprite {
    return this.sprite;
  }

  getMetadata(): Readonly<BuildingMetadata> {
    return this.metadata;
  }

  get id(): number {
    return this.metadata.id;
  }

  /**
   * Returns true if the given world position is within the building's foreground bounds.
   * Used for nudging avatars when they walk "in front" of the building.
   */
  containsWorldPosition(x: number, y: number): boolean {
    return this.foregroundBounds?.containsPoint(x, y) ?? false;
  }

  setBaseAlpha(alpha: number): void {
    this.baseAlpha = alpha;
    this.sprite.alpha = alpha;
  }

  update(context: QuinoaFrameContext): void {
    // 1. Update Interaction State
    if (this.buildingAction) {
      const currentAction = this.store.get(actionAtom);
      const nextInRange = currentAction === this.buildingAction;
      const rangeChanged = nextInRange !== this.isPlayerInActivationRange;
      this.isPlayerInActivationRange = nextInRange;
      this.sprite.cursor = this.isPlayerInActivationRange
        ? 'pointer'
        : 'default';

      // If the building becomes inactive while hovered/pressed, clear highlight.
      if (rangeChanged && !this.isPlayerInActivationRange) {
        this.clearHoverHighlight();
        this.clearActiveHighlight();
        this.isHovering = false;
        this.isPressed = false;
      }
    }

    // 2. Update Occlusion Transparency
    if (this.occlusionBounds) {
      const { x, y } = gridToWorldPixels(context.playerPosition);
      const isOccluding = this.occlusionBounds.containsPoint(x, y);

      this.sprite.alpha = isOccluding
        ? TileObjectObscuringEffectConfig.alphaWhenObscuring * this.baseAlpha
        : this.baseAlpha;
    }
  }

  private setupInteractivity(): void {
    if (!this.buildingAction) {
      return;
    }

    const onPointerEnter = () => {
      this.isHovering = true;
      if (this.isPlayerInActivationRange && !this.isPressed) {
        this.applyHoverHighlight();
      }
    };

    const onPointerLeave = () => {
      this.isHovering = false;
      this.isPressed = false;
      this.clearHoverHighlight();
      this.clearActiveHighlight();
    };

    const onPointerDown = () => {
      if (!this.isPlayerInActivationRange) {
        return;
      }
      this.isPressed = true;
      this.clearHoverHighlight();
      this.applyActiveHighlight();
    };

    const onPointerUp = () => {
      this.isPressed = false;
      this.clearActiveHighlight();
      if (this.isHovering && this.isPlayerInActivationRange) {
        this.applyHoverHighlight();
      }
    };

    const onPointerUpOutside = () => {
      this.isHovering = false;
      this.isPressed = false;
      this.clearHoverHighlight();
      this.clearActiveHighlight();
    };

    const onPointerTap = () => {
      if (!this.isPlayerInActivationRange) return;

      // Double-check against atom state to be safe
      const currentAction = this.store.get(actionAtom);
      if (currentAction === this.buildingAction) {
        executeAction();
      }
    };

    this.sprite.eventMode = 'static';
    this.sprite.cursor = 'default';

    this.sprite.on('pointerenter', onPointerEnter);
    this.sprite.on('pointerleave', onPointerLeave);
    this.sprite.on('pointerdown', onPointerDown);
    this.sprite.on('pointerup', onPointerUp);
    this.sprite.on('pointerupoutside', onPointerUpOutside);
    this.sprite.on('pointertap', onPointerTap);

    this.cleanupInteraction = () => {
      this.clearHoverHighlight();
      this.clearActiveHighlight();
      this.sprite.off('pointerdown', onPointerDown);
      this.sprite.off('pointerenter', onPointerEnter);
      this.sprite.off('pointerleave', onPointerLeave);
      this.sprite.off('pointerup', onPointerUp);
      this.sprite.off('pointerupoutside', onPointerUpOutside);
      this.sprite.off('pointertap', onPointerTap);
      this.sprite.eventMode = 'auto';
      this.sprite.cursor = 'auto';
    };
  }

  private resolveBuildingAction(actionKey?: string): ActionType | null {
    if (!actionKey) return null;
    return actionKey as ActionType;
  }

  private applyHoverHighlight(): void {
    addFilter(this.sprite, getInteractionHoverHighlightFilter());
  }

  private clearHoverHighlight(): void {
    removeFilter(this.sprite, getInteractionHoverHighlightFilter());
  }

  private applyActiveHighlight(): void {
    addFilter(this.sprite, getInteractionActiveHighlightFilter());
  }

  private clearActiveHighlight(): void {
    removeFilter(this.sprite, getInteractionActiveHighlightFilter());
  }

  destroy(): void {
    this.cleanupInteraction?.();
    this.sprite.destroy();
  }
}
