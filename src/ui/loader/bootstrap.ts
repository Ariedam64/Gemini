import { loadHudState, saveHudStateValue, Hud } from "../hud";
import { THEMES } from "../theme";
import { buildSections, preloadSections } from "../sections";
import { createHUD } from "../hud";
import { startInjectGamePanelButton } from "../inject/toolbarButton";
import { initWebSocket } from "../../websocket/bootstrap";
import { watchBestWebSocket } from "../../websocket/connection";
import { initAllModules } from "../../modules";
import { LoaderController } from "./loader";
import { prewarm as prewarmAtoms, waitForStore as waitForAtomsStore } from "../../atoms";
import { initGlobals } from "../../globals";
import { exposeGeminiAPI } from "../../api";
import { MGData } from "../../modules/data";
import { MGSprite } from "../../modules/sprite";
import { migrateStorageKeys, FEATURE_KEYS } from "../../utils/storage";
import { MGAntiAfk } from "../../features/antiAfk";
import { MGPetTeam } from "../../features/petTeam";
import { MGBulkFavorite } from "../../features/bulkFavorite";
import { BulkFavoriteInject } from "../inject/qol/bulkFavorite";
import { MGXPTracker } from "../../features/xpTracker";
import { MGCropValueIndicator } from "../../features/cropValueIndicator";
import { getRegistry } from "../inject/core/registry";

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

export async function initHUD(loader: LoaderController): Promise<Hud> {
  loader.logStep("HUD", "Loading HUD preferences...");

  await yieldToMain();

  const state = loadHudState();

  await yieldToMain();

  const hud = await createHUD({
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
        setHUDWidth: deps.setHUDWidth,
        setHUDOpen: deps.setHUDOpen,
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

  const TOTAL_MODULES = 7;
  let loadedCount = 0;

  await initAllModules((progress) => {
    if (progress.status === "success") {
      loadedCount++;
      loader.logStep("Modules", `Loading modules... (${loadedCount}/${TOTAL_MODULES})`);
    } else if (progress.status === "error") {
      loader.logStep("Modules", `Loading modules... (${loadedCount}/${TOTAL_MODULES}) - ${progress.name} failed`, "error");
    }
  });

  loader.logStep("Modules", `All modules loaded (${TOTAL_MODULES}/${TOTAL_MODULES})`, "success");
}

export async function initSpriteWarmup(loader: LoaderController): Promise<void> {
  loader.logStep("Sprites", "Warming up sprite cache...");

  try {
    if (!MGSprite.isReady()) {
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

export async function initSectionsPreload(loader: LoaderController): Promise<void> {
  loader.logStep("Sections", "Preloading UI sections...");

  try {
    await preloadSections();
    loader.logStep("Sections", "Sections preloaded", "success");
  } catch (err) {
    loader.logStep("Sections", "Sections preload failed", "error");
    console.warn("[Bootstrap] Sections preload failed", err);
  }
}

export function initFeatures(loader: LoaderController): void {
  loader.logStep("Features", "Initializing features...");

  const features = [
    { name: "AntiAfk", init: MGAntiAfk.init.bind(MGAntiAfk) },
    { name: "PetTeam", init: MGPetTeam.init.bind(MGPetTeam) },
    { name: "BulkFavorite", init: MGBulkFavorite.init.bind(MGBulkFavorite) },
    { name: "XPTracker", init: MGXPTracker.init.bind(MGXPTracker) },
    { name: "CropValueIndicator", init: MGCropValueIndicator.init.bind(MGCropValueIndicator) },
  ];

  let initializedCount = 0;

  // Initialize features (config/logic only)
  for (const feature of features) {
    try {
      feature.init();
      initializedCount++;
      loader.logStep("Features", `Initializing features... (${initializedCount}/${features.length})`, "info");
    } catch (err) {
      loader.logStep("Features", `Initializing features... (${initializedCount}/${features.length}) - ${feature.name} failed`, "error");
      console.warn(`[Bootstrap] Feature ${feature.name} init failed`, err);
    }
  }

  loader.logStep("Features", `All features initialized (${features.length}/${features.length})`, "success");

  // Initialize QOL Injections (DOM rendering via registry)
  loader.logStep("Injections", "Initializing QOL injections...");

  try {
    const registry = getRegistry();

    // Register all QOL injections
    registry.register({
      id: 'bulkFavoriteInject',
      name: 'Bulk Favorite Inject',
      description: 'Quick favorite/unfavorite multiple mutations',
      injection: BulkFavoriteInject,
      storageKey: FEATURE_KEYS.BULK_FAVORITE,
      defaultEnabled: false,
    });

    registry.register({
      id: 'cropValueIndicator',
      name: 'Crop Price',
      description: 'Shows coin value in crop tooltips',
      injection: MGCropValueIndicator.render,
      storageKey: FEATURE_KEYS.CROP_VALUE_INDICATOR,
      defaultEnabled: false,
    });

    // Initialize all enabled injections
    registry.initAll();

    loader.logStep("Injections", "QOL injections registered and initialized", "success");
  } catch (err) {
    loader.logStep("Injections", "QOL injections initialization failed", "error");
    console.warn("[Bootstrap] Injections init failed", err);
  }
}

export { startInjectGamePanelButton };
