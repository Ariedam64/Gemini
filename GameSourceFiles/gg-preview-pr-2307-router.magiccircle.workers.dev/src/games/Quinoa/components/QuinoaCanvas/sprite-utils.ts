import type { Sprite } from 'pixi.js';
import type { GridPosition } from '@/common/games/Quinoa/world/map';

const MAX_RENDER_SCALE = 2;

export let QUINOA_RENDER_SCALE = Math.min(
  window.devicePixelRatio || 1,
  MAX_RENDER_SCALE
);

export function setQuinoaRenderScale(scale: number) {
  QUINOA_RENDER_SCALE = scale;
}

/**
 * The "mastering" size for tiles in the world coordinate system.
 *
 * In Figma, artists design assets on 256×256 artboards (1x, "base scale").
 * This represents what a plant/crop at scale=1.0 should look like in-game.
 *
 * This constant is used for:
 * 1. **Positioning**: Objects are placed at multiples of TILE_SIZE_WORLD.
 * 2. **Reference size**: A scale=1.0 asset renders at 256px.
 *
 * The final on-screen size depends on:
 * - Camera zoom: `tileSize / TILE_SIZE_WORLD`
 * - Device pixel density: Handled by Pixi's renderer resolution
 */
export const TILE_SIZE_WORLD = 256;

/**
 * Scalable flora (crops, single-harvest plants) are exported at 2×.
 *
 * This provides quality headroom for items that render above scale 1.0,
 * preventing pixelation up to scale 2.0. A mushroom at maxScale 3.5 will have
 * slight upscaling, but antialiasing keeps it acceptable.
 *
 * @example
 * - Figma design: 256px (intended size at scale 1.0)
 * - Exported texture: 512px (2× for quality)
 * - To render at scale 1.0: `512px × 0.5 × 1.0` = 256px ✓
 */
export const FLORA_SCALABLE_EXPORT_SCALE = 2;

/**
 * Scale factor for scalable flora (crops, single-harvest plants).
 * Compensates for 2× export to render at intended size.
 */
export const FLORA_SCALABLE_RENDER_SCALE = 1 / FLORA_SCALABLE_EXPORT_SCALE;

/**
 * Scalable fauna (pets) are exported at 2×.
 *
 * Like scalable flora, this provides quality headroom for growth scaling,
 * preventing pixelation as pets grow from baby to mature sizes.
 *
 * @example
 * - Figma design: 256px (intended size at scale 1.0)
 * - Exported texture: 512px (2× for quality)
 * - To render at scale 1.0: `512px × 0.5 × 1.0` = 256px ✓
 */
export const FAUNA_SCALABLE_EXPORT_SCALE = 2;

/**
 * Scale factor for scalable fauna (pets).
 * Compensates for 2× export to render at intended size.
 */
export const FAUNA_SCALABLE_RENDER_SCALE = 1 / FAUNA_SCALABLE_EXPORT_SCALE;

/**
 * Fixed-scale flora (multi-harvest plant bodies) are exported at 1×.
 *
 * These never render above scale 1.0, so no quality headroom is needed.
 * They render at their natural texture size.
 */
export const FLORA_FIXED_EXPORT_SCALE = 1;

/**
 * Scale factor for fixed-scale flora (multi-harvest plant bodies).
 * No compensation needed for 1× export.
 */
export const FLORA_FIXED_RENDER_SCALE = 1 / FLORA_FIXED_EXPORT_SCALE;

/**
 * Converts grid coordinates to world pixel coordinates (tile center).
 * @param gridPos - Grid position (tile coordinates)
 * @returns World coordinates in pixels (centered on tile)
 */
export function gridToWorldPixels(gridPos: GridPosition): {
  x: number;
  y: number;
} {
  return {
    x: gridPos.x * TILE_SIZE_WORLD + TILE_SIZE_WORLD / 2,
    y: gridPos.y * TILE_SIZE_WORLD + TILE_SIZE_WORLD / 2,
  };
}

/**
 * Calculate camera transform (position and scale) to keep the viewport within map bounds.
 *
 * @param targetX - Target center X position in world pixels
 * @param targetY - Target center Y position in world pixels
 * @param viewportWidth - Viewport width in screen pixels (elementWidth)
 * @param viewportHeight - Viewport height in screen pixels (elementHeight)
 * @param tileSize - Current visible tile size (zoom level)
 * @param mapWidthPixels - Total map width in world pixels
 * @param mapHeightPixels - Total map height in world pixels
 * @returns Calculated transform properties { scale, x, y, clampedX, clampedY } for the container and the clamped center position
 */
export function calculateCameraTransform(
  targetX: number,
  targetY: number,
  viewportWidth: number,
  viewportHeight: number,
  tileSize: number,
  mapWidthPixels: number,
  mapHeightPixels: number
): {
  scale: number;
  x: number;
  y: number;
  clampedX: number;
  clampedY: number;
} {
  let zoom = tileSize / TILE_SIZE_WORLD;

  // Calculate minimum zoom to ensure viewport never exceeds map bounds
  // We want: viewportWidth / zoom <= mapWidthPixels
  // And: viewportHeight / zoom <= mapHeightPixels
  // So: zoom >= viewportWidth / mapWidthPixels
  const minZoomX = viewportWidth / mapWidthPixels;
  const minZoomY = viewportHeight / mapHeightPixels;
  const minZoom = Math.max(minZoomX, minZoomY);

  // Apply clamp if map dimensions are valid
  if (mapWidthPixels > 0 && mapHeightPixels > 0) {
    zoom = Math.max(zoom, minZoom);
  }

  // Calculate viewport size in world coordinates
  const viewportWorldWidth = viewportWidth / zoom;
  const viewportWorldHeight = viewportHeight / zoom;

  // Clamp camera position so viewport stays within map bounds
  // x, y are the target center of the camera
  const halfViewW = viewportWorldWidth / 2;
  const halfViewH = viewportWorldHeight / 2;

  // Calculate safe bounds for the center position
  const minX = halfViewW;
  const maxX = mapWidthPixels - halfViewW;
  const minY = halfViewH;
  const maxY = mapHeightPixels - halfViewH;

  let clampedX = targetX;
  let clampedY = targetY;

  // If viewport is wider than map, center the map
  if (minX > maxX) {
    clampedX = mapWidthPixels / 2;
  } else {
    clampedX = Math.max(minX, Math.min(targetX, maxX));
  }

  // If viewport is taller than map, center the map
  if (minY > maxY) {
    clampedY = mapHeightPixels / 2;
  } else {
    clampedY = Math.max(minY, Math.min(targetY, maxY));
  }

  // Calculate final container position
  // PixiJS uses container position to translate the world
  const x = -clampedX * zoom + viewportWidth / 2;
  const y = -clampedY * zoom + viewportHeight / 2;

  return { scale: zoom, x, y, clampedX, clampedY };
}

/**
 * Calculates the minimum tile size allowed based on map and viewport dimensions.
 * Ensures that at the minimum zoom level, the map still covers the viewport (if possible)
 * or is centered if smaller than the viewport.
 */
export function calculateMinTileSize(
  viewportWidth: number,
  viewportHeight: number,
  mapWidthPixels: number,
  mapHeightPixels: number,
  absoluteMinTileSize: number
): number {
  // Calculate minimum zoom to ensure viewport never exceeds map bounds
  // We want: viewportWidth / zoom <= mapWidthPixels
  // And: viewportHeight / zoom <= mapHeightPixels
  // So: zoom >= viewportWidth / mapWidthPixels
  const minZoomX = viewportWidth / mapWidthPixels;
  const minZoomY = viewportHeight / mapHeightPixels;
  const minZoom = Math.max(minZoomX, minZoomY);

  // If map is invalid/zero size, fallback to absolute min
  if (mapWidthPixels <= 0 || mapHeightPixels <= 0) {
    return absoluteMinTileSize;
  }

  // Return the larger of the calculated min zoom or the absolute min
  return Math.max(absoluteMinTileSize, minZoom * TILE_SIZE_WORLD);
}

/**
 * Returns the per-slot wobble angle (degrees) for crops during their active
 * growth window. Once `serverNow` reaches `endTime` the function yields zero,
 * allowing callers to keep using the same helper for both growing and mature
 * sprites without branching.
 * @param endTime - Timestamp (ms) when the slot finishes growing
 * @param serverNow - Current server timestamp (ms)
 */
export function getCropWobbleAngle(endTime: number, serverNow: number): number {
  if (serverNow >= endTime) {
    return 0;
  }

  const min = -5;
  const max = 5;
  const periodMs = 1500;
  const t = serverNow % periodMs;
  const phase = (2 * Math.PI * t) / periodMs;
  const mid = (min + max) / 2;
  const amplitude = (max - min) / 2;
  return mid + amplitude * Math.sin(phase);
}

/**
 * Z-layers for proper Y-sorting.
 * Higher values are drawn on top of lower values at the same Y position.
 *
 * Decor and Avatars share the same layer (1) to enable proper Y-sorting
 * between them - avatars can walk in front of or behind decor items.
 */
export enum ZLayer {
  Background = 0, // Ground cover, rugs
  BelowForeground = 1, // Avatars (default), also used for Decor
  Decor = BelowForeground, // Shared layer with avatars for proper occlusion
  Plants = BelowForeground, // Plants and eggs (always above decor)
  AboveForeground = 3, // Avatar z-layer when standing on walkable objects
  Pets = 4, // Pets (always on top)
}

/**
 * Calculate z-index for proper Y-sorting with bottom-edge tie-breaking.
 *
 * Formula: (y * 10000) + zLayer + min(bottomOffset / 1000, 0.9)
 *
 * Objects with the same Y and z-layer are tie-broken by their visual bottom
 * edge (from `displayObject.getLocalBounds().maxY`). Taller objects are drawn
 * on top of shorter objects.
 *
 * @param worldY - World Y coordinate for primary sorting
 * @param zLayer - Z-layer for secondary sorting (use ZLayer enum)
 * @param bottomOffset - Distance from sprite origin to bottom edge, typically
 *                       from `getLocalBounds().maxY`. Defaults to 0.
 * @param priority - Optional integer priority boost. Adds full integer steps
 *                   to z-index, allowing items to jump ahead of neighbors in
 *                   the same layer regardless of Y-sort tie-breaking.
 */
export function calculateZIndex(
  worldY: number,
  zLayer: number,
  bottomOffset: number = 0,
  priority: number = 0
): number {
  const tieBreaker = Math.min(bottomOffset / 1000, 0.9);
  return Math.floor(worldY * 10000) + zLayer + priority + tieBreaker;
}

/**
 * Applies scale to sprite, optionally with flips.
 */
export function applySpriteScale(
  sprite: Sprite,
  scale: number,
  options?: { flipH?: boolean; flipV?: boolean }
): void {
  const scaleX = scale * (options?.flipH ? -1 : 1);
  const scaleY = scale * (options?.flipV ? -1 : 1);
  sprite.scale.set(scaleX, scaleY);
}

const ELASTIC_PROGRESS_DURATION = 1000;

// Normally, I would return values in chronological order ie, now starting at
// startTime and then ending at endTime and beyond, but because insta-grow can
// cause startTime to be after endTime, it's easier to handle the logic in
// reverse.
export function getElasticProgress(
  startTime: number,
  endTime: number,
  serverNow: number
) {
  // Finished growing
  if (serverNow > endTime + ELASTIC_PROGRESS_DURATION) {
    return 1;
  }
  // Animating the popping effect
  if (serverNow >= endTime) {
    return easeOutElastic((serverNow - endTime) / ELASTIC_PROGRESS_DURATION);
  }
  // Growing
  if (startTime < endTime) {
    return getProgress(startTime, endTime, serverNow) * 0.7;
  }
  // This probably shouldn't happen. It means that now is before the endTime,
  // but startTime is after the endTime. The only time startTime should be after
  // the endTime is due to insta-grow, but in that case now should be after the
  // endTime.
  return 0;
}

/**
 * Elastic easing function for smooth bounce-like animation.
 * Based on https://easings.net/#easeOutElastic
 * @param x - Progress value from 0 to 1
 * @returns Eased value with elastic overshoot effect
 */
function easeOutElastic(x: number): number {
  const c4 = (2 * Math.PI) / 3;

  return x === 0
    ? 0
    : x === 1
      ? 1
      : 2 ** (-10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}

/**
 * Returns a progress value between 0 and 1, representing the progress of a task
 * that started at startTime and ended at endTime, at the given time now.
 */
export function getProgress(
  startTime: number,
  endTime: number,
  serverNow: number
) {
  // It's possible for startTime to be greater than endTime if a grow slot is
  // insta-grown (since it might not have started growing yet).
  if (startTime > endTime) {
    return 1;
  }
  return Math.min(
    Math.max((serverNow - startTime) / (endTime - startTime), 0),
    1
  );
}
