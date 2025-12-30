/**
 * Game Font Declarations (Greycliff CF)
 * 
 * Fonts are loaded from the game's existing bundle when available.
 * Fallback to system fonts if not in-game context.
 * 
 * @module fonts.css
 */

export const fontsCss = `
@layer fonts {
  /* The game loads Greycliff CF - we inherit it when available */
  /* This fallback stack ensures graceful degradation */
  
  :host {
    --font-game: 'Greycliff CF', 'DM Sans', 'Inter', system-ui, -apple-system,
                 "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }
  
  /* Font weight utilities (matching game's fontWeights from RoomTheme.ts) */
  .font-medium { font-weight: 500; }
  .font-demibold { font-weight: 600; }
  .font-bold { font-weight: 700; }
  .font-extrabold { font-weight: 800; }
  .font-heavy { font-weight: 900; }
  
  /* Font size utilities (matching game's fontSizes from RoomTheme.ts) */
  .text-2xs { font-size: 12px; }
  .text-xs { font-size: 14px; }
  .text-sm { font-size: 16px; }
  .text-sm2 { font-size: 18px; }
  .text-md { font-size: 20px; }
  .text-lg { font-size: 24px; }
}
`;

/**
 * Detect if the game font (Greycliff CF) is available
 * Uses canvas text measuring to determine font availability
 */
export function detectGameFont(): boolean {
    if (typeof document === 'undefined') return false;

    try {
        const testCanvas = document.createElement('canvas');
        const ctx = testCanvas.getContext('2d');
        if (!ctx) return false;

        // Measure text with game font
        ctx.font = '16px "Greycliff CF"';
        const gameWidth = ctx.measureText('abcdefghijklmnopqrstuvwxyz').width;

        // Measure text with fallback monospace (known different)
        ctx.font = '16px monospace';
        const monoWidth = ctx.measureText('abcdefghijklmnopqrstuvwxyz').width;

        // If widths are different, the game font is loaded
        return gameWidth !== monoWidth;
    } catch {
        return false;
    }
}

/**
 * MGFonts Module
 * Exposes font utilities via Gemini.Modules.Fonts API
 */
export const MGFonts = {
    /** Check if game font (Greycliff CF) is available */
    isGameFontLoaded: (): boolean => detectGameFont(),

    /** Get the font family string for use in inline styles */
    getFontFamily: (): string =>
        "'Greycliff CF', 'DM Sans', 'Inter', system-ui, sans-serif",

    /** Get comprehensive font status for debugging */
    getStatus: () => ({
        greycliffLoaded: detectGameFont(),
        family: 'Greycliff CF',
        fallback: 'DM Sans, Inter, system-ui',
        weights: {
            medium: 500,
            demibold: 600,
            bold: 700,
            extrabold: 800,
            heavy: 900,
        },
        sizes: {
            '2xs': '12px',
            xs: '14px',
            sm: '16px',
            sm2: '18px',
            md: '20px',
            lg: '24px',
        },
    }),
};
