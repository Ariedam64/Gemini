/**
 * Active Team Card CSS
 *
 * Styles for the permanently-expanded active-pets tracker card,
 * including the 3 clickable slot headers and Save-as-Team button.
 * Uses only theme tokens — no hardcoded colours.
 */

export const activeTeamCardCss = `

/* ─────────────────────────────────────────────────────────────────────────── */
/* Card wrapper                                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */

.active-team-card {
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Slot header row (3 clickable pet sprites)                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

.active-team-card__slots {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding: var(--spacing-sm) var(--spacing-sm) 0;
  gap: var(--spacing-xs);
}

.active-team-card__slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  flex: 1;
  min-width: 0;
  cursor: pointer;
  border-radius: var(--radius-md);
  padding: var(--spacing-xs);
  transition: background 0.15s ease;
  position: relative;
  /* min 44px touch target per Apple HIG */
  min-height: 44px;
}

.active-team-card__slot:hover {
  background: var(--color-bg-secondary, rgba(255,255,255,0.06));
}

.active-team-card__slot:focus-visible {
  outline: 2px solid var(--color-focus, var(--color-primary));
  outline-offset: 2px;
}

/* Sprite canvas wrapper */
.active-team-card__sprite {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  position: relative;
}

/* Swap icon overlay — appears on hover */
.active-team-card__slot-swap {
  position: absolute;
  bottom: 2px;
  right: 2px;
  font-size: 11px;
  line-height: 1;
  opacity: 0;
  transition: opacity 0.15s ease;
  pointer-events: none;
  background: var(--color-bg, #000);
  border-radius: var(--radius-sm);
  padding: 1px 3px;
}

.active-team-card__slot:hover .active-team-card__slot-swap {
  opacity: 0.85;
}

/* Override badge under sprite */
.active-team-card__override-badge {
  font-size: 10px;
  color: var(--color-primary, #7c6de0);
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1;
}

/* Empty slot placeholder */
.active-team-card__slot--empty .active-team-card__sprite-placeholder {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  border: 1px dashed var(--color-border, rgba(255,255,255,0.15));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--muted, rgba(255,255,255,0.35));
  font-size: 18px;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Expansion container (feature panels injected here by TrackerExpansionHandler) */
/* ─────────────────────────────────────────────────────────────────────────── */

.active-team-card__expansion {
  /* inherits team-expanded-container styles from existing CSS */
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Save as Team button                                                           */
/* ─────────────────────────────────────────────────────────────────────────── */

.active-team-card__save-row {
  display: flex;
  justify-content: flex-end;
  padding: var(--spacing-xs) var(--spacing-sm);
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Save-as-Team modal — name input wrapper                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

.active-team-name-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) 0;
}

.active-team-name-input-wrapper label {
  font-size: var(--font-size-sm);
  color: var(--muted, rgba(255,255,255,0.6));
}

/* Modal footer buttons */
.active-team-modal-footer {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: flex-end;
}
`;
