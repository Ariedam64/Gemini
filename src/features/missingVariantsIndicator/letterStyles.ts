/**
 * Missing Variants Indicator - Letter Styles
 *
 * Defines the colored letter styling for each variant type.
 * Colors and rendering match the game's MutationText component exactly.
 *
 * Known mutations use hardcoded styles from game source. Unknown mutations
 * fall back to dynamic lookup via the weather mutation registry.
 *
 * Source: GameSourceFiles/.../constants/colors.ts  (mutationColors)
 *         GameSourceFiles/.../components/MutationText.tsx
 *         GameSourceFiles/.../mutation/mutationsDex.ts
 */

import {
    getMutationColor,
    getMutationDisplayLetter,
    isMutationGradient,
} from '../../ui/inject/qol/journalGuide/weatherMutationRegistry';

export interface VariantStyle {
    letter: string;
    color: string;
    bold: boolean;
    isGradient?: boolean;
}

/**
 * Variant styling using exact mutationColors from game source.
 * All mutations are bold (matching MutationText fontWeight="bold").
 * Letters use first character of the game's display name.
 *
 * Display name mapping (mutationsDex):
 *   Ambershine  -> "Amberlit"
 *   Dawncharged -> "Dawnbound"
 *   Ambercharged -> "Amberbound"
 */
export const VARIANT_STYLES: Record<string, VariantStyle> = {
    'Normal': {
        letter: 'N',
        color: '#A88A6B', // Brown.Light
        bold: false,
    },
    'Wet': {
        letter: 'W',
        color: 'rgba(95, 255, 255, 1)', // mutationColors.Wet
        bold: true,
    },
    'Chilled': {
        letter: 'C',
        color: 'rgba(180, 230, 255, 1)', // mutationColors.Chilled
        bold: true,
    },
    'Frozen': {
        letter: 'F',
        color: 'rgb(185, 200, 255)', // mutationColors.Frozen
        bold: true,
    },
    'Dawnlit': {
        letter: 'D',
        color: 'rgb(245, 155, 225)', // mutationColors.Dawnlit
        bold: true,
    },
    'Ambershine': { // Display: Amberlit
        letter: 'A',
        color: 'rgb(255, 180, 120)', // mutationColors.Ambershine
        bold: true,
    },
    'Thunderstruck': {
        letter: 'T',
        color: 'rgb(255, 230, 50)', // mutationColors.Thunderstruck (yellow/electric)
        bold: true,
    },
    'Gold': {
        letter: 'G',
        color: 'rgb(235, 200, 0)', // mutationColors.Gold (solid, not gradient)
        bold: true,
    },
    'Rainbow': {
        letter: 'R',
        // Resolved from game theme tokens: Red.Magic, Red.Light, Orange.Magic,
        // Yellow.Dark, Green.Magic, Blue.Light, Purple.Indigo, Purple.Light
        color: 'linear-gradient(135deg, #D02128, #D94C52, #FC6D30, #E9B52F, #5EAC46, #48ADF4, #6D1CF0, #AE53B0)',
        bold: true,
        isGradient: true,
    },
    'Dawncharged': { // Display: Dawnbound
        letter: 'D',
        color: 'rgb(200, 150, 255)', // mutationColors.Dawncharged
        bold: true,
    },
    'Ambercharged': { // Display: Amberbound
        letter: 'A',
        color: 'rgb(250, 140, 75)', // mutationColors.Ambercharged
        bold: true,
    },
    'Max Weight': {
        letter: 'S',
        color: '#717171', // Neutral.DarkGrey
        bold: false,
    },
};

/**
 * Create a single colored variant letter element.
 * Matches MutationText.tsx rendering: bold, colored text, gradient for Rainbow.
 */
/**
 * Get variant style, checking known styles first then falling back to
 * dynamic lookup via the weather mutation registry.
 */
export function getVariantStyle(variantId: string): VariantStyle {
    if (VARIANT_STYLES[variantId]) return VARIANT_STYLES[variantId];

    // Dynamic fallback for unknown mutations
    const color = getMutationColor(variantId);
    const letter = getMutationDisplayLetter(variantId);
    const isGradient = isMutationGradient(variantId);

    return {
        letter,
        color,
        bold: true, // All mutations are bold in game
        isGradient,
    };
}

/**
 * Create a single colored variant letter element.
 * Matches MutationText.tsx rendering: bold, colored text, gradient for Rainbow.
 * No text shadows (game doesn't use them on mutation text).
 *
 * @param variantId - The variant/mutation ID
 * @param fontSize - Optional font size (default '12px'). Use '14px' for guide tab, '10px' for indicators.
 */
export function createVariantLetter(variantId: string, fontSize?: string): HTMLElement {
    const style = getVariantStyle(variantId);
    const size = fontSize ?? '12px';

    const span = document.createElement('span');
    span.textContent = style.letter;
    span.title = variantId; // Tooltip showing full variant name

    if (style.isGradient) {
        // Gradient text using background-clip (matches MutationText bgClip="text")
        span.style.cssText = `
            background: ${style.color};
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: bold;
            font-size: ${size};
            display: inline-block;
        `;
    } else {
        span.style.cssText = `
            color: ${style.color};
            font-weight: ${style.bold ? 'bold' : 'normal'};
            font-size: ${size};
        `;
    }

    return span;
}


export function getVariantLetterStyle(variantId: string, fontSize?: string): { text: string; css: string } {
    const span = createVariantLetter(variantId, fontSize);
    const textContent = span.textContent ?? variantId.charAt(0).toUpperCase();
    const cssText = span.getAttribute('style') ?? '';
    return { text: textContent, css: cssText };
}
