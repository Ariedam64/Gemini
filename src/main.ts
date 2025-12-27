// Install React DevTools hook IMMEDIATELY before anything else loads
// This must happen before React initializes to capture Fiber roots
import { installReactDevToolsHook } from "./atoms";
installReactDevToolsHook();

import { createLoader } from "./loader";
import {
  initWebSocketCapture,
  initAtoms,
  initHUD,
  initModules,
  startInjectGamePanelButton,
} from "./bootstrap";

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
