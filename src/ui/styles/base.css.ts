export const baseCss = `
@layer base {
  /* Section container */
  .lg-section{ display:block; }

  /* ---- Key-value grid + basic inputs (primitives) ---- */
  .kv > * { min-width:0; }
  .kv{
    display:grid; grid-template-columns:minmax(110px,160px) 1fr;
    gap:10px 14px; align-items:center;
  }

  .lg-input-wrap{ display:flex; align-items:center; gap:10px; width:100%; }
  .lg-input-label{ min-width:160px; opacity:.85; font-weight:600; }
  .input{
    all:unset; display:inline-flex; align-items:center; width:100%;
    border:1px solid var(--border); border-radius:12px; padding:10px 12px; box-sizing:border-box;
    background-color:color-mix(in oklab, var(--soft) 80%, transparent);
    color:var(--fg); font-size:13px; min-height:36px; line-height:1.2;
    transition:background-color .28s ease, border-color .28s ease, color .28s ease;
  }
  .input:focus{ outline:2px solid color-mix(in oklab, var(--accent) 45%, transparent); }
  .input:disabled{ opacity:.6; cursor:not-allowed; }

  /* Labels (primitive) */
  .lg-label-wrap{ display:flex; flex-direction:column; gap:6px; min-width:0; }
  .lg-label{
    display:flex; align-items:center; gap:8px;
    color:var(--fg); font-weight:600; line-height:1.2; white-space:nowrap;
  }
  .lg-label-ico{ opacity:.9; font-size:1em; line-height:1; }
  .lg-label-text{ overflow:hidden; text-overflow:ellipsis; }

  /* Settings color picker layout */
  .settings-theme-grid{
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap:16px;
  }
  @media (max-width: 640px){
    .settings-theme-grid{
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap:12px;
    }
  }
  }
  .settings-theme-row{
    margin-bottom:16px;
  }
  .settings-color-row{
    display:flex;
    flex-direction:column;
    width:100%;
  }
  .settings-color-block{
    display:flex;
    flex-direction:column;
    gap:8px;
    align-items:stretch;
    width:100%;
  }

  .shop-range-summary{
    font-weight:600;
    font-size:13px;
    color:var(--text);
    font-variant-numeric:tabular-nums;
    text-align:center;
    width:100%;
    margin-bottom:8px;
  }

  /* Minor responsive UX for KV/inputs */
  @media (max-width: 480px){
    .kv{ grid-template-columns: 1fr; }
    /* Exception: some rows must remain two columns on mobile */
  .kv.kv--inline-mobile{ grid-template-columns: minmax(110px,160px) 1fr; align-items:center; }
  .lg-input-wrap{ flex-direction:column; align-items:stretch; gap:6px; }
  .lg-input-label{ min-width:0; }

  /* Shop (mobile): keep the picker on the left and the range on the right with a small gap */
    .shop-picker-row{ flex-direction: row !important; align-items: center !important; gap: 6px !important; }
    .shop-range{ display:flex !important; flex-direction: row !important; align-items: center !important; justify-content: flex-start !important; gap: 6px !important; flex: 0 0 auto !important; white-space: nowrap; }
    .settings-theme-grid{
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap:8px;
    }
  }
}
`;

