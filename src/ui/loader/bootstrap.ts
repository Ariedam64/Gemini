import { loadHudState, saveHudStateValue } from "../hud";
import { THEMES } from "../theme";
import { buildSections } from "../sections";
import { createHUD } from "../hud";
import { startInjectGamePanelButton } from "../../utils/injectGamePanelButton";
import { initWebSocket } from "../../websocket/bootstrap";
import { watchBestWebSocket } from "../../websocket/connection";
import { initAllModules } from "../../modules";
import { LoaderController } from "./loader";
import { prewarm as prewarmAtoms, waitForStore as waitForAtomsStore } from "../../atoms";
import { initGlobals } from "../../globals";
import { exposeGeminiAPI } from "../../api";
import { MGData } from "../../modules/core/data";
import { MGSprite } from "../../modules/sprite";

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
  loader.logStep("Globals", "Initializing global variables...");

  try {
    initGlobals();
    loader.logStep("Globals", "Global variables ready", "success");
  } catch (err) {
    loader.logStep("Globals", "Failed to initialize global variables", "error");
    console.warn("[Bootstrap] Global variables init failed", err);
  }
}

export function initAPI(loader: LoaderController): void {
  loader.logStep("API", "Exposing Gemini API...");

  try {
    exposeGeminiAPI();
    loader.logStep("API", "Gemini API ready", "success");
  } catch (err) {
    loader.logStep("API", "Failed to expose API", "error");
    console.warn("[Bootstrap] API init failed", err);
  }
}

function yieldToMain(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(() => resolve(), { timeout: 50 });
    } else {
      setTimeout(resolve, 0);
    }
  });
}

export async function initHUD(loader: LoaderController): Promise<ReturnType<typeof createHUD>> {
  loader.logStep("HUD", "Loading HUD preferences...");

  await yieldToMain();

  const state = loadHudState();

  await yieldToMain();

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

  await yieldToMain();

  loader.logStep("HUD", "HUD ready", "success");

  return hud;
}

export async function initModules(loader: LoaderController): Promise<void> {
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

export async function initSpriteWarmup(loader: LoaderController): Promise<void> {
  loader.logStep("Sprites", "Warming up sprite cache...");

  try {
    if (!MGSprite.ready()) {
      await MGSprite.init();
    }

    const spriteIds: string[] = [];

    const plantsData = MGData.get("plants") as Record<string, any> | null;
    if (plantsData) {
      for (const plant of Object.values(plantsData)) {
        if (plant?.seed?.spriteId) spriteIds.push(plant.seed.spriteId);
        if (plant?.plant?.spriteId) spriteIds.push(plant.plant.spriteId);
        if (plant?.crop?.spriteId) spriteIds.push(plant.crop.spriteId);
      }
    }

    const petsData = MGData.get("pets") as Record<string, any> | null;
    if (petsData) {
      for (const pet of Object.values(petsData)) {
        if ((pet as any)?.spriteId) spriteIds.push((pet as any).spriteId);
      }
    }

    const uniqueIds = [...new Set(spriteIds)];
    const total = uniqueIds.length;

    if (total === 0) {
      loader.logStep("Sprites", "No sprites to warmup", "success");
      return;
    }

    await MGSprite.warmup(
      uniqueIds,
      (loaded, totalCount) => {
        loader.logStep("Sprites", `Loading sprites (${loaded}/${totalCount})...`);
      },
      5
    );

    loader.logStep("Sprites", `${total} sprites loaded`, "success");
  } catch (err) {
    loader.logStep("Sprites", "Sprite warmup failed", "error");
    console.warn("[Bootstrap] Sprite warmup failed", err);
  }
}

export { startInjectGamePanelButton };
