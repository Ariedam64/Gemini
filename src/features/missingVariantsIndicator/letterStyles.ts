/**
 * Missing Variants Indicator - Letter Styles
 * 
 * Defines the colored letter styling for each crop variant type.
 * Colors match game ability colors from colors.ts
 */

export interface VariantStyle {
    letter: string;
    color: string;
    bold: boolean;
    isGradient?: boolean;
}

/**
 * Variant styling using ability colors from game source colors.ts
 * Bold = rare/charged mutations, Non-bold = weather/basic mutations
 */
export const VARIANT_STYLES: Record<string, VariantStyle> = {
    'Normal': {
        letter: 'N',
        color: '#A88A6B', // Brown.Light
        bold: false,
    },
    'Wet': {
        letter: 'W',
        color: 'rgba(76, 204, 204, 1)', // RainDance ability color
        bold: false,
    },
    'Chilled': {
        letter: 'C',
        color: 'rgba(144, 184, 204, 1)', // SnowGranter ability color
        bold: false,
    },
    'Frozen': {
        letter: 'F',
        color: 'rgba(148, 160, 204, 1)', // FrostGranter ability color
        bold: false,
    },
    'Dawnlit': {
        letter: 'D',
        color: 'rgb(245, 155, 225)', // DawnKisser/pink-purple
        bold: false,
    },
    'Ambershine': { // Display: Amberlit
        letter: 'A',
        color: 'rgb(255, 180, 120)', // MoonKisser/orange
        bold: false,
    },
    'Gold': {
        letter: 'G',
        color: 'linear-gradient(135deg, rgba(225, 200, 55, 0.9) 0%, rgba(225, 180, 10, 0.9) 40%, rgba(215, 185, 45, 0.9) 70%, rgba(210, 185, 45, 0.9) 100%)',
        bold: true,
        isGradient: true,
    },
    'Rainbow': {
        letter: 'R',
        color: 'linear-gradient(110deg, #ff003c, #ff9a00, #f0ff00, #30ff00, #00fbff, #0018ff, #e100ff)',
        bold: true,
        isGradient: true,
    },
    'Dawncharged': { // Display: Dawnbound
        letter: 'D',
        color: 'rgb(200, 150, 255)', // Charged purple
        bold: true,
    },
    'Ambercharged': { // Display: Amberbound
        letter: 'A',
        color: 'rgb(250, 140, 75)', // Charged orange
        bold: true,
    },
    'Max Weight': {
        letter: 'S',
        color: '#717171', // Neutral.DarkGrey
        bold: false,
    },
};

/**
 * Create a single colored variant letter element
 */
export function createVariantLetter(variantId: string): HTMLElement {
    const style = VARIANT_STYLES[variantId];
    if (!style) {
        // Fallback for unknown variants
        const span = document.createElement('span');
        span.textContent = variantId.charAt(0).toUpperCase();
        span.style.cssText = 'color: #888; font-size: 18px;';
        return span;
    }

    const span = document.createElement('span');
    span.textContent = style.letter;
    span.title = variantId; // Tooltip showing full variant name

    if (style.isGradient) {
        // Gradient text using background-clip
        span.style.cssText = `
            background: ${style.color};
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: bold;
            font-size: 18px;
            display: inline-block;
            filter: drop-shadow(0px 0px 1px rgba(0,0,0,1)) drop-shadow(0px 1px 1px rgba(0,0,0,1));
        `;
    } else {
        span.style.cssText = `
            color: ${style.color};
            font-weight: ${style.bold ? 'bold' : 'normal'};
            font-size: 18px;
        `;
    }

    return span;
}
