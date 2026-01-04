/**
 * JournalTab Component Styles
 * Per .claude/rules/ui/components.md: style file exports componentNameCss
 */

export const journalTabCss = `
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
    
    /* Dynamic color from tab index */
    background: linear-gradient(180deg, var(--tab-color) 0%, color-mix(in srgb, var(--tab-color), black 20%) 100%);
    border-left: 1px solid color-mix(in srgb, var(--tab-color), white 20%);
    border-right: 1px solid color-mix(in srgb, var(--tab-color), white 20%);
    border-top: 2px solid color-mix(in srgb, var(--tab-color), white 30%);
  }

  .journal-tab:hover {
    filter: brightness(1.1);
  }

  .journal-tab:active {
    transform: translateY(0);
  }

  /* Tab index color fallbacks */
  .journal-tab[data-tab-index="1"] { --tab-color: var(--journal-tab-1, #26a69a); }
  .journal-tab[data-tab-index="2"] { --tab-color: var(--journal-tab-2, #4caf50); }
  .journal-tab[data-tab-index="3"] { --tab-color: var(--journal-tab-3, #9c27b0); }
  .journal-tab[data-tab-index="4"] { --tab-color: var(--journal-tab-4, #2196f3); }
  .journal-tab[data-tab-index="5"] { --tab-color: var(--journal-tab-5, #ff9800); }

  /* Active State - Raised and Extended */
  .journal-tab.active {
    min-height: 29px;
    transform: translateY(-3px);
    margin-bottom: -3px;
    z-index: 2;
    background: linear-gradient(180deg, 
      color-mix(in srgb, var(--tab-color), white 15%) 0%, 
      var(--tab-color) 100%);
    box-shadow: 0 -2px 8px color-mix(in srgb, var(--tab-color), transparent 70%),
                inset 0 1px 2px rgba(255, 255, 255, 0.2);
  }

  .journal-tab:not(.active) {
    opacity: 0.85;
  }
`;
