import { loadHudState, saveHudStateValue } from "./ui/hud";
import { THEMES } from "./ui/theme";
import { startAutoReloadOnVersionExpired } from "./core/wsMonitor"
import { buildSections } from "./ui/sections";
import { createHUD } from "./ui/hud"
import { startInjectGamePanelButton } from "./utils/injectGamePanelButton";
import { initWebSocket } from "./websocket/bootstrap";


(async function () {
    "use strict";

    initWebSocket({ debug: false });
    const state = loadHudState();
    startAutoReloadOnVersionExpired();

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

    startInjectGamePanelButton({ onClick: () => hud.setOpen(true) });

})();
