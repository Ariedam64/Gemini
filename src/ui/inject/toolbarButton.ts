// Inject the Gemini toggle button as a native Pixi slot on the game's own
// right-side icon rail. See pixiRailButton.ts for why: the rail moved from
// DOM buttons to Pixi rendering, so there is nothing left to clone into.
import { startPixiRailButton, type PixiRailButtonController } from "./core/pixiRailButton";

type Options = {
  onClick: () => void;
  iconUrl?: string; // default Gemini icon
};

const DEFAULT_ICON = "https://i.imgur.com/k5WuC32.png";

export function startInjectGamePanelButton(opts: Options): PixiRailButtonController {
  return startPixiRailButton({
    label: "GeminiToolbarButton",
    icon: { type: "image", url: opts.iconUrl || DEFAULT_ICON },
    onClick: opts.onClick,
  });
}
