import type { Operation } from 'fast-json-patch';
import { getDefaultStore } from 'jotai';
import type { Container } from 'pixi.js';
import { Sprite, Texture } from 'pixi.js';
import { playSfx } from '@/audio/useQuinoaAudio';
import type { QuinoaData } from '@/common/games/Quinoa/types';
import type { GridPosition } from '@/common/games/Quinoa/world/map';
import type { RoomData } from '@/common/games/Room/types';
import type { PlayerId } from '@/common/types/player';
import type { IState } from '@/common/types/state';
import { AvatarTriggerAnimationName } from '@/components/Avatars/avatarRiveConstants';
import RoomConnection from '@/connection/RoomConnection';
import { avatarTriggerAnimationAtom } from '@/Quinoa/atoms/avatarAtoms';
import {
  lastMovementDirectionAtom,
  positionAtom,
} from '@/Quinoa/atoms/positionAtoms';
import { playerIdAtom } from '@/store/store';
import { PatchRouter } from '@/utils/patchRouter';
import type { QuinoaFrameContext } from '../../interfaces';
import {
  calculateZIndex,
  gridToWorldPixels,
  TILE_SIZE_WORLD,
  ZLayer,
} from '../../sprite-utils';

type SnowballDirection = 'left' | 'right' | 'up' | 'down';

interface ActiveSnowball {
  sprite: Sprite;
  startX: number;
  startY: number;
  direction: SnowballDirection;
  startTime: number;
  duration: number; // milliseconds
}

interface ActiveBurst {
  sprite: Sprite;
  startX: number;
  startY: number;
  startTime: number;
  duration: number; // milliseconds
}

const { get, set } = getDefaultStore();

export class SnowballSystem {
  public readonly name = 'Snowballs';

  /** Singleton instance for access from action functions */
  private static instance: SnowballSystem | null = null;

  private parentContainer: Container;

  private lastThrowTime: number = 0;
  private activeSnowballs: ActiveSnowball[] = [];
  private activeBursts: ActiveBurst[] = [];
  private snowballPool: Sprite[] = [];
  private burstPool: Sprite[] = [];

  private readonly SNOWBALL_SIZE = 40; // diameter in world pixels (2x original size)
  private readonly THROW_DISTANCE = TILE_SIZE_WORLD * 3; // 3 tiles
  private readonly THROW_DURATION = 300; // milliseconds (doubled speed)
  private readonly ARC_HEIGHT = 80; // peak height of arc in world pixels
  private readonly ARC_START_OFFSET = 128; // pixels above tile center to start arc
  private readonly BURST_DURATION = 250; // milliseconds
  private readonly BURST_BOUNCE_HEIGHT = 40; // pixels upward (2x original)
  private readonly THROW_COOLDOWN = 150; // milliseconds (0.15 seconds)

  private router = new PatchRouter<QuinoaData>();
  private unsubscribePatches: (() => void) | null = null;
  // private unsubscribeWelcome: (() => void) | null = null;

  /** Tracks each player's last known position for direction inference */
  private playerLastPositions: Map<PlayerId, GridPosition> = new Map();
  /** Tracks each player's last movement direction (inferred from position changes) */
  private playerLastDirections: Map<PlayerId, SnowballDirection> = new Map();

  /**
   * Returns the singleton instance of SnowballSystem, if it exists.
   * Used by action functions to trigger optimistic throws.
   */
  static getInstance(): SnowballSystem | null {
    return SnowballSystem.instance;
  }

  // private indentTileIndexSet = getTileIndexSet('SnowFootprints_Indent');
  // private outdentTileIndexSet = getTileIndexSet('SnowFootprints_Outdent');

  // private tileIndexToFootprintSpriteMap: Map<number, Sprite> = new Map();

  // private textures: Texture[] = FOOTPRINT_TEXTURE_NAMES.map((textureName) =>
  //   Texture.from(textureName)
  // );

  constructor(parentContainer: Container) {
    this.parentContainer = parentContainer;
    SnowballSystem.instance = this;

    // Initialize sprites from initial quinoa data
    //   const quinoaData = get(quinoaDataAtom);
    //   for (const tileIndex in quinoaData.steppedTiles) {
    //     this.setSprite(Number(tileIndex), quinoaData);
    //   }

    //   // Handle initial full state from Welcome message
    //   this.router.onWelcome((quinoaData) => {
    //     for (const tileIndex in quinoaData.steppedTiles) {
    //       this.setSprite(Number(tileIndex), quinoaData);
    //     }
    //   });

    // Subscribe to position changes to track player directions
    this.router.on(
      '/child/data/userSlots/:userSlotIndex/position',
      { exact: false },
      ({ userSlotIndex }, quinoaData) => {
        const playerId = quinoaData.userSlots[userSlotIndex]?.playerId;
        const newPos = quinoaData.userSlots[userSlotIndex]?.position;
        if (!playerId || !newPos) return;

        const oldPos = this.playerLastPositions.get(playerId);
        if (oldPos) {
          const direction = this.calculateDirectionFromDelta(oldPos, newPos);
          if (direction) {
            this.playerLastDirections.set(playerId, direction);
          }
        }
        this.playerLastPositions.set(playerId, { x: newPos.x, y: newPos.y });
      }
    );

    // Handle incremental patch updates for snowball throws
    this.router.on(
      '/child/data/userSlots/:userSlotIndex/lastActionEvent',
      { exact: false },
      ({ userSlotIndex }, quinoaData) => {
        const playerId = quinoaData.userSlots[userSlotIndex]?.playerId;
        const lastActionEvent =
          quinoaData.userSlots[userSlotIndex]?.lastActionEvent;
        if (lastActionEvent?.action === 'throwSnowball' && playerId) {
          const localPlayerId = get(playerIdAtom);

          // Skip local player throws - they're handled optimistically
          if (playerId === localPlayerId) {
            return;
          }

          const position = {
            x: quinoaData.userSlots[userSlotIndex]?.position?.x ?? 0,
            y: quinoaData.userSlots[userSlotIndex]?.position?.y ?? 0,
          };
          const direction = this.playerLastDirections.get(playerId) ?? 'down';
          this.throwSnowball(playerId, position, direction);
        }
      }
    );

    //   // Subscribe to Welcome messages
    //   this.unsubscribeWelcome = RoomConnection.getInstance().subscribeToWelcome(
    //     this.onWelcome
    //   );

    //   // Subscribe to patches
    const subscription = RoomConnection.getInstance().subscribeToPatches(
      this.onPatches
    );
    this.unsubscribePatches = subscription.unsubscribe;
  }

  private onPatches = (
    patches: Operation[],
    newState: IState<RoomData>
  ): void => {
    if (newState.child?.scope !== 'Quinoa') {
      return;
    }
    const quinoaData = newState.child.data as QuinoaData;
    this.router.process(patches, quinoaData);
  };

  /**
   * Calculates the cardinal direction from a position delta.
   * Returns null if there's no movement (same position).
   */
  private calculateDirectionFromDelta(
    oldPos: GridPosition,
    newPos: GridPosition
  ): SnowballDirection | null {
    const dx = newPos.x - oldPos.x;
    const dy = newPos.y - oldPos.y;

    // No movement
    if (dx === 0 && dy === 0) return null;

    // Prioritize the axis with the larger delta
    if (Math.abs(dx) >= Math.abs(dy)) {
      return dx > 0 ? 'right' : 'left';
    }
    return dy > 0 ? 'down' : 'up';
  }

  /**
   * Throws a snowball optimistically for the local player.
   * Checks cooldown before throwing. Called by action functions for immediate feedback.
   *
   * @returns `true` if the snowball was thrown, `false` if on cooldown
   */
  throwLocalSnowball(): boolean {
    const now = performance.now();

    // Check cooldown
    if (now - this.lastThrowTime < this.THROW_COOLDOWN) {
      return false;
    }

    const position = get(positionAtom);
    const playerId = get(playerIdAtom);
    const direction = get(lastMovementDirectionAtom) ?? 'down';

    if (!position || !playerId) {
      return false;
    }

    this.throwSnowball(playerId, position, direction);
    return true;
  }

  /**
   * Throws a snowball from the given position in the specified direction.
   * @param playerId - The player throwing the snowball
   * @param position - The grid position to throw from
   * @param direction - The direction to throw the snowball
   */
  throwSnowball(
    playerId: string,
    position: { x: number; y: number },
    direction: SnowballDirection
  ): void {
    // Convert grid position to world pixels (center of tile)
    const pixelPosition = gridToWorldPixels(position);
    const startX = pixelPosition.x;
    // All snowballs start 128px above tile center for consistent starting position
    const startY = pixelPosition.y - this.ARC_START_OFFSET;

    // Acquire sprite from pool (or create new one)
    const sprite = this.acquireSnowball();
    sprite.position.set(startX, startY);

    const now = performance.now();

    const snowball: ActiveSnowball = {
      sprite,
      startX,
      startY,
      direction,
      startTime: now,
      duration: this.THROW_DURATION,
    };

    this.activeSnowballs.push(snowball);

    // Trigger DropObject animation
    set(avatarTriggerAnimationAtom, {
      playerId,
      animation: AvatarTriggerAnimationName.ThrowSnowball,
    });

    // Update last throw time after successful throw
    this.lastThrowTime = now;
  }

  patch(context: QuinoaFrameContext): void {
    const now = performance.now();
    const remainingSnowballs: ActiveSnowball[] = [];

    for (const snowball of this.activeSnowballs) {
      const elapsed = now - snowball.startTime;
      const progress = Math.min(elapsed / snowball.duration, 1);

      if (progress >= 1) {
        // Animation complete - create burst at landing position
        const finalX = snowball.sprite.position.x;
        const finalY = snowball.sprite.position.y;
        this.createBurst(finalX, finalY, context.playerPosition);
        // Release sprite back to pool
        this.releaseSnowball(snowball.sprite);
        continue;
      }

      // Calculate position based on direction
      let x: number;
      let y: number;

      if (snowball.direction === 'left' || snowball.direction === 'right') {
        // Horizontal throw: use parabolic arc
        const horizontalDir = snowball.direction === 'left' ? -1 : 1;
        const distanceX = horizontalDir * this.THROW_DISTANCE * progress;
        x = snowball.startX + distanceX;

        // Arc calculation:
        // - Starts at startY (128px above tile center)
        // - Ends at startY + ARC_START_OFFSET (tile center, 128px below start)
        // - Peaks in the middle with additional ARC_HEIGHT
        const endY = snowball.startY + this.ARC_START_OFFSET; // Tile center
        const verticalDrop = endY - snowball.startY; // 128 pixels down
        const arcProgress = 4 * progress * (1 - progress); // 0 to 1, peaks at 0.5
        y =
          snowball.startY +
          verticalDrop * progress -
          this.ARC_HEIGHT * arcProgress;
      } else {
        // Vertical throw: use ease-out for significant slowdown at end
        // Start fast, end very slow to create dramatic deceleration
        const easedProgress = 1 - (1 - progress) ** 3; // strong ease-out (cubic)
        const verticalDir = snowball.direction === 'up' ? -1 : 1;
        const distanceY = verticalDir * this.THROW_DISTANCE * easedProgress;

        x = snowball.startX;
        y = snowball.startY + distanceY;

        // Scale animation: start at 0.7, peak at 1.3 (center), end at 0.7
        // Uses symmetric parabolic curve that peaks at progress = 0.5
        // Formula: scale = 0.7 + 0.6 * (4 * t * (1 - t))
        // Verified: t=0 → 0.7, t=0.5 → 1.3, t=1.0 → 0.7
        const peakProgress = 4 * progress * (1 - progress); // peaks at 0.5 with value 1.0
        const scale = 0.7 + 0.6 * peakProgress;
        snowball.sprite.scale.set(scale);
      }

      snowball.sprite.position.set(x, y);

      // Set z-index to render above avatars (AboveForeground layer)
      // Update dynamically as snowball moves for proper Y-sorting
      snowball.sprite.zIndex = calculateZIndex(y, ZLayer.AboveForeground);

      remainingSnowballs.push(snowball);
    }

    this.activeSnowballs = remainingSnowballs;

    // Process burst animations
    const remainingBursts: ActiveBurst[] = [];
    for (const burst of this.activeBursts) {
      const elapsed = now - burst.startTime;
      const progress = Math.min(elapsed / burst.duration, 1);

      if (progress >= 1) {
        // Animation complete - release sprite back to pool
        this.releaseBurst(burst.sprite);
        continue;
      }

      // Bounce animation: parabolic bounce that peaks at progress 0.5
      const bounceProgress = 4 * progress * (1 - progress); // 0 to 1, peaks at 0.5
      const y = burst.startY - this.BURST_BOUNCE_HEIGHT * bounceProgress;
      burst.sprite.position.set(burst.startX, y);

      // Scale animation: grow from 1.5x to 3.5x over the duration
      const scale = 1.5 + progress * (3.5 - 1.5); // Linear interpolation from 1.5 to 3.5
      burst.sprite.scale.set(scale);

      // Set z-index to render above avatars (AboveForeground layer)
      burst.sprite.zIndex = calculateZIndex(y, ZLayer.AboveForeground);

      remainingBursts.push(burst);
    }

    this.activeBursts = remainingBursts;
  }

  /**
   * Acquires a snowball sprite from the pool, or creates a new one if empty.
   * The sprite is configured with the correct texture and anchor.
   */
  private acquireSnowball(): Sprite {
    const pooled = this.snowballPool.pop();
    if (pooled) {
      pooled.visible = true;
      pooled.scale.set(1);
      return pooled;
    }

    const sprite = new Sprite({
      texture: Texture.from('sprite/item/SnowBall'),
    });
    sprite.anchor.set(0.5, 0.5);
    this.parentContainer.addChild(sprite);
    return sprite;
  }

  /**
   * Releases a snowball sprite back to the pool for reuse.
   * Resets the sprite's visual state and hides it.
   */
  private releaseSnowball(sprite: Sprite): void {
    sprite.visible = false;
    sprite.scale.set(1);
    this.snowballPool.push(sprite);
  }

  /**
   * Acquires a burst sprite from the pool, or creates a new one if empty.
   * The sprite is configured with the correct texture and anchor.
   */
  private acquireBurst(): Sprite {
    const pooled = this.burstPool.pop();
    if (pooled) {
      pooled.visible = true;
      return pooled;
    }

    const sprite = new Sprite({
      texture: Texture.from('sprite/item/SnowSplat'),
    });
    sprite.anchor.set(0.5, 0.5);
    this.parentContainer.addChild(sprite);
    return sprite;
  }

  /**
   * Releases a burst sprite back to the pool for reuse.
   * Resets the sprite's visual state and hides it.
   */
  private releaseBurst(sprite: Sprite): void {
    sprite.visible = false;
    sprite.scale.set(1);
    this.burstPool.push(sprite);
  }

  /** Maximum tile distance for spatial audio falloff. */
  private readonly MAX_AUDIO_DISTANCE = 20;

  /**
   * Creates a burst effect at the given position.
   * Uses the SnowSplat texture from the spritesheet.
   *
   * @param x - X position in world pixels
   * @param y - Y position in world pixels
   * @param localPlayerPosition - Grid position of the local player for spatial audio
   */
  private createBurst(
    x: number,
    y: number,
    localPlayerPosition: GridPosition
  ): void {
    // Acquire sprite from pool (or create new one)
    const sprite = this.acquireBurst();
    sprite.position.set(x, y);
    // Start at 1.5x size, will grow to 3.5x over animation
    sprite.scale.set(1.5);

    const burst: ActiveBurst = {
      sprite,
      startX: x,
      startY: y,
      startTime: performance.now(),
      duration: this.BURST_DURATION,
    };

    this.activeBursts.push(burst);

    // Play splat sound effect with spatial audio
    // Convert burst pixel position to grid coordinates for distance calculation
    const burstGridX = x / TILE_SIZE_WORLD;
    const burstGridY = y / TILE_SIZE_WORLD;
    const dx = burstGridX - localPlayerPosition.x;
    const dy = burstGridY - localPlayerPosition.y;
    const pan = dx / this.MAX_AUDIO_DISTANCE;
    const volumeMultiplier =
      1 - Math.max(Math.abs(dx), Math.abs(dy)) / this.MAX_AUDIO_DISTANCE;

    if (volumeMultiplier > 0) {
      playSfx('SnowballFall', { pan, volumeMultiplier });
    }
  }

  /**
   * Cleans up all sprites and resources used by this system.
   * Destroys all active and pooled sprites.
   */
  destroy(): void {
    SnowballSystem.instance = null;
    this.unsubscribePatches?.();
    // Destroy all active snowball sprites
    for (const snowball of this.activeSnowballs) {
      snowball.sprite.destroy();
    }
    // Destroy all active burst sprites
    for (const burst of this.activeBursts) {
      burst.sprite.destroy();
    }
    // Destroy all pooled snowball sprites
    for (const sprite of this.snowballPool) {
      sprite.destroy();
    }
    // Destroy all pooled burst sprites
    for (const sprite of this.burstPool) {
      sprite.destroy();
    }
    // Clear arrays and maps
    this.activeSnowballs = [];
    this.activeBursts = [];
    this.snowballPool = [];
    this.burstPool = [];
    this.playerLastPositions.clear();
    this.playerLastDirections.clear();
  }
}
