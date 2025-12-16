import { K, DEF, loadState, setV, getV } from "./ui/hudState";
import { THEMES } from "./ui/theme";
import { startAutoReloadOnVersionExpired } from "./core/wsMonitor"
import { buildSections } from "./ui/sections";
import { createHUD } from "./ui/HUD"
import { startInjectGamePanelButton } from "./utils/injectGamePanelButton";
import { initWebSocket } from "./websocket/bootstrap";


(async function () {
    "use strict";

    initWebSocket({ debug: false });
    const state = loadState();
    startAutoReloadOnVersionExpired();

    const hud = createHUD({
      hostId: "lg-slideout-root",
      initialWidth: state.width,
        initialOpen: state.open,
        onWidthChange: (px) => setV(K.width, px),
        onOpenChange: (open) => setV(K.open, open),

        themes: THEMES,
        initialTheme: state.theme,
        onThemeChange: (name) => setV(K.theme, name),

        buildSections: (deps) =>
        buildSections({
            applyTheme: deps.applyTheme,
            initialTheme: deps.initialTheme,
            getCurrentTheme: deps.getCurrentTheme,
        }),

        initialTab: state.tab,
        onTabChange: (id) => setV(K.tab, id),
    });

    startInjectGamePanelButton({ onClick: () => hud.setOpen(true) });

})();
