import type { Sprite } from 'pixi.js';
import { decorDex } from '@/common/games/Quinoa/systems/decor';
import type {
  GardenTileObject,
  PetSlot,
} from '@/common/games/Quinoa/user-json-schema/current';
import type { GridPosition } from '@/common/games/Quinoa/world/map';
import type { QuinoaFrameContext } from '../../interfaces';
import { calculateZIndex, TILE_SIZE_WORLD, ZLayer } from '../../sprite-utils';
import { PetVisual } from './PetVisual';

// === Easing Functions ===
function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
}

const Config = {
  /** Breathing animation intensity (squash/stretch amount) */
  breathingAmount: 0.03,
  /** Breathing animation speed in radians per second */
  breathingSpeed: 2,
  /** Default tween duration (ms) if species doesn't override it. */
  defaultMoveTweenDurationMs: 400,
  /** Duration for growth/scale interpolation in ms */
  scaleDurationMs: 1000,
  /** Minimum breathing speed multiplier based on tween duration */
  minBreathingMultiplier: 0.6,
  /**
   * Exponent applied to the tween-duration ratio to make fast pets breathe
   * disproportionately faster without speeding up slow pets.
   */
  breathingMultiplierExponent: 2,
  /** Maximum breathing speed multiplier based on tween duration */
  maxBreathingMultiplier: 20,
  /** X position offset as fraction of tile size (0.5 = center) */
  petXOffset: 0.5,
  /** Y position offset for ground pets as fraction of tile size (0.9 = near bottom) */
  groundPetYOffset: 0.9,
  /** Y position offset for flying pets as fraction of tile size (0.5 = center) */
  flyingPetYOffset: 0.5,
  /** Decor nudgeY as fraction of tile size. This is in addition to the intrinsic nudgeY
   * of the decor, since that is based on avatar positioning.*/
  decorNudgeYOffset: -0.32,
};

export class PetView {
  public readonly displayObject: Sprite;

  private petSlot: PetSlot;
  private worldPosition: GridPosition;
  private readonly petVisual: PetVisual;
  private isFlying: boolean;

  // === Animation State ===

  // Position Interpolation (footprint / ground position, in world pixels)
  private startX: number;
  private startY: number;
  private targetX: number;
  private targetY: number;
  private moveStartTime: number = 0;
  private moveDuration: number = 0;
  private startDecorOffsetY: number = 0;
  private targetDecorOffsetY: number = 0;

  // Scale Interpolation
  private startScale: number;
  private targetScale: number;
  private scaleStartTime: number = 0;
  private hasPendingScaleUpdate: boolean = false;
  private moveTweenDurationMs: number;

  // Breathing Animation
  /** Random phase offset in radians to stagger breathing animations */
  private readonly breathingPhaseOffset: number;

  public get position(): GridPosition {
    return this.worldPosition;
  }

  private get desiredX(): number {
    return (
      this.worldPosition.x * TILE_SIZE_WORLD +
      TILE_SIZE_WORLD * Config.petXOffset
    );
  }
  private get desiredY(): number {
    const yOffset = this.isFlying
      ? Config.flyingPetYOffset
      : Config.groundPetYOffset;
    return this.worldPosition.y * TILE_SIZE_WORLD + TILE_SIZE_WORLD * yOffset;
  }

  constructor(petSlot: PetSlot, worldPosition: GridPosition) {
    this.petSlot = petSlot;
    this.worldPosition = worldPosition;
    // Create PetVisual
    this.petVisual = new PetVisual({ petSlot, autoUpdateScale: false });
    this.displayObject = this.petVisual.sprite;
    // Initialize flying state
    this.isFlying = this.petVisual.blueprint.isFlying === true;

    this.startX = this.targetX = this.desiredX;
    this.startY = this.targetY = this.desiredY;

    this.startScale = this.targetScale = this.petVisual.getBaseScale();
    this.moveTweenDurationMs =
      this.petVisual.blueprint.moveTweenDurationMs ??
      Config.defaultMoveTweenDurationMs;
    // Random phase offset to stagger breathing animations (0 to 2π)
    this.breathingPhaseOffset = Math.random() * Math.PI * 2;
    // Initial position
    this.displayObject.position.set(this.desiredX, this.desiredY);
    this.petVisual.setScale(this.targetScale);
    this.startDecorOffsetY = 0;
    this.targetDecorOffsetY = 0;
  }

  updateData(petSlot: PetSlot, worldPosition: GridPosition): void {
    this.petSlot = petSlot;
    this.worldPosition = worldPosition;
    this.petVisual.updateFromPetSlot(petSlot);
    this.isFlying = this.petVisual.blueprint.isFlying === true;
    this.moveTweenDurationMs =
      this.petVisual.blueprint.moveTweenDurationMs ??
      Config.defaultMoveTweenDurationMs;
    // Defer all tween retargeting to update() so we use the same clock
    // (context.time) and have access to the current tile decor offset.
    // This synchronizes the server-driven data update with the client-side render loop.
    this.hasPendingScaleUpdate = true;
  }

  update(
    context: QuinoaFrameContext,
    tileData: Readonly<GardenTileObject> | undefined
  ): void {
    const now = context.time;
    // 1. Calculate and update movement (position + decor offset)
    const { renderX, renderY, moveProgress } = this.updateMovement(
      now,
      tileData
    );
    // 2. Calculate and update scale
    const renderBaseScale = this.updateScale(now);
    // 3. Apply breathing animation
    this.updateBreathing(now, renderBaseScale);
    // 4. Apply Transforms
    this.displayObject.position.set(renderX, renderY);
    // 5. Update Z-index
    this.updateZIndex(moveProgress);
  }

  /**
   * Handles position interpolation, decor offsets, and tween management.
   */
  private updateMovement(
    now: number,
    tileData: Readonly<GardenTileObject> | undefined
  ): {
    renderX: number;
    renderY: number;
    moveProgress: number;
  } {
    // Compute desired target (base + decor offset)
    const decorNudgeY = this.getDecorNudgeY(tileData);
    const desiredDecorOffsetY = decorNudgeY * TILE_SIZE_WORLD;

    let renderX: number;
    let renderY: number;
    let moveProgress = 1;

    if (this.isFlying) {
      // === Flying: Smooth tweened movement ===
      // On the first render update, the constructor may not have had `tileData`
      // yet (so decor offset starts at 0). Initialize the decor offset from the
      // current tile immediately to avoid a "spawn slide" up onto rugs/bridges.
      if (this.moveStartTime === 0) {
        this.startX = this.targetX = this.desiredX;
        this.startY = this.targetY = this.desiredY;
        this.startDecorOffsetY = this.targetDecorOffsetY = desiredDecorOffsetY;
        this.moveDuration = 0;
        this.moveStartTime = now;
      }

      // If the desired target changed, start/re-target the tween from the current
      // rendered position (supports multiple moves while already moving).
      //
      // NOTE: The decor offset is part of the render target. It can change even
      // when the pet stays on the same tile (e.g. decor added/removed/rotated),
      // so it must participate in retargeting.
      const shouldRetarget =
        this.desiredX !== this.targetX ||
        this.desiredY !== this.targetY ||
        desiredDecorOffsetY !== this.targetDecorOffsetY;

      if (shouldRetarget) {
        const progress =
          this.moveDuration > 0
            ? Math.min(1, (now - this.moveStartTime) / this.moveDuration)
            : 1;
        const t = easeInOutCubic(progress);

        const currentX = this.startX + (this.targetX - this.startX) * t;
        const currentY = this.startY + (this.targetY - this.startY) * t;
        const currentDecorOffsetY =
          this.startDecorOffsetY +
          (this.targetDecorOffsetY - this.startDecorOffsetY) * t;

        this.startX = currentX;
        this.startY = currentY;
        this.startDecorOffsetY = currentDecorOffsetY;

        this.targetX = this.desiredX;
        this.targetY = this.desiredY;
        this.targetDecorOffsetY = desiredDecorOffsetY;

        this.moveStartTime = now;
        this.moveDuration = this.moveTweenDurationMs;
      }

      // Position + decor interpolation
      moveProgress =
        this.moveDuration > 0
          ? Math.min(1, (now - this.moveStartTime) / this.moveDuration)
          : 1;
      const moveT = easeInOutCubic(moveProgress);

      renderX = this.startX + (this.targetX - this.startX) * moveT;
      const footprintY = this.startY + (this.targetY - this.startY) * moveT;
      const decorOffsetY =
        this.startDecorOffsetY +
        (this.targetDecorOffsetY - this.startDecorOffsetY) * moveT;

      renderY = footprintY + decorOffsetY;
    } else {
      // === Ground: Snap to server position ===
      renderX = this.desiredX;
      renderY = this.desiredY + desiredDecorOffsetY;
      // Clear tween state to prevent stale interpolation
      this.startX = this.targetX = this.desiredX;
      this.startY = this.targetY = this.desiredY;
      this.startDecorOffsetY = this.targetDecorOffsetY = desiredDecorOffsetY;
      this.moveDuration = 0;
      this.moveStartTime = now;
    }
    return { renderX, renderY, moveProgress };
  }

  /**
   * Handles scale interpolation.
   */
  private updateScale(now: number): number {
    if (this.hasPendingScaleUpdate) {
      const desiredScale = this.petVisual.getBaseScale();
      if (desiredScale !== this.targetScale) {
        const scaleProgress =
          this.scaleStartTime > 0
            ? Math.min(1, (now - this.scaleStartTime) / Config.scaleDurationMs)
            : 1;
        const scaleT = easeInOutCubic(scaleProgress);
        const currentScale =
          this.startScale + (this.targetScale - this.startScale) * scaleT;

        this.startScale = currentScale;
        this.targetScale = desiredScale;
        this.scaleStartTime = now;
      }
      this.hasPendingScaleUpdate = false;
    }

    let renderBaseScale = this.targetScale;
    const scaleProgress = Math.min(
      1,
      (now - this.scaleStartTime) / Config.scaleDurationMs
    );
    if (scaleProgress < 1) {
      const t = easeInOutCubic(scaleProgress);
      renderBaseScale =
        this.startScale + (this.targetScale - this.startScale) * t;
    }
    return renderBaseScale;
  }

  /**
   * Updates the breathing animation (squash/stretch).
   */
  private updateBreathing(now: number, renderBaseScale: number): void {
    // Breathing speed scaling based on movement speed only applies to flying
    // fauna. Ground pets breathe at baseline speed.
    const isHungry = this.petSlot.hunger <= 0;
    const baseBreathingSpeed = isHungry ? 1 : Config.breathingSpeed;

    let currentBreathingSpeed = baseBreathingSpeed;

    if (this.isFlying && !isHungry) {
      // Flying pets breathe faster when they move faster
      const durationMs = Math.max(1, this.moveTweenDurationMs);
      const durationRatio = Config.defaultMoveTweenDurationMs / durationMs;
      const breathingMultiplier = Math.min(
        Config.maxBreathingMultiplier,
        Math.max(
          Config.minBreathingMultiplier,
          durationRatio ** Config.breathingMultiplierExponent
        )
      );
      currentBreathingSpeed = baseBreathingSpeed * breathingMultiplier;
    }
    const breathingPhase = Math.sin(
      (now / 1000) * currentBreathingSpeed + this.breathingPhaseOffset
    );

    const scaleXMultiplier = 1 + Config.breathingAmount * breathingPhase;
    const scaleYMultiplier = 1 - Config.breathingAmount * breathingPhase;

    this.petVisual.setScaleXY(
      renderBaseScale * scaleXMultiplier,
      renderBaseScale * scaleYMultiplier
    );
  }

  /**
   * Updates the Z-index of the display object.
   */
  private updateZIndex(moveProgress: number): void {
    // IMPORTANT: Do NOT include offsetY in z-index!
    // Z-sorting is based on the object's "footprint" on the ground.
    // ZLayer.Pets ensures we render above decor/ground at the same Y.
    // Including visual height (offsetY) would push the pet into the background,
    // causing it to clip BEHIND the decor it's standing on.
    let zSortY = this.targetY;

    if (this.isFlying && this.moveDuration > 0) {
      // Flying pets: Change z-index through the animation
      // First half -> sort at startY
      // Second half -> sort at targetY
      if (moveProgress < 0.5) {
        zSortY = this.startY;
      }
    }
    this.displayObject.zIndex = calculateZIndex(zSortY, ZLayer.Pets);
  }

  /**
   * Gets the decor Y nudge for pets at the pet's position.
   * Only applies to ground pets (flying pets return 0).
   * Combines the decor's avatarNudgeY with the config decorNudgeYOffset.
   *
   * @param tileData - Tile object to check for decor
   * @returns Decor nudgeY offset (0 if flying, no decor, or no avatarNudgeY)
   */
  private getDecorNudgeY(
    tileData: Readonly<GardenTileObject> | undefined
  ): number {
    if (!tileData || tileData.objectType !== 'decor') {
      return 0;
    }
    const decorBlueprint = decorDex[tileData.decorId];
    // Get avatarNudgeY from the decor blueprint (rotation variants don't have separate avatarNudgeY)
    const avatarNudgeY =
      'avatarNudgeY' in decorBlueprint ? decorBlueprint.avatarNudgeY : 0;
    // Add the config offset to the decor's avatarNudgeY
    if (avatarNudgeY === 0) {
      return 0;
    }
    return avatarNudgeY + (this.isFlying ? 0 : Config.decorNudgeYOffset);
  }

  /**
   * Disposes of the pet visual resources.
   */
  destroy(): void {
    this.petVisual.destroy();
  }
}
