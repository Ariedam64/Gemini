// ui/components/SegmentedControl/segmentedControl.css.ts
export const segmentedControlCss = `
.sg-root {
  display: inline-flex;
  align-items: center;
  width: auto;
}

.sg-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0;

  padding: 4px;
  background-color: var(--soft);
  border: 1px solid var(--border);
  border-radius: 10px;

  transition: background-color 0.2s ease, border-color 0.2s ease;
}

/* Animated indicator background */
.sg-indicator {
  position: absolute;
  top: 4px;
  left: 4px;
  height: calc(100% - 8px);
  border-radius: 8px;

  background: linear-gradient(
    135deg,
    color-mix(in oklab, var(--accent) 35%, transparent) 0%,
    color-mix(in oklab, var(--accent) 50%, transparent) 100%
  );

  box-shadow: inset 0 1px 2px color-mix(in oklab, var(--accent) 20%, transparent);

  transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  pointer-events: none;
  z-index: 0;
}

/* Individual segment buttons */
.sg-btn {
  position: relative;
  z-index: 1;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  padding: 8px 14px;
  min-height: 36px;
  min-width: 60px;

  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  color: var(--fg);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.2px;
  line-height: 1;
  white-space: nowrap;

  transition: color 0.2s ease;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
}

.sg-btn:hover:not(:disabled):not(.active) {
  color: var(--accent);
}

.sg-btn.active {
  color: var(--tab-fg);
  font-weight: 600;
}

.sg-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: var(--muted);
}

.sg-btn:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 2px color-mix(in oklab, var(--accent) 45%, transparent);
}

/* Icon styling */
.sg-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  font-size: 16px;
}

/* Label styling */
.sg-label {
  display: inline-flex;
  align-items: center;
  line-height: 1;
}

/* Size variations */
.sg--sm .sg-btn {
  padding: 6px 10px;
  min-height: 32px;
  font-size: 12px;
}

.sg--sm .sg-container {
  padding: 3px;
}

.sg--sm .sg-indicator {
  top: 3px;
  height: calc(100% - 6px);
}

.sg--lg .sg-btn {
  padding: 12px 18px;
  min-height: 44px;
  font-size: 14px;
  gap: 8px;
}

.sg--lg .sg-container {
  padding: 6px;
}

.sg--lg .sg-indicator {
  top: 6px;
  height: calc(100% - 12px);
}

/* Full width mode */
.sg-root[style*="width: 100%"] .sg-btn {
  flex: 1;
  min-width: 0;
}

/* Icon-only mode (when label is hidden via CSS class) */
.sg-btn.sg--icon-only {
  min-width: 40px;
  padding: 8px;
}

.sg--sm .sg-btn.sg--icon-only {
  min-width: 36px;
  padding: 6px;
}

.sg--lg .sg-btn.sg--icon-only {
  min-width: 44px;
  padding: 10px;
}

/* Hover state on container */
.sg-container:hover {
  border-color: color-mix(in oklab, var(--accent) 25%, var(--border));
}

/* Responsive: stack on very small screens if needed */
@media (max-width: 360px) {
  .sg-btn {
    padding: 6px 10px;
    min-height: 32px;
    font-size: 12px;
  }

  .sg-container {
    padding: 3px;
  }

  .sg-icon {
    font-size: 14px;
  }
}
`;
