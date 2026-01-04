/**
 * Journal Checker Section Styles
 * Replicates the game's "Garden Journal" clipboard aesthetic
 */

export const journalCheckerCss = `
  :host {
    /* Colors tailored to match the game's journal */
    --journal-paper: #FDFBF7;
    --journal-ink: #2D241E;
    --journal-header: #10725A;
    --journal-sub: #5EB292;
    --journal-stamp-bg: #EBDCB2;
    --journal-stamp-border: #D8C7A4;
    --journal-progress-bg: #E0D2B6;
    --journal-progress-from: #FFB800; /* Yellow */
    --journal-progress-to: #34A853;   /* Green */
  }

  .journal-checker-host {
      /* Remove internal scroll to use parent's */
      height: auto;
      overflow: visible;
  }

  /* Force edge-to-edge paper */
  :host-context(.gemini-content),
  .gemini-content:has(.journal-checker-host) {
      padding: 0 !important;
  }

  /* Target Parent Scrollbar */
  :host-context(.gemini-content) ::-webkit-scrollbar,
  .gemini-content:has(.journal-checker-host)::-webkit-scrollbar {
      width: 10px;
  }

  :host-context(.gemini-content) ::-webkit-scrollbar-thumb,
  .gemini-content::-webkit-scrollbar-thumb {
      background: var(--muted);
      border-radius: 8px;
  }

  .journal-content {
    position: relative;
    padding: 56px 16px 84px 16px; /* Multiples of 28px */
    background-color: var(--journal-paper);
    
    /* Scrapbook Lined Paper Background */
    background-image: 
        /* Red Margin Line */
        linear-gradient(90deg, transparent 40px, rgba(239, 68, 68, 0.15) 40px, rgba(239, 68, 68, 0.15) 42px, transparent 42px),
        /* Blue Horizontal Lines - every 28px */
        linear-gradient(rgba(171, 206, 212, 0.25) 1px, transparent 1px);
    background-size: 100% 100%, 100% 28px;
    
    min-height: 100%;
    color: var(--journal-ink);
    font-family: var(--font-game);
    box-shadow: inset 0 0 40px rgba(0,0,0,0.02);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .journal-header {
    font-size: 24px;
    font-weight: 900;
    text-align: center;
    height: 28px;
    line-height: 28px;
    margin-bottom: 28px;
    color: var(--journal-header);
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 1px 1px 0px rgba(255,255,255,0.8);
    position: relative;
    z-index: 2;
  }

  .journal-category-stats {
    font-size: 11px;
    font-weight: 800;
    color: var(--journal-sub);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    /* Height and line-height are set inline in OverviewPage */
  }

  .journal-row {
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.1s ease, transform 0.1s ease;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    position: relative;
    z-index: 1;
    margin-bottom: 4px; /* Spacing between cards */
    padding: 0 8px;
    /* height: 56px set inline in OverviewPage */
  }

  .journal-row:hover {
    background: rgba(16, 114, 90, 0.05);
  }

  .journal-row-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    font-size: 14px;
  }

  .journal-bar-container {
    width: 100%;
    background: var(--journal-progress-bg);
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(0,0,0,0.08);
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  }

  .journal-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--journal-progress-from), var(--journal-progress-to));
    transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* Rainbow progress bar for 100% complete (applied inline) */
  @keyframes rainbow-shimmer {
    0% { filter: brightness(1) saturate(1); }
    50% { filter: brightness(1.2) saturate(1.4); }
    100% { filter: brightness(1) saturate(1); }
  }

  .journal-bar-fill.rainbow {
    animation: rainbow-shimmer 2s ease-in-out infinite;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  .journal-expand-btn {
    text-align: center;
    padding: 0;
    font-size: 13px;
    font-weight: 700;
    color: var(--journal-header);
    cursor: pointer;
    text-decoration: underline;
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  .journal-expand-btn:hover {
    opacity: 1;
    color: var(--journal-sub);
  }

  .journal-back {
    position: absolute;
    top: 14px; /* Centered in the first 28px line area? */
    left: 10px;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 900;
    color: white;
    cursor: pointer;
    padding: 4px 8px;
    background: var(--journal-header);
    border-radius: 4px;
    box-shadow: 2px 2px 0px rgba(0,0,0,0.1);
    text-transform: uppercase;
  }

  .journal-back:hover {
    background: var(--journal-sub);
    transform: translateY(-1px);
  }

  .journal-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
    gap: 16px;
    padding: 16px 0;
  }

  .journal-stamp-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 84px; /* 3 lines */
      justify-content: center;
  }

  .journal-stamp {
    width: 50px;
    height: 50px;
    background: var(--journal-stamp-bg);
    border: 1px solid var(--journal-stamp-border);
    border-radius: 4px; /* Square with slight roundness for "stamp" look */
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    position: relative;
    transition: transform 0.2s;
    /* Scalloped edge simulation */
    clip-path: polygon(
        0% 5%, 5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%
    );
  }

  .journal-stamp:hover {
    transform: rotate(2deg) scale(1.05);
  }

  .journal-stamp-label {
    font-size: 9px;
    font-weight: 800;
    text-align: center;
    margin-top: 4px;
    color: var(--journal-ink);
    text-transform: uppercase;
    line-height: 1.2;
    max-width: 64px;
    height: 28px; /* 1 line */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Scrollbar for species list (when expanded) */
  .journal-species-list::-webkit-scrollbar {
    width: 8px;
  }

  .journal-species-list::-webkit-scrollbar-track {
    background: rgba(0,0,0,0.05);
    border-radius: 4px;
  }

  .journal-species-list::-webkit-scrollbar-thumb {
    background: var(--journal-sub);
    border-radius: 4px;
    transition: background 0.2s;
  }

  .journal-species-list::-webkit-scrollbar-thumb:hover {
    background: var(--journal-header);
  }

  /* ─────────────────────────────────────────────────────────────────────────────
   * Tab Navigation (merged from journal-tabs.css.ts)
   * ───────────────────────────────────────────────────────────────────────────── */
  
  .journal-tabs-container {
    display: flex;
    gap: 4px;
    margin-bottom: 0;
    padding: 0 4px;
  }

  .journal-tab {
    flex: 1;
    max-width: 85px;
    min-height: 11px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border: none;
    cursor: pointer;
    font-family: 'Fredoka', var(--font-game), sans-serif;
    font-weight: 700;
    font-size: 12px;
    color: white;
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 2px 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transform: translateY(0);
  }

  .journal-tab:hover {
    transform: translateY(-1px);
    filter: brightness(1.1);
  }

  .journal-tab:active {
    transform: translateY(0);
  }

  /* All Tab - Teal Theme */
  .journal-tab[data-tab="all"] {
    background: linear-gradient(180deg, #26a69a 0%, #00897b 100%);
    border-left: 1px solid #4db6ac;
    border-right: 1px solid #4db6ac;
    border-top: 2px solid #80cbc4;
  }

  .journal-tab[data-tab="all"].active {
    background: linear-gradient(180deg, #4db6ac 0%, #26a69a 100%);
    box-shadow: 0 -2px 8px rgba(38, 166, 154, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2);
  }

  /* Crops Tab - Green Theme */
  .journal-tab[data-tab="plants"] {
    background: linear-gradient(180deg, #4caf50 0%, #388e3c 100%);
    border-left: 1px solid #66bb6a;
    border-right: 1px solid #66bb6a;
    border-top: 2px solid #81c784;
  }

  .journal-tab[data-tab="plants"].active {
    background: linear-gradient(180deg, #5ec762 0%, #4caf50 100%);
    box-shadow: 0 -2px 8px rgba(76, 175, 80, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2);
  }

  /* Pets Tab - Purple Theme */
  .journal-tab[data-tab="pets"] {
    background: linear-gradient(180deg, #9c27b0 0%, #7b1fa2 100%);
    border-left: 1px solid #ba68c8;
    border-right: 1px solid #ba68c8;
    border-top: 2px solid #ce93d8;
  }

  .journal-tab[data-tab="pets"].active {
    background: linear-gradient(180deg, #ab47bc 0%, #9c27b0 100%);
    box-shadow: 0 -2px 8px rgba(156, 39, 176, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2);
  }

  /* Active State - Raised and Extended for Seamless Connection */
  .journal-tab.active {
    min-height: 29px;
    transform: translateY(-3px);
    margin-bottom: -3px;
    z-index: 2;
  }

  .journal-tab:not(.active) {
    opacity: 0.85;
    filter: brightness(0.9);
  }

  /* Progress Indicator */
  .journal-progress-indicator {
    text-align: right;
    font-family: var(--font-game);
    font-weight: 700;
    font-size: 11px;
    color: var(--journal-sub);
    margin-bottom: 8px;
    padding: 0 8px;
  }

  .journal-progress-indicator .percentage {
    color: var(--journal-header);
  }

  .journal-progress-indicator .count {
    font-size: 10px;
    opacity: 0.9;
  }
`;
