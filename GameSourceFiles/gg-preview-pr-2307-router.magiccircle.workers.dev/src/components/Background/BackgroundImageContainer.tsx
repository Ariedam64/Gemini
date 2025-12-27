import { AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import type { GameNameIncludingLobby } from '@/common/types/games';
import McFlex from '@/components/McFlex/McFlex';
import { MotionMcFlex } from '@/components/Motion';
import gameMetaDatas from '@/games/gameMetaDatas';
import Wallpaper from '@/Quinoa/assets/Wallpaper_GardenGame.webp';

interface BackgroundImageContainerProps {
  gameName: GameNameIncludingLobby;
  brightness?: number;
  renderInPortal?: boolean;
}

/**
 * Renders the background image for the given game, optionally in a portal.
 * When renderInPortal is true, it renders at the top level of the DOM (typically under <body>).
 * This allows the background to be visually behind all other content,
 * regardless of component nesting.
 *
 * @param gameName - The name of the game (including 'Lobby') whose background to show.
 * @param brightness - Optional brightness filter to apply to the background image.
 * @param renderInPortal - Whether to render the background in a portal at the document body level.
 */
const BackgroundImageContainer = ({
  gameName,
  brightness = 1,
  renderInPortal = false,
}: BackgroundImageContainerProps) => {
  // Ensure the portal target exists (default to document.body)
  if (renderInPortal && (typeof window === 'undefined' || !document?.body))
    return null;

  let wallpaper: string;

  if (gameName === 'Lobby') {
    wallpaper = Wallpaper;
  } else {
    wallpaper = gameMetaDatas[gameName]?.wallpaperImage ?? '';
  }

  const hackyBrightnessToOpacity = 1 - brightness;

  const backgroundContent = (
    <AnimatePresence>
      <MotionMcFlex
        key={gameName}
        position="absolute"
        {...(renderInPortal && {
          height: '100lvh',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          zIndex: '-2',
          pointerEvents: 'none',
        })}
      >
        <McFlex
          className="BackgroundImage"
          // Doing a stacked background is VASTLY more performant on Safari than
          // doing a css filter(), which can cause compositing performance
          // issues when using full-screen canvases.
          sx={{
            background: `linear-gradient(to bottom, rgba(0, 0, 0, ${hackyBrightnessToOpacity}), rgba(0, 0, 0, ${hackyBrightnessToOpacity})), url("${wallpaper}")`,
            backgroundPosition: gameName === 'Lobby' ? 'bottom' : 'center',
            backgroundSize: 'cover',
          }}
        />
      </MotionMcFlex>
    </AnimatePresence>
  );

  return renderInPortal
    ? createPortal(backgroundContent, document.body)
    : backgroundContent;
};

export default BackgroundImageContainer;
