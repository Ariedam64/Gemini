import { getDefaultStore } from 'jotai';
import {
  type Container,
  type FederatedPointerEvent,
  Graphics,
  Rectangle,
} from 'pixi.js';
import type { FloraSpeciesBlueprint } from '@/common/games/Quinoa/systems/flora';
import { HarvestType } from '@/common/games/Quinoa/systems/flora';
import type { PlantTileObject } from '@/common/games/Quinoa/user-json-schema/current';
import type { GridPosition } from '@/common/games/Quinoa/world/map';
import { myCurrentGrowSlotIndexAtom } from '@/Quinoa/atoms/myAtoms';
import { positionAtom } from '@/Quinoa/atoms/positionAtoms';
import {
  addFilter,
  getInteractionActiveHighlightFilter,
  getInteractionHoverHighlightFilter,
  removeFilter,
} from '../../../pixi/filters/interactionHighlightFilter';
import { FLORA_SCALABLE_RENDER_SCALE } from '../../../sprite-utils';
import type { GrowingCropVisual } from './visuals/GrowingCropVisual';

/**
 * Configuration for crop interaction animations and feedback.
 */
const interactionConfig = {
  /** Factor for exponential easing (lerp) per frame. Higher is faster. */
  easeFactor: 0.2,
  /** Opacity multiplier when pressing a crop. */
  pressTintAlpha: 0.85,
  /** Scale multiplier when hovering a crop. */
  hoverScale: 1.1,
  /** Scale multiplier when pressing a crop. */
  pressScale: 0.97,
  /** Maximum degrees to rotate towards 0 when straightening a hovered crop. */
  maxRotationCorrectionDegrees: 10,
  /** Whether to render debug graphics for interaction hitboxes. */
  debugHitboxes: false,
  /** Scale threshold above which a crop remains in the top Z-layer. */
  zIndexHysteresisThreshold: 1.01,
};

interface InteractionState {
  container: Container;
  currentScale: number;
  targetScale: number;
  currentAlpha: number;
  targetAlpha: number;
  baseZIndex: number;
  isHovered: boolean;
  /**
   * Factor (0-1) for straightening rotation.
   * 0 = natural rotation (wobbly), 1 = fully straightened (upright).
   */
  currentStraighteningFactor: number;
}

interface InteractionOptions {
  blueprint: FloraSpeciesBlueprint;
  plant: PlantTileObject;
  worldPosition: GridPosition;
  cropVisuals: readonly GrowingCropVisual[];
}

/**
 * Manages per-plant crop interactivity and eased feedback.
 */
export class PlantInteractionController {
  private readonly store: ReturnType<typeof getDefaultStore>;
  private interactivityEnabled = false;
  private cropInteractionCleanups: Array<() => void> = [];
  private cropInteractionStates: InteractionState[] = [];

  constructor(store: ReturnType<typeof getDefaultStore> = getDefaultStore()) {
    this.store = store;
  }

  /**
   * Wire or unwire interactions depending on player position and plant rules.
   */
  syncInteractivity(options: InteractionOptions): void {
    const { blueprint, plant, worldPosition, cropVisuals } = options;
    const isPlayerOnThisTile = this.isPlayerOnTile(worldPosition);

    // Skip interactivity for single-harvest plants or 1-slot multi-harvest plants
    if (
      blueprint.plant.harvestType === HarvestType.Single ||
      (blueprint.plant.harvestType === HarvestType.Multiple &&
        plant.slots.length === 1)
    ) {
      return;
    }

    // Return if state hasn't changed
    if (isPlayerOnThisTile === this.interactivityEnabled) {
      return;
    }

    this.teardown();

    if (!isPlayerOnThisTile) {
      this.interactivityEnabled = false;
      return;
    }

    this.cropInteractionStates = cropVisuals.map((crop) => ({
      container: crop.container,
      currentScale: 1,
      targetScale: 1,
      currentAlpha: 1,
      targetAlpha: 1,
      baseZIndex: crop.container.zIndex,
      isHovered: false,
      currentStraighteningFactor: 0,
    }));

    const parentContainer = cropVisuals[0]?.container.parent;
    if (!parentContainer) {
      return;
    }

    // Disable interaction on non-crop children to prevent interference
    const nonCropChildren: Container[] = [];
    parentContainer.children.forEach((child) => {
      const isCrop = cropVisuals.some((c) => c.container === child);
      if (!isCrop) {
        child.eventMode = 'none';
        nonCropChildren.push(child);
      }
    });

    let activeHoverIndex: number | null = null;
    let isPressed = false;

    const updateAllTargets = (): void => {
      const hoverFilter = getInteractionHoverHighlightFilter();
      const activeFilter = getInteractionActiveHighlightFilter();
      this.cropInteractionStates.forEach((state, index) => {
        const isHovered = index === activeHoverIndex;
        state.isHovered = isHovered;

        state.targetScale =
          isHovered && isPressed
            ? interactionConfig.pressScale
            : isHovered
              ? interactionConfig.hoverScale
              : 1;
        state.targetAlpha =
          isHovered && isPressed ? interactionConfig.pressTintAlpha : 1;

        // Apply a subtle highlight on hover, but don't stack with the active
        // (selected) highlight filter (SelectedCropHighlightFeature).
        const sprite = cropVisuals[index]?.getInteractionTarget();
        if (!sprite) {
          return;
        }
        const hasActive = (sprite.filters ?? []).includes(activeFilter);
        if (isHovered && !hasActive) {
          addFilter(sprite, hoverFilter);
        } else {
          removeFilter(sprite, hoverFilter);
        }
      });
    };

    const updateHoverState = (e: FederatedPointerEvent): void => {
      // Calculate "nearest center" logic for selection
      const localPoint = parentContainer.toLocal(e.global);

      let closestIndex = -1;
      let closestDistSq = Infinity;

      cropVisuals.forEach((crop, index) => {
        const cropX = crop.container.x;
        const cropY = crop.container.y;
        const dx = localPoint.x - cropX;
        const dy = localPoint.y - cropY;
        const distSq = dx * dx + dy * dy;

        if (distSq < closestDistSq) {
          closestDistSq = distSq;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeHoverIndex) {
        activeHoverIndex = closestIndex;
        updateAllTargets();
      }
    };

    const handlePointerMove = (e: FederatedPointerEvent): void => {
      updateHoverState(e);
    };

    const handlePointerDown = (e: FederatedPointerEvent): void => {
      isPressed = true;
      updateHoverState(e);
      updateAllTargets();
    };

    const handlePointerUp = (): void => {
      isPressed = false;
      updateAllTargets();
    };

    const handlePointerUpOutside = (): void => {
      isPressed = false;
      activeHoverIndex = null;
      updateAllTargets();
    };

    const handlePointerLeave = (): void => {
      // When the pointer leaves the plant entirely, clear hover state so
      // crops ease back down to their base scale.
      isPressed = false;
      activeHoverIndex = null;
      updateAllTargets();
    };

    const handlePointerTap = (): void => {
      if (activeHoverIndex === null) return;

      const playerPosition = this.store.get(positionAtom);
      if (
        !playerPosition ||
        playerPosition.x !== worldPosition.x ||
        playerPosition.y !== worldPosition.y
      ) {
        return;
      }
      this.store.set(myCurrentGrowSlotIndexAtom, activeHoverIndex);
    };

    const debugGraphics: Graphics[] = [];

    cropVisuals.forEach((crop) => {
      const container = crop.container;
      const sprite = crop.getInteractionTarget();
      const targetScale = crop.getTargetScale();

      const renderScale = targetScale * FLORA_SCALABLE_RENDER_SCALE;
      const width = sprite.texture.width * renderScale;
      const height = sprite.texture.height * renderScale;

      // Center hitArea based on anchor
      const anchor = sprite.anchor;
      const x = -width * anchor.x;
      const y = -height * anchor.y;

      container.hitArea = new Rectangle(x, y, width, height);
      container.eventMode = 'static';
      container.cursor = 'pointer';

      if (interactionConfig.debugHitboxes) {
        const debug = new Graphics();
        debug
          .rect(x, y, width, height)
          .fill({ color: 0x00ff00, alpha: 0.2 })
          .stroke({ width: 2, color: 0x00ff00 });
        debug.eventMode = 'none';
        container.addChild(debug);
        debugGraphics.push(debug);
      }
    });

    parentContainer.eventMode = 'static';
    // Remove the global hitArea on parent
    parentContainer.hitArea = null;

    parentContainer.on('pointermove', handlePointerMove);
    parentContainer.on('pointerdown', handlePointerDown);
    parentContainer.on('pointerup', handlePointerUp);
    parentContainer.on('pointerupoutside', handlePointerUpOutside);
    parentContainer.on('pointerleave', handlePointerLeave);
    parentContainer.on('pointertap', handlePointerTap);

    this.cropInteractionCleanups = [
      () => {
        parentContainer.off('pointermove', handlePointerMove);
        parentContainer.off('pointerdown', handlePointerDown);
        parentContainer.off('pointerup', handlePointerUp);
        parentContainer.off('pointerupoutside', handlePointerUpOutside);
        parentContainer.off('pointerleave', handlePointerLeave);
        parentContainer.off('pointertap', handlePointerTap);
        parentContainer.eventMode = 'none';
        parentContainer.cursor = 'auto';
        parentContainer.hitArea = null;

        // Restore eventMode for non-crop children
        nonCropChildren.forEach((child) => {
          child.eventMode = 'passive'; // or 'auto'
        });

        debugGraphics.forEach((g) => g.destroy());

        cropVisuals.forEach((crop) => {
          crop.container.eventMode = 'none';
          crop.container.cursor = 'auto';
          crop.container.hitArea = null;

          // Ensure hover highlight is fully cleared.
          removeFilter(
            crop.getInteractionTarget(),
            getInteractionHoverHighlightFilter()
          );
        });

        this.cropInteractionStates.forEach((state) => {
          state.currentScale = 1;
          state.targetScale = 1;
          state.currentAlpha = 1;
          state.targetAlpha = 1;
          state.container.scale.set(1);
          state.container.alpha = 1;
          state.container.zIndex = state.baseZIndex;
        });
      },
    ];

    this.interactivityEnabled = true;
  }

  /**
   * Eases toward target interaction states each frame.
   */
  updateEasing(): void {
    if (!this.interactivityEnabled || this.cropInteractionStates.length === 0) {
      return;
    }

    for (const state of this.cropInteractionStates) {
      state.currentScale +=
        (state.targetScale - state.currentScale) * interactionConfig.easeFactor;
      state.currentAlpha +=
        (state.targetAlpha - state.currentAlpha) * interactionConfig.easeFactor;
      state.container.scale.set(state.currentScale);
      state.container.alpha = state.currentAlpha;

      // Rotation Straightening
      // Eases the rotation towards 0 degrees when hovered
      const targetStraightening = state.isHovered ? 1 : 0;
      state.currentStraighteningFactor +=
        (targetStraightening - state.currentStraighteningFactor) *
        interactionConfig.easeFactor;

      // Calculate correction: move towards 0 by at most MAX_ROTATION_CORRECTION_DEGREES
      const currentAngle = state.container.angle;
      const correctionMagnitude = Math.min(
        Math.abs(currentAngle),
        interactionConfig.maxRotationCorrectionDegrees
      );
      const correction = Math.sign(currentAngle) * correctionMagnitude;

      // Apply smoothed correction
      state.container.angle -= correction * state.currentStraighteningFactor;

      // Z-Index Hysteresis: Keep on top if hovered OR if still significantly scaled up
      const isExpanded =
        state.currentScale > interactionConfig.zIndexHysteresisThreshold;
      if (state.isHovered || isExpanded) {
        state.container.zIndex = 100;
      } else {
        state.container.zIndex = state.baseZIndex;
      }
    }
  }

  /**
   * Removes interactions and restores visuals.
   */
  teardown(): void {
    for (const cleanup of this.cropInteractionCleanups) {
      cleanup();
    }
    this.cropInteractionCleanups = [];
    this.cropInteractionStates = [];
    this.interactivityEnabled = false;
  }

  private isPlayerOnTile(worldPosition: GridPosition): boolean {
    const playerPosition = this.store.get(positionAtom);
    return (
      !!playerPosition &&
      playerPosition.x === worldPosition.x &&
      playerPosition.y === worldPosition.y
    );
  }
}
