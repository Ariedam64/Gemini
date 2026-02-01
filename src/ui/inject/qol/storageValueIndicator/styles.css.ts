/**
 * Storage Value Indicator - QOL Styles
 *
 * Scoped styles for the storage value indicator in storage modals.
 */

export const storageValueIndicatorCss = `
  .gemini-qol-storageValue {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    gap: 6px;
    padding-left: 2px;
  }

  .gemini-qol-storageValue-sprite {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .gemini-qol-storageValue-text {
    font-size: 14px;
    color: var(--accent);
    font-weight: 700;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .gemini-qol-storageValue {
      gap: 4px;
    }

    .gemini-qol-storageValue-sprite {
      width: 16px;
      height: 16px;
    }

    .gemini-qol-storageValue-text {
      font-size: 12px;
    }
  }
`;
