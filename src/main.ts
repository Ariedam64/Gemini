import {
  createLoader,
  initWebSocketCapture,
  initAtoms,
  initReactiveGlobals,
  initAPI,
  initHUD,
  initModules,
  initSpriteWarmup,
  initSectionsPreload,
  initFeatures,
  startInjectGamePanelButton,
  startAlertInjector,
} from "./ui/loader";
import { migrateStorageKeys } from "./utils/storage";

import { installObjectHooks } from "./modules/data/logic/hooks";
import { installReactDevToolsHook } from "./atoms/core/bridge";

// Early setup (Literal Synchronous Entry Point)
installObjectHooks();
installReactDevToolsHook();

(async function () {
  "use strict";

  // Migrate old storage keys before anything else
  migrateStorageKeys();

  const loader = createLoader({
    title: "Gemini is loading",
    subtitle: "Connecting and preparing modules...",
  });

  let cleanupWebSocket: (() => void) | null = null;

  try {
    cleanupWebSocket = initWebSocketCapture(loader);
    await initAtoms(loader);
    initReactiveGlobals(loader);
    initAPI(loader);

    // Initialize modules first (includes MGData and MGSprite)
    await initModules(loader);

    // Initialize features (can run in parallel with sprite warmup)
    await Promise.all([
      (async () => { initFeatures(loader); })(),
      (async () => { await initSpriteWarmup(loader); })(),
    ]);

    // Preload sections AFTER modules and sprites are ready
    await initSectionsPreload(loader);

    loader.succeed("Gemini is ready!");

  } catch (e) {
    loader.fail("Failed to initialize the mod.", e);
  } finally {
    cleanupWebSocket?.();
  }

  const hud = await initHUD(loader);
  startInjectGamePanelButton({ onClick: () => hud.setOpen(true) });

  // Initialize alert injector (notification button)
  void startAlertInjector();
})();
