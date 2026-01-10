import type * as tiled from '@kayahr/tiled';
import type { Container } from 'pixi.js';
import type { GridPosition } from '@/common/games/Quinoa/world/map';
import type { QuinoaFrameContext, QuinoaSystem } from '../../interfaces';
import { gridToWorldPixels } from '../../sprite-utils';
import { getTextureForGid } from '../map/PixiTiledUtils';
import { type BuildingMetadata, BuildingView } from './BuildingView';

/**
 * Interface for providers that can query building data at specific positions.
 * Implemented by BuildingSystem to provide building data to other systems.
 */
export interface BuildingDataProvider {
  /**
   * Query building data at a specific grid position.
   * Returns the building whose foreground region contains the position.
   *
   * @param position - Grid position to query
   * @returns Building metadata, or undefined if no building at position
   */
  getBuildingAt(position: GridPosition): Readonly<BuildingMetadata> | undefined;
}

/**
 * BuildingSystem manages building sprites from Tiled object layers with proper
 * layer-based and Y-based z-index sorting for rendering alongside avatars.
 *
 * Architecture:
 * - Parses Tiled map object layers and creates BuildingView instances
 * - Adds building sprites directly to worldContainer for z-index sorting
 * - Uses a flat array for efficient iteration without garbage
 *
 * @example
 * ```typescript
 * const buildingSystem = new BuildingSystem(mapData, worldContainer);
 * // Buildings are automatically added to worldContainer with proper z-indices
 * ```
 */
export class BuildingSystem implements BuildingDataProvider, QuinoaSystem {
  /** Unique identifier used by the engine for this system. */
  public readonly name = 'building';

  /** All building views (flat array for garbage-free iteration) */
  private buildings: BuildingView[] = [];

  /** Reference to the world container (for potential future dynamic additions) */
  private worldContainer: Container;

  /**
   * Creates a new BuildingSystem and populates it with buildings from Tiled map data.
   *
   * @param mapData - The parsed Tiled map containing object layers
   * @param worldContainer - The PixiJS container to add building sprites to
   */
  constructor(mapData: tiled.Map, worldContainer: Container) {
    this.worldContainer = worldContainer;
    this.buildFromMapData(mapData);
  }

  /**
   * Parses all object layers from the map and creates BuildingView instances.
   * Layer order determines z-stacking: later layers render on top.
   */
  private buildFromMapData(mapData: tiled.Map): void {
    if (!mapData.tilesets) {
      console.warn('[BuildingSystem] No tilesets found in map data');
      return;
    }

    // Filter to only object group layers, preserving Tiled's layer order
    const objectLayers = mapData.layers.filter(
      (layer): layer is tiled.ObjectGroup => layer.type === 'objectgroup'
    );

    for (let layerIndex = 0; layerIndex < objectLayers.length; layerIndex++) {
      this.processObjectLayer(
        objectLayers[layerIndex],
        mapData.tilesets,
        layerIndex
      );
    }
  }

  /**
   * Processes a single object layer and creates BuildingView instances.
   *
   * @param layer - The Tiled object layer to process
   * @param tilesets - Available tilesets for texture lookup
   * @param layerIndex - Index of this layer (higher = renders on top)
   */
  private processObjectLayer(
    layer: tiled.ObjectGroup,
    tilesets: tiled.AnyTileset[],
    layerIndex: number
  ): void {
    if (!layer.objects || !layer.visible) {
      return;
    }

    for (const obj of layer.objects) {
      const buildingView = this.createBuildingView(
        obj,
        tilesets,
        layer.opacity,
        layerIndex
      );
      if (buildingView) {
        this.buildings.push(buildingView);
        this.worldContainer.addChild(buildingView.displayObject);
      }
    }
  }

  /**
   * Creates a BuildingView from a Tiled map object.
   *
   * @param obj - The Tiled map object
   * @param tilesets - Available tilesets for texture lookup
   * @param layerOpacity - Opacity of the containing layer
   * @param layerIndex - Index of the containing layer (higher = renders on top)
   * @returns BuildingView instance or null if the object is not renderable
   */
  private createBuildingView(
    obj: tiled.MapObject,
    tilesets: tiled.AnyTileset[],
    layerOpacity: number,
    layerIndex: number
  ): BuildingView | null {
    // Skip invisible objects
    if (!obj.visible) {
      return null;
    }

    // Only handle tile objects (objects with a GID)
    // Tiled objects can also be rectangles, ellipses, etc. which we don't render
    if (typeof obj.gid !== 'number') {
      return null;
    }

    const texture = getTextureForGid(obj.gid, tilesets);
    if (!texture) {
      console.warn(
        `[BuildingSystem] Could not find texture for object ${obj.id} (gid: ${obj.gid})`
      );
      return null;
    }

    const buildingView = new BuildingView(texture, obj, layerIndex);

    // Apply layer opacity as base alpha (preserved when not occluding)
    if (layerOpacity !== 1) {
      buildingView.setBaseAlpha(layerOpacity);
    }

    return buildingView;
  }

  /**
   * Throttled content update for building transparency.
   * Implements QuinoaSystem.patch() interface.
   *
   * @param context - System context from QuinoaEngine
   */
  patch(context: QuinoaFrameContext): void {
    for (let i = 0; i < this.buildings.length; i++) {
      this.buildings[i].update(context);
    }
  }

  /**
   * Gets all building views as a readonly array.
   *
   * @returns Readonly array of all BuildingView instances
   */
  getAllBuildings(): readonly BuildingView[] {
    return this.buildings;
  }

  /**
   * Query building data at a specific grid position.
   * Returns the metadata of the first building whose foreground region
   * contains the position.
   *
   * @param position - Grid position to query
   * @returns Building metadata, or undefined if no building at position
   */
  getBuildingAt(
    position: GridPosition
  ): Readonly<BuildingMetadata> | undefined {
    const worldPos = gridToWorldPixels(position);

    for (let i = 0; i < this.buildings.length; i++) {
      const building = this.buildings[i];
      // Skip buildings without nudge (they have no foreground bounds)
      if (building.getMetadata().avatarYNudgePixels === 0) {
        continue;
      }
      if (building.containsWorldPosition(worldPos.x, worldPos.y)) {
        return building.getMetadata();
      }
    }

    return undefined;
  }

  /**
   * Gets the total number of buildings.
   */
  get count(): number {
    return this.buildings.length;
  }

  /**
   * Destroys all buildings and cleans up resources.
   */
  destroy(): void {
    for (let i = 0; i < this.buildings.length; i++) {
      this.buildings[i].destroy();
    }
    this.buildings.length = 0;
  }
}
