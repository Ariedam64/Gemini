import { Container } from 'pixi.js';
import type {
  DecorObject,
  EggTileObject,
  GardenTileObject,
  PlantTileObject,
} from '@/common/games/Quinoa/user-json-schema/current';
import type { GridPosition } from '@/common/games/Quinoa/world/map';
import type { QuinoaFrameContext } from '../../interfaces';
import { calculateZIndex, gridToWorldPixels, ZLayer } from '../../sprite-utils';
import { DecorView } from './DecorView';
import { EggView } from './EggView';
import { PlantView } from './flora/PlantView';
import type { GardenObjectView } from './GardenObjectView';
import type { ViewportCullable } from './ViewportCullable';

/**
 * TileView acts as a "Cell Controller" or "Wrapper" for a single grid
 * coordinate (X,Y).
 *
 * ARCHITECTURAL ROLE:
 * 1. Stability vs Volatility:
 *    - This object is STABLE: it is created once for every tile in the map and
 *      never destroyed.
 *    - Its content is VOLATILE: it creates/destroys child views (PlantView,
 *      DecorView) as the tile object state changes.
 *    - This provides a stable reference for the EntityViewManager to address
 *      grid cells without worrying about what type of tile object is currently
 *      there.
 *
 * 2. Deferred Rebuilding
 *    - When the server-side data for the tile object changes (via onDataChanged), we
 *      mark "isDirty" as true and update the data reference.
 *    - By marking as "isDirty", we avoid immediately recreating the child view,
 *      which is expensive, and more importantly, is wasted work unless that
 *      tile is actually visible.
 *    - Currently, ANY change to the server-side data for the tile object triggers a
 *      full rebuild of the child view. This ensures correctness (always
 *      reflects latest state) without complex patching logic.
 *    - This means off-screen changes (e.g. a massive crop update 5000px away)
 *      defer virtually all costs, including both rebuilding the tile object and
 *      re-rendering, until (and if) that tile eventually enters the viewport.
 *
 * 3. Polymorphic State Management:
 *    - Encapsulates the state machine of a tile (Empty -> Plant -> Dead ->
 *      Empty).
 *    - Acts as a factory for the specific view types (PlantView, DecorView,
 *      EggView).
 *
 * HIERARCHY:
 * - TileView (Permanent Container at X,Y)
 *   └─ [Transient Child View] (Swapped in/out based on data)
 *      ├─ PlantView
 *      ├─ DecorView
 *      └─ EggView
 */
export class TileObjectContainerView implements ViewportCullable {
  public readonly displayObject: Container;
  public readonly worldPosition: GridPosition;
  private childView: GardenObjectView | null = null;
  private isDirty = false;
  public tileObject: GardenTileObject | undefined;

  constructor(worldPosition: GridPosition, worldContainer: Container) {
    this.worldPosition = worldPosition;

    // Create container for this tile
    // Initial z-index uses Plants layer as default (will be updated when child view is created)
    const { y: worldY } = gridToWorldPixels(worldPosition);
    this.displayObject = new Container({
      label: `Tile (${worldPosition.x}, ${worldPosition.y})`,
      position: gridToWorldPixels(worldPosition),
      parent: worldContainer,
      zIndex: calculateZIndex(worldY, ZLayer.Plants),
      visible: false, // Start hidden, EntityViewManager will show visible tiles on first update
    });
    // Default to non-interactive to prevent blocking adjacent tiles
    this.displayObject.eventMode = 'none';
  }

  /**
   * Called when server patches affect this tile's data.
   *
   * PERFORMANCE CRITICAL: This method is called for every patch, even for
   * off-screen tiles. It must remain extremely cheap (O(1) pointer assignment).
   * We intentionally defer the expensive view recreation to the update() loop.
   *
   * CHANGE DETECTION STRATEGY:
   * - Any change in data reference triggers a dirty flag.
   * - This forces a full rebuild of the child view (Plant/Decor/Egg) on the
   *   next visible frame.
   * - We favor "rebuild on change" over "incremental patching" to keep view
   *   logic simple and bug-free.
   */
  public onDataChanged(newData: GardenTileObject | undefined): void {
    const oldType = this.tileObject?.objectType;
    const newType = newData?.objectType;

    this.tileObject = newData;

    if (oldType !== newType) {
      this.isDirty = true;
      return;
    }

    if (newType) {
      // TODO: if rebuilds become too expensive, consider a per-view
      // `shouldRebuild(nextTileObject)` hook so immutable tile objects can opt out.
      this.isDirty = true;
    }
  }

  /**
   * The "Factory" method.
   * Syncs the child view with current tile object data.
   * Creates, destroys, or replaces child view based on tile object type.
   *
   * This is expensive (sprite creation, texture lookups) and should only
   * be called when the tile is actually visible.
   */
  private syncChildView(context: QuinoaFrameContext): void {
    const tileObj = this.tileObject;

    // If tile is empty, destroy child view
    if (!tileObj) {
      if (this.childView) {
        this.displayObject.removeChild(this.childView.displayObject);
        this.childView.destroy();
        this.childView = null;
      }
      return;
    }

    // Destroy existing view if one exists
    if (this.childView) {
      this.displayObject.removeChild(this.childView.displayObject);
      this.childView.destroy();
    }

    // Create new view based on tile object type
    this.childView = this.createChildView(tileObj.objectType, context);
    this.displayObject.addChild(this.childView.displayObject);

    // Update container z-index based on child type and anchor
    this.updateZIndex();
  }

  /**
   * Determines the appropriate ZLayer for the current tile object.
   * - Plants and Eggs use ZLayer.Plants
   * - Background decor (benches, bridges) use ZLayer.Background
   * - Regular decor uses ZLayer.Decor
   */
  private getZLayer(): ZLayer {
    const tileObj = this.tileObject;
    if (!tileObj) {
      return ZLayer.Plants; // Default
    }

    if (tileObj.objectType === 'plant' || tileObj.objectType === 'egg') {
      return ZLayer.Plants;
    }

    if (tileObj.objectType === 'decor') {
      // Treat all decor as the same layer to allow Y-sorting and tie-breaking to work
      // between "background" decor (benches) and "regular" decor (arches).
      // Occlusion with avatars is handled by Y-sorting since Decor = Avatar Layer = 1.
      // Standing on benches is handled by AvatarView boosting its own Z-layer.
      return ZLayer.Decor;
    }

    return ZLayer.Plants; // Default fallback
  }

  /**
   * Updates the container's z-index based on current tile object type and visual bounds.
   */
  private updateZIndex(): void {
    const { y: worldY } = gridToWorldPixels(this.worldPosition);
    const zLayer = this.getZLayer();
    const bottomOffset =
      this.childView?.displayObject.getLocalBounds().maxY ?? 0;
    this.displayObject.zIndex = calculateZIndex(worldY, zLayer, bottomOffset);
  }

  private createChildView(
    objectType: GardenTileObject['objectType'],
    context: QuinoaFrameContext
  ): GardenObjectView {
    const tileObj = this.tileObject;
    if (!tileObj) {
      throw new Error('Cannot create child view without tile object data');
    }

    if (objectType === 'plant') {
      return new PlantView(
        tileObj as PlantTileObject,
        this.worldPosition,
        context
      );
    } else if (objectType === 'decor') {
      return new DecorView(tileObj as DecorObject, this.worldPosition);
    } else if (objectType === 'egg') {
      return new EggView(tileObj as EggTileObject, this.worldPosition);
    }
    throw new Error(
      `Unknown object type: ${objectType}. TODO: should have a MissingView`
    );
  }

  /**
   * Called when this tile enters the visible viewport.
   * Makes the tile visible.
   */
  public onEnteredViewport(): void {
    this.displayObject.visible = true;
  }

  /**
   * Called when this tile exits the visible viewport.
   * Hides the tile.
   */
  public onExitedViewport(): void {
    this.displayObject.visible = false;
  }

  /**
   * Check if this tile has any tile object content (plant, decor, or egg).
   * Empty dirt tiles return false.
   */
  public hasContent(): boolean {
    return this.childView !== null;
  }

  /**
   * Update this tile view (called every frame, only for visible tiles).
   *
   * DEFERRED SYNC IMPLEMENTATION:
   * 1. Checks if we have pending data changes (isDirty)
   * 2. If so, performs the expensive syncChildView() now that we know we are visible
   * 3. Then delegates visual updates (animations) to the child view
   */
  public update(context: QuinoaFrameContext): void {
    // 1. Manage Global Interactivity
    // Only allow interaction if the player is standing on this tile.
    // Otherwise, set eventMode to 'none' so this tile (and its potentially large
    // children) are completely transparent to pointer events, preventing them
    // from blocking clicks on adjacent tiles.
    const isPlayerOnTile =
      context.playerPosition.x === this.worldPosition.x &&
      context.playerPosition.y === this.worldPosition.y;

    this.displayObject.eventMode = isPlayerOnTile ? 'passive' : 'none';

    // Deferred child view recreation - rebuild if data changed
    if (this.isDirty) {
      this.syncChildView(context);
      this.isDirty = false;
    }

    // Update child view's visual properties
    if (this.childView) {
      this.childView.update(context);
    }

    // If the player is standing on a plant tile, boost its zIndex so it renders
    // above same-row neighbors (e.g. large plants to the right overlapping).
    const shouldBoostStandingPlantZIndex =
      isPlayerOnTile && this.tileObject?.objectType === 'plant';

    const priority = shouldBoostStandingPlantZIndex ? 1 : 0;

    // Recalculate z-index every frame to include dynamic priority
    const { y: worldY } = gridToWorldPixels(this.worldPosition);
    const zLayer = this.getZLayer();
    const bottomOffset =
      this.childView?.displayObject.getLocalBounds().maxY ?? 0;

    this.displayObject.zIndex = calculateZIndex(
      worldY,
      zLayer,
      bottomOffset,
      priority
    );
  }
}
