// src/bootstrap.ts
// Individual initialization steps for the loader

import { loadHudState, saveHudStateValue } from "./ui/hud";
import { THEMES } from "./ui/theme";
import { buildSections } from "./ui/sections";
import { createHUD } from "./ui/hud";
import { startInjectGamePanelButton } from "./utils/injectGamePanelButton";
import { initWebSocket } from "./websocket/bootstrap";
import { watchBestWebSocket } from "./websocket/connection";
import { initAllModules } from "./modules";
import { LoaderController } from "./loader";
import { prewarm as prewarmAtoms, waitForStore as waitForAtomsStore } from "./atoms";
import { initGlobals } from "./globals";
import { exposeGeminiAPI } from "./api";

export function initWebSocketCapture(loader: LoaderController): () => void {
  loader.logStep("WebSocket", "Capturing WebSocket...");

  let stopWatch: (() => void) | null = null;

  stopWatch = watchBestWebSocket(
    (res) => {
      if (res.ws) {
        loader.logStep("WebSocket", "WebSocket captured", "success");
        stopWatch?.();
        stopWatch = null;
      }
    },
    { intervalMs: 250 }
  );

  initWebSocket({ debug: false });

  return () => {
    stopWatch?.();
    stopWatch = null;
  };
}

export async function initAtoms(loader: LoaderController): Promise<void> {
  loader.logStep("Atoms", "Prewarming Jotai store...");

  try {
    await prewarmAtoms();
    await waitForAtomsStore({ timeoutMs: 8000, intervalMs: 50 });
    loader.logStep("Atoms", "Jotai store ready", "success");
  } catch (err) {
    loader.logStep("Atoms", "Jotai store not captured yet", "error");
    console.warn("[Bootstrap] Jotai store wait failed", err);
  }
}

export function initReactiveGlobals(loader: LoaderController): void {
  loader.logStep("Globals", "Initializing reactive globals...");

  try {
    initGlobals();
    loader.logStep("Globals", "Reactive globals ready", "success");
  } catch (err) {
    loader.logStep("Globals", "Failed to initialize globals", "error");
    console.warn("[Bootstrap] Globals init failed", err);
  }
}

export function initAPI(loader: LoaderController): void {
  loader.logStep("API", "Exposing Gemini API...");

  try {
    exposeGeminiAPI();
    loader.logStep("API", "Gemini API ready (window.Gemini)", "success");
  } catch (err) {
    loader.logStep("API", "Failed to expose API", "error");
    console.warn("[Bootstrap] API init failed", err);
  }
}

export function initHUD(loader: LoaderController): ReturnType<typeof createHUD> {
  loader.logStep("HUD", "Loading HUD preferences...");

  const state = loadHudState();

  const hud = createHUD({
    hostId: "gemini-hud-root",
    initialWidth: state.width,
    initialOpen: state.isOpen,
    onWidthChange: (px) => saveHudStateValue("width", px),
    onOpenChange: (isOpen) => saveHudStateValue("isOpen", isOpen),

    themes: THEMES,
    initialTheme: state.theme,
    onThemeChange: (name) => saveHudStateValue("theme", name),

    buildSections: (deps) =>
      buildSections({
        applyTheme: deps.applyTheme,
        initialTheme: deps.initialTheme,
        getCurrentTheme: deps.getCurrentTheme,
      }),

    initialTab: state.activeTab,
    onTabChange: (id) => saveHudStateValue("activeTab", id),
  });

  loader.logStep("HUD", "HUD ready", "success");

  return hud;
}

export async function initModules(loader: LoaderController): Promise<void> {
  loader.log("HUD ready. Loading modules in the background...", "success");
  loader.setSubtitle("Activating Gemini modules...");

  await initAllModules((progress) => {
    if (progress.status === "start") {
      loader.logStep(progress.name, `Loading ${progress.name}...`);
    } else if (progress.status === "success") {
      loader.logStep(progress.name, `${progress.name} ready`, "success");
    } else {
      loader.logStep(progress.name, `${progress.name} encountered an issue.`, "error");
    }
  });
}

export { startInjectGamePanelButton };
