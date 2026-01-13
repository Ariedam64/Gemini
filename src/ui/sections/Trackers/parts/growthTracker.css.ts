/**
 * Growth Tracker Styles - GEMINI Design System
 *
 * Modern card-based layout with:
 * - Dual-column egg/plant stats cards
 * - Progress bars and sprite indicators
 * - Gradient accents and smooth animations
 * - Full theme compatibility using direct CSS variables
 */

export const growthTrackerCss = `
/* ═══════════════════════════════════════════════════════════════════════════
   GROWTH PANEL - Main Container
   ═══════════════════════════════════════════════════════════════════════════ */

.growth-panel {
    background: linear-gradient(145deg, var(--bg), var(--soft));
    border: 1px solid var(--border);
    border-left: 3px solid var(--pill-to);
    border-radius: 0 0 16px 16px;
    margin: 0;
    overflow: hidden;
    box-shadow:
        0 8px 32px var(--shadow),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
    animation: growthPanelSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes growthPanelSlideIn {
    from {
        opacity: 0;
        transform: translateY(-16px) scaleY(0.95);
        max-height: 0;
    }
    to {
        opacity: 1;
        transform: translateY(0) scaleY(1);
        max-height: 2000px;
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   HEADER - Team Growth Summary
   ═══════════════════════════════════════════════════════════════════════════ */

.growth-panel__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 20px;
    background: linear-gradient(90deg, var(--accent), var(--pill-to));
    border-bottom: 1px solid var(--border);
}

.growth-panel__header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--fg);
}

.growth-panel__header-icon {
    font-size: 16px;
}

.growth-panel__header-count {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 600;
}

.growth-panel__count-total {
    background: linear-gradient(135deg, var(--pill-from), var(--pill-to));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 16px;
    font-weight: 900;
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS CONTAINER - Dual Column Layout
   ═══════════════════════════════════════════════════════════════════════════ */

.growth-panel__stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
    padding: 16px;
    background: var(--soft);
}

.growth-panel__empty {
    padding: 32px;
    text-align: center;
    color: var(--muted);
    font-size: 13px;
    font-style: italic;
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS CARD - Individual Egg/Plant Card
   ═══════════════════════════════════════════════════════════════════════════ */

.growth-stats-card {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px;
    transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
    position: relative;
}

.growth-stats-card:hover {
    box-shadow: 0 6px 20px var(--shadow);
    transform: translateY(-2px);
}

/* Accent bar for card type */
.growth-stats-card::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    border-radius: 12px 0 0 12px;
    opacity: 0.8;
}

.growth-stats-card--egg::before {
    background: linear-gradient(180deg, var(--accent-2), var(--pill-to));
}

.growth-stats-card--plant::before {
    background: linear-gradient(180deg, var(--accent-1), var(--pill-to));
}

/* ═══════════════════════════════════════════════════════════════════════════
   CARD HEADER
   ═══════════════════════════════════════════════════════════════════════════ */

.growth-card__header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid var(--border);
}

.growth-card__type-icon {
    font-size: 20px;
}

.growth-card__type-label {
    font-size: 15px;
    font-weight: 800;
    color: var(--fg);
    letter-spacing: 0.3px;
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS TABLE
   ═══════════════════════════════════════════════════════════════════════════ */

.growth-stats-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
}

.growth-stats-table__row {
    /* Clean, minimal design - no borders */
}

.growth-stats-table__label {
    padding: 6px 12px 6px 0;
    color: var(--pill-to);
    font-weight: 600;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
    width: 90px;
}

.growth-stats-table__value {
    padding: 6px 0;
    color: var(--fg);
    font-weight: 600;
}

.growth-value {
    display: inline-block;
}

.growth-value--multiplier {
    font-size: 16px;
    font-weight: 800;
    background: linear-gradient(135deg, var(--pill-from), var(--pill-to));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.growth-value--timer {
    font-weight: 700;
    color: var(--accent);
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROGRESS BAR
   ═══════════════════════════════════════════════════════════════════════════ */

.growth-progress-bar {
    display: flex;
    align-items: center;
    gap: 6px;
    position: relative;
    height: 10px;
    background: var(--soft);
    border: 1px solid var(--border);
    border-radius: 5px;
    overflow: visible;
    min-width: 100px;
}

.growth-progress-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.growth-progress-fill::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg,
        transparent,
        rgba(255,255,255,0.25),
        transparent
    );
    animation: progressShimmer 2.5s infinite;
}

@keyframes progressShimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

.growth-progress-fill--egg {
    background: linear-gradient(90deg, var(--accent-2), color-mix(in oklab, var(--accent-2) 70%, white));
}

.growth-progress-fill--plant {
    background: linear-gradient(90deg, var(--accent-1), color-mix(in oklab, var(--accent-1) 70%, white));
}

.growth-progress-percent {
    font-size: 11px;
    font-weight: 800;
    min-width: 32px;
    text-align: right;
    color: var(--fg);
    position: absolute;
    right: -36px;
}

/* ═══════════════════════════════════════════════════════════════════════════
   BOOSTERS SECTION
   ═══════════════════════════════════════════════════════════════════════════ */

.growth-card__boosters {
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px solid var(--border);
}

.growth-boosters__label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--pill-to);
    margin-bottom: 8px;
}

.growth-boosters__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.growth-booster-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px;
    background: var(--soft);
    border-radius: 8px;
    transition: background 0.2s ease;
}

.growth-booster-item:hover {
    background: var(--accent);
}

.growth-booster__sprite {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(145deg, var(--soft), var(--bg));
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
}

.growth-booster__sprite canvas {
    image-rendering: pixelated;
    image-rendering: crisp-edges;
}

.growth-booster__sprite-fallback {
    font-size: 16px;
    opacity: 0.5;
}

.growth-booster__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.growth-booster__name {
    font-size: 12px;
    font-weight: 600;
    color: var(--fg);
}

.growth-booster__mult {
    font-size: 10px;
    font-weight: 700;
    color: var(--pill-to);
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════════════════════════════════════ */

@media (max-width: 768px) {
    .growth-panel__stats {
        grid-template-columns: 1fr;
    }

    .growth-panel__header {
        flex-direction: column;
        gap: 8px;
        align-items: flex-start;
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   ACCESSIBILITY
   ═══════════════════════════════════════════════════════════════════════════ */

.growth-panel:focus-within {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    .growth-panel,
    .growth-stats-card,
    .growth-progress-fill {
        animation: none;
        transition: none;
    }

    .growth-progress-fill::after {
        animation: none;
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRINT
   ═══════════════════════════════════════════════════════════════════════════ */

@media print {
    .growth-panel {
        box-shadow: none;
        border: 2px solid var(--border);
    }

    .growth-progress-fill::after {
        animation: none;
    }
}
`;
