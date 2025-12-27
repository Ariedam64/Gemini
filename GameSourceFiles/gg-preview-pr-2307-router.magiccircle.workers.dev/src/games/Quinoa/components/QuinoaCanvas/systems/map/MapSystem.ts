import * as tiled from '@kayahr/tiled';
import { Container } from 'pixi.js';
import { type QuinoaSystem } from '../../interfaces';
import { generateTilemap } from './generateTilemap';

export type TiledMap = tiled.Map;

/**
 * MapSystem handles tilemap rendering using PixiJS and @pixi/tilemap.
 *
 * Features:
 * - Parses Tiled JSON format
 * - Handles tile flipping/rotation flags
 * - Supports multiple tilesets (standard and image collections)
 * - GPU-accelerated rendering via CompositeTilemap for tile layers
 *
 * Note: Camera positioning is handled by the parent cameraContainer.
 * Object layers (buildings) are handled separately by BuildingSystem
 * for proper Y-sorting with avatars.
 */
export class MapSystem implements QuinoaSystem {
  /** Unique identifier used by the engine for this system. */
  public readonly name = 'map';

  private container: Container;
  private mapData: tiled.Map;

  constructor(mapData: tiled.Map) {
    // Note: NOT using isRenderGroup because the tilemap has a bug where it
    // doesn't follow parent transforms when the parent has isRenderGroup: true.
    // See: https://github.com/pixijs-userland/tilemap/issues/161
    // Camera transform is applied to the parent cameraContainer instead.
    this.container = new Container({
      label: 'Ground',
    });
    this.mapData = mapData;

    this.buildMap();
  }

  /**
   * Builds the map by generating a single CompositeTilemap for all tile layers.
   * Object layers (buildings) are handled separately by BuildingSystem.
   */
  private buildMap(): void {
    if (!this.mapData.tilesets) {
      throw new Error('[MapRenderer] No tilesets found in map data');
    }

    const tilemap = generateTilemap(this.mapData);
    this.container.addChild(tilemap);
  }

  /**
   * Get the root container for adding to the PixiJS stage.
   */
  public getContainer(): Container {
    return this.container;
  }

  /**
   * Clean up resources.
   */
  public destroy(): void {
    this.container.destroy({ children: true });
  }
}
