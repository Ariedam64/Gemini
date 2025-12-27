import { getDefaultStore } from 'jotai';
import type { Container } from 'pixi.js';
import { petInfosAtom } from '@/Quinoa/atoms/miscAtoms';
import type { QuinoaFrameContext, QuinoaSystem } from '../../interfaces';
import type { PetInfo } from '../../legacy/canvas-types';
import type { TileObjectDataProvider } from '../tile-objects/TileObjectSystem';
import { isCoordinateInViewport } from '../tile-objects/TileViewport';
import { PetView } from './PetView';

/**
 * PetSystem manages the lifecycle of all pet views in the world.
 *
 * Responsibilities:
 * - Subscribes to petInfosAtom for all users' pet data + positions
 * - Creates/destroys PetViews as pets are placed/removed from the world
 * - Updates visible pets each frame with position and visual state
 * - Implements viewport culling for performance
 * - Provides tile data to pets for decor-based Y offsets
 *
 * Architecture:
 * - Pets are rendered for ALL players (not just the local player)
 * - Pet positions update instantly (no interpolation) matching the
 *   1-second update cycle from useMyPetEffects
 * - Similar pattern to AvatarSystem but simpler (no Rive, chat, emotes)
 */
export class PetSystem implements QuinoaSystem {
  /** Unique identifier used by the engine for this system. */
  public readonly name = 'pet';

  /** Map of pet ID to PetView instance */
  private views: Map<string, PetView> = new Map();

  /** Container for all pet sprites */
  private worldContainer: Container;

  /** Provider for tile data to calculate decor offsets */
  private tileDataProvider: TileObjectDataProvider;

  /** Atom subscription cleanup functions */
  private unsubscribes: (() => void)[] = [];

  /**
   * Creates a new PetSystem.
   *
   * @param worldContainer - PixiJS container for pet sprites (world space)
   * @param tileDataProvider - Provider for tile data to calculate decor offsets
   */
  constructor(
    worldContainer: Container,
    tileDataProvider: TileObjectDataProvider
  ) {
    this.worldContainer = worldContainer;
    this.tileDataProvider = tileDataProvider;

    const { get, sub } = getDefaultStore();

    // Subscribe to petInfosAtom for automatic lifecycle management
    this.unsubscribes.push(
      sub(petInfosAtom, () => {
        const petInfos = get(petInfosAtom);
        this.onPetDataChanged(petInfos);
      })
    );

    // Initialize with current data
    this.onPetDataChanged(get(petInfosAtom));
  }

  /**
   * Called when petInfosAtom changes.
   * Creates views for new pets, destroys views for removed pets.
   */
  private onPetDataChanged(petInfos: PetInfo[]): void {
    // Build a set of current pet IDs for efficient lookup
    const currentPetIds = new Set(petInfos.map((info) => info.slot.id));

    // Create views for new pets
    for (const petInfo of petInfos) {
      const view = this.views.get(petInfo.slot.id);
      if (!view) {
        this.createPetView(petInfo);
      } else {
        // Update existing view's data (in case mutations, hunger, etc. changed)
        view.updateData(petInfo.slot, petInfo.position);
      }
    }

    // Remove views for pets that no longer exist
    for (const petId of this.views.keys()) {
      if (!currentPetIds.has(petId)) {
        this.destroyPetView(petId);
      }
    }
  }

  /**
   * Creates a new PetView and adds it to the world.
   */
  private createPetView(petInfo: PetInfo): void {
    const view = new PetView(petInfo.slot, petInfo.position);
    this.worldContainer.addChild(view.displayObject);
    this.views.set(petInfo.slot.id, view);
  }

  /**
   * Destroys a PetView and removes it from the world.
   */
  private destroyPetView(petId: string): void {
    const view = this.views.get(petId);
    if (view) {
      this.worldContainer.removeChild(view.displayObject);
      view.destroy();
      this.views.delete(petId);
    }
  }

  /**
   * Per-frame update for pet animations and visibility.
   * Implements QuinoaSystem.draw() interface.
   *
   * @param context - System context from QuinoaEngine
   */
  draw(context: QuinoaFrameContext): void {
    // Process all pet views
    for (const view of this.views.values()) {
      // Check viewport visibility
      const isVisible = isCoordinateInViewport(
        view.position.x,
        view.position.y,
        context.viewport
      );

      // Update visibility state
      view.displayObject.visible = isVisible;

      // Update visual state only if visible
      if (isVisible) {
        // Query tile data at pet's position for decor offset calculation
        const tileData = this.tileDataProvider.getTileDataAt(view.position);

        view.update(context, tileData);
      }
    }
  }

  /**
   * Destroys the PetSystem and all managed views.
   * Should be called when the game is unmounted.
   */
  destroy(): void {
    // Unsubscribe from all atoms
    for (const unsubscribe of this.unsubscribes) {
      unsubscribe();
    }
    this.unsubscribes.length = 0;

    // Destroy all views
    for (const petId of this.views.keys()) {
      this.destroyPetView(petId);
    }

    this.views.clear();
  }
}
