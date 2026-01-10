import type { Filter } from 'pixi.js';
import { ColorOverlayFilter } from 'pixi-filters';
import { QUINOA_RENDER_SCALE } from '../../sprite-utils';

const INTERACTION_HOVER_HIGHLIGHT_FILTER = new ColorOverlayFilter({
  color: 'white',
  alpha: 0.05,
});

const INTERACTION_ACTIVE_HIGHLIGHT_FILTER = new ColorOverlayFilter({
  color: 'white',
  alpha: 0.2,
});

let lastResolution = -1;

/**
 * Ensures shared filters match current renderer resolution.
 */
function syncResolution(): void {
  if (lastResolution !== QUINOA_RENDER_SCALE) {
    INTERACTION_HOVER_HIGHLIGHT_FILTER.resolution = QUINOA_RENDER_SCALE;
    INTERACTION_ACTIVE_HIGHLIGHT_FILTER.resolution = QUINOA_RENDER_SCALE;
    lastResolution = QUINOA_RENDER_SCALE;
  }
}

/**
 * Adds a filter to a display object's filter chain (by identity).
 * No-op if the filter is already present.
 */
export function addFilter(
  target: { filters: readonly Filter[] | null },
  filter: Filter
): void {
  const filters = target.filters ?? [];
  if (filters.includes(filter)) {
    return;
  }
  target.filters = [...filters, filter];
}

/**
 * Removes a filter from a display object's filter chain (by identity).
 * No-op if the filter is not present.
 */
export function removeFilter(
  target: { filters: readonly Filter[] | null },
  filter: Filter
): void {
  const filters = target.filters ?? [];
  if (filters.length === 0) {
    return;
  }
  const next = filters.filter((f) => f !== filter);
  target.filters = next.length === 0 ? null : next;
}

/**
 * Returns the shared hover highlight filter used for interactive elements.
 */
export function getInteractionHoverHighlightFilter(): ColorOverlayFilter {
  syncResolution();
  return INTERACTION_HOVER_HIGHLIGHT_FILTER;
}

/**
 * Returns the shared active highlight filter used for interactive elements.
 */
export function getInteractionActiveHighlightFilter(): ColorOverlayFilter {
  syncResolution();
  return INTERACTION_ACTIVE_HIGHLIGHT_FILTER;
}
