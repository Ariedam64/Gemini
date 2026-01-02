/**
 * Range Component Styles
 * Per .claude/rules/ui/ui.components.md: style file exports componentNameCss
 */

export const rangeCss = `
  .gemini-range {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    background: var(--input-bg, rgba(255, 255, 255, 0.1));
    border-radius: 3px;
    outline: none;
    cursor: pointer;
  }

  .gemini-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: var(--accent, #5EB292);
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid var(--bg, #1a1a1a);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .gemini-range::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
  }

  .gemini-range::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: var(--accent, #5EB292);
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid var(--bg, #1a1a1a);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .gemini-range::-webkit-slider-runnable-track {
    height: 6px;
    border-radius: 3px;
  }

  .gemini-range::-moz-range-track {
    height: 6px;
    border-radius: 3px;
    background: var(--input-bg, rgba(255, 255, 255, 0.1));
  }

  .gemini-range:focus {
    outline: none;
  }

  .gemini-range:focus::-webkit-slider-thumb {
    box-shadow: 0 0 0 3px var(--focus-ring, rgba(94, 178, 146, 0.3));
  }
`;
