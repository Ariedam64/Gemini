/**
 * Bug Report Modal - Styles
 * Uses project theme variables (--bg, --fg, --border, --accent, etc.)
 */

export const bugReportModalCss = `
  .bug-report-modal .modal-dialog {
    max-width: min(96vw, 640px);
  }

  .bug-report-modal .modal-footer {
    padding: 12px 20px;
  }

  .bug-report {
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: var(--fg);
    font-family: var(--font-ui, system-ui);
    font-size: 13px;
    outline: none;
  }

  .bug-report__pane,
  .bug-report__stack {
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;
  }

  .bug-report__pane[hidden],
  .bug-report [hidden] {
    display: none !important;
  }

  /* ---- Fields ---- */
  .bug-report__field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }

  .bug-report__label {
    font-weight: 600;
    font-size: 12px;
    color: color-mix(in oklab, var(--fg) 85%, transparent);
  }

  .bug-report__optional {
    font-weight: 400;
    color: var(--fg-muted);
  }

  .bug-report__hint {
    font-size: 11px;
    color: var(--fg-muted);
    margin: 0;
  }

  .bug-report__hint:empty {
    display: none;
  }

  .bug-report__field.is-invalid .bug-report__hint {
    color: var(--low);
  }

  .bug-report__field.is-invalid .input,
  .bug-report__field.is-invalid .bug-report__textarea {
    border-color: color-mix(in oklab, var(--low) 70%, var(--border));
  }

  .bug-report__row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
  }

  .bug-report__textarea {
    box-sizing: border-box;
    width: 100%;
    min-height: 88px;
    resize: vertical;
    padding: 10px 12px;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: color-mix(in oklab, var(--soft) 80%, transparent);
    color: var(--fg);
    font: inherit;
    line-height: 1.4;
  }

  .bug-report__textarea--short {
    min-height: 56px;
  }

  .bug-report__textarea::placeholder {
    color: var(--fg-muted);
  }

  .bug-report__textarea:focus {
    outline: 2px solid color-mix(in oklab, var(--accent) 45%, transparent);
  }

  /* ---- Notices ---- */
  .bug-report__notice {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid color-mix(in oklab, var(--medium) 45%, var(--border));
    background: color-mix(in oklab, var(--medium) 12%, transparent);
    font-size: 12px;
  }

  .bug-report__notice--info {
    border-color: color-mix(in oklab, var(--info) 45%, var(--border));
    background: color-mix(in oklab, var(--info) 10%, transparent);
  }

  .bug-report__error {
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid color-mix(in oklab, var(--low) 50%, var(--border));
    background: color-mix(in oklab, var(--low) 12%, transparent);
    font-size: 12px;
  }

  .bug-report__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    width: 100%;
  }

  .bug-report__progress {
    margin-right: auto;
    font-size: 12px;
    color: var(--fg-muted);
  }

  /* ---- Screenshots ---- */
  .bug-report__shots {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 8px;
  }

  .bug-report__shots:empty {
    display: none;
  }

  .bug-report__shot {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 4px;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: color-mix(in oklab, var(--soft) 80%, transparent);
    cursor: pointer;
  }

  .bug-report__shot:focus-visible {
    outline: 2px solid color-mix(in oklab, var(--accent) 60%, transparent);
    outline-offset: 2px;
  }

  .bug-report__shot.is-pending {
    cursor: default;
    min-height: 96px;
    align-items: center;
    justify-content: center;
  }

  .bug-report__shot-img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    border-radius: 6px;
    display: block;
  }

  .bug-report__shot-label {
    font-size: 11px;
    color: var(--fg-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bug-report__shot-remove {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: color-mix(in oklab, var(--paper) 85%, transparent);
    color: var(--fg);
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
  }

  .bug-report__shot-remove:hover {
    border-color: var(--low);
    color: var(--low);
  }

  .bug-report__shot-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }

  .bug-report__shot-large {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .bug-report__shot-large img {
    max-width: 100%;
    max-height: 60vh;
    object-fit: contain;
    border-radius: 8px;
    border: 1px solid var(--border);
  }

  /* ---- Attached data ---- */
  .bug-report__switch-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 6px 0;
  }

  .bug-report__switch-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .bug-report__json {
    margin: 0;
    max-height: 320px;
    overflow: auto;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: color-mix(in oklab, var(--soft) 90%, transparent);
    color: var(--fg);
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 11px;
    white-space: pre-wrap;
    word-break: break-word;
  }

  /* ---- Sent ---- */
  .bug-report__success {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 8px 0;
  }

  .bug-report__success-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--high);
  }

  .bug-report__ref {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .bug-report__ref-code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.04em;
    user-select: all;
  }

  .bug-report__note {
    margin: 0;
    font-size: 12px;
    color: color-mix(in oklab, var(--fg) 80%, transparent);
  }

  /* ---- My reports ---- */
  .bug-report__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .bug-report__report {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: color-mix(in oklab, var(--soft) 70%, transparent);
  }

  .bug-report__report-head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
  }

  .bug-report__report-title {
    flex: 1 1 160px;
    min-width: 0;
    font-weight: 700;
    overflow-wrap: anywhere;
  }

  .bug-report__meta {
    font-size: 11px;
    color: var(--fg-muted);
  }

  .bug-report__fix {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-size: 12px;
    color: var(--high);
  }

  .bug-report__fix.is-update {
    color: var(--medium);
  }

  .bug-report__thread {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .bug-report__comment {
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-width: 92%;
    padding: 8px 10px;
    border-radius: 10px;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    font-size: 12px;
  }

  .bug-report__comment--admin {
    align-self: flex-start;
    border: 1px solid color-mix(in oklab, var(--accent) 40%, var(--border));
    background: color-mix(in oklab, var(--accent) 10%, transparent);
  }

  .bug-report__comment--reporter {
    align-self: flex-end;
    border: 1px solid var(--border);
    background: color-mix(in oklab, var(--muted) 90%, transparent);
  }

  .bug-report__comment-who {
    font-size: 10px;
    font-weight: 600;
    color: var(--fg-muted);
  }

  .bug-report__reply {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .bug-report__empty {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 24px 12px;
    text-align: center;
    color: var(--fg-muted);
  }

  .bug-report__empty-title {
    font-weight: 700;
    color: var(--fg);
  }

  @media (max-width: 640px) {
    .bug-report__shots {
      grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    }
  }
`;
