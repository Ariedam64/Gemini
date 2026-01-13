/**
 * Trackers Section Styles
 *
 * Per .claude/rules/ui/core.md:
 * - Use CSS variables from theme (no hardcoded colors)
 * - Mobile-first responsive design
 * - Touch-friendly sizing (min 44px tap targets)
 *
 * @module trackers.css
 */

export const trackersCss = `
  /* ─────────────────────────────────────────────────────────────────────────
   * Section Container
   * ───────────────────────────────────────────────────────────────────────── */

  #trackers-section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    max-width: 100%;
    overflow-x: hidden;
  }

  /* ─────────────────────────────────────────────────────────────────────────
   * Placeholder (temporary, will be removed)
   * ───────────────────────────────────────────────────────────────────────── */

  .trackers-placeholder {
    padding: var(--spacing-xl);
    text-align: center;
    color: var(--color-text-secondary);
    background: var(--color-bg-secondary);
    border-radius: var(--border-radius);
    border: 1px dashed var(--color-border);
  }

  /* ─────────────────────────────────────────────────────────────────────────
   * Team Selector Area
   * ───────────────────────────────────────────────────────────────────────── */

  .team-selector {
    display: grid;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
  }

  /* Desktop: 4 columns */
  @media (min-width: 768px) {
    .team-selector {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  /* Tablet: 3 columns */
  @media (min-width: 480px) and (max-width: 767px) {
    .team-selector {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* Mobile: Horizontal scroll */
  @media (max-width: 479px) {
    .team-selector {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      gap: var(--spacing-sm);
      padding-bottom: var(--spacing-sm);
      -webkit-overflow-scrolling: touch;
    }

    .team-selector::-webkit-scrollbar {
      height: 4px;
    }

    .team-selector::-webkit-scrollbar-thumb {
      background: var(--color-border);
      border-radius: 2px;
    }
  }

  /* ─────────────────────────────────────────────────────────────────────────
   * Team Card
   * ───────────────────────────────────────────────────────────────────────── */

  .team-card {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm);
    background: var(--color-bg-secondary);
    border: 2px solid var(--color-border);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 120px;
  }

  @media (max-width: 479px) {
    .team-card {
      scroll-snap-align: start;
      min-width: 140px;
      flex-shrink: 0;
    }
  }

  .team-card:hover {
    border-color: var(--color-accent);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .team-card--selected {
    border-color: var(--color-accent);
    background: var(--color-bg);
    box-shadow: 0 0 0 2px var(--color-accent);
  }

  .team-card--comparing {
    border-color: var(--color-info);
    background: var(--color-bg);
    box-shadow: 0 0 0 2px var(--color-info);
  }

  .team-card__header {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-weight: 600;
    font-size: var(--font-size-sm);
    color: var(--color-text);
  }

  .team-card__icon {
    font-size: 1.2em;
  }

  .team-card__pets {
    display: flex;
    gap: var(--spacing-xs);
    justify-content: center;
    margin: var(--spacing-xs) 0;
  }

  .team-card__metric {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    text-align: center;
  }

  /* ─────────────────────────────────────────────────────────────────────────
   * Tracker Container
   * ───────────────────────────────────────────────────────────────────────── */

  .tracker-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    background: transparent;
    padding: 0;
    margin-top: var(--spacing-sm);
  }

  /* ─────────────────────────────────────────────────────────────────────────
   * Comparison Controls
   * ───────────────────────────────────────────────────────────────────────── */

  .comparison-controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm);
    background: var(--color-bg-secondary);
    border-radius: var(--border-radius);
    font-size: var(--font-size-sm);
  }

  .comparison-controls__label {
    color: var(--color-text-secondary);
  }

  .comparison-controls__team {
    color: var(--color-text);
    font-weight: 600;
  }

  .comparison-controls__remove {
    margin-left: auto;
    padding: var(--spacing-xs) var(--spacing-sm);
    background: var(--color-danger);
    color: white;
    border: none;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    font-size: var(--font-size-sm);
    transition: opacity 0.2s;
  }

  .comparison-controls__remove:hover {
    opacity: 0.8;
  }

  /* ─────────────────────────────────────────────────────────────────────────
   * Comparison Indicators
   * ───────────────────────────────────────────────────────────────────────── */

  .comparison-indicator {
    font-size: 0.85em;
    margin-left: var(--spacing-xs);
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 2px;
  }

  .comparison-indicator--positive {
    color: var(--color-success);
  }

  .comparison-indicator--negative {
    color: var(--color-danger);
  }

  .comparison-indicator--neutral {
    color: var(--color-text-secondary);
  }

  /* ─────────────────────────────────────────────────────────────────────────
   * Responsive Adjustments
   * ───────────────────────────────────────────────────────────────────────── */

  /* Mobile: Stack vertically */
  @media (max-width: 767px) {
    .tracker-container {
      padding: var(--spacing-sm);
    }
  }

  /* Desktop: Larger spacing */
  @media (min-width: 768px) {
    #trackers-section {
      padding: var(--spacing-lg);
      gap: var(--spacing-lg);
    }
  }
`;
