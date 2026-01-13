/**
 * Trackers Parts Styles - GEMINI Design System
 *
 * Styles for all Trackers section parts:
 * - TeamSelector: Card-based team selection
 * - TrackerContainer: Tracker wrapper and headers
 * - ComparisonOverlay: Diff indicators and comparison stats
 *
 * Per .claude/rules/ui/components.md:
 * - Theme-compatible (CSS variables only)
 * - Responsive (mobile breakpoints)
 * - Touch-friendly controls
 */

export const partsTrackersCss = `
/* ═══════════════════════════════════════════════════════════════════════════
   TEAM SELECTOR - Card-based Team Selection
   ═══════════════════════════════════════════════════════════════════════════ */

.team-selector {
    margin-bottom: 24px;
    width: 100%;
}

.team-selector__header {
    display: none;
}

.team-selector__cards {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
}

.team-selector__empty {
    grid-column: 1 / -1;
    padding: 48px 24px;
    text-align: center;
    color: var(--muted);
    font-size: 14px;
    font-style: italic;
    background: var(--soft);
    border: 1px dashed var(--border);
    border-radius: 12px;
}

/* ─────────────────────────────────────────────────────────────────────────────
   TEAM CARD
   ───────────────────────────────────────────────────────────────────────────── */

.team-card {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px 24px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: row; /* Wide layout as requested */
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.team-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--shadow);
    border-color: var(--accent);
}

/* Selected states - Simplified for clarity */
.team-card--selected {
    background: var(--soft);
    border-color: var(--accent);
    /* High-fidelity left border selection */
    border-left: 3px solid var(--accent);
    box-shadow: 0 4px 12px var(--shadow);
}

.team-card--primary {
    border-color: var(--pill-from);
    box-shadow: 0 0 0 1px var(--pill-from);
}

.team-card--comparison {
    border-color: var(--pill-to);
    box-shadow: 0 0 0 1px var(--pill-to);
}

/* Card header */
.team-card__header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    flex: 1;
}

.team-card__name {
    font-size: 15px;
    font-weight: 800;
    color: var(--fg);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.team-card__count {
    font-size: 11px;
    font-weight: 600;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Pet sprites preview */
.team-card__sprites {
    display: flex;
    gap: 8px;
    min-height: 48px;
    align-items: center;
    padding: 0 24px; /* Cushion between name and purpose */
}

.team-card__sprite {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
}

.team-card__sprite canvas {
    image-rendering: pixelated;
    image-rendering: crisp-edges;
}

.team-card__sprite-fallback {
    font-size: 16px;
    opacity: 0.5;
}

.team-card__sprite--more {
    background: var(--accent);
    font-size: 11px;
    font-weight: 700;
    color: var(--fg);
}

/* Bunched Sprites Triad */
.team-bunched-sprites {
    position: relative;
    width: 56px;
    height: 56px;
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.team-bunched-sprites::before {
    content: '';
    position: absolute;
    width: 48px;
    height: 48px;
    background: var(--shadow);
    border-radius: 50%;
    opacity: 0.2;
    z-index: 0;
}

/* Bunched Triad (Curved Arch Overlap) */
.bunched-sprite {
    position: absolute;
    width: 64px; /* Matches standard sprite wrapper */
    height: 64px;
    overflow: visible;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.bunched-sprite canvas {
    image-rendering: crisp-edges;
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
}

.bunched-sprite--1 { 
    top: -4px; 
    left: 50%; 
    transform: translateX(-50%) scale(1.1) translateZ(0); 
    z-index: 5; 
}

.bunched-sprite--2 { 
    top: 6px; 
    left: 50%; 
    z-index: 3; 
    transform: translateX(-105%) rotate(-8deg) scale(0.85) translateZ(0);
}

.bunched-sprite--3 { 
    top: 6px; 
    left: 50%; 
    z-index: 3; 
    transform: translateX(5%) rotate(8deg) scale(0.85) translateZ(0);
}

/* Purpose indicator */
.team-card__purpose {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 8px;
    background: var(--soft);
    border-radius: 6px;
    font-size: 11px;
}

.team-card__purpose-icon {
    font-size: 14px;
}

.team-card__purpose-label {
    flex: 1;
    font-weight: 600;
    color: var(--fg);
}

.team-card__purpose-confidence {
    font-weight: 700;
    color: var(--pill-to);
}

/* ═══════════════════════════════════════════════════════════════════════════
   TRACKER CONTAINER - Tracker Orchestration
   ═══════════════════════════════════════════════════════════════════════════ */

.tracker-container {
    margin-top: 24px;
    width: 100%;
}

.tracker-container__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 20px;
    background: linear-gradient(90deg, var(--accent), var(--pill-to));
    border-bottom: 1px solid var(--border);
    border-radius: 12px 12px 0 0;
    margin-bottom: 16px;
}

.tracker-container__header--hidden {
    display: none;
}

.tracker-header__title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 850;
    color: #1a1a1a; /* Enforced high contrast dark text */
    margin-bottom: 2px;
}

.tracker-header__icon {
    font-size: 20px;
}

.tracker-header__label {
    /* Remove the gradient clipping for better readability on light gradients */
    font-weight: 850;
}

.tracker-header__subtitle {
    font-size: 11px;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.6);
    margin-left: 32px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

/* Trackers area */
.tracker-container__trackers {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.tracker-container__empty {
    padding: 64px 24px;
    text-align: center;
    background: var(--soft);
    border: 1px dashed var(--border);
    border-radius: 12px;
}

.tracker-empty__icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
}

.tracker-empty__title {
    font-size: 18px;
    font-weight: 800;
    color: var(--fg);
    margin-bottom: 8px;
}

.tracker-empty__message {
    font-size: 14px;
    color: var(--muted);
}

/* ─────────────────────────────────────────────────────────────────────────────
   TRACKER WRAPPER (for comparison mode)
   ───────────────────────────────────────────────────────────────────────────── */

.tracker-wrapper {
    position: relative;
    width: 100%;
}

.tracker-wrapper__team-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    background: var(--soft);
    border: 1px solid var(--border);
    border-radius: 8px 8px 0 0;
    margin-bottom: -1px;
}

.tracker-wrapper__team-name {
    font-size: 14px;
    font-weight: 700;
    color: var(--fg);
}

.tracker-wrapper__tracker-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--pill-to);
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPARISON OVERLAY - Diff Indicators
   ═══════════════════════════════════════════════════════════════════════════ */

.comparison-overlay {
    margin-top: 24px;
    background: linear-gradient(145deg, var(--bg), var(--soft));
    border: 1px solid var(--border);
    border-left: 3px solid var(--pill-to);
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 8px 32px var(--shadow);
    transform-origin: top center;
    transform: scale(0.95); /* Substantial downscaling for 4K/Compact views */
}

.comparison-overlay__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 32px; /* Plotted up header space */
    background: var(--tab-bg);
    border-bottom: 1px solid var(--border);
}

.comparison-header__team {
    display: flex;
    flex-direction: column; /* Stacked layout for more room */
    align-items: center;
    gap: 12px;
    padding: 0 20px; /* Comfortably spaced inwards as requested */
}

.comparison-overlay__title {
    font-size: 16px;
    font-weight: 800;
    color: #1a1a1a;
}

.comparison-overlay__vs {
    font-size: 13px;
    font-weight: 600;
    color: var(--muted);
}

/* Better Overall Callout */
.better-overall-callout {
    background: var(--bg);
    border: 1px solid var(--border);
    border-left: 4px solid var(--accent);
    border-radius: 12px;
    padding: 16px 20px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 4px 12px var(--shadow);
}

.better-overall__icon {
    font-size: 24px;
    flex-shrink: 0;
}

.better-overall__content {
    flex: 1;
}

.better-overall__text {
    font-size: 15px;
    font-weight: 700;
    color: var(--fg);
    margin-bottom: 4px;
}

.better-overall__metric {
    font-size: 13px;
    color: var(--muted);
    font-weight: 600;
}

/* Merged Summary Card */
.comparison-merged-summary {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
}

.merged-summary-card {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.merged-summary__label {
    font-size: 12px;
    font-weight: 700;
    color: var(--pill-to);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.merged-summary__values {
    display: flex;
    align-items: center;
    gap: 12px;
}

.merged-summary__team-val {
    font-size: 18px;
    font-weight: 800;
}

.merged-summary__delta {
    font-size: 14px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 4px;
    background: var(--soft);
}

.merged-summary__delta--positive { color: var(--complete); }
.merged-summary__delta--negative { color: var(--low); }

/* Comparison Table (Alternative to grid) */
.comparison-table {
    width: 100%;
    border-collapse: collapse;
    background: var(--bg);
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 24px;
}

.comparison-table th {
    background: var(--soft);
    padding: 12px 16px;
    text-align: left;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--muted);
}

.comparison-table td {
    padding: 14px 16px;
    border-top: 1px solid var(--border);
    font-size: 13px;
    color: var(--fg);
}

.comparison-table__label {
    font-weight: 800;
    color: var(--fg);
}

.comparison-table__val {
    font-family: var(--font-mono);
    font-weight: 700;
}

.comparison-table__diff {
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 4px;
}

.comparison-table__diff--up { color: var(--complete); }
.comparison-table__diff--down { color: var(--low); }
.comparison-table__diff--equal { color: var(--muted); }

/* Stats grid (Legacy) */
.comparison-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
}

/* Stat card */
.comparison-stat-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    transition: all 0.2s ease;
}

.comparison-stat-card:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px var(--shadow);
}

/* Card variants */
.comparison-stat-card--up {
    border-left: 3px solid var(--complete);
}

.comparison-stat-card--down {
    border-left: 3px solid var(--low);
}

.comparison-stat-card--equal {
    border-left: 3px solid var(--muted);
}

.comparison-stat__icon {
    font-size: 24px;
    font-weight: 700;
    line-height: 1;
}

.comparison-stat-card--up .comparison-stat__icon {
    color: var(--complete);
}

.comparison-stat-card--down .comparison-stat__icon {
    color: var(--low);
}

.comparison-stat-card--equal .comparison-stat__icon {
    color: var(--muted);
}

.comparison-stat__content {
    flex: 1;
}

.comparison-stat__label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--pill-to);
    margin-bottom: 4px;
}

.comparison-stat__diff {
    font-size: 16px;
    font-weight: 800;
    color: var(--fg);
}

.comparison-stat-card--up .comparison-stat__diff {
    color: var(--complete);
}

.comparison-stat-card--down .comparison-stat__diff {
    color: var(--low);
}

.comparison-stat__percent {
    font-size: 11px;
    font-weight: 600;
    color: var(--muted);
    margin-top: 2px;
}

/* ─────────────────────────────────────────────────────────────────────────────
   PET VERSUS ROWS - High-Fidelity Breakdown
   ───────────────────────────────────────────────────────────────────────────── */

.comparison-versus-section {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.comparison-versus-row {
    display: flex;
    flex-direction: column;
    gap: 1px; /* Divider feel */
    background: var(--border);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--border);
}

.comparison-versus-pet {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 10px 14px; /* Reduced vertical padding */
    background: var(--bg);
    position: relative;
    transition: background 0.2s ease;
}

.comparison-versus-pet:hover {
    background: var(--soft);
}

.comparison-versus-pet--primary::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, var(--pill-from), var(--pill-to));
}

.comparison-versus-pet--comparison::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, var(--pill-to), var(--pill-from));
}

.vs-divider-centered {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--soft);
    padding: 2px;
    font-size: 10px;
    font-weight: 900;
    color: var(--pill-to); /* Higher contrast */
    text-transform: uppercase;
    letter-spacing: 3px;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    opacity: 0.8;
}

/* Secondary Insights */
.tracker-insight {
    font-size: 11px;
    font-weight: 600;
    color: var(--muted);
    font-style: italic;
    display: block;
    margin-top: 2px;
}

/* ═══════════════════════════════════════════════════════════════════════════
   UNIFIED PROGRESS BARS - High Fidelity Shimmer
   ═══════════════════════════════════════════════════════════════════════════ */

.tracker-progress-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    width: 100%;
}

.tracker-progress-row__time {
    font-weight: 700;
    font-size: 13px;
    color: var(--fg);
    min-width: 45px;
}

.tracker-progress-row__feeds {
    font-size: 12px;
    color: var(--muted);
    white-space: nowrap;
}

.tracker-progress-row__bar-container {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    min-width: 140px;
}

.tracker-progress-row__bar {
    flex: 1;
    height: 10px;
    background: var(--soft);
    border: 1px solid var(--border);
    border-radius: 5px;
    overflow: hidden;
    position: relative;
}

.tracker-progress-row__fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.tracker-progress-row__fill::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    animation: trackerProgressShimmer 2.5s infinite;
}

@keyframes trackerProgressShimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

.tracker-progress-row__fill--low { background: linear-gradient(90deg, var(--low), var(--medium)); }
.tracker-progress-row__fill--medium { background: linear-gradient(90deg, var(--medium), var(--high)); }
.tracker-progress-row__fill--high { background: linear-gradient(90deg, var(--high), var(--complete)); }
.tracker-progress-row__fill--complete { background: linear-gradient(90deg, var(--complete), var(--high)); }

.tracker-progress-row__percent {
    font-size: 11px;
    font-weight: 800;
    min-width: 32px;
    text-align: right;
    color: var(--fg);
}

/* Secondary Insights */

.growth-mini-boosters {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
}

.mini-booster-pet {
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mini-booster-count {
    font-size: 10px;
    font-weight: 700;
    color: var(--pill-to);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* ═══════════════════════════════════════════════════════════════════════════
   UNIFIED TRACKER CARDS - Shared Layout & Design
   ═══════════════════════════════════════════════════════════════════════════ */

.tracker-card {
    display: flex;
    flex-direction: column;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 10px 14px;
    transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.tracker-card:hover {
    box-shadow: 0 6px 20px var(--shadow);
    transform: translateY(-2px);
}

/* Left accent bar */
.tracker-card::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    border-radius: 12px 0 0 12px;
    opacity: 0.8;
    background: var(--pill-to);
    transition: background 0.3s ease;
}

.tracker-card--primary::before { background: var(--pill-from); }
.tracker-card--comparison::before { background: var(--pill-to); }
.tracker-card--complete::before { background: var(--complete); }
.tracker-card--warning::before { 
    background: var(--low);
    animation: trackerPulseBorder 1.5s infinite;
}

@keyframes trackerPulseBorder {
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
}

.tracker-card--warning {
    animation: trackerUrgentPulse 2s infinite ease-in-out;
}

@keyframes trackerUrgentPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255, 100, 100, 0); }
    50% { box-shadow: 0 0 15px 5px rgba(255, 100, 100, 0.2); }
}

/* Card Header */
.tracker-card__header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid var(--border);
}

.tracker-card__header-icon { font-size: 18px; }
.tracker-card__header-label {
    font-size: 15px;
    font-weight: 800;
    color: var(--fg);
    letter-spacing: 0.3px;
    flex: 1;
}

/* Card Body */
.tracker-card__body {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    position: relative;
    padding-bottom: 8px;
}

/* STR Info Badge - Standardized */
.tracker-str-badge {
    position: absolute;
    bottom: -8px;
    left: 32px; /* Perfectly centered under 64px sprite wrapper */
    transform: translateX(-50%);
    background: var(--pill-to);
    color: #1a1a1a;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 10px;
    font-weight: 850;
    white-space: nowrap;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    z-index: 10;
    border: 1px solid rgba(0,0,0,0.1);
    letter-spacing: -0.01em;
}

.theme-dark .tracker-str-badge {
    color: #000; /* Usually pill-to is still light in dark theme */
}

/* Sprite Section */
.tracker-card__sprite {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    min-width: 64px;
    flex-shrink: 0;
}

.tracker-card__sprite-wrapper {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
}


/* Stats Section */
.tracker-card__stats {
    flex: 1;
    min-width: 0;
}

.tracker-stats-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
}

.tracker-stats-table__value {
    color: var(--fg);
    font-weight: 700;
}

/* 6-Column High-Fidelity Mode (Image 4 Alignment) */
.tracker-stats-table--aligned td {
    padding: 8px 4px;
}

.tracker-stats-table--aligned td:nth-child(1) { width: 90px; font-weight: 800; color: var(--pill-to); font-size: 10px; text-transform: uppercase; } /* Label */
.tracker-stats-table--aligned td:nth-child(2) { width: 60px; font-weight: 700; font-size: 13px; } /* Time/Value */
.tracker-stats-table--aligned td:nth-child(3) { width: 70px; font-size: 12px; color: var(--muted); } /* Feeds/Icons */
.tracker-stats-table--aligned td:nth-child(4) { width: 60px; font-weight: 800; font-size: 11px; color: var(--pill-to); text-align: center; } /* Target STR */
.tracker-stats-table--aligned td:nth-child(5) { width: auto; } /* Bar */
.tracker-stats-table--aligned td:nth-child(6) { width: 40px; font-weight: 850; font-size: 11px; text-align: right; } /* Percent */

.tracker-stats-table--aligned .tracker-progress-row__bar {
    height: 8px; /* Slightly thinner bars for multi-column layout */
    margin: 0;
}

.tracker-stats-table__row {
    border-bottom: 1px solid var(--border);
    opacity: 0.95;
}

.tracker-stats-table__row:last-child {
    border-bottom: none;
}

/* Footer Section */
.tracker-card__footer {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--border);
}

.tracker-card__empty {
    padding: 32px;
    text-align: center;
    color: var(--muted);
    font-size: 13px;
    font-style: italic;
    background: var(--soft);
    border-radius: 8px;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════════════════════════════════════ */

@media (max-width: 768px) {
    .team-selector__cards {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }

    .comparison-stats-grid {
        grid-template-columns: 1fr;
        gap: 24px; /* More space between pairs */
    }

    /* Vertical stacking for detail rows */
    .comparison-stat-row {
        flex-direction: column;
        gap: 8px;
    }

    .tracker-wrapper__team-header {
        flex-direction: column;
        gap: 6px;
        align-items: flex-start;
    }
}

@media (max-width: 480px) {
    .team-selector__cards {
        grid-template-columns: 1fr;
    }

    .team-card__name {
        font-size: 14px;
    }

    .comparison-overlay__header {
        flex-direction: column;
        gap: 6px;
        align-items: flex-start;
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   ACCESSIBILITY
   ═══════════════════════════════════════════════════════════════════════════ */

.team-card:focus,
.comparison-stat-card:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    .team-card,
    .comparison-stat-card,
    .tracker-wrapper {
        animation: none;
        transition: none;
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRINT
   ═══════════════════════════════════════════════════════════════════════════ */

    @media (max-width: 480px) {
        .comparison-versus-pet {
            flex-direction: column;
            text-align: center;
            padding: 20px 14px;
        }

        .comparison-versus-pet .xp-pet-card__sprite-wrapper {
            margin-right: 0;
            margin-bottom: 12px;
        }

        .comparison-versus-pet td {
            display: block;
            width: 100%;
            padding: 2px 0;
        }
    }
}
`;
