import { getDefaultStore, type PrimitiveAtom } from 'jotai';
import { Container } from 'pixi.js';
import { type DecorId, decorDex } from '@/common/games/Quinoa/systems/decor';
import type { FloraSpeciesId } from '@/common/games/Quinoa/systems/flora';
import type {
  DecorRotation,
  GardenTileObject,
  InventoryItem,
} from '@/common/games/Quinoa/user-json-schema/current';
import type { GridPosition } from '@/common/games/Quinoa/world/map';
import type { EmoteType } from '@/common/types/emote';
import type { Avatar, PlayerId } from '@/common/types/player';
import type { DynamicImageAssetName } from '@/components/Avatars/AvatarRiveFileCache';
import riveFileSrc from '@/components/Avatars/assets/avatarelements.riv?url';
import {
  AvatarSetAnimation,
  AvatarToggleAnimationName,
  AvatarTriggerAnimationName,
  expressions,
  getSetAnimationNameIndex,
  HELD_ITEM_SUPPRESSING_ANIMATIONS,
  HELD_ITEM_SUPPRESSION_DURATION_MS,
} from '@/components/Avatars/avatarRiveConstants';
import { avatarRefCountsAtomFamily } from '@/store/store';
import type { QuinoaFrameContext } from '../../interfaces';
import { RiveSprite } from '../../pixi/rive/RiveSprite';
import type { RiveSpriteBatchRenderer } from '../../pixi/rive/RiveSpriteBatchRenderer';
import {
  calculateZIndex,
  gridToWorldPixels,
  QUINOA_RENDER_SCALE,
  TILE_SIZE_WORLD,
  ZLayer,
} from '../../sprite-utils';
import type { BuildingDataProvider } from '../buildings/BuildingSystem';
import { getAvatarZLayerForTileObject } from '../tile-objects/avatarZLayer';
import {
  doesTileObjectObscureAvatar,
  getObjectDimensions,
} from '../tile-objects/doesTileObjectObscureAvatar';
import type { TileObjectDataProvider } from '../tile-objects/TileObjectSystem';
import type { ViewportCullable } from '../tile-objects/ViewportCullable';
import { playAnimationSfx } from './AvatarSfx';
import { getAssetKeyFromForAvatarPart } from './avatar-dynamic-images';
import { ChatBubbleVisual } from './ChatBubbleVisual';
import { HeldItemVisual } from './HeldItemVisual';
import { NameTagVisual } from './NameTagVisual';

export interface AvatarDataProvider {
  getAvatarsAt(gridPosition: GridPosition): PlayerId[];
}

interface NameTagConfig {
  displayName: string;
  textColor: string;
  backgroundColor: string;
}

/**
 * Cosmetic payload applied to an avatar.
 * TODO: de-duplicate this type, similar versions are defined in at least two
 * other places X_X
 */
export interface AvatarCosmeticsPayload {
  avatar: Avatar;
  externalAvatarUrl?: string;
}

const Config = {
  /** How large the avatar should be in world units (multiplier for tile size) */
  worldSizeFactor: 2,
  /** Minimum render size in pixels (clamps avatar size at max zoom out) */
  minRenderSize: 64,
  /** Maximum render size in pixels (clamps avatar size at max zoom in) */
  maxRenderSize: 640,
  /**
   * If an avatar has not performed a server-recorded action for this long, it
   * should use the sleeping idle variant.
   */
  sleepAfterIdleMs: 40_000,
  /** Chat bubble timeout duration in milliseconds */
  chatBubbleTimeoutMs: 10000,
  /** Base vertical offset for avatar positioning (0.75 = avatar sits 75% up the tile) */
  verticalOffset: 0.75,
  /** Chat bubble Y offset in world pixels (positioned above avatar head) */
  chatBubbleYOffset: 100,
  /** Feet world Y offset factor (0.9 = feet are at 90% of tile size from center) */
  feetWorldYOffsetFactor: 0.9,
  /**
   * Maximum width (in pixels) for an object to trigger peeking.
   * Objects wider than this will not trigger peeking, even if they obscure the avatar.
   */
  maxWidthForPeeking: 350,
  /**
   * Decor IDs that never trigger the peeking animation at specific rotations.
   * Maps decor ID to an array of rotations (in degrees) where peeking is disabled.
   */
  decorRotationsExemptFromPeeking: {
    WoodArch: [0, 180, -180, -360],
    StoneArch: [0, 180, -180, -360],
    MarbleArch: [0, 180, -180, -360],
  } as Partial<Record<DecorId, DecorRotation[]>>,
  /**
   * Plant species that always trigger peeking regardless of dimensions.
   * Used for tall/large plants where the avatar should always peek.
   */
  speciesAlwaysPeek: [
    'MoonCelestial',
    'DawnCelestial',
    'Bamboo',
    'Apple',
    'Coconut',
    'Banana',
    'Cacao',
    'Cactus',
    'Lemon',
  ] as FloraSpeciesId[],
} as const;

/**
 * Calculates render size using tile zoom and device pixel ratio.
 * Clamps between 64px and 640px to avoid over/under rendering.
 *
 * @param tileSize - Current tile size from tileSizeAtom (16-400)
 * @returns Render size in pixels
 */
function calculateAvatarRenderSize(tileSize: number): number {
  const onScreenSize = tileSize * Config.worldSizeFactor;
  const desiredRenderSize = onScreenSize * QUINOA_RENDER_SCALE;

  return Math.min(
    Config.maxRenderSize,
    Math.max(Config.minRenderSize, Math.round(desiredRenderSize))
  );
}

/**
 * AvatarView is a thin wrapper around RiveSprite that handles avatar-specific
 * positioning, cosmetics loading, and animation delegation.
 *
 * NOTE: Sleeping uses `lastActionTime` from the server (via `lastActionEvent`).
 * If `lastActionTime` is null (e.g. the server has not recorded any action for
 * a player yet), this view will never enter the sleeping state.
 *
 * Architecture:
 * - Wraps a generic RiveSprite (which handles all Rive rendering complexity)
 * - Manages avatar-specific cosmetics (Bottom, Mid, Top, Expression, Discord Avatar)
 * - Handles avatar positioning with proper vertical offsets
 * - Delegates animation triggers to the underlying RiveSprite
 *
 * @example
 * ```typescript
 * // Create avatar view
 * const avatarView = await AvatarView.create(playerId, worldContainer);
 *
 * // Load cosmetics
 * await avatarView.loadAvatar({ avatar, externalAvatarUrl: discordAvatarUrl });
 *
 * // Each frame
 * avatarView.update(context, gridPosition, lastActionTime);
 *
 * // Trigger animations
 * avatarView.triggerAnimation(AvatarTriggerAnimationName.Harvest);
 * ```
 */
export class AvatarView implements ViewportCullable {
  /** The container that holds the avatar sprite and other visuals (like chat bubbles) */
  private container: Container;

  /** The container for screen-space UI elements */
  private uiContainer: Container;

  /** The chat bubble visual */
  private chatBubble: ChatBubbleVisual;
  private currentMessageTimestamp: number = 0;

  /** The name tag visual */
  private nameTag: NameTagVisual;
  private nameTagConfig: NameTagConfig | null = null;

  /** The held item visual displayed above the avatar */
  private heldItemVisual: HeldItemVisual;

  /** The underlying RiveSprite that handles rendering */
  private riveSprite: RiveSprite;

  /** Player ID this avatar belongs to */
  private playerId: PlayerId;

  /** Current grid position (used for position calculations and movement detection) */
  private gridPosition: GridPosition | null = null;

  /** Base body animation requested by the system (pre-sleep override) */
  private requestedAnimation: AvatarSetAnimation = AvatarSetAnimation.Idle;

  /** The last animation index sent to Rive (to avoid redundant calls) */
  private lastAppliedAnimationIndex: number | null = null;

  /** Refcount atom for this player (cached for performance) */
  private refCountAtom: PrimitiveAtom<number>;

  /** Provider for tile data to calculate height offsets */
  private tileDataProvider: TileObjectDataProvider;

  /** Provider for building data to calculate height offsets */
  private buildingDataProvider: BuildingDataProvider;

  /** Provider for checking if other avatars are at the same position */
  private avatarDataProvider: AvatarDataProvider;

  /** Snapshot of currently applied cosmetics */
  private currentCosmetics: AvatarCosmeticsPayload | null = null;

  /** Cached tile data at current position (for detecting decor changes) */
  private lastTileData: Readonly<GardenTileObject> | undefined;

  /** Cached tile obscurance state (updated only when moving or tile changes) */
  private isObscuredByTile: boolean = false;

  /** Last known local player position (for spatial audio calculations) */
  private localPlayerPosition: GridPosition | null = null;

  private camera: Container;

  private constructor(
    riveSprite: RiveSprite,
    playerId: PlayerId,
    tileDataProvider: TileObjectDataProvider,
    buildingDataProvider: BuildingDataProvider,
    avatarDataProvider: AvatarDataProvider,
    uiContainer: Container,
    camera: Container
  ) {
    this.riveSprite = riveSprite;
    this.playerId = playerId;
    this.tileDataProvider = tileDataProvider;
    this.buildingDataProvider = buildingDataProvider;
    this.avatarDataProvider = avatarDataProvider;
    this.uiContainer = uiContainer;
    this.camera = camera;
    // Cache the refcount atom to avoid repeated atomFamily lookups
    this.refCountAtom = avatarRefCountsAtomFamily(playerId);

    // Create container and add sprite
    this.container = new Container();
    this.container.label = `AvatarContainer (${playerId})`;
    this.container.visible = false; // Start hidden until enters viewport
    // Avatars should never intercept pointer/touch events; buildings/decor need them.
    this.container.eventMode = 'none';
    this.container.interactiveChildren = false;
    this.riveSprite.eventMode = 'none';
    this.container.addChild(this.riveSprite);

    // Create held item visual (renders in world space above avatar)
    this.heldItemVisual = new HeldItemVisual();
    this.container.addChild(this.heldItemVisual);

    // Create chat bubble
    this.chatBubble = new ChatBubbleVisual();
    this.uiContainer.addChild(this.chatBubble);

    this.nameTag = new NameTagVisual();
    this.uiContainer.addChild(this.nameTag);
  }

  /**
   * Creates a new AvatarView with a RiveSprite configured for avatar rendering.
   *
   * @param playerId - The player ID this avatar belongs to
   * @param tileSize - Current tile size for calculating initial render resolution
   * @param tileDataProvider - Provider to query tile data for height offsets
   * @param buildingDataProvider - Provider to query building data for height offsets
   * @param avatarDataProvider - Provider to query other avatars
   * @param uiContainer - PixiJS container for UI elements (screen space)
   * @param batchRenderer - The Rive batch renderer for sprite rendering
   * @returns Promise that resolves to the created AvatarView
   *
   * @example
   * ```typescript
   * const avatarView = await AvatarView.create('player-123', tileSize, tileProvider, buildingProvider, avatarProvider, uiContainer, batchRenderer);
   * await avatarView.loadAvatar({ avatar, externalAvatarUrl: discordAvatarUrl });
   * ```
   */
  static async create(
    playerId: PlayerId,
    tileDataProvider: TileObjectDataProvider,
    buildingDataProvider: BuildingDataProvider,
    avatarDataProvider: AvatarDataProvider,
    uiContainer: Container,
    batchRenderer: RiveSpriteBatchRenderer,
    camera: Container
  ): Promise<AvatarView> {
    const riveSprite = await RiveSprite.create({
      batchRenderer,
      riveFileSrc,
      riveOptions: {
        autoRegister: false, // Defer registration until viewport entry
      },
      width: TILE_SIZE_WORLD * Config.worldSizeFactor,
      height: TILE_SIZE_WORLD * Config.worldSizeFactor,
      anchor: 0.5,
      label: `AvatarView (${playerId})`,
    });

    return new AvatarView(
      riveSprite,
      playerId,
      tileDataProvider,
      buildingDataProvider,
      avatarDataProvider,
      uiContainer,
      camera
    );
  }

  /**
   * Checks whether the provided cosmetics are already applied to this avatar.
   */
  hasCosmetics(cosmetics: AvatarCosmeticsPayload): boolean {
    const current = this.currentCosmetics;
    if (!current) return false;
    if (current.externalAvatarUrl !== cosmetics.externalAvatarUrl) return false;
    if (current.avatar.length !== cosmetics.avatar.length) return false;
    for (let i = 0; i < current.avatar.length; i++) {
      if (current.avatar[i] !== cosmetics.avatar[i]) return false;
    }
    return true;
  }

  /**
   * Loads avatar cosmetics (Bottom, Mid, Top, Expression, Discord Avatar).
   *
   * This method:
   * - Loads the 3 avatar part images (Bottom, Mid, Top)
   * - Sets the expression if applicable
   * - Handles special cosmetics (Forbidden Method, Discord Popsicle)
   *
   * @param cosmetics - Avatar PNG names and optional Discord avatar URL
   *
   * @example
   * ```typescript
   * await avatarView.loadAvatar({
   *   avatar: [
   *     'Bottom_Jeans.png',
   *     'Mid_Axolotl.png',
   *     'Top_CoolHat.png',
   *     'Expression_Happy.png',
   *   ],
   *   externalAvatarUrl: 'https://cdn.discordapp.com/avatars/...',
   * });
   * ```
   */
  async loadAvatar(cosmetics: AvatarCosmeticsPayload): Promise<void> {
    const { avatar, externalAvatarUrl } = cosmetics;
    const imageAssetNames: DynamicImageAssetName[] = ['Bottom', 'Mid', 'Top'];

    const isWearingForbiddenMethod =
      avatar[2] === 'Top_Custom_ForbiddenMethod.png';

    this.toggleAnimation(
      AvatarToggleAnimationName.isRickrolling,
      isWearingForbiddenMethod
    );

    const expressionIndex = expressions.indexOf(avatar[3]);
    if (expressionIndex !== -1 || isWearingForbiddenMethod) {
      this.setInput('expression', expressionIndex);
      // Important: We need to advance the state machine and artboard to ensure
      // that the expression is set correctly even if the avatar is paused.
      this.riveSprite.advanceZero();
    }

    // Load the 3 avatar part images (Bottom, Mid, Top)
    for (const [avatarPartIndex, imageAssetName] of imageAssetNames.entries()) {
      const avatarPartValue = avatar[avatarPartIndex];
      await this.riveSprite.loadAndSetImage(
        imageAssetName,
        getAssetKeyFromForAvatarPart(avatarPartValue)
      );
    }

    this.toggleAnimation(
      AvatarToggleAnimationName.isRickrolling,
      isWearingForbiddenMethod
    );

    // Handle Discord Popsicle cosmetic
    if (avatar[2].startsWith('Top_DiscordPopsicle')) {
      if (externalAvatarUrl) {
        await this.riveSprite.loadAndSetImage(
          'DiscordAvatarPlaceholder',
          externalAvatarUrl
        );
      } else {
        console.warn(
          `Avatar has Top_DiscordPopsicle but no external avatar URL`
        );
      }
    } else {
      this.riveSprite.unsetImage('DiscordAvatarPlaceholder');
    }

    this.currentCosmetics = structuredClone(cosmetics);
  }

  /**
   * Updates the internal render resolution based on current zoom level.
   * Linearly interpolates between 64px (max zoom out) and 512px (max zoom in).
   *
   * @param tileSize - Current tile size from tileSizeAtom (16-400)
   */
  resizeArtboard(tileSize: number): void {
    const renderSize = calculateAvatarRenderSize(tileSize);
    this.riveSprite.riveRenderSize = { width: renderSize, height: renderSize };
  }

  /**
   * Calculates the z-layer for the avatar based on the tile it's standing on.
   * Delegates to the shared avatarZLayer module for consistent z-layer logic.
   *
   * @see getAvatarZLayerForTileObject for the z-layer rules
   */
  private calculateAvatarZLayer(
    tileData: GardenTileObject | undefined
  ): number {
    if (!tileData) {
      return ZLayer.BelowForeground;
    }
    return getAvatarZLayerForTileObject(tileData);
  }

  update(
    context: QuinoaFrameContext,
    gridPosition: GridPosition,
    lastActionTime: number | null
  ): void {
    // Cache local player position for spatial audio calculations in triggerAnimation
    this.localPlayerPosition = context.playerPosition;

    // Use optimistic position for active player to reduce perceived lag
    const isLocalPlayer = this.playerId === context.activePlayerId;
    const position = isLocalPlayer ? context.playerPosition : gridPosition;

    const didMove =
      this.gridPosition === null ||
      this.gridPosition.x !== position.x ||
      this.gridPosition.y !== position.y;

    // Check for tile data changes (e.g. decor placed/removed under avatar's feet).
    // getTileDataAt is cheap (array lookup), and reference comparison is O(1).
    const tileData = this.tileDataProvider.getTileDataAt(position);
    const tileChanged = tileData !== this.lastTileData;

    // Update position when avatar moves OR when tile data changes (e.g. decor picked up)
    if (didMove || tileChanged) {
      // Check for tile obscurance only when moving or when the tile content changes.
      // We avoid checking this every frame because calculating plant
      // growth/size is *maybe* somewhat expensive. Probably we could memoize
      // those values and just do this check every update()...
      this.isObscuredByTile = tileData
        ? doesTileObjectObscureAvatar({
            tileObject: tileData,
            serverNow: context.serverTime,
          })
        : false;

      // Only trigger walk animation (and footstep SFX) when actually moving
      if (didMove) {
        this.triggerAnimation(AvatarTriggerAnimationName.Walk);
        // Update position for next frame
        this.gridPosition = position;
      }

      // Update position and z-index
      const worldPos = this.calculateAvatarWorldPosition(position, tileData);
      this.container.position.set(worldPos.x, worldPos.y);

      // Set z-index for proper Y-sorting
      // IMPORTANT: Use tile center Y for z-index, not sprite Y (which is offset upward)
      const { y: tileCenterY } = gridToWorldPixels(position);
      const zLayer = this.calculateAvatarZLayer(tileData);
      this.container.zIndex = calculateZIndex(tileCenterY, zLayer);

      // Cache tile data for next frame comparison
      this.lastTileData = tileData;
    }

    // Check for other avatars at the same position.
    // We need to do this every frame because other avatars can move onto our
    // square, even if we are not moving.
    const avatarsAtThisTile = this.avatarDataProvider.getAvatarsAt(position);

    const isAnotherAvatarAtThisTile = avatarsAtThisTile.length > 1;

    const shouldSleep =
      this.requestedAnimation === AvatarSetAnimation.Idle &&
      lastActionTime !== null &&
      context.serverTime - lastActionTime > Config.sleepAfterIdleMs;

    // Sleeping should take precedence over peeking.
    // Check if this decor/rotation combination is exempt from peeking
    const shouldPeek =
      !shouldSleep &&
      ((this.isObscuredByTile &&
        !this.isDecorExemptFromPeeking(tileData) &&
        (this.isSpeciesAlwaysPeek(tileData) ||
          !this.isObjectTooWideForPeeking(tileData, context.serverTime))) ||
        isAnotherAvatarAtThisTile);

    this.toggleAnimation(AvatarToggleAnimationName.isPeeking, shouldPeek);

    // Reconcile animation state: determine effective animation based on request + sleep override
    const effectiveAnimation = shouldSleep
      ? AvatarSetAnimation.Sleeping
      : this.requestedAnimation;

    // Apply only if changed to avoid redundant bridge calls
    const effectiveAnimationIndex =
      getSetAnimationNameIndex(effectiveAnimation);
    if (this.lastAppliedAnimationIndex !== effectiveAnimationIndex) {
      this.setInput('animation', effectiveAnimationIndex);
      this.lastAppliedAnimationIndex = effectiveAnimationIndex;
    }

    // Handle chat bubble timeout
    if (
      this.currentMessageTimestamp > 0 &&
      context.serverTime - this.currentMessageTimestamp >
        Config.chatBubbleTimeoutMs
    ) {
      this.chatBubble.hideMessage();
      this.currentMessageTimestamp = 0;
    }

    // Update chat bubble position (Screen Space)
    if (this.currentMessageTimestamp > 0) {
      // Only update if visible to save performance
      // Check if avatar is renderable (inside viewport)
      if (this.container.renderable && this.container.visible) {
        this.updateChatBubblePosition();
        this.chatBubble.visible = true;
      } else {
        // Hide bubble if avatar is off-screen
        this.chatBubble.visible = false;
      }
    }

    if (this.nameTagConfig) {
      if (
        !isLocalPlayer &&
        this.container.renderable &&
        this.container.visible
      ) {
        this.updateNameTagPosition();
        this.nameTag.show();
      } else {
        this.nameTag.hide();
      }
    }

    // Update held item bobbing animation and plant growth
    this.heldItemVisual.update(context);

    // Advance the Rive state machine for this tick, and queue a batch render.
    // Keep this after we’ve set any Rive inputs/toggles that should affect the
    // current tick’s `stateMachine.advance()` (e.g. sleep/peeking overrides).
    this.riveSprite.draw(context.time);
  }

  /**
   * Updates the chat bubble's screen position based on the avatar's world position.
   * Uses manual projection to avoid frame lag from toGlobal() when zooming.
   */
  private updateChatBubblePosition(): void {
    // Manual projection: world * zoom + camera_offset
    // This ensures we use the latest camera transform (set in WorldRenderer.draw)
    // without waiting for Pixi's internal transform update (which happens later in render).
    const zoom = this.camera.scale.x;
    const cameraX = this.camera.x;
    const cameraY = this.camera.y;

    // Avatar top is at local y = -TILE_SIZE_WORLD (anchor 0.5, height 2*TILE_SIZE)
    const worldX = this.container.x;
    const worldY = this.container.y - Config.chatBubbleYOffset;

    const screenX = worldX * zoom + cameraX;
    const screenY = worldY * zoom + cameraY;

    this.chatBubble.position.set(screenX, screenY);
  }

  /**
   * Updates the name tag position beneath the avatar.
   * Uses a hybrid approach: World Anchor + Screen Offset.
   * 1. Anchor to the visual feet in World Space (scales with zoom).
   * 2. Add a constant Screen Space buffer (prevents overlap/floating).
   */
  private updateNameTagPosition(): void {
    const zoom = this.camera.scale.x;
    const cameraX = this.camera.x;
    const cameraY = this.camera.y;

    const worldX = this.container.x;
    // Visual feet are roughly at Config.feetWorldYOffsetFactor of the tile size (tuned for typical avatar whitespace)
    const feetWorldYOffset = TILE_SIZE_WORLD * Config.feetWorldYOffsetFactor;
    const worldY = this.container.y + feetWorldYOffset;

    const screenX = worldX * zoom + cameraX;
    const screenY = worldY * zoom + cameraY;

    this.nameTag.position.set(screenX, screenY);
  }

  /**
   * Checks if a decor item at a specific rotation is exempt from triggering peeking.
   *
   * @param tileData - Tile data to check for decor
   * @returns True if this decor/rotation combination should not trigger peeking
   */
  private isDecorExemptFromPeeking(
    tileData: Readonly<GardenTileObject> | undefined
  ): boolean {
    if (!tileData || tileData.objectType !== 'decor') {
      return false;
    }
    const rotationExemptions =
      Config.decorRotationsExemptFromPeeking[tileData.decorId];
    return rotationExemptions?.includes(tileData.rotation) ?? false;
  }

  /**
   * Checks if an object is too wide to trigger peeking.
   *
   * @param tileData - Tile data to check
   * @param serverNow - Current server time (for plant growth calculations)
   * @returns True if the object is too wide to trigger peeking
   */
  private isObjectTooWideForPeeking(
    tileData: Readonly<GardenTileObject> | undefined,
    serverNow: number
  ): boolean {
    if (!tileData) {
      return false;
    }
    const { width } = getObjectDimensions(tileData, serverNow);
    return width > Config.maxWidthForPeeking;
  }

  /**
   * Checks if a plant species should always trigger peeking regardless of dimensions.
   *
   * @param tileData - Tile data to check for plant species
   * @returns True if this plant species should always peek
   */
  private isSpeciesAlwaysPeek(
    tileData: Readonly<GardenTileObject> | undefined
  ): boolean {
    if (!tileData || tileData.objectType !== 'plant') {
      return false;
    }
    return Config.speciesAlwaysPeek.includes(tileData.species);
  }

  /**
   * Gets the avatar nudge Y offset from a tile's decor, if present.
   * Checks for decor objects and looks up their avatarNudgeY property.
   *
   * @param tileData - Tile data to check for decor
   * @returns Avatar Y nudge offset (0 if no decor or no avatarNudgeY)
   */
  private getTileAvatarNudgeY(tileData: GardenTileObject | undefined): number {
    if (!tileData || tileData.objectType !== 'decor') {
      return 0;
    }
    const decorBlueprint = decorDex[tileData.decorId];
    // Get avatarNudgeY from the decor blueprint (rotation variants don't have separate avatarNudgeY)
    return 'avatarNudgeY' in decorBlueprint ? decorBlueprint.avatarNudgeY : 0;
  }

  /**
   * Calculates the avatar's world position with proper vertical offset.
   *
   * Different avatars have different vertical offsets:
   * - Trader Bunny (NPC): 0.45 offset
   * - Regular players: 0.75 offset
   * - Additional offset based on tile decor (e.g., benches, bridges)
   * - Additional offset based on building foreground regions (e.g., elevated platforms)
   *
   * Decor nudge takes priority over building nudge.
   */
  private calculateAvatarWorldPosition(
    position: GridPosition,
    tileData: Readonly<GardenTileObject> | undefined
  ): {
    x: number;
    y: number;
  } {
    const { x, y } = gridToWorldPixels(position);

    // Base vertical offset for avatar type
    let yOffset = -((TILE_SIZE_WORLD * 2) / 2) * Config.verticalOffset;

    // Add tile-specific offset (e.g., sitting on bench, standing on bridge)
    // Decor nudge is in tile units, so multiply by TILE_SIZE_WORLD
    const tileNudgeY = this.getTileAvatarNudgeY(tileData);
    if (tileNudgeY !== 0) {
      yOffset += tileNudgeY * TILE_SIZE_WORLD;
    } else {
      // Building nudge fallback (already in pixels)
      // Only check buildings if no decor nudge - decor takes priority
      const building = this.buildingDataProvider.getBuildingAt(position);
      if (building) {
        yOffset += building.avatarYNudgePixels;
      }
    }

    return { x, y: y + yOffset };
  }

  /**
   * Gets the underlying PixiJS sprite (for direct access if needed).
   */
  get displayObject(): Container {
    return this.container;
  }

  /**
   * Triggers a one-shot animation (e.g., walk, harvest, water, join) with spatial audio.
   * For action animations (water, harvest, dig, etc.), temporarily hides
   * the held item visual to avoid overlap with the avatar's animation.
   *
   * Sound effects are played with spatial audio based on the avatar's distance
   * from the local player (pan and volume scale with distance).
   *
   * @param animationName - The trigger animation to fire
   *
   * @example
   * ```typescript
   * avatarView.triggerAnimation(AvatarTriggerAnimationName.Harvest);
   * ```
   */
  triggerAnimation(animationName: AvatarTriggerAnimationName): void {
    this.riveSprite.triggerAnimation(animationName);

    // Play spatial SFX for the animation
    if (this.gridPosition && this.localPlayerPosition) {
      playAnimationSfx(
        animationName,
        this.gridPosition,
        this.localPlayerPosition
      );
    }

    // Suppress held item during action animations to avoid visual overlap
    if (HELD_ITEM_SUPPRESSING_ANIMATIONS.has(animationName)) {
      this.heldItemVisual.suppress(
        HELD_ITEM_SUPPRESSION_DURATION_MS,
        performance.now()
      );
    }
  }

  /**
   * Toggles a boolean animation on or off (e.g., talking, rickrolling).
   *
   * @param animationName - The toggle animation to control
   * @param isOn - Whether the animation should be on or off
   *
   * @example
   * ```typescript
   * avatarView.toggleAnimation(AvatarToggleAnimationName.Talking, true);
   * ```
   */
  toggleAnimation(
    animationName: AvatarToggleAnimationName,
    isOn: boolean
  ): void {
    this.riveSprite.toggleAnimation(animationName, isOn);
  }

  /**
   * Sets a numeric input on the state machine (e.g., expression, animation).
   *
   * @param name - The input name
   * @param value - The numeric value to set
   */
  setInput(name: string, value: number): void {
    this.riveSprite.setInput(name, value);
  }

  /**
   * Sets the avatar's animation state (e.g., Idle, Walking, Holding).
   *
   * @param animation - The animation state to set
   *
   * @example
   * ```typescript
   * avatarView.setAvatarAnimation(AvatarSetAnimation.Holding);
   * ```
   */
  setAvatarAnimation(animation: AvatarSetAnimation): void {
    // Only update the request; actual Rive input is reconciled in update()
    this.requestedAnimation = animation;
  }

  /**
   * Sets the avatar's emote type.
   *
   * @param emoteType - The emote type to display
   *
   * @example
   * ```typescript
   * avatarView.setEmoteType(EmoteType.Heart);
   * ```
   */
  setEmoteType(emoteType: EmoteType): void {
    this.setInput('emoteType', emoteType);
  }

  /**
   * Pauses the avatar's state machine.
   * When paused, the avatar will not advance its animations.
   */
  pause(): void {
    this.riveSprite.pause();
  }

  /**
   * Resumes the avatar's state machine.
   */
  resume(): void {
    this.riveSprite.resume();
  }

  /**
   * Called when the avatar enters the viewport and becomes visible.
   * Registers the sprite with the batch renderer to allocate canvas space
   * and increments the avatar's refcount (enables emoting and other features).
   *
   * IMPORTANT: Should only be called once per visibility transition by AvatarViewManager.
   */
  onEnteredViewport(): void {
    this.riveSprite.registerWithBatchRenderer();
    // We must explicitly manage visibility.
    // When hidden (exited viewport), the sprite might still hold a texture pointing
    // to a stale region of the shared batch canvas.
    // By toggling visible=true here, we ensure we only render valid, updating frames.
    this.container.visible = true;

    // Increment refcount when avatar becomes visible
    const { set } = getDefaultStore();
    set(this.refCountAtom, (prev) => prev + 1);
  }

  /**
   * Called when the avatar exits the viewport and is no longer visible.
   * Unregisters the sprite from the batch renderer to free canvas space
   * and decrements the avatar's refcount.
   *
   * IMPORTANT: Should only be called once per visibility transition by AvatarViewManager.
   */
  onExitedViewport(): void {
    this.riveSprite.unregisterFromBatchRenderer();
    // We must explicitly hide the container.
    // unregisterFromBatchRenderer only stops *updates* to the texture.
    // The sprite still holds a texture pointing to the last-rendered frame on the
    // shared canvas. If we leave it visible, Pixi will happily render that stale
    // (or garbage) data at the last known position.
    this.container.visible = false;

    // Hide screen-space elements when leaving viewport
    this.chatBubble.visible = false;
    this.nameTag.hide();

    // Decrement refcount when avatar becomes hidden
    const { set } = getDefaultStore();
    set(this.refCountAtom, (prev) => Math.max(0, prev - 1));
  }

  /**
   * Destroys the avatar view and cleans up resources.
   * This should be called when the avatar is removed from the game.
   *
   * IMPORTANT: The caller (AvatarViewManager) MUST ensure onExitedViewport() is called
   * before destroy() if the avatar is visible, to properly clean up refcounts.
   */
  destroy(): void {
    // Safety net: ensure we release the refcount if we're still "visible"
    // This prevents refcount leaks if destroy() is called without onExitedViewport()
    if (this.container.visible) {
      this.onExitedViewport();
    }

    this.riveSprite.destroy();
    this.heldItemVisual.destroy();
    this.uiContainer.removeChild(this.chatBubble);
    this.chatBubble.destroy();
    this.uiContainer.removeChild(this.nameTag);
    this.nameTag.destroy();
    this.container.destroy();
  }

  /**
   * Sets the current chat message for the avatar.
   *
   * @param message - The message to display, or null to hide
   * @param timestamp - The server timestamp of the message
   * @param color - The background color for the bubble
   */
  setChatMessage(
    message: string | null,
    timestamp: number,
    color: string = '#ffffff'
  ): void {
    if (message) {
      this.chatBubble.showMessage(message, color);
      this.currentMessageTimestamp = timestamp;
      // Update position immediately so it doesn't pop in at (0,0)
      this.updateChatBubblePosition();
    } else {
      this.chatBubble.hideMessage();
      this.currentMessageTimestamp = 0;
    }
  }

  /**
   * Sets the display data for the avatar name tag.
   *
   * @param config - Name, text color, and background color
   */
  setNameTag(config: NameTagConfig | null): void {
    if (config) {
      this.nameTagConfig = { ...config };
      this.nameTag.setContent(
        config.displayName,
        config.textColor,
        config.backgroundColor
      );
    } else {
      this.nameTagConfig = null;
      this.nameTag.hide();
    }
  }

  /**
   * Sets the inventory item the avatar is holding.
   *
   * @param item - The inventory item to display above the avatar, or null to hide
   * @param decorRotation - Rotation for decor items (local player only, 0 for others)
   */
  setHeldItem(item: InventoryItem | null, decorRotation: number = 0): void {
    this.heldItemVisual.setItem(item, decorRotation);
  }
}
