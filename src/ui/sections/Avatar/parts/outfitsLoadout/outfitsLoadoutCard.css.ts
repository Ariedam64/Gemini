/**
 * Outfits Loadout Card styles
 */

export const outfitsLoadoutCardCss = /* css */`
.outfits-loadout-empty {
    padding: 4px 0 2px;
    text-align: center;
    font-size: 13px;
    color: color-mix(in oklab, var(--fg) 50%, transparent);
}

/* Horizontal carousel (used inside builder) */
.outfits-loadout-carousel {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding: 2px 2px 8px;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
}
.outfits-loadout-carousel:active {
    cursor: grabbing;
}
.outfits-loadout-carousel::-webkit-scrollbar {
    height: 6px;
}
.outfits-loadout-carousel::-webkit-scrollbar-track {
    background: transparent;
}
.outfits-loadout-carousel::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 3px;
}
.outfits-loadout-carousel::-webkit-scrollbar-thumb:hover {
    background: color-mix(in oklab, var(--border) 70%, var(--fg) 30%);
}

/* Vertical grid (used in standalone loadouts card) */
.outfits-loadout-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 72px);
    gap: 8px;
    max-height: 232px; /* 3 rows × 72px + 2 gaps × 8px */
    overflow-y: auto;
    padding: 2px 2px 4px;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
}
.outfits-loadout-grid::-webkit-scrollbar {
    width: 6px;
}
.outfits-loadout-grid::-webkit-scrollbar-track {
    background: transparent;
}
.outfits-loadout-grid::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 3px;
}
.outfits-loadout-grid::-webkit-scrollbar-thumb:hover {
    background: color-mix(in oklab, var(--border) 70%, var(--fg) 30%);
}

.outfits-loadout-hint {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid color-mix(in oklab, var(--border) 50%, transparent);
    font-size: 11px;
    color: color-mix(in oklab, var(--fg) 40%, transparent);
    text-align: center;
    line-height: 1.6;
}
.outfits-loadout-hint__mobile {
    display: none;
}
@media (hover: none) and (pointer: coarse) {
    .outfits-loadout-hint__desktop {
        display: none;
    }
    .outfits-loadout-hint__mobile {
        display: block;
    }
}

.outfits-loadout-card {
    position: relative;
    flex-shrink: 0;
    width: 72px;
    height: 72px;
    border-radius: 10px;
    background: color-mix(in oklab, var(--soft) 80%, transparent);
    border: 2px solid transparent;
    cursor: pointer;
    transition: border-color 0.15s ease, background 0.15s ease;
    overflow: hidden;
}
.outfits-loadout-card:hover {
    border-color: color-mix(in oklab, var(--accent) 40%, transparent);
    background: color-mix(in oklab, var(--muted) 100%, transparent);
}
.outfits-loadout-card:active {
    opacity: 0.7;
}

.outfits-loadout-preview {
    position: relative;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
.outfits-loadout-layer {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
}
`;
