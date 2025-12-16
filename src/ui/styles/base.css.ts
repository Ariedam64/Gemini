export const baseCss = `
@layer base {
  /* Root container */
  .lg-wrap{ position:relative; pointer-events:auto; }

  /* ---- HUD panel ---- */
  .lg-panel{
    position:fixed; top:0; right:0; bottom:0; width:var(--w);
    display:flex; flex-direction:column;
    background-color:var(--bg);
    color:var(--fg);
    border-left:1px solid var(--border);
    box-shadow:-20px 0 60px var(--shadow);
    transform:translateX(100%);
    transition:transform .28s cubic-bezier(.2,.8,.2,1),
               background-color .28s ease, color .28s ease,
               border-color .28s ease, box-shadow .28s ease;
    overflow:hidden; pointer-events:auto;
    backdrop-filter:blur(var(--glass-blur)); -webkit-backdrop-filter:blur(var(--glass-blur));
  }
  .lg-panel.open{ transform:translateX(0); }

  /* ---- Resizer (desktop only en JS) ---- */
  .lg-resizer{
    position:absolute; left:0; top:0; bottom:0; width:8px;
    cursor:ew-resize; background:transparent;
  }
  .lg-resizer:hover{
    background:color-mix(in oklab, var(--accent) 15%, transparent);
  }

  /* ---- TABBAR (grid: tabs that stretch + close button) ---- */
  .lg-tabbar{
    position: relative;
    height: var(--tab-h);
    display: grid;
    grid-template-columns: minmax(0,1fr) auto;
    align-items: center;
    gap: 14px;
    padding: 12px max(12px, var(--inset-l)) 12px max(12px, var(--inset-r));
    background-color: color-mix(in oklab, var(--bg) 92%, transparent);
    transition: background-color .28s ease, border-color .28s ease;
  }

  /* ---- CLOSE BUTTON (dans la tabbar, colonne auto) ---- */
  .lg-close{
    position: static;
    inline-size: 34px;
    block-size: 34px;
    border-radius: 999px;
    border: 1px solid color-mix(in oklab, var(--border) 70%, transparent);
    background: linear-gradient(
      180deg,
      color-mix(in oklab, var(--soft) 85%, transparent) 0%,
      color-mix(in oklab, var(--soft) 60%, transparent) 100%
    );
    color: var(--fg);
    font: 16px/1 ui-monospace, SFMono-Regular, Menlo, Consolas;
    display: grid;
    place-items: center;
    cursor: pointer;
    box-shadow: 0 6px 18px color-mix(in oklab, var(--shadow) 35%, transparent);
    transition: transform .05s, border-color .2s, background .2s, color .2s, opacity .2s;
  }
  .lg-close:hover{ border-color: color-mix(in oklab, var(--accent) 40%, var(--border)); }
  .lg-close:active{ transform: scale(.98); }

  /* Tweaks responsive pour la tabbar et la croix */
  @media (max-width: 720px){
    .lg-tabbar{
      gap: 12px;
      padding: 10px max(10px, var(--inset-l)) 10px max(10px, var(--inset-r));
    }
    .lg-close{
      inline-size: 30px;
      block-size: 30px;
      font-size: 15px;
    }
  }
  @media (max-width: 480px){
    .lg-tabbar{
      gap: 10px;
      padding: 10px max(8px, var(--inset-l)) 10px max(8px, var(--inset-r));
    }
    .lg-close{
      inline-size: 28px;
      block-size: 28px;
      font-size: 14px;
    }
  }

  /* ---- Contenu ---- */
  .lg-content{
    padding:calc(var(--pad) + var(--inset-t)) var(--pad) calc(var(--pad) + var(--inset-b));
    overflow:auto;
    height:calc(100dvh - var(--tab-h));
    scrollbar-gutter:stable;
  }
  .lg-content::-webkit-scrollbar{ width:10px; }
  .lg-content::-webkit-scrollbar-thumb{ background:var(--muted); border-radius:8px; }
  .lg-section{ display:block; }

  /* ---- FAB (open) ---- */
  .lg-fab-open{
    position: fixed;
    right: calc(16px + var(--inset-r));
    /* Vertically centered on the right */
    top: 50%;
    margin-top: -24px; /* half of 48px (button height) */
    z-index: 2147483645;

    display: grid; place-items: center;
    width: 48px; height: 48px; border-radius: 999px;

    border: 1px solid var(--border);
    background-color: var(--bg);
    color: var(--fg);

    box-shadow: 0 10px 30px var(--shadow);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));

    cursor: pointer; user-select: none;
    transition: opacity .2s, transform .05s,
                background-color .28s ease, color .28s ease, border-color .28s ease;
  }
  .lg-fab-open:hover{ border-color: color-mix(in oklab, var(--accent) 40%, var(--border)); }
  .lg-fab-open:active{ transform: translateY(1px); }
  .lg-fab-open .lg-fab-ico{ font: 18px/1 ui-monospace,SFMono-Regular,Menlo,Consolas; }

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

