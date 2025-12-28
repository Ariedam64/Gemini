import {
  createLoader,
  initWebSocketCapture,
  initAtoms,
  initReactiveGlobals,
  initAPI,
  initHUD,
  initModules,
  startInjectGamePanelButton,
} from "./ui/loader";

(async function () {
  "use strict";

  const loader = createLoader({
    title: "Gemini is loading",
    subtitle: "Connecting and preparing modules...",
  });

  let cleanupWebSocket: (() => void) | null = null;
  let hud: ReturnType<typeof initHUD> | null = null;

  try {
    cleanupWebSocket = initWebSocketCapture(loader);
    await initAtoms(loader);
    initReactiveGlobals(loader);
    initAPI(loader);
    hud = initHUD(loader);
    await initModules(loader);

    loader.succeed("Gemini is ready!");

  } catch (e) {
    loader.fail("Failed to initialize the mod.", e);
  } finally {
    cleanupWebSocket?.();
  }

  if (hud) {
    const hudRef = hud;
    startInjectGamePanelButton({ onClick: () => hudRef.setOpen(true) });
  }

 
})();
