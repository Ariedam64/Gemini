// HUD runtime state helpers (in-memory, no persistence).

export const K = { open: "ui_open", theme: "ui_theme", tab: "ui_active_tab", width: "ui_width" } as const;
export const DEF = { open: false, theme: "dark", tab: "tab-settings", width: 480 } as const;

const runtimeStore: Record<string, unknown> = {};

export function getV<T>(k: string, d: T): T {
  return (k in runtimeStore ? (runtimeStore[k] as T) : d);
}

export function setV<T>(k: string, v: T) {
  runtimeStore[k] = v;
}

export type AppState = {
  open: boolean;
  theme: string;
  tab: string;
  width: number;
};

export function loadState(): AppState {
  return {
    open: getV(K.open, DEF.open),
    theme: getV(K.theme, DEF.theme),
    tab: getV(K.tab, DEF.tab),
    width: getV(K.width, DEF.width),
  };
}
