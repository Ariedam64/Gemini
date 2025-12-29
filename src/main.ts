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
  startInjectGamePanelButton,
} from "./ui/loader";

(async function () {
  "use strict";

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
    await initModules(loader);
    await initSpriteWarmup(loader);
    await initSectionsPreload(loader);

    loader.succeed("Gemini is ready!");

  } catch (e) {
    loader.fail("Failed to initialize the mod.", e);
  } finally {
    cleanupWebSocket?.();
  }

  const hud = await initHUD(loader);
  startInjectGamePanelButton({ onClick: () => hud.setOpen(true) });
})();
