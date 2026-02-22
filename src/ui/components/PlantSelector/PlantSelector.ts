/**
 * PlantSelector Component
 * Reusable plant selector with visual grid of sprites
 *
 * Uses non-blocking batch loading for sprites (loads all without scroll)
 * Per .claude/rules/ui/components.md
 */

import { element } from "../../styles/helpers";
import { SearchBar } from "../SearchBar/SearchBar";
import { MGData } from "../../../modules";
import { MGSprite } from "../../../modules";

/* ─────────────────────────────────────────── Types ─────────────────────────────────────────── */

export interface PlantSelectorOptions {
  selectedSpecies?: string;
  onChange: (species: string) => void;
  placeholder?: string;
  speciesRuleCount?: Record<string, number>; // Number of rules per species
  onSearchChange?: (query: string) => void; // Callback when search query changes
}

export interface PlantSelectorHandle {
  root: HTMLElement;
  getSelected(): string | null;
  setSelected(species: string | null): void;
  destroy(): void;
}

/* ─────────────────────────────────────────── Constants ─────────────────────────────────────────── */

const BATCH_SIZE = 10; // Number of sprites to load per batch
const BATCH_DELAY = 16; // ~1 frame between batches

/* ─────────────────────────────────────────── Component ─────────────────────────────────────────── */

export function PlantSelector(options: PlantSelectorOptions): PlantSelectorHandle {
  const {
    selectedSpecies,
    onChange,
    placeholder = "Search plants...",
    speciesRuleCount = {},
    onSearchChange,
  } = options;

  // State
  let currentSelection: string | null = selectedSpecies ?? null;
  let allPlants: Array<{ name: string; spriteId: string | null }> = [];
  let filteredPlants: Array<{ name: string; spriteId: string | null }> = [];

  // Cleanup tracking
  const cleanups: (() => void)[] = [];

  // Pending sprites to load (container -> spriteId)
  const pendingSprites = new Map<HTMLElement, string>();
  let batchLoaderId: number | null = null;

  // Root container
  const root = element("div", { className: "plant-selector" }) as HTMLDivElement;

  // Search bar
  const searchBar = SearchBar({
    placeholder,
    blockGameKeys: true,
    withClear: true,
    debounceMs: 150,
    onChange: (value) => handleSearch(value),
  });
  root.appendChild(searchBar.root);
  cleanups.push(() => {
    const cleanup = (searchBar.root as unknown as { __cleanup?: () => void }).__cleanup;
    if (cleanup) cleanup();
  });

  // Grid container
  const grid = element("div", { className: "plant-selector__grid" }) as HTMLDivElement;
  root.appendChild(grid);

  // Cleanup batch loader on destroy
  cleanups.push(() => {
    if (batchLoaderId !== null) {
      cancelAnimationFrame(batchLoaderId);
      batchLoaderId = null;
    }
    pendingSprites.clear();
  });

  /**
   * Load sprite into container
   */
  function loadSpriteIntoContainer(spriteId: string, container: HTMLElement): void {
    if (!MGSprite.isReady()) return;

    try {
      const canvas = MGSprite.toCanvas(spriteId, {
        boundsMode: "padded",
      });

      if (canvas) {
        canvas.style.maxWidth = "40px";
        canvas.style.maxHeight = "40px";
        canvas.style.width = "auto";
        canvas.style.height = "auto";
        canvas.style.display = "block";

        // Replace placeholder with canvas
        container.replaceChildren(canvas);
      }
    } catch (error) {
      console.warn(`[PlantSelector] Failed to load sprite:`, error);
      // Keep placeholder on error
    }
  }

  /**
   * Process pending sprites in batches (non-blocking)
   */
  function processPendingSprites(): void {
    if (pendingSprites.size === 0) {
      batchLoaderId = null;
      return;
    }

    // Get a batch of sprites to load
    const batch: Array<[HTMLElement, string]> = [];
    const iterator = pendingSprites.entries();

    for (let i = 0; i < BATCH_SIZE; i++) {
      const next = iterator.next();
      if (next.done) break;
      batch.push(next.value);
    }

    // Load the batch
    for (const [container, spriteId] of batch) {
      loadSpriteIntoContainer(spriteId, container);
      pendingSprites.delete(container);
    }

    // Schedule next batch if more pending
    if (pendingSprites.size > 0) {
      batchLoaderId = requestAnimationFrame(() => {
        setTimeout(processPendingSprites, BATCH_DELAY);
      });
    } else {
      batchLoaderId = null;
    }
  }

  /**
   * Start loading pending sprites
   */
  function startBatchLoading(): void {
    if (batchLoaderId !== null) return; // Already running

    // Start on next frame to allow DOM to settle
    batchLoaderId = requestAnimationFrame(() => {
      processPendingSprites();
    });
  }

  /**
   * Load all plants from MGData
   */
  function loadPlants(): void {
    try {
      const plantsData = MGData.get("plants") as Record<string, unknown> | null;
      if (!plantsData) {
        console.warn("[PlantSelector] No plants data available");
        return;
      }

      allPlants = Object.entries(plantsData)
        .filter(([, plant]) => plant && typeof plant === "object" && "crop" in (plant as object))
        .map(([name, plant]) => ({
          name,
          spriteId: (plant as { crop?: { spriteId?: string } }).crop?.spriteId || null,
        }));

      filteredPlants = [...allPlants];
      renderGrid();
    } catch (error) {
      console.error("[PlantSelector] Failed to load plants:", error);
    }
  }

  /**
   * Handle search input
   */
  function handleSearch(query: string): void {
    if (!query.trim()) {
      filteredPlants = [...allPlants];
    } else {
      const lowerQuery = query.toLowerCase();
      filteredPlants = allPlants.filter((plant) =>
        plant.name.toLowerCase().includes(lowerQuery)
      );
    }
    onSearchChange?.(query);
    renderGrid();
  }

  /**
   * Render the plant grid with batch loading
   */
  function renderGrid(): void {
    // Save scroll position before replacing children
    const scrollTop = grid.scrollTop;

    // Cancel any pending batch loading
    if (batchLoaderId !== null) {
      cancelAnimationFrame(batchLoaderId);
      batchLoaderId = null;
    }
    pendingSprites.clear();

    grid.replaceChildren();

    if (filteredPlants.length === 0) {
      const empty = element("div", {
        className: "plant-selector__empty",
      }, "No plants found");
      grid.appendChild(empty);
      return;
    }

    // Use DocumentFragment for batch DOM insertion
    const fragment = document.createDocumentFragment();

    filteredPlants.forEach((plant) => {
      const item = createPlantItem(plant);
      fragment.appendChild(item);
    });

    grid.appendChild(fragment);

    // Restore scroll position after rendering
    grid.scrollTop = scrollTop;

    // Start loading sprites in batches
    if (pendingSprites.size > 0) {
      startBatchLoading();
    }
  }

  /**
   * Create a plant item element with deferred sprite loading
   */
  function createPlantItem(plant: { name: string; spriteId: string | null }): HTMLElement {
    const ruleCount = speciesRuleCount[plant.name] ?? 0;
    const item = element("div", {
      className: `plant-selector__item ${
        currentSelection === plant.name ? "plant-selector__item--selected" : ""
      }`,
    }) as HTMLDivElement;

    // Add badge if rules exist
    if (ruleCount > 0) {
      const badge = element("div", {
        className: "plant-selector__badge",
      }, String(ruleCount));
      item.appendChild(badge);
    }

    // Click to select
    item.addEventListener("click", () => {
      currentSelection = plant.name;
      onChange(plant.name);
      renderGrid();
    });

    // Sprite container with placeholder
    const spriteContainer = element("div", {
      className: "plant-selector__sprite",
    });

    // Always start with placeholder
    const placeholder = element("div", {
      style: "width: 40px; height: 40px; background: color-mix(in oklab, var(--fg) 8%, transparent); border-radius: 4px;",
    });
    spriteContainer.appendChild(placeholder);

    // Queue sprite for batch loading
    if (plant.spriteId && MGSprite.isReady()) {
      pendingSprites.set(spriteContainer, plant.spriteId);
    }

    item.appendChild(spriteContainer);

    // Plant name
    const name = element("div", {
      className: "plant-selector__name",
    }, plant.name);
    item.appendChild(name);

    return item;
  }

  /**
   * Initialize
   */
  loadPlants();

  /* ─────────────────────────────────────────── Public API ─────────────────────────────────────────── */

  function getSelected(): string | null {
    return currentSelection;
  }

  function setSelected(species: string | null): void {
    currentSelection = species;
    renderGrid();
  }

  function destroy(): void {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  }

  return {
    root,
    getSelected,
    setSelected,
    destroy,
  };
}
