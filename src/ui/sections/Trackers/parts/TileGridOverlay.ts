/**
 * Tile Grid Selector (Dropdown Style)
 *
 * Dropdown-style filter showing two 10×10 grids representing the full garden layout (200 tiles).
 * Grid 1: localIndex 0-99, Grid 2: localIndex 100-199
 * Uses actual sprites to show what's on each tile.
 *
 * Per .claude/rules/ui/sections.md:
 * - Section parts are focused sub-features
 * - Must have clear lifecycle (build/show/hide/destroy)
 *
 * @module TileGridOverlay
 */

import { Globals } from '../../../../globals';
import { getTrackersState, toggleTileSelection, clearTileSelection } from '../state';
import { element } from '../../../styles/helpers';
import { MGSprite } from '../../../../modules/sprite';
import type { MapTile } from '../../../../globals/core/types';
import type { GardenTileObject } from '../../../../atoms/types';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface TileGridOptions {
    /** Callback when selection changes */
    onChange?: () => void;

    /** Container element to append dropdown to */
    container?: HTMLElement;
}

// ─────────────────────────────────────────────────────────────────────────────
// Tile Grid Selector
// ─────────────────────────────────────────────────────────────────────────────

export class TileGridOverlay {
    private dropdown: HTMLDivElement | null = null;
    private options: TileGridOptions;

    // Drag-to-select state
    private isDragging = false;
    private dragSelectMode: 'select' | 'deselect' | null = null;

    constructor(options: TileGridOptions = {}) {
        this.options = options;

        // Global pointerup to stop dragging
        document.addEventListener('pointerup', () => {
            this.isDragging = false;
            this.dragSelectMode = null;
        });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Public API
    // ─────────────────────────────────────────────────────────────────────────

    build(): HTMLElement {
        if (this.dropdown) return this.dropdown;

        this.dropdown = element('div', {
            className: 'tile-grid-selector',
        }) as HTMLDivElement;

        // Header with controls
        const header = this.buildHeader();
        this.dropdown.appendChild(header);

        // Grid container (two 10x10 grids side by side)
        const gridContainer = this.buildGrids();
        this.dropdown.appendChild(gridContainer);

        return this.dropdown;
    }

    show(): void {
        if (!this.dropdown) {
            this.build();
        }

        if (this.dropdown && !this.dropdown.parentElement) {
            const container = this.options.container || document.body;
            container.appendChild(this.dropdown);
        }

        if (this.dropdown) {
            this.dropdown.classList.add('tile-grid-selector--visible');
        }

        this.renderGrids();
    }

    hide(): void {
        if (this.dropdown) {
            this.dropdown.classList.remove('tile-grid-selector--visible');
        }
    }

    destroy(): void {
        if (this.dropdown?.parentElement) {
            this.dropdown.parentElement.removeChild(this.dropdown);
        }
        this.dropdown = null;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Header
    // ─────────────────────────────────────────────────────────────────────────

    private buildHeader(): HTMLElement {
        const header = element('div', {
            className: 'tile-grid-selector__header',
        });

        const state = getTrackersState().get();
        const selectedCount = state.selectedTileIndices.length;

        const info = element('div', {
            className: 'tile-grid-selector__info',
            textContent: `${selectedCount} tile${selectedCount !== 1 ? 's' : ''} selected`,
        });

        const clearBtn = element('button', {
            className: 'tile-grid-selector__btn',
            textContent: 'Clear All',
        });
        clearBtn.addEventListener('click', () => {
            clearTileSelection();
            this.renderGrids();
            if (this.options.onChange) {
                this.options.onChange();
            }
        });

        // Close button (X)
        const closeBtn = element('button', {
            className: 'tile-grid-selector__close-btn',
            textContent: '×',
            title: 'Close',
        });
        closeBtn.addEventListener('click', () => {
            this.hide();
        });

        header.appendChild(info);
        header.appendChild(clearBtn);
        header.appendChild(closeBtn);

        return header;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Grid Building
    // ─────────────────────────────────────────────────────────────────────────

    private buildGrids(): HTMLElement {
        const container = element('div', {
            className: 'tile-grid-selector__grids',
        });

        // Create two 10x10 grid containers
        const grid1 = element('div', {
            className: 'tile-grid-selector__grid',
            id: 'tile-grid-1',
        });

        const grid2 = element('div', {
            className: 'tile-grid-selector__grid',
            id: 'tile-grid-2',
        });

        container.appendChild(grid1);
        container.appendChild(grid2);

        return container;
    }

    private renderGrids(): void {
        const grid1 = this.dropdown?.querySelector('#tile-grid-1');
        const grid2 = this.dropdown?.querySelector('#tile-grid-2');

        if (!grid1 || !grid2) return;

        grid1.innerHTML = '';
        grid2.innerHTML = '';

        const garden = Globals.myGarden.get();
        const gameMap = Globals.gameMap.get();
        const state = getTrackersState().get();

        if (!garden.garden || !gameMap) {
            return;
        }

        const mySlotIndex = garden.mySlotIndex;
        if (mySlotIndex === null) {
            return;
        }

        const userSlot = gameMap.userSlots[mySlotIndex];
        if (!userSlot) {
            return;
        }

        const tiles = userSlot.dirtTiles;

        const selectedIndices = new Set(state.selectedTileIndices);
        const tileObjects = garden.garden.tileObjects;

        // Find X-position gap to separate left/right gardens (boardwalk gap)
        const uniqueXPositions = [...new Set(tiles.map(t => t.position.x))].sort((a, b) => a - b);

        // Find the largest gap between consecutive X values
        let maxGap = 0;
        let gapMidpoint = uniqueXPositions[Math.floor(uniqueXPositions.length / 2)];
        for (let i = 1; i < uniqueXPositions.length; i++) {
            const gap = uniqueXPositions[i] - uniqueXPositions[i - 1];
            if (gap > maxGap) {
                maxGap = gap;
                gapMidpoint = (uniqueXPositions[i] + uniqueXPositions[i - 1]) / 2;
            }
        }

        // Split tiles by X position (left vs right garden)
        const leftGardenTiles = tiles.filter(t => t.position.x < gapMidpoint);
        const rightGardenTiles = tiles.filter(t => t.position.x >= gapMidpoint);

        // Calculate bounds for each garden to normalize positions
        const getBounds = (tileList: typeof tiles) => {
            if (tileList.length === 0) return { minX: 0, maxX: 9, minY: 0, maxY: 9 };
            const xs = tileList.map(t => t.position.x);
            const ys = tileList.map(t => t.position.y);
            return {
                minX: Math.min(...xs),
                maxX: Math.max(...xs),
                minY: Math.min(...ys),
                maxY: Math.max(...ys),
            };
        };

        const leftBounds = getBounds(leftGardenTiles);
        const rightBounds = getBounds(rightGardenTiles);

        // Create position-keyed maps for each grid
        const leftMap = new Map<string, typeof tiles[0]>();
        const rightMap = new Map<string, typeof tiles[0]>();

        for (const tile of leftGardenTiles) {
            const col = tile.position.x - leftBounds.minX;
            const row = tile.position.y - leftBounds.minY;
            leftMap.set(`${row},${col}`, tile);
        }

        for (const tile of rightGardenTiles) {
            const col = tile.position.x - rightBounds.minX;
            const row = tile.position.y - rightBounds.minY;
            rightMap.set(`${row},${col}`, tile);
        }

        // Render left garden (grid 1)
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const tile = leftMap.get(`${row},${col}`) || null;
                const tileEl = this.buildTileElement(
                    tile,
                    tile ? (tileObjects[tile.localIndex.toString()] || null) : null,
                    tile ? selectedIndices.has(tile.localIndex.toString()) : false
                );
                grid1.appendChild(tileEl);
            }
        }

        // Render right garden (grid 2)
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const tile = rightMap.get(`${row},${col}`) || null;
                const tileEl = this.buildTileElement(
                    tile,
                    tile ? (tileObjects[tile.localIndex.toString()] || null) : null,
                    tile ? selectedIndices.has(tile.localIndex.toString()) : false
                );
                grid2.appendChild(tileEl);
            }
        }

        // Update header count
        const header = this.dropdown?.querySelector('.tile-grid-selector__info');
        if (header) {
            header.textContent = `${selectedIndices.size} tile${selectedIndices.size !== 1 ? 's' : ''} selected`;
        }
    }

    private buildTileElement(
        tile: MapTile | null,
        tileObject: GardenTileObject | null,
        isSelected: boolean
    ): HTMLElement {
        const tileEl = element('button', {
            className: 'tile-grid-selector__tile',
        }) as HTMLButtonElement;

        if (!tile) {
            // Empty slot (no tile exists here)
            tileEl.classList.add('tile-grid-selector__tile--null');
            tileEl.disabled = true;
            return tileEl;
        }

        // Add state classes
        if (isSelected) {
            tileEl.classList.add('tile-grid-selector__tile--selected');
        }

        if (tileObject) {
            tileEl.classList.add('tile-grid-selector__tile--occupied');
        } else {
            tileEl.classList.add('tile-grid-selector__tile--empty');
        }

        // Add sprite if tile has object
        if (tileObject && MGSprite.isReady()) {
            const sprite = this.getSpriteForTileObject(tileObject);
            if (sprite) {
                tileEl.appendChild(sprite);
            }
        }

        // Drag-to-select: pointerdown starts drag, pointerenter toggles while dragging
        tileEl.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            this.isDragging = true;
            // Determine if we're selecting or deselecting based on current state
            this.dragSelectMode = isSelected ? 'deselect' : 'select';

            // Toggle this tile immediately
            toggleTileSelection(tile.localIndex.toString());
            this.renderGrids();
            this.options.onChange?.();
        });

        tileEl.addEventListener('pointerenter', () => {
            if (!this.isDragging || !this.dragSelectMode) return;

            const state = getTrackersState().get();
            const currentlySelected = state.selectedTileIndices.includes(tile.localIndex.toString());

            // Apply the drag mode (select or deselect)
            if (this.dragSelectMode === 'select' && !currentlySelected) {
                toggleTileSelection(tile.localIndex.toString());
                this.renderGrids();
                this.options.onChange?.();
            } else if (this.dragSelectMode === 'deselect' && currentlySelected) {
                toggleTileSelection(tile.localIndex.toString());
                this.renderGrids();
                this.options.onChange?.();
            }
        });

        return tileEl;
    }

    private getSpriteForTileObject(tileObject: GardenTileObject): HTMLElement | null {
        try {
            if (tileObject.objectType === 'plant') {
                let species = tileObject.species;
                // Handle Celestial sprite mapping
                if (species === 'DawnCelestial') species = 'DawnCelestialCrop';
                if (species === 'MoonCelestial') species = 'MoonCelestialCrop';

                if (MGSprite.has('plant', species)) {
                    const canvas = MGSprite.toCanvas('plant', species, { scale: 0.25 });
                    canvas.style.height = '100%';
                    canvas.style.width = '100%';
                    canvas.style.objectFit = 'contain';
                    canvas.style.imageRendering = 'pixelated';
                    return canvas;
                }
            } else if (tileObject.objectType === 'egg') {
                const eggId = tileObject.eggId;
                if (MGSprite.has('pet', eggId)) {
                    const canvas = MGSprite.toCanvas('pet', eggId, { scale: 0.25 });
                    canvas.style.height = '100%';
                    canvas.style.width = '100%';
                    canvas.style.objectFit = 'contain';
                    canvas.style.imageRendering = 'pixelated';
                    return canvas;
                }
            } else if (tileObject.objectType === 'decor') {
                const decorId = tileObject.decorId;
                if (MGSprite.has('decor', decorId)) {
                    const canvas = MGSprite.toCanvas('decor', decorId, { scale: 0.25 });
                    canvas.style.height = '100%';
                    canvas.style.width = '100%';
                    canvas.style.objectFit = 'contain';
                    canvas.style.imageRendering = 'pixelated';
                    return canvas;
                }
            }
        } catch (e) {
            console.warn('[TileGridSelector] Failed to load sprite:', e);
        }

        return null;
    }
}
