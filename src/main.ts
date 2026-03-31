import {
  createLoader,
  initWebSocketCapture,
  initCompatibility,
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
  let compatInfo = { isMobile: false, isIOS: false, isSafari: false };

  try {
    cleanupWebSocket = initWebSocketCapture(loader);
    compatInfo = await initCompatibility(loader);
    await initAtoms(loader);
    initReactiveGlobals(loader);
    initAPI(loader);

    // Initialize modules first (includes MGData and MGSprite)
    await initModules(loader, {
      timeoutMs: compatInfo.isIOS || compatInfo.isMobile ? 18000 : undefined,
      logEach: compatInfo.isIOS || compatInfo.isMobile,
    });

    // Initialize features (can run in parallel with sprite warmup)
    await Promise.all([
      (async () => { initFeatures(loader); })(),
      (async () => {
        if (compatInfo.isIOS || compatInfo.isMobile) {
          loader.logStep("Sprites", "Warmup skipped on mobile", "info");
          return;
        }
        await initSpriteWarmup(loader);
      })(),
    ]);

    // Preload sections AFTER modules and sprites are ready
    if (compatInfo.isIOS || compatInfo.isMobile) {
      loader.logStep("Sections", "Preload skipped on mobile", "info");
    } else {
      await initSectionsPreload(loader);
    }

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
