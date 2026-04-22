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
import { migrateStorageKeys, FEATURE_KEYS, INJECT_KEYS } from "../../utils/storage";
import { MGAntiAfk } from "../../features/antiAfk";
import { MGPetTeam } from "../../features/petTeam";

import { MGXPTracker } from "../../features/xpTracker";
import { MGCropValueIndicator } from "../../features/cropValueIndicator";
import { MGCropSizeIndicator } from "../../features/cropSizeIndicator";
import { MGShopNotifier } from "../../features/shopNotifier";
import { MGWeatherNotifier } from "../../features/weatherNotifier";
import { MGPetHungerNotifier } from "../../features/petHungerNotifier";
import { MGAriesAPI } from "../../features/ariesAPI";
import { MGHarvestLocker } from "../../features/harvestLocker";
import { MGEggLocker } from "../../features/eggLocker";
import { MGDecorLocker } from "../../features/decorLocker";
import { MGAutoStockSeedSilo } from "../../features/autoStockSeedSilo";
import { MGAutoStockDecorShed } from "../../features/autoStockDecorShed";
import { getRegistry } from "../inject/core/registry";
import { startAlertInjector } from "../inject/alert";

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

  let loadedCount = 0;
  let totalCount = 0;

  await initAllModules((progress) => {
    if (progress.status === "start") {
      totalCount++;
    } else if (progress.status === "success") {
      loadedCount++;
      loader.logStep("Modules", `Loading modules... (${loadedCount}/${totalCount})`);
    } else if (progress.status === "error") {
      loader.logStep("Modules", `Loading modules... (${loadedCount}/${totalCount}) - ${progress.name} failed`, "error");
    }
  });

  loader.logStep("Modules", `All modules loaded (${totalCount}/${totalCount})`, "success");
}

export async function initSpriteWarmup(loader: LoaderController): Promise<void> {
  try {
    // MGSprite is already initialized in initModules() (metadata only, no image downloads)
    if (!MGSprite.isReady()) {
      await MGSprite.init();
    }

    // Resolve sprite IDs now that MGSprite catalog is ready
    MGData.resolveSprites();

    // Images are lazy-loaded on demand by toCanvas() — no warmup needed
  } catch (err) {
    console.warn("[Bootstrap] Sprite init failed", err);
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

    { name: "XPTracker", init: MGXPTracker.init.bind(MGXPTracker) },
    { name: "CropValueIndicator", init: MGCropValueIndicator.init.bind(MGCropValueIndicator) },
    { name: "CropSizeIndicator", init: MGCropSizeIndicator.init.bind(MGCropSizeIndicator) },
    { name: "ShopNotifier", init: MGShopNotifier.init.bind(MGShopNotifier) },
    { name: "WeatherNotifier", init: MGWeatherNotifier.init.bind(MGWeatherNotifier) },
    { name: "PetHungerNotifier", init: MGPetHungerNotifier.init.bind(MGPetHungerNotifier) },
    { name: "AriesAPI", init: MGAriesAPI.init.bind(MGAriesAPI) },
    { name: "HarvestLocker", init: MGHarvestLocker.init.bind(MGHarvestLocker) },
    { name: "EggLocker", init: MGEggLocker.init.bind(MGEggLocker) },
    { name: "DecorLocker", init: MGDecorLocker.init.bind(MGDecorLocker) },
    // AutoStockSeedSilo/AutoStockDecorShed are registry-driven: registry.initAll() below handles them.
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
      id: 'cropValueIndicator',
      name: 'Crop Price',
      description: 'Shows coin value in crop tooltips',
      injection: MGCropValueIndicator.render,
      storageKey: FEATURE_KEYS.CROP_VALUE_INDICATOR,
      defaultEnabled: false,
    });

    registry.register({
      id: 'cropSizeIndicator',
      name: 'Crop Size',
      description: 'Shows size percentage in crop tooltips',
      injection: MGCropSizeIndicator.render,
      storageKey: FEATURE_KEYS.CROP_SIZE_INDICATOR,
      defaultEnabled: false,
    });

    // EggLockerInject and DecorLockerInject are now managed directly by their features

    registry.register({
      id: 'autoStockSeedSilo',
      name: 'Seed Silo',
      description: 'Auto-stores matching seeds into the silo',
      injection: {
        init: MGAutoStockSeedSilo.init.bind(MGAutoStockSeedSilo),
        destroy: MGAutoStockSeedSilo.destroy.bind(MGAutoStockSeedSilo),
        isEnabled: MGAutoStockSeedSilo.isEnabled.bind(MGAutoStockSeedSilo),
      },
      storageKey: FEATURE_KEYS.AUTO_STOCK_SEED_SILO,
      defaultEnabled: false,
    });

    registry.register({
      id: 'autoStockDecorShed',
      name: 'Decor Shed',
      description: 'Auto-stores matching decors into the shed',
      injection: {
        init: MGAutoStockDecorShed.init.bind(MGAutoStockDecorShed),
        destroy: MGAutoStockDecorShed.destroy.bind(MGAutoStockDecorShed),
        isEnabled: MGAutoStockDecorShed.isEnabled.bind(MGAutoStockDecorShed),
      },
      storageKey: FEATURE_KEYS.AUTO_STOCK_DECOR_SHED,
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

export { startInjectGamePanelButton, startAlertInjector };
