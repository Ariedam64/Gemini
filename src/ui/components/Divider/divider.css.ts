/**
 * Divider Component Styles
 * Per .claude/rules/ui/ui.components.md: style file exports componentNameCss
 */

export const dividerCss = `
  .gemini-divider {
    height: 1px;
    background: var(--border, rgba(255, 255, 255, 0.1));
    margin: 8px 0;
    width: 100%;
  }

  /* Variants */
  .gemini-divider--thick {
    height: 2px;
  }

  .gemini-divider--dashed {
    background: none;
    border-top: 1px dashed var(--border, rgba(255, 255, 255, 0.1));
  }

  .gemini-divider--vertical {
    height: auto;
    width: 1px;
    margin: 0 8px;
  }
`;
