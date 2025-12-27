import type { Operation } from 'fast-json-patch';
import type { Container } from 'pixi.js';
import type { QuinoaData } from '@/common/games/Quinoa/types/quinoa-data';
import type {
  GardenTileObject,
  QuinoaUserJson,
} from '@/common/games/Quinoa/user-json-schema/current';
import {
  type GridPosition,
  getGlobalTileIndexFromCoordinate,
  getTilePosition,
  type QuinoaMap,
} from '@/common/games/Quinoa/world/map';
import type { RoomData } from '@/common/games/Room/types';
import type { IState } from '@/common/types/state';
import RoomConnection from '@/connection/RoomConnection';
import { getPlaceholderGardenForSlot } from '@/Quinoa/components/QuinoaWorld/placeholderGardens';
import { PatchRouter } from '@/utils/patchRouter';
import type { QuinoaFrameContext, QuinoaSystem } from '../../interfaces';
import { TileObjectContainerView } from './TileObjectContainerView';
import {
  isTileIndexInViewport,
  iterateTileIndices,
  type TileViewport,
} from './TileViewport';

/**
 * Number of extra tiles to include around viewport edges for tiles.
 * Prevents pop-in when panning/zooming by pre-rendering a buffer zone.
 */
const EDGE_BUFFER = 2;

// Route Definitions
const SLOT_ROOT = 'child/data/userSlots/:slotIdx';

const ROUTES = {
  SLOT: SLOT_ROOT,
  DIRT_TILE: `${SLOT_ROOT}/data/garden/tileObjects/:localIdx`,
  BOARDWALK_TILE: `${SLOT_ROOT}/data/garden/boardwalkTileObjects/:localIdx`,
} as const;

/**
 * Interface for providers that can query tile data at specific positions.
 * Implemented by EntityViewManager to provide world state to other systems (e.g. Avatars).
 */
export interface TileObjectDataProvider {
  /**
   * Query tile data at a specific grid position.
   *
   * @param position - Grid position to query
   * @returns Garden tile object at position, or undefined if empty or out of bounds
   */
  getTileDataAt(position: GridPosition): Readonly<GardenTileObject> | undefined;
}

/**
 * Manages all entity views in the world using patch-driven updates.
 *
 * Patch-Driven Architecture:
 * - Static entities (tiles): One TileView per tile (created lazily on-demand)
 * - Subscribes to JSON patches from server via RoomConnection
 * - Parses patches to find affected tiles
 * - Updates only changed tiles via onDataChanged()
 * - Handles slot → null transitions (user leaves) by backfilling with placeholder
 * - No atom overhead - updates are targeted and efficient
 */
export class TileObjectSystem implements TileObjectDataProvider, QuinoaSystem {
  /** Unique identifier used by the engine for this system. */
  public readonly name = 'tileObject';

  // One TileView per tile in the world (mapped by global tile index)
  private tileViews: Map<number, TileObjectContainerView> = new Map();
  private map: QuinoaMap;
  private worldContainer: Container;
  private unsubscribe: (() => void) | null = null;
  private router = new PatchRouter<QuinoaData>();

  /** Cached viewport for detecting changes between frames. */
  private currentViewport: TileViewport | null = null;

  constructor(map: QuinoaMap, worldContainer: Container) {
    this.map = map;
    this.worldContainer = worldContainer;

    // Register patch routes: this allows us to "subscribe" to the patches and
    // perform granular updates to the tile views when they change.

    // ---------------------------------------------------------
    // 1. Slot Lifecycle (User Join/Leave)
    // ---------------------------------------------------------
    this.router.on(
      ROUTES.SLOT,
      { exact: true }, // Exact match only (don't fire for nested tile updates)
      ({ slotIdx }, quinoaData) => {
        console.debug(
          `[TileObjectSystem] Slot ${slotIdx} changed (Join/Leave)`
        );
        // Check current value in state (patch value can be unreliable if multiple patches merged)
        const slot = quinoaData.userSlots[slotIdx];

        if (slot === null) {
          // User left
          const placeholderGarden = getPlaceholderGardenForSlot(slotIdx);
          this.updateAllTilesInSlot(slotIdx, placeholderGarden);
        } else {
          // User joined
          this.updateAllTilesInSlot(slotIdx, slot.data.garden);
        }
      }
    );

    // ---------------------------------------------------------
    // 2. Dirt Tiles (Granular Updates)
    // ---------------------------------------------------------
    this.router.on(
      ROUTES.DIRT_TILE,
      { exact: false }, // Prefix match (catch nested property changes)
      ({ slotIdx, localIdx }, quinoaData, patch) => {
        console.debug(
          `[TileObjectSystem] Dirt tile update: Slot ${slotIdx}, Local ${localIdx}`,
          patch
        );
        const globalIdx =
          this.map.userSlotIdxAndDirtTileIdxToGlobalTileIdx[slotIdx]?.[
            localIdx
          ];

        if (globalIdx !== undefined) {
          const tileData =
            quinoaData.userSlots[slotIdx]?.data.garden.tileObjects[localIdx];
          this.updateTileData(globalIdx, tileData);
        }
      }
    );

    // ---------------------------------------------------------
    // 3. Boardwalk Tiles (Granular Updates)
    // ---------------------------------------------------------
    this.router.on(
      ROUTES.BOARDWALK_TILE,
      { exact: false },
      ({ slotIdx, localIdx }, quinoaData) => {
        console.debug(
          `[TileObjectSystem] Boardwalk tile update: Slot ${slotIdx}, Local ${localIdx}`
        );
        const globalIdx =
          this.map.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx[slotIdx]?.[
            localIdx
          ];

        if (globalIdx !== undefined) {
          const tileData =
            quinoaData.userSlots[slotIdx]?.data.garden.boardwalkTileObjects?.[
              localIdx
            ];
          this.updateTileData(globalIdx, tileData);
        }
      }
    );

    // Subscribe to patches from RoomConnection
    const subscription = RoomConnection.getInstance().subscribeToPatches(
      this.onPatches
    );

    this.unsubscribe = subscription.unsubscribe;

    // Handle initial state snapshot (if available)
    if (subscription.currentState) {
      this.initializeFromState(subscription.currentState);
    }
  }

  /**
   * Initialize tile views from initial state snapshot.
   * Applies backfilling for null user slots.
   */
  private initializeFromState(state: IState<RoomData>): void {
    if (state.child?.scope !== 'Quinoa') {
      return;
    }

    const quinoaData = state.child.data as QuinoaData;
    const userSlots = quinoaData.userSlots;

    // Populate each slot (with backfilling)
    userSlots.forEach((slot, slotIdx) => {
      const garden = slot
        ? slot.data.garden
        : getPlaceholderGardenForSlot(slotIdx);

      // Update dirt tiles
      const dirtMapping =
        this.map.userSlotIdxAndDirtTileIdxToGlobalTileIdx[slotIdx];
      if (dirtMapping) {
        for (const [localIdx, globalIdx] of Object.entries(dirtMapping)) {
          const tileData = garden.tileObjects[localIdx];
          this.updateTileData(globalIdx, tileData);
        }
      }

      // Update boardwalk tiles
      const boardwalkMapping =
        this.map.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx[slotIdx];
      if (boardwalkMapping) {
        for (const [localIdx, globalIdx] of Object.entries(boardwalkMapping)) {
          const tileData = garden.boardwalkTileObjects?.[localIdx];
          this.updateTileData(globalIdx, tileData);
        }
      }
    });
  }

  /**
   * Handle patches from the server.
   * Parses patches and updates affected tile views.
   * Handles backfilling when users leave.
   *
   * NOTE ON REDUNDANCY:
   * A single server update might generate multiple patches for the same tile
   * For example, when harvesting a toamto, we might get three separate patches:
   * - /child/data/userSlots/0/data/garden/tileObjects/0/startTime
   * - /child/data/userSlots/0/data/garden/tileObjects/0/endTime
   * - /child/data/userSlots/0/data/garden/tileObjects/0/scale
   *   This causes onDataChanged() to be called multiple times per frame for one
   *   tile. This is SAFE and Efficient because TileObjectContainerView uses
   *   deferred rendering: calling onDataChanged() marks the view as dirty and
   *   the rebuild only happens on the next update() call.
   */
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
   * Update all tiles in a slot with the given garden data.
   * Used for both user joins (clear placeholders) and user leaves (apply placeholders).
   */
  private updateAllTilesInSlot(
    slotIdx: number,
    garden: QuinoaUserJson['garden']
  ): void {
    // Update dirt tiles
    const dirtMapping =
      this.map.userSlotIdxAndDirtTileIdxToGlobalTileIdx[slotIdx];
    if (dirtMapping) {
      for (const [localIdx, globalIdx] of Object.entries(dirtMapping)) {
        const tileData = garden.tileObjects[localIdx];
        this.updateTileData(globalIdx, tileData);
      }
    }

    // Update boardwalk tiles
    const boardwalkMapping =
      this.map.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx[slotIdx];
    if (boardwalkMapping) {
      for (const [localIdx, globalIdx] of Object.entries(boardwalkMapping)) {
        const tileData = garden.boardwalkTileObjects?.[localIdx];
        this.updateTileData(globalIdx, tileData);
      }
    }
  }

  /**
   * Updates the data for a specific tile.
   * If the new data is present, ensures the view exists (creating it if necessary).
   * If the new data is absent (undefined), only updates the view if it already exists.
   */
  private updateTileData(
    globalIdx: number,
    tileData: GardenTileObject | undefined
  ): void {
    if (tileData) {
      this.getOrCreateTileView(globalIdx).onDataChanged(tileData);
    } else {
      this.tileViews.get(globalIdx)?.onDataChanged(tileData);
    }
  }

  /**
   * Helper to retrieve or create a TileObjectContainerView for a given global index.
   * If the view is newly created and currently within the viewport, it is set to visible.
   */
  private getOrCreateTileView(globalIdx: number): TileObjectContainerView {
    let tileView = this.tileViews.get(globalIdx);

    if (!tileView) {
      const worldPos = getTilePosition(this.map, globalIdx);
      tileView = new TileObjectContainerView(worldPos, this.worldContainer);
      // Treat the tileview as a culling boundary to prevent recursion into its
      // children, which can be expensive for the CPU
      // NOTE: we don't currently use Pixi's built-in culler, so this is a no-op for
      // now, but I'm keeping it around in case we ever decide to reintroduce
      // transform-based culling in the future!
      tileView.displayObject.cullableChildren = false;
      this.tileViews.set(globalIdx, tileView);

      // If we have a current viewport, check if this new tile should be visible
      if (this.currentViewport) {
        const bounds = this.getBufferedBounds(
          this.currentViewport,
          EDGE_BUFFER
        );
        if (isTileIndexInViewport(globalIdx, this.map.cols, bounds, 0)) {
          tileView.onEnteredViewport();
        }
      }
    }
    return tileView;
  }

  /**
   * Helper to calculate buffered viewport bounds.
   */
  private getBufferedBounds(
    viewport: TileViewport,
    bufferTiles: number
  ): TileViewport {
    return {
      minTileX: Math.max(0, viewport.minTileX - bufferTiles),
      maxTileX: Math.min(this.map.cols - 1, viewport.maxTileX + bufferTiles),
      minTileY: Math.max(0, viewport.minTileY - bufferTiles),
      maxTileY: Math.min(this.map.rows - 1, viewport.maxTileY + bufferTiles),
    };
  }

  /**
   * Update visibility state for all tiles based on viewport.
   * Called every frame when viewport changes (cheap operation).
   * Sets displayObject.visible to hide/show tiles.
   *
   * @param newViewport - Exact new viewport bounds
   * @param oldViewport - Exact old viewport bounds (or null if first frame)
   * @param bufferTiles - Buffer in tiles to extend viewport (prevents pop-in)
   * @param context - Optional frame context to immediately update newly visible tiles.
   *                  If provided, tiles will be updated immediately upon entering the viewport.
   *                  This prevents a 1-frame lag where the container is visible but empty.
   */
  public syncVisibleTiles(
    newViewport: TileViewport,
    oldViewport: TileViewport | null,
    bufferTiles: number,
    context?: QuinoaFrameContext
  ): void {
    // 1. Calculate new target bounds (including buffer) and clamp to map dimensions
    const newBounds = this.getBufferedBounds(newViewport, bufferTiles);

    // If no previous viewport, just handle enters
    if (!oldViewport) {
      this.handleEnters(newBounds, context);
      return;
    }

    const prevBounds = this.getBufferedBounds(oldViewport, bufferTiles);

    // 2. Handle Exits: Iterate the OLD rectangle
    // Any tile that was in old bounds but is NOT in new bounds = EXIT
    for (const tileIndex of iterateTileIndices(prevBounds, this.map.cols)) {
      // Check if tile is NOT in new bounds (meaning it exited)
      // Uses fast index-based check to avoid allocation
      if (!isTileIndexInViewport(tileIndex, this.map.cols, newBounds, 0)) {
        this.tileViews.get(tileIndex)?.onExitedViewport();
      }
    }

    // 3. Handle Enters: Iterate the NEW rectangle
    // Any tile that is in new bounds but was NOT in old bounds = ENTER
    for (const tileIndex of iterateTileIndices(newBounds, this.map.cols)) {
      // Check if tile was NOT in old bounds (meaning it entered)
      // Uses fast index-based check to avoid allocation
      if (!isTileIndexInViewport(tileIndex, this.map.cols, prevBounds, 0)) {
        const tileView = this.tileViews.get(tileIndex);
        if (tileView) {
          tileView.onEnteredViewport();
          if (context) {
            tileView.update(context);
          }
        }
      }
    }
  }

  private handleEnters(
    bounds: TileViewport,
    context?: QuinoaFrameContext
  ): void {
    for (const tileIndex of iterateTileIndices(bounds, this.map.cols)) {
      const tileView = this.tileViews.get(tileIndex);
      if (tileView) {
        tileView.onEnteredViewport();
        if (context) {
          tileView.update(context);
        }
      }
    }
  }

  // ===========================================================================
  // QuinoaSystem Interface
  // ===========================================================================

  /**
   * Per-frame update for visibility culling.
   * Detects viewport changes and updates tile visibility when camera moves.
   *
   * @param context - System context from QuinoaEngine
   */
  draw(context: QuinoaFrameContext): void {
    const incomingViewport = context.viewport;

    // Check if viewport changed
    const viewportChanged =
      !this.currentViewport ||
      incomingViewport.minTileX !== this.currentViewport.minTileX ||
      incomingViewport.minTileY !== this.currentViewport.minTileY ||
      incomingViewport.maxTileX !== this.currentViewport.maxTileX ||
      incomingViewport.maxTileY !== this.currentViewport.maxTileY;

    if (viewportChanged) {
      this.syncVisibleTiles(
        incomingViewport,
        this.currentViewport,
        EDGE_BUFFER,
        context
      );
      // Purely defensive copy, in case viewport is mutated by other code
      this.currentViewport = { ...incomingViewport };
    }
  }

  /**
   * Throttled content update for tile animations.
   *
   * @param context - System context from QuinoaEngine
   */
  patch(context: QuinoaFrameContext): void {
    if (!this.currentViewport) {
      return;
    }

    const bounds = this.getBufferedBounds(this.currentViewport, EDGE_BUFFER);

    // Iterate only the currently visible bounds
    for (const tileIndex of iterateTileIndices(bounds, this.map.cols)) {
      const tileView = this.tileViews.get(tileIndex);
      if (tileView) {
        tileView.update(context);
      }
    }
  }

  /**
   * Count visible and invisible tiles with content (plants, decor, eggs).
   * FOR DEBUG USE ONLY - iterates all tiles on every call.
   *
   * @returns Tile counts: visible (in view), withContent (non-empty), total (instantiated views)
   */
  public debugCountTiles(): {
    visibleCount: number;
    withContentCount: number;
    totalCount: number;
  } {
    let visibleCount = 0;
    let withContentCount = 0;
    let totalCount = 0;
    const bounds = this.currentViewport
      ? this.getBufferedBounds(this.currentViewport, EDGE_BUFFER)
      : { minTileX: 0, maxTileX: -1, minTileY: 0, maxTileY: -1 };

    // Count visible tiles with content
    for (const tileIndex of iterateTileIndices(bounds, this.map.cols)) {
      const tileView = this.tileViews.get(tileIndex);
      if (tileView?.hasContent()) {
        visibleCount++;
      }
    }

    // Count total instantiated views and content
    for (const tileView of this.tileViews.values()) {
      totalCount++;
      if (tileView.hasContent()) {
        withContentCount++;
      }
    }

    return { visibleCount, withContentCount, totalCount };
  }

  /**
   * Query tile data at a specific grid position.
   * Returns the garden object (plant, decor, egg) if present, undefined otherwise.
   *
   * @param position - Grid position to query
   * @returns Garden tile object at position, or undefined if empty or out of bounds
   */
  public getTileDataAt(
    position: GridPosition
  ): Readonly<GardenTileObject> | undefined {
    const globalIdx = getGlobalTileIndexFromCoordinate(
      this.map,
      position.x,
      position.y
    );
    return this.tileViews.get(globalIdx)?.tileObject;
  }

  /**
   * Cleanup subscriptions and clear singleton instance.
   */
  public destroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  /**
   * Get all TileViews for direct iteration.
   * Readonly to prevent external mutation.
   */
  get allTileViews(): readonly TileObjectContainerView[] {
    return Array.from(this.tileViews.values());
  }
}
