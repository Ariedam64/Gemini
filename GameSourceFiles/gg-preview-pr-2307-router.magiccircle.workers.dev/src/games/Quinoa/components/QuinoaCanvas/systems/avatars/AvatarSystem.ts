import { getDefaultStore } from 'jotai';
import type { Container } from 'pixi.js';
import type { InventoryItem } from '@/common/games/Quinoa/user-json-schema/current';
import type { GridPosition } from '@/common/games/Quinoa/world/map';
import type { ChatData } from '@/common/types/chat-data';
import type { PlayerId } from '@/common/types/player';
import {
  AvatarSetAnimation,
  AvatarToggleAnimationName,
  AvatarTriggerAnimationName,
} from '@/components/Avatars/avatarRiveConstants';
import { avatarDataAtom, emoteDataAtom } from '@/Quinoa/atoms/allPlayerAtoms';
import { avatarTriggerAnimationAtom } from '@/Quinoa/atoms/avatarAtoms';
import { filteredUserSlotsAtom } from '@/Quinoa/atoms/baseAtoms';
import { tileSizeAtom } from '@/Quinoa/atoms/mapAtoms';
import {
  mySelectedItemAtom,
  mySelectedItemRotationAtom,
} from '@/Quinoa/atoms/myAtoms';
import {
  otherPlayerLastActionsAtom,
  otherPlayerSelectedItemsAtom,
} from '@/Quinoa/atoms/otherPlayerAtoms';
import {
  discordSpeakingUsersAtom,
  filteredMessagesAtom,
  playerIdAtom,
} from '@/store/store';
import type { QuinoaFrameContext, QuinoaSystem } from '../../interfaces';
import type { RiveSpriteBatchRenderer } from '../../pixi/rive/RiveSpriteBatchRenderer';
import { TILE_SIZE_WORLD } from '../../sprite-utils';
import type { BuildingDataProvider } from '../buildings/BuildingSystem';
import type { TileObjectDataProvider } from '../tile-objects/TileObjectSystem';
import { isCoordinateInViewport } from '../tile-objects/TileViewport';
import {
  type AvatarCosmeticsPayload,
  type AvatarDataProvider,
  AvatarView,
} from './AvatarView';
import { getAnimationForAction } from './actionAnimationMap';
import { getIsHoldingAnimationActive } from './getIsHoldingAnimationActive';

/**
 * AvatarSystem manages the lifecycle and animations of all avatar views.
 *
 * Responsibilities:
 * - Creates/destroys AvatarViews based on player presence
 * - Triggers one-shot animations (harvest, pickup, drop, etc.)
 * - Manages continuous animation states (holding, idle)
 * - Handles chat bubbles, name tags, emotes, and Discord voice state
 * - Coordinates batch rendering for all visible avatars
 */
export class AvatarSystem implements QuinoaSystem, AvatarDataProvider {
  /** Unique identifier used by the engine for this system. */
  public readonly name = 'avatar';

  private views: Map<PlayerId, AvatarView> = new Map();
  private worldContainer: Container;
  private uiContainer: Container;
  private tileDataProvider: TileObjectDataProvider;
  private buildingDataProvider: BuildingDataProvider;
  private batchRenderer: RiveSpriteBatchRenderer;
  private cameraContainer: Container;
  private unsubscribes: (() => void)[] = [];
  private userPositions: Map<PlayerId, GridPosition> = new Map();
  private userLastActionTimes: Map<PlayerId, number> = new Map();
  private speakingUsers: Set<PlayerId> = new Set();
  /**
   * Tracks viewport visibility state for each avatar:
   * - New avatars initialized to false (not visible)
   * - true: avatar is in viewport
   * - false: avatar is outside viewport or has no position
   */
  private visibilityStates: Map<PlayerId, boolean> = new Map();

  // Track the last processed message timestamp for each player to avoid reprocessing
  private lastProcessedMessageTimestamps: Map<PlayerId, number> = new Map();

  // Track the last processed action timestamp for each player to avoid re-triggering animations
  private lastProcessedActionTimestamps: Map<PlayerId, number> = new Map();

  /**
   * Tracks the last tile size to use it in calculating the avatar render size.
   */
  private lastTileSize: number = 0;

  /**
   * Creates a new AvatarSystem.
   *
   * @param worldContainer - PixiJS container for avatar sprites (world space)
   * @param uiContainer - PixiJS container for UI elements (screen space)
   * @param tileDataProvider - Provider for tile data to calculate height offsets
   * @param buildingDataProvider - Provider for building data to calculate height offsets
   * @param batchRenderer - The Rive batch renderer for avatar sprites
   */
  constructor(
    worldContainer: Container,
    uiContainer: Container,
    tileDataProvider: TileObjectDataProvider,
    buildingDataProvider: BuildingDataProvider,
    batchRenderer: RiveSpriteBatchRenderer,
    cameraContainer: Container
  ) {
    this.worldContainer = worldContainer;
    this.uiContainer = uiContainer;
    this.tileDataProvider = tileDataProvider;
    this.buildingDataProvider = buildingDataProvider;
    this.batchRenderer = batchRenderer;
    this.cameraContainer = cameraContainer;

    const { get, sub } = getDefaultStore();
    const addSubscription = (unsubscribe: () => void) => {
      this.unsubscribes.push(unsubscribe);
    };

    // Subscribe to avatarDataAtom for automatic lifecycle management
    addSubscription(
      sub(avatarDataAtom, () => {
        void this.onAvatarDataChanged();
      })
    );

    // Seed speaking state so new views correctly reflect Discord voice data
    this.speakingUsers = new Set(get(discordSpeakingUsersAtom));

    // Initialize with current data
    void this.onAvatarDataChanged();
    this.onEmoteDataChanged();

    // NOTE: We no longer subscribe to tileSizeAtom here.
    // Instead, we check context.zoomLevel in draw() to handle dynamic zoom changes
    // (including establishing shot overrides) more smoothly.

    addSubscription(
      sub(filteredUserSlotsAtom, () => {
        this.userPositions.clear();
        this.userLastActionTimes.clear();
        const filteredUserSlots = get(filteredUserSlotsAtom);
        for (const userSlot of filteredUserSlots) {
          if (userSlot.position) {
            this.userPositions.set(userSlot.playerId, userSlot.position);
          }
          if (userSlot.lastActionEvent) {
            this.userLastActionTimes.set(
              userSlot.playerId,
              userSlot.lastActionEvent.performedAt
            );
          }
        }
      })
    );

    // Subscribe to chat messages
    addSubscription(
      sub(filteredMessagesAtom, () => {
        this.onChatMessagesChanged();
      })
    );

    // Subscribe to emote data
    addSubscription(
      sub(emoteDataAtom, () => {
        this.onEmoteDataChanged();
      })
    );

    // Subscribe to Discord speaking state
    addSubscription(
      sub(discordSpeakingUsersAtom, () => {
        this.onSpeakingUsersChanged();
      })
    );

    // Subscribe to avatar trigger animation atom (for local player action animations)
    addSubscription(
      sub(avatarTriggerAnimationAtom, () => {
        this.onAvatarTriggerAnimationChanged();
      })
    );

    // Subscribe to other player actions to trigger one-shot animations
    addSubscription(
      sub(otherPlayerLastActionsAtom, () => {
        this.onPlayerActionsChanged();
      })
    );
  }

  private async onAvatarDataChanged(): Promise<void> {
    const { get } = getDefaultStore();
    const avatarData = get(avatarDataAtom);

    // Create or update views for all players
    for (const playerId in avatarData) {
      const data = avatarData[playerId];
      const cosmetics: AvatarCosmeticsPayload = {
        avatar: data.avatar,
        externalAvatarUrl: data.discordAvatarUrl ?? undefined,
      };

      const existingView = this.views.get(playerId);
      if (existingView) {
        // Existing player - only reload avatar if cosmetics changed
        if (!existingView.hasCosmetics(cosmetics)) {
          await existingView.loadAvatar(cosmetics);
          existingView.triggerAnimation(
            AvatarTriggerAnimationName.ChangedOutfit
          );
        }

        // Always update name tag (might have changed independently)
        existingView.setNameTag({
          displayName: data.displayName,
          textColor: data.nameTagColors.textColor,
          backgroundColor: data.nameTagColors.backgroundColor,
        });
        this.applyTalkingStateToView(playerId, existingView);
      } else {
        // New player - create view and load avatar

        const view = await AvatarView.create(
          playerId,
          this.tileDataProvider,
          this.buildingDataProvider,
          this,
          this.uiContainer,
          this.batchRenderer,
          this.cameraContainer
        );
        this.worldContainer.addChild(view.displayObject);
        await view.loadAvatar(cosmetics);
        // We separately handle a waving animation that plays
        // after the establishing shot for the own player.
        if (playerId !== get(playerIdAtom)) {
          view.triggerAnimation(AvatarTriggerAnimationName.JoinGame);
        }
        view.setNameTag({
          displayName: data.displayName,
          textColor: data.nameTagColors.textColor,
          backgroundColor: data.nameTagColors.backgroundColor,
        });

        this.views.set(playerId, view);

        // Resize the artboard to the current tile size. Important to do this
        // after all the async operations are complete, as the tile size may
        // have changed since we awaited the loading of the cosmetics and the
        // creation of the view.
        // If we have a cached lastTileSize, use it. Otherwise use atom value as fallback.
        const currentTileSize =
          this.lastTileSize > 0 ? this.lastTileSize : get(tileSizeAtom);
        view.resizeArtboard(currentTileSize);

        // Initialize visibility state to false (not visible yet)
        // Will be set to true on first frame if avatar is in viewport
        this.visibilityStates.set(playerId, false);

        // Initialize emote state
        const emoteData = get(emoteDataAtom);
        if (emoteData[playerId]) {
          view.setEmoteType(emoteData[playerId].emoteType);
        }

        this.applyTalkingStateToView(playerId, view);
      }
    }

    // Remove views for departed players
    for (const playerId of this.views.keys()) {
      if (!avatarData[playerId]) {
        const view = this.views.get(playerId);
        if (view) {
          // IMPORTANT: Ensure avatar exits viewport before destruction to properly clean up refcount
          const wasVisible = this.visibilityStates.get(playerId);
          if (wasVisible) {
            view.onExitedViewport();
          }
          view.destroy();
        }
        this.views.delete(playerId);
        this.visibilityStates.delete(playerId);
        this.lastProcessedMessageTimestamps.delete(playerId);
        this.lastProcessedActionTimestamps.delete(playerId);
      }
    }
  }

  /**
   * Applies the current talking state to a specific avatar view.
   */
  private applyTalkingStateToView(playerId: PlayerId, view: AvatarView): void {
    const isTalking = this.speakingUsers.has(playerId);
    view.toggleAnimation(AvatarToggleAnimationName.Talking, isTalking);
  }

  /**
   * Handles Discord speaking atom updates and toggles avatar animations.
   */
  private onSpeakingUsersChanged(): void {
    const { get } = getDefaultStore();
    const nextSpeakingUsers = new Set<PlayerId>(get(discordSpeakingUsersAtom));

    for (const playerId of nextSpeakingUsers) {
      if (!this.speakingUsers.has(playerId)) {
        this.setTalkingAnimation(playerId, true);
      }
    }

    for (const playerId of this.speakingUsers) {
      if (!nextSpeakingUsers.has(playerId)) {
        this.setTalkingAnimation(playerId, false);
      }
    }

    this.speakingUsers = nextSpeakingUsers;
  }

  /**
   * Toggles the talking animation for a given player view when present.
   */
  private setTalkingAnimation(playerId: PlayerId, isTalking: boolean): void {
    const view = this.views.get(playerId);
    if (view) {
      view.toggleAnimation(AvatarToggleAnimationName.Talking, isTalking);
    }
  }

  /**
   * Called when chat messages change.
   * Dispatches new messages to the appropriate avatar views.
   */
  private onChatMessagesChanged(): void {
    const { get } = getDefaultStore();
    const messages = get(filteredMessagesAtom);

    // Find the latest message for each player
    const latestMessages = new Map<PlayerId, ChatData>();
    for (const msg of messages) {
      const existing = latestMessages.get(msg.playerId);
      if (!existing || msg.timestamp > existing.timestamp) {
        latestMessages.set(msg.playerId, msg);
      }
    }

    // Update views
    for (const [playerId, message] of latestMessages.entries()) {
      const view = this.views.get(playerId);
      if (view) {
        const lastTimestamp =
          this.lastProcessedMessageTimestamps.get(playerId) ?? 0;

        // Only update if this is a new message
        if (message.timestamp > lastTimestamp) {
          view.setChatMessage(message.message, message.timestamp);
          this.lastProcessedMessageTimestamps.set(playerId, message.timestamp);
        }
      }
    }
  }

  /**
   * Called when emote data changes.
   * Updates the emote state for each avatar.
   */
  private onEmoteDataChanged(): void {
    const { get } = getDefaultStore();
    const emoteData = get(emoteDataAtom);

    for (const [playerId, data] of Object.entries(emoteData)) {
      const view = this.views.get(playerId);
      if (view) {
        view.setEmoteType(data.emoteType);
      }
    }
  }

  /**
   * Called when avatarTriggerAnimationAtom changes (local player action animations).
   * This is the primary way local player animations are triggered.
   * Only triggers if the avatar is currently visible in the viewport.
   */
  private onAvatarTriggerAnimationChanged(): void {
    const { get } = getDefaultStore();
    const animationData = get(avatarTriggerAnimationAtom);

    if (!animationData) return;

    const { playerId, animation } = animationData;

    // Skip if avatar is not visible (avoids wasted cycles and premature SFX)
    if (!this.visibilityStates.get(playerId)) return;

    const view = this.views.get(playerId);
    if (view) {
      view.triggerAnimation(animation);
    }
  }

  /**
   * Called when other player actions change.
   * Triggers one-shot animations for actions like pickup, drop, harvest, etc.
   * Only triggers if the avatar is currently visible in the viewport.
   */
  private onPlayerActionsChanged(): void {
    const { get } = getDefaultStore();
    const actions = get(otherPlayerLastActionsAtom);

    for (const [playerId, actionEvent] of Object.entries(actions)) {
      if (!actionEvent) continue;

      const lastTimestamp =
        this.lastProcessedActionTimestamps.get(playerId) ?? 0;

      // Only trigger animation if this is a new action
      if (actionEvent.performedAt > lastTimestamp) {
        // Always update timestamp to avoid replaying old animations when avatar enters viewport
        this.lastProcessedActionTimestamps.set(
          playerId,
          actionEvent.performedAt
        );

        // Skip animation if avatar is not visible (avoids wasted cycles and premature SFX)
        if (!this.visibilityStates.get(playerId)) continue;

        const view = this.views.get(playerId);
        if (view) {
          const animation = getAnimationForAction(actionEvent.action);
          if (animation) {
            view.triggerAnimation(animation);
          }
        }
      }
    }
  }

  /**
   * Updates all avatar views each frame.
   *
   * Process:
   * 1. All views advance state machines and mark for batch rendering (if visible)
   * 2. Batch render all marked sprites to canvas (single flush)
   * 3. Upload textures to GPU (only for visible views)
   *
   * @param context - Frame context with timing and position information
   *
   * @example
   * ```typescript
   * avatarSystem.draw(context);
   * ```
   */
  draw(context: QuinoaFrameContext): void {
    const { get } = getDefaultStore();

    // Check for zoom changes to update render resolution
    // This handles both user zoom and establishing shot animations
    const currentTileSize = Math.round(context.zoomLevel * TILE_SIZE_WORLD);

    // Only resize if significantly changed (prevent jitter and save perf)
    // Threshold of 5px means we update resolution roughly every ~20-30 frames during a slow zoom,
    // rather than every frame.
    if (Math.abs(currentTileSize - this.lastTileSize) > 5) {
      this.lastTileSize = currentTileSize;
      for (const view of this.views.values()) {
        view.resizeArtboard(currentTileSize);
      }
    }

    // Fetch atom data once per frame
    const mySelectedItem = get(mySelectedItemAtom);
    const myDecorRotation = get(mySelectedItemRotationAtom);
    const otherPlayerItems = get(otherPlayerSelectedItemsAtom);

    // Process all avatars: check visibility changes, update if visible
    // Avatars use buffer=0 for exact viewport boundaries (precise refcount management)
    for (const [playerId, view] of this.views) {
      let position = this.userPositions.get(playerId);

      // Always use local client-side position for the active player
      if (playerId === context.activePlayerId) {
        position = context.playerPosition;
      }

      if (position) {
        const wasVisible = this.visibilityStates.get(playerId);
        const isVisible = isCoordinateInViewport(
          position.x,
          position.y,
          context.viewport,
          0
        );

        // Only notify on visibility state changes
        if (isVisible !== wasVisible) {
          if (isVisible) {
            view.onEnteredViewport();
          } else {
            view.onExitedViewport();
          }
          this.visibilityStates.set(playerId, isVisible);
        }

        // Update animation only if visible
        if (isVisible) {
          // Determine held item and rotation based on whether it's local or remote player
          let heldItem: InventoryItem | null;
          let decorRotation: number;

          if (playerId === context.activePlayerId) {
            heldItem = mySelectedItem;
            decorRotation = myDecorRotation;
          } else {
            heldItem = otherPlayerItems[playerId] ?? null;
            decorRotation = 0; // Remote players don't sync rotation
          }

          view.setHeldItem(heldItem, decorRotation);

          // Set avatar body animation based on held item
          if (getIsHoldingAnimationActive(heldItem)) {
            view.setAvatarAnimation(AvatarSetAnimation.Holding);
          } else {
            view.setAvatarAnimation(AvatarSetAnimation.Idle);
          }

          view.update(
            context,
            position,
            this.userLastActionTimes.get(playerId) ?? null
          );
        }
      } else {
        // No position = not visible
        const wasVisible = this.visibilityStates.get(playerId);
        if (wasVisible !== false) {
          view.onExitedViewport();
          this.visibilityStates.set(playerId, false);
        }
      }
    }
  }

  /**
   * Destroys the AvatarSystem and all managed views.
   * Should be called when the game is unmounted.
   */
  destroy(): void {
    for (const unsubscribe of this.unsubscribes) {
      unsubscribe();
    }
    this.unsubscribes.length = 0;

    // Clean up all views with proper visibility lifecycle
    for (const [playerId, view] of this.views) {
      // Ensure avatar exits viewport before destruction to properly clean up refcount
      const wasVisible = this.visibilityStates.get(playerId);
      if (wasVisible) {
        view.onExitedViewport();
      }
      view.destroy();
    }

    this.views.clear();
    this.visibilityStates.clear();
  }

  /**
   * Returns a list of player IDs that are currently at the given grid position.
   * Implements AvatarDataProvider.
   */
  getAvatarsAt(gridPosition: GridPosition): PlayerId[] {
    const avatarIds: PlayerId[] = [];
    for (const [playerId, pos] of this.userPositions) {
      if (pos.x === gridPosition.x && pos.y === gridPosition.y) {
        avatarIds.push(playerId);
      }
    }
    return avatarIds;
  }
}
