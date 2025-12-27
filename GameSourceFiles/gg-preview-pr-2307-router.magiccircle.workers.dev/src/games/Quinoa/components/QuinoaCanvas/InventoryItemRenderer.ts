import { getDefaultStore } from 'jotai';
import { Container, Graphics, Sprite } from 'pixi.js';
import { type DecorId, decorDex } from '@/common/games/Quinoa/systems/decor';
import {
  type EggId,
  EggsDex,
  faunaSpeciesDex,
} from '@/common/games/Quinoa/systems/fauna';
import {
  type FloraSpeciesId,
  floraSpeciesDex,
  HarvestType,
} from '@/common/games/Quinoa/systems/flora';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import { type ToolId, toolsDex } from '@/common/games/Quinoa/systems/tools';
import type {
  CropInventoryItem,
  InventoryItem,
  PetInventoryItem,
  PlantInventoryItem,
  PlantTileObject,
} from '@/common/games/Quinoa/user-json-schema/current';
import { quinoaEngineAtom } from '../../atoms/engineAtom';
import { calculateServerNow } from '../../utils/serverNow';
import { generateInventoryItemCacheKey } from './CanvasSpriteCache';
import type { QuinoaFrameContext } from './interfaces';
import {
  getTextureFromTileRef,
  getTileFrameName,
} from './legacy/tile-mappings';
import {
  FLORA_SCALABLE_RENDER_SCALE,
  QUINOA_RENDER_SCALE,
  TILE_SIZE_WORLD,
} from './sprite-utils';
import { PetVisual } from './systems/pets/PetVisual';
import { CropVisual } from './systems/tile-objects/flora/visuals/CropVisual';
import { PlantVisual } from './systems/tile-objects/flora/visuals/PlantVisual';
import {
  applyStateEffects,
  unpremultiplyFilter,
} from './utils/SpriteRenderingUtils';

/** Target size for crops as a fraction of canvas size (allows mutations to overflow). */
const CROP_SIZE_RATIO = 0.4;
/** Target size for plants as a fraction of canvas size (allows crops to overflow). */
const PLANT_SIZE_RATIO = 0.6;

/**
 * Size multiplier for inventory item canvas output.
 * Higher values = larger canvas with more pixels captured from source textures.
 */
const INVENTORY_SIZE_SCALE = 1.5;

/**
 * Crop rendering scale for cache. By rendering all crops (with mutations)
 * at this fixed scale, we ensure crop visuals (incl. mutation icons) fit
 * and have consistent sizing in contexts like the journal. The same crop
 * canvas can be reused and resized via CSS, allowing caching across sizes.
 */
export const BASE_CROP_SCALE = 0.4;

const quinoaFrameContext: QuinoaFrameContext = {
  serverTime: 0,
  deltaTime: 0,
  playerPosition: { x: 0, y: 0 },
  weatherId: null,
  time: 0,
  viewport: { minTileX: 0, minTileY: 0, maxTileX: 0, maxTileY: 0 },
  activePlayerId: '',
  zoomLevel: 0,
  safeAreaInsets: { top: 0, left: 0, bottom: 0, right: 0 },
};

const { get } = getDefaultStore();

function getCanvasCache() {
  const cache = get(quinoaEngineAtom)?.canvasSpriteCache;
  if (!cache) {
    throw new Error(
      '[InventoryItemRenderer] CanvasSpriteCache not initialized - create QuinoaEngine first'
    );
  }
  return cache;
}

interface NormalizedCanvasOptions {
  /** The content container to render (will be added to root). */
  content: Container;
  /** Width of the content's texture for normalization. */
  textureWidth: number;
  /** Height of the content's texture for normalization. */
  textureHeight: number;
  /** Current scale of the content (default: 1). */
  contentScale?: number;
  /** Texture anchor X (default: 0.5 for center). */
  anchorX?: number;
  /** Texture anchor Y (default: 0.5 for center). */
  anchorY?: number;
  /** Size ratio as fraction of canvas (default: 1 for full size). */
  sizeRatio?: number;
  /** Cleanup callback after canvas is extracted. */
  onCleanup?: () => void;
  /** Whether to apply unpremultiply filter for correct alpha blending. */
  unpremultiply?: boolean;
  /** Whether to use original X anchor for positioning (default: false). */
  useOriginalXAnchor?: boolean;
}

/**
 * Renders a normalized canvas with consistent sizing for inventory items.
 * All items are scaled to fill the canvas and centered based on their anchor.
 */
function renderNormalizedCanvas(
  options: NormalizedCanvasOptions
): HTMLCanvasElement {
  const renderer = getCanvasCache().renderer;
  const {
    content,
    textureWidth,
    textureHeight,
    contentScale = 1,
    anchorX = 0.5,
    anchorY = 0.5,
    sizeRatio = 1,
    onCleanup,
    unpremultiply = false,
    useOriginalXAnchor = false,
  } = options;

  const canvasSize = TILE_SIZE_WORLD;
  const scaledCanvasSize = canvasSize * INVENTORY_SIZE_SCALE;
  const targetSize = canvasSize * sizeRatio;
  // Calculate visual dimensions (texture size * content's internal scale)
  const visualWidth = textureWidth * contentScale;
  const visualHeight = textureHeight * contentScale;
  const maxDimension = Math.max(visualWidth, visualHeight);
  const normalizeScale = targetSize / maxDimension;
  // Final scale = contentScale * normalizeScale, then scaled up for high-res output
  const totalScale = contentScale * normalizeScale * INVENTORY_SIZE_SCALE;
  content.scale.set(totalScale);
  // Calculate scaled dimensions for anchor offset
  const scaledWidth = textureWidth * totalScale;
  const scaledHeight = textureHeight * totalScale;
  // Position so the visual center is at canvas center (using scaled canvas size)
  const positionX = useOriginalXAnchor
    ? scaledCanvasSize / 2
    : scaledCanvasSize / 2 - (0.5 - anchorX) * scaledWidth;
  const positionY = scaledCanvasSize / 2 - (0.5 - anchorY) * scaledHeight;
  content.position.set(positionX, positionY);

  const root = new Container({ sortableChildren: true });
  // Bounds enforcer for consistent canvas size (scaled up for high-res)
  const boundsEnforcer = new Graphics();
  boundsEnforcer.rect(0, 0, scaledCanvasSize, scaledCanvasSize);
  boundsEnforcer.fill({ color: 0x000000, alpha: 0.001 });
  root.addChild(boundsEnforcer);
  root.addChild(content);
  if (unpremultiply) {
    root.filters = unpremultiplyFilter;
  }

  const renderedTexture = renderer.textureGenerator.generateTexture({
    target: root,
    resolution: QUINOA_RENDER_SCALE,
  });
  const canvas = renderer.extract.canvas(renderedTexture) as HTMLCanvasElement;

  renderedTexture.destroy(true);
  onCleanup?.();
  root.destroy({ children: false });

  return canvas;
}

export interface PlantCanvasOptions {
  plant: PlantInventoryItem;
  serverNow: number;
}

export interface CropCanvasOptions {
  crop: CropInventoryItem;
  isUnknown?: boolean;
  unpremultiply?: boolean;
}

export interface PetCanvasOptions {
  pet: PetInventoryItem;
  isUnknown?: boolean;
}

/**
 * Renders a full plant composition canvas for UI contexts.
 * Uses PlantVisual to ensure parity with in-world rendering.
 * Results are cached using the engine's CanvasSpriteCache.
 */
export function getPlantCanvas(options: PlantCanvasOptions): HTMLCanvasElement {
  const { plant } = options;
  const cacheKey = generateInventoryItemCacheKey(plant);

  return getCanvasCache().getOrRenderCanvas(cacheKey, () =>
    renderPlantCanvas(options)
  );
}

/**
 * Renders a crop canvas for UI contexts.
 * Uses CropVisual to ensure parity with in-world and held item rendering.
 * Includes mutation icons (Dawnlit, Frozen, etc.) that getCanvas() doesn't provide.
 * Results are cached using the engine's CanvasSpriteCache.
 *
 * Note: Crops are rendered at BASE_CROP_SCALE for optimal caching.
 * Apply the actual crop scale via CSS transform on the canvas element.
 */
export function getCropCanvas(options: CropCanvasOptions): HTMLCanvasElement {
  const { crop, isUnknown = false } = options;
  const cacheKey = generateInventoryItemCacheKey(crop, { isUnknown });

  return getCanvasCache().getOrRenderCanvas(cacheKey, () =>
    renderCropCanvas(options)
  );
}

/**
 * Renders a pet canvas for UI contexts.
 * Uses PetVisual to ensure parity with in-world and held item rendering.
 * Includes mutation effects (Gold, Rainbow, etc.).
 * Results are cached using the engine's CanvasSpriteCache.
 */
export function getPetCanvas(options: PetCanvasOptions): HTMLCanvasElement {
  const { pet, isUnknown = false } = options;
  // PetVisual handles isDisabled internally based on hunger, so we derive it
  // from the pet's hunger for cache key purposes only
  const isDisabled = pet.hunger <= 0;
  const cacheKey = generateInventoryItemCacheKey(pet, {
    isDisabled,
    isUnknown,
  });

  return getCanvasCache().getOrRenderCanvas(cacheKey, () =>
    renderPetCanvas(options)
  );
}

/**
 * Renders a canvas for any inventory item type.
 * Automatically routes to the appropriate rendering method based on item type:
 * - Plant: Uses PlantVisual for full plant composition with crops
 * - Produce: Uses CropVisual for crop with mutation icons
 * - Other types: Uses standard canvas rendering with tileRef
 *
 * Results are cached using the engine's CanvasSpriteCache.
 *
 * @param item - The inventory item to render
 * @param isUnknown - Whether to render as unknown/silhouette (for journal)
 * @returns HTMLCanvasElement safe for DOM insertion (cloned from cache)
 */
export function getInventoryItemCanvas(
  item: InventoryItem,
  isUnknown: boolean = false
): HTMLCanvasElement {
  const cache = getCanvasCache();
  const cacheKey = generateInventoryItemCacheKey(item, {
    isUnknown,
  });

  return cache.getOrRenderCanvas(cacheKey, () => {
    switch (item.itemType) {
      case ItemType.Plant: {
        return renderPlantCanvas({
          plant: item,
          serverNow: calculateServerNow(),
        });
      }
      case ItemType.Produce: {
        return renderCropCanvas({
          crop: item,
          isUnknown,
          unpremultiply: true,
        });
      }
      case ItemType.Pet: {
        return renderPetCanvas({ pet: item, isUnknown });
      }
      case ItemType.Seed: {
        return renderSeedCanvas(item.species, isUnknown);
      }
      case ItemType.Tool: {
        return renderToolCanvas(item.toolId, isUnknown);
      }
      case ItemType.Decor: {
        return renderDecorCanvas(item.decorId, isUnknown);
      }
      case ItemType.Egg: {
        return renderEggCanvas(item.eggId, isUnknown);
      }
      default: {
        // Exhaustive check - TypeScript will error if a case is missing
        const _exhaustiveCheck: never = item;
        console.error(
          '[InventoryItemRenderer] Unknown item type:',
          _exhaustiveCheck
        );
        return document.createElement('canvas');
      }
    }
  });
}

/**
 * Renders a plant using PlantVisual for UI contexts.
 *
 * Single harvest plants: The plant IS the crop (no separate base texture),
 * so we delegate to getCropCanvas for proper crop-style centering.
 *
 * Multi-harvest plants: Have a plant body (tree/bush) with crops on top.
 * We center on the plant body at 50/50, allowing crops to overflow.
 */
function renderPlantCanvas(options: PlantCanvasOptions): HTMLCanvasElement {
  const { plant, serverNow } = options;
  const blueprint = floraSpeciesDex[plant.species];
  const isFirstSlotMature = plant.slots[0].endTime <= serverNow;
  // If the plant is single harvest and mature, use the crop canvas
  // We don't do this for carrots since they have a separate plant sprite
  if (
    blueprint.plant.harvestType === HarvestType.Single &&
    isFirstSlotMature &&
    plant.species !== 'Carrot'
  ) {
    const crop = {
      id: '',
      itemType: ItemType.Produce,
      species: plant.species,
      mutations: plant.slots[0].mutations,
      scale: plant.slots[0].targetScale,
    } as const;

    return getCropCanvas({
      crop,
    });
  }
  // Render full plant with crops and dirt patch, centered on visual bounds
  const renderer = getCanvasCache().renderer;
  const plantObject = toPlantTileObject(plant);
  const plantVisual = new PlantVisual({
    plant: plantObject,
    blueprint,
    isolateRendering: true,
  });
  quinoaFrameContext.serverTime = serverNow;
  plantVisual.update(quinoaFrameContext);
  const canvasSize = TILE_SIZE_WORLD;
  const targetSize = canvasSize * PLANT_SIZE_RATIO;
  // Get actual bounds of the entire visual (plant + crops + dirt patch)
  const bounds = plantVisual.container.getBounds();
  const visualWidth = bounds.width;
  const visualHeight = bounds.height;
  const maxDimension = Math.max(visualWidth, visualHeight);
  const normalizeScale = targetSize / maxDimension;
  // Apply scale first
  plantVisual.container.scale.set(normalizeScale);
  // Get bounds again after scaling to find the visual center
  const scaledBounds = plantVisual.container.getBounds();
  // Calculate the center of the visual content
  const visualCenterX = scaledBounds.x + scaledBounds.width / 2;
  const visualCenterY = scaledBounds.y + scaledBounds.height / 2;
  // Position so the visual center is at canvas center, then scale up
  const basePositionX = canvasSize / 2 - visualCenterX;
  const basePositionY = canvasSize / 2 - visualCenterY;

  // Scale content UP to capture more detail from source textures
  plantVisual.container.scale.set(
    plantVisual.container.scale.x * INVENTORY_SIZE_SCALE
  );
  plantVisual.container.position.set(
    basePositionX * INVENTORY_SIZE_SCALE,
    basePositionY * INVENTORY_SIZE_SCALE
  );

  const scaledCanvasSize = canvasSize * INVENTORY_SIZE_SCALE;
  const root = new Container({ sortableChildren: true });
  const boundsEnforcer = new Graphics();
  boundsEnforcer.rect(0, 0, scaledCanvasSize, scaledCanvasSize);
  boundsEnforcer.fill({ color: 0x000000, alpha: 0.001 });
  root.addChild(boundsEnforcer);
  root.addChild(plantVisual.container);

  const renderedTexture = renderer.textureGenerator.generateTexture({
    target: root,
    resolution: QUINOA_RENDER_SCALE,
  });
  const canvas = renderer.extract.canvas(renderedTexture) as HTMLCanvasElement;

  renderedTexture.destroy(true);
  plantVisual.destroy();
  root.destroy({ children: false });

  return canvas;
}

/**
 * Renders a crop using CropVisual for UI contexts.
 * CropVisual handles texture, mutations, and mutation icons.
 * Renders at base scale (1.0) for optimal caching - apply actual scale via CSS.
 * NOTE: Crops have custom anchor handling so they don't use renderNormalizedCanvas.
 */
function renderCropCanvas(options: CropCanvasOptions): HTMLCanvasElement {
  const renderer = getCanvasCache().renderer;
  const { crop, isUnknown, unpremultiply = false } = options;
  const { species, mutations } = crop;

  const cropVisual = new CropVisual({
    // Render at BASE_CROP_SCALE for caching efficiency.
    // Actual crop scale is applied via CSS transform in InventorySprite.
    scale: BASE_CROP_SCALE,
    mutations,
    floraSpeciesId: species,
    mode: 'crop',
    isUnknown,
  });
  const canvasSize = TILE_SIZE_WORLD;
  const targetSize = canvasSize * CROP_SIZE_RATIO;
  // Calculate crop-only dimensions (ignoring mutations) from texture at base scale
  const blueprint = floraSpeciesDex[species];
  const cropTexture = getTextureFromTileRef(blueprint.crop.tileRef);
  const cropWidth =
    cropTexture.width * FLORA_SCALABLE_RENDER_SCALE * BASE_CROP_SCALE;
  const cropHeight =
    cropTexture.height * FLORA_SCALABLE_RENDER_SCALE * BASE_CROP_SCALE;
  const cropMaxDimension = Math.max(cropWidth, cropHeight);
  const normalizeScale = targetSize / cropMaxDimension;
  // CropVisual already applies: scale * FLORA_SCALABLE_RENDER_SCALE
  const internalScale = cropVisual.container.scale.x;
  const totalScale = internalScale * normalizeScale;
  cropVisual.container.scale.set(totalScale);
  // Calculate crop-only center (ignoring mutations) based on texture anchor
  const anchorX = cropTexture.defaultAnchor?.x ?? 0.5;
  const anchorY = cropTexture.defaultAnchor?.y ?? 1;
  const scaledCropWidth = cropTexture.width * totalScale;
  const scaledCropHeight = cropTexture.height * totalScale;
  // Offset from anchor to visual center
  const cropCenterOffsetX = (0.5 - anchorX) * scaledCropWidth;
  const cropCenterOffsetY = (0.5 - anchorY) * scaledCropHeight;
  // Position so the CROP center (not mutations) is at canvas center
  cropVisual.container.position.set(
    canvasSize / 2 - cropCenterOffsetX,
    canvasSize / 2 - cropCenterOffsetY
  );

  // Scale content UP to capture more detail from source textures
  cropVisual.container.scale.set(
    cropVisual.container.scale.x * INVENTORY_SIZE_SCALE,
    cropVisual.container.scale.y * INVENTORY_SIZE_SCALE
  );
  cropVisual.container.position.set(
    cropVisual.container.position.x * INVENTORY_SIZE_SCALE,
    cropVisual.container.position.y * INVENTORY_SIZE_SCALE
  );

  const scaledCanvasSize = canvasSize * INVENTORY_SIZE_SCALE;
  const root = new Container({ sortableChildren: true });
  const boundsEnforcer = new Graphics();
  boundsEnforcer.rect(0, 0, scaledCanvasSize, scaledCanvasSize);
  boundsEnforcer.fill({ color: 0x000000, alpha: 0.001 });
  root.addChild(boundsEnforcer);
  root.addChild(cropVisual.container);
  if (unpremultiply) {
    root.filters = unpremultiplyFilter;
  }

  const renderedTexture = renderer.textureGenerator.generateTexture({
    target: root,
    resolution: QUINOA_RENDER_SCALE,
  });
  const canvas = renderer.extract.canvas(renderedTexture) as HTMLCanvasElement;

  renderedTexture.destroy(true);
  cropVisual.destroy();
  root.destroy({ children: false });

  return canvas;
}

/**
 * Renders a pet using PetVisual for UI contexts.
 * Uses the same normalization pattern as crops for consistent sizing.
 */
function renderPetCanvas(options: PetCanvasOptions): HTMLCanvasElement {
  const { pet, isUnknown = false } = options;
  const petVisual = new PetVisual({ petSlot: pet });
  const { tileRef } = faunaSpeciesDex[pet.petSpecies];
  const texture = getTextureFromTileRef(tileRef);
  applyStateEffects(petVisual.sprite, false, isUnknown);
  return renderNormalizedCanvas({
    content: petVisual.sprite,
    textureWidth: texture.width,
    textureHeight: texture.height,
    contentScale: petVisual.sprite.scale.x,
    anchorX: texture.defaultAnchor?.x ?? 0.5,
    anchorY: texture.defaultAnchor?.y ?? 0.5,
    useOriginalXAnchor: true,
    onCleanup: () => petVisual.destroy(),
  });
}

/**
 * Renders a simple sprite canvas with consistent sizing.
 * Uses the shared normalization pattern.
 */
function renderSimpleSpriteCanvas(
  frameName: string,
  isUnknown: boolean,
  unpremultiply: boolean = false
): HTMLCanvasElement {
  const sprite = Sprite.from(frameName);
  sprite.anchor.set(0.5);
  applyStateEffects(sprite, false, isUnknown);
  // Wrap sprite in container for renderNormalizedCanvas
  const container = new Container();
  container.addChild(sprite);

  return renderNormalizedCanvas({
    content: container,
    textureWidth: sprite.texture.width,
    textureHeight: sprite.texture.height,
    onCleanup: () => container.destroy({ children: true }),
    unpremultiply,
  });
}

/**
 * Renders a canvas from a TileRef with consistent sizing.
 */
function renderTileRefCanvas(
  tileRef: { spritesheet: string; index: number },
  isUnknown: boolean,
  itemType: string,
  unpremultiply: boolean = false
): HTMLCanvasElement {
  const frameName = getTileFrameName(tileRef.spritesheet, tileRef.index - 1);
  if (!frameName) {
    console.warn(`[InventoryItemRenderer] No frame for ${itemType}`);
    return document.createElement('canvas');
  }
  return renderSimpleSpriteCanvas(frameName, isUnknown, unpremultiply);
}

function renderSeedCanvas(
  species: FloraSpeciesId,
  isUnknown: boolean
): HTMLCanvasElement {
  return renderTileRefCanvas(
    floraSpeciesDex[species].seed.tileRef,
    isUnknown,
    `seed ${species}`
  );
}

function renderToolCanvas(
  toolId: ToolId,
  isUnknown: boolean
): HTMLCanvasElement {
  return renderTileRefCanvas(
    toolsDex[toolId].tileRef,
    isUnknown,
    `tool ${toolId}`
  );
}

function renderDecorCanvas(
  decorId: DecorId,
  isUnknown: boolean,
  unpremultiply: boolean = true
): HTMLCanvasElement {
  return renderTileRefCanvas(
    decorDex[decorId].tileRef,
    isUnknown,
    `decor ${decorId}`,
    unpremultiply
  );
}

function renderEggCanvas(eggId: EggId, isUnknown: boolean): HTMLCanvasElement {
  return renderTileRefCanvas(EggsDex[eggId].tileRef, isUnknown, `egg ${eggId}`);
}

function toPlantTileObject(plant: PlantInventoryItem): PlantTileObject {
  return {
    objectType: 'plant',
    species: plant.species,
    slots: plant.slots,
    plantedAt: plant.plantedAt,
    maturedAt: plant.maturedAt,
  };
}
