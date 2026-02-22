export const shopRestockCss = `
  #shop-restock-section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    width: 100%;
  }

  /* --- Global Card Style --- */
  .restock-card {
    background: var(--bg);
    backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    transition: border-color 0.2s ease;
  }
  .restock-card:hover {
    border-color: color-mix(in oklab, var(--border) 80%, var(--accent));
  }

  .restock-wrapper .lg-table .lg-tr-body,
  .restock-wrapper .lg-table .lg-td {
    min-height: 44px;
  }

  /* --- Global Status Bar --- */
  .restock-status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 var(--spacing-xs);
    min-height: 32px;
    font-size: var(--font-size-sm);
    color: var(--fg);
    opacity: 0.9;
  }
  .restock-status-left {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }
  .restock-status-right {
    opacity: 0.7;
    font-variant-numeric: tabular-nums;
  }

  /* --- Filter Bar (History/Inventory) --- */
  .restock-filter-bar {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md);
    padding-bottom: 0;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }
  .restock-filter-bar .sg-root {
    flex: 0 0 auto;
  }
  .restock-filter-bar .search-bar {
    flex: 1;
    min-width: 140px;
  }

  /* Stacked variant: chips on top, search below */
  .restock-filter-bar--stacked {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  .restock-filter-bar--stacked .search-bar {
    flex: none;
    min-width: 0;
    width: 100%;
  }

  /* --- History Shop-Type Chips --- */
  .restock-history-chips {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
  }

  .restock-history-chip {
    padding: 3px 10px;
    border-radius: 99px;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--fg);
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
    opacity: 0.75;
  }
  .restock-history-chip:hover {
    background: var(--soft);
    border-color: color-mix(in oklab, var(--border) 50%, var(--accent));
    opacity: 1;
  }
  .restock-history-chip.is-active {
    background: color-mix(in oklab, var(--accent) 15%, transparent);
    border-color: var(--accent);
    color: var(--accent);
    opacity: 1;
  }

  /* --- Table / List Rows --- */
  .restock-row-hover,
  .restock-history-table .lg-tr-body {
    transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.15s ease;
    cursor: pointer;
    border-radius: var(--radius-sm);
    position: relative; /* Context for z-index */
    min-height: 44px;
  }
  .restock-row-hover:hover,
  .restock-history-table .lg-tr-body:hover {
    transform: scale(1.01);
    background-color: var(--soft);
    z-index: 2;
    box-shadow: 0 4px 12px var(--shadow);
  }
  
  /* Fix table row styles when not using compact mode */
  .lg-table .lg-tr-body.restock-row-hover,
  .restock-history-table .lg-tr-body {
    margin-bottom: 2px; /* Slight gap between scaled rows */
  }
  .lg-table .lg-tr-body.restock-row-hover .lg-td,
  .restock-history-table .lg-td {
    border-bottom: none !important; /* Remove borders for cleaner look */
  }

  /* --- Item Cell Styling --- */
  .restock-item-cell {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 4px 0;
  }

  .restock-icon-wrap {
    position: relative;
    width: 42px;
    height: 42px;
    border-radius: 10px;
    background: var(--soft);
    border: 2px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  /* Rarity Borders */
  .restock-icon-wrap.rarity-common    { border-color: var(--rarity-common); }
  .restock-icon-wrap.rarity-uncommon  { border-color: var(--rarity-uncommon); }
  .restock-icon-wrap.rarity-rare      { border-color: var(--rarity-rare); }
  .restock-icon-wrap.rarity-legendary { border-color: var(--rarity-legendary); box-shadow: 0 0 8px color-mix(in oklab, var(--rarity-legendary) 30%, transparent); }
  .restock-icon-wrap.rarity-mythical  { border-color: var(--rarity-mythical); box-shadow: 0 0 10px color-mix(in oklab, var(--rarity-mythical) 40%, transparent); }
  .restock-icon-wrap.rarity-divine    { border-color: var(--rarity-divine); box-shadow: 0 0 12px color-mix(in oklab, var(--rarity-divine) 50%, transparent); }
  
  /* Celestial Rarity */
  .restock-icon-wrap.rarity-celestial { 
    border-color: var(--rarity-celestial); 
    box-shadow: 0 0 12px color-mix(in oklab, var(--rarity-celestial) 50%, transparent); 
  }

  /* Rainbow Rarity (Backup) */
  .restock-icon-wrap.rarity-rainbow {
    border: 2px solid transparent; /* Hide actual border property */
    background: 
      linear-gradient(
        color-mix(in oklab, var(--bg) 70%, transparent),
        color-mix(in oklab, var(--bg) 70%, transparent)
      ), /* Content bg (overlay on item) */
      var(--rainbow-text-gradient); /* Border gradient */
    background-origin: border-box;
    background-clip: padding-box, border-box;
    box-shadow: 0 0 12px color-mix(in oklab, var(--rarity-celestial) 40%, transparent);
  }
  
  .restock-item-sprite {
    width: 32px;
    height: 32px;
    object-fit: contain;
    position: relative; 
    z-index: 1; /* Ensure sprite is above background */
  }

  /* Source Pip Removed */
  
  .restock-item-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3px;
    min-width: 0;
  }
  .restock-item-name {
    font-weight: 700;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
    color: var(--fg);
  }
  /* Rarity Text Colors */
  .restock-text-common    { color: var(--fg); }
  .restock-text-uncommon  { color: var(--rarity-uncommon); }
  .restock-text-rare      { color: var(--rarity-rare); }
  .restock-text-legendary { color: var(--rarity-legendary); }
  .restock-text-mythical  { color: var(--rarity-mythical); }
  .restock-text-divine    { color: var(--rarity-divine); }
  .restock-text-celestial { color: var(--rarity-celestial); }
  .restock-text-rainbow { 
    background-image: var(--rainbow-text-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .restock-item-sub {
    font-size: 12px;
    opacity: 0.9;
    display: flex;
    align-items: center;
    gap: 6px;
    line-height: 1;
  }
  
  .restock-tracked-icon {
    color: var(--rarity-legendary);
    font-size: 12px;
    filter: drop-shadow(0 0 2px color-mix(in oklab, var(--rarity-legendary) 50%, transparent));
  }

  .restock-price-wrap {
    display: flex;
    align-items: center;
    gap: 3px;
    color: var(--rarity-legendary); /* Gold-ish via theme */
    font-weight: 700;
  }

  .restock-coin-icon {
    width: 14px;
    height: 14px;
    object-fit: contain;
    display: block;
  }

  /* Heat Meter Removed */
  
  .restock-time-cell {
    font-variant-numeric: tabular-nums;
    font-weight: 600;
    opacity: 0.9;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    line-height: 1.1;
    white-space: nowrap;
  }

  /* --- Prediction Row Specifics --- */
  .restock-pred-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: var(--spacing-sm);
  }

  .restock-pred-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 12px;
    gap: 12px;
    border-radius: var(--radius-sm);
    background: color-mix(in oklab, var(--bg) 50%, transparent);
    border: 1px solid transparent;
    min-height: 52px;
  }
  .restock-pred-row:hover {
    background: var(--soft);
    border-color: var(--border);
  }

  .restock-pred-left {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    flex: 1;
    /* Align with history table item column - total metrics width ~200px */
    max-width: calc(100% - 200px);
  }

  .restock-pred-text {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }

  .restock-pred-line1 {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .restock-pred-line2 {
    font-size: 12px;
    opacity: 0.7;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
  }

  /* Hero metrics section (dual: ETA + Rate) */
  .restock-pred-metrics {
    display: flex;
    gap: 40px;
    align-items: center;
    flex-shrink: 0;
  }

  .restock-pred-metric-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    min-width: 52px;
    width: 52px;
    cursor: help;
  }

  /* Rate tooltip */
  .restock-pred-metric-wrap[data-tooltip]:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    right: 0;
    margin-bottom: 10px;
    padding: 10px 14px;
    background: color-mix(in oklab, var(--bg) 95%, var(--fg));
    backdrop-filter: blur(8px);
    border: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
    border-radius: 8px;
    color: var(--fg);
    font-size: 13px;
    font-weight: 500;
    line-height: 1.5;
    white-space: pre-line;
    z-index: 100;
    box-shadow: 0 4px 16px color-mix(in oklab, var(--shadow) 40%, transparent);
    pointer-events: none;
    animation: tooltip-fade-in 0.15s ease-out;
  }

  @keyframes tooltip-fade-in {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .restock-pred-metric-wrap[data-tooltip]:hover::before {
    content: "";
    position: absolute;
    bottom: 100%;
    right: 22px;
    margin-bottom: 4px;
    border: 5px solid transparent;
    border-top-color: color-mix(in oklab, var(--bg) 95%, var(--fg));
    z-index: 101;
    filter: drop-shadow(0 2px 4px color-mix(in oklab, var(--shadow) 20%, transparent));
    pointer-events: none;
    animation: tooltip-fade-in 0.15s ease-out;
  }

  .restock-pred-metric-value {
    font-size: 20px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.5px;
    line-height: 1.2;
    color: var(--fg);
  }

  .restock-pred-metric-label {
    font-size: 10px;
    opacity: 0.5;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* ETA color gradient (green=soon, red=far) */
  .restock-eta-now        { color: #10b981 !important; } /* Bright green - ready now */
  .restock-eta-imminent   { color: #22c55e !important; } /* Green - < 1h */
  .restock-eta-soon       { color: #84cc16 !important; } /* Yellow-green - 1-6h */
  .restock-eta-today      { color: #eab308 !important; } /* Yellow - 6-24h */
  .restock-eta-week       { color: #f97316 !important; } /* Orange - 1-7d */
  .restock-eta-fortnight  { color: #f87171 !important; } /* Light red - 7-14d */
  .restock-eta-far        { color: #ef4444 !important; } /* Red - > 14d */

  .restock-eta-value {
    color: var(--fg);
  }

  .restock-rate-high { color: #4ade80; }
  .restock-rate-mid  { color: #fbbf24; }
  .restock-rate-low  { color: #f87171; }
  .restock-rate-weather { color: var(--accent); }

  /* --- Responsive --- */
  @media (max-width: 520px) {
    .restock-filter-bar {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
    }
    .restock-filter-bar .search-bar {
      width: 100%;
    }
    .restock-pred-metrics {
      gap: 12px;
    }
    .restock-pred-metric-wrap {
      min-width: 48px;
      width: 48px;
    }
    .restock-pred-left {
      max-width: calc(100% - 120px);
    }
    .restock-pred-line2 {
      max-width: 200px;
    }

    /* History table mobile adjustments - make columns more compact */
    .restock-history-table .lg-th[data-col="qty"],
    .restock-history-table .lg-td[data-col="qty"] {
      width: 50px !important;
      min-width: 50px !important;
      max-width: 50px !important;
    }
    .restock-history-table .lg-th[data-col="last"],
    .restock-history-table .lg-td[data-col="last"] {
      width: 70px !important;
      min-width: 70px !important;
      max-width: 70px !important;
      font-size: 11px;
    }
    .restock-icon-wrap {
      width: 36px;
      height: 36px;
    }
    .restock-item-sprite {
      width: 28px;
      height: 28px;
    }
    .restock-item-name {
      font-size: 13px;
    }
    .restock-item-sub {
      font-size: 11px;
    }
    .restock-coin-icon {
      width: 12px;
      height: 12px;
    }
  }
`;
