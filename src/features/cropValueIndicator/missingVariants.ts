/**
 * Missing Variants Display - Crop Tooltip Enhancement
 * 
 * Injects colored mutation letters into crop tooltips showing
 * which variants are not yet logged in the journal for that crop species.
 * 
 * Per ui/inject.md: No Shadow DOM, tracked cleanup, idempotent
 */

import { MGData } from '../../modules';
import { MGJournal } from '../../features/journal';

// ─────────────────────────────────────────────────────────────────────────────
// Variant Letter Definitions (from game source getAbilityColor)
// ─────────────────────────────────────────────────────────────────────────────

interface VariantStyle {
    letter: string;
    color: string;
    bold: boolean;
    isGradient?: boolean;
}

/**
 * Variant styling using ability colors from game source colors.ts
 * Bold = rare/charged mutations, Non-bold = weather/basic mutations
 */
const VARIANT_STYLES: Record<string, VariantStyle> = {
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
        color: 'linear-gradient(45deg, rgba(200,0,0,0.9), rgba(200,120,0,0.9), rgba(160,170,30,0.9), rgba(60,170,60,0.9), rgba(50,170,170,0.9), rgba(40,150,180,0.9), rgba(20,90,180,0.9), rgba(70,30,150,0.9))',
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

// ─────────────────────────────────────────────────────────────────────────────
// Journal Data Access
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get all crop variant types from game data
 */
function getAllCropVariants(): string[] {
    return MGJournal.getCropVariants();
}

/**
 * Get unlogged variants for a specific crop species
 */
export function getUnloggedCropVariants(speciesId: string): string[] {
    const journal = MGJournal.getMyJournal();
    if (!journal) {
        console.warn('[MissingVariants] Journal data not available yet, treating all variants as missing');
        // Return all variants as missing if journal not loaded yet
        return getAllCropVariants();
    }

    const produceEntry = journal.produce?.[speciesId];
    const loggedVariants = produceEntry?.variantsLogged?.map(v => v.variant) ?? [];

    const allVariants = getAllCropVariants();
    const missing = allVariants.filter(v => !loggedVariants.includes(v));

    if (missing.length > 0) {
        console.log(`[MissingVariants] ${speciesId} missing: [${missing.join(', ')}]`);
    }

    return missing;
}

// ─────────────────────────────────────────────────────────────────────────────
// DOM Rendering
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Create a single colored variant letter element
 */
function createVariantLetter(variantId: string): HTMLElement {
    const style = VARIANT_STYLES[variantId];
    if (!style) {
        // Fallback for unknown variants
        const span = document.createElement('span');
        span.textContent = variantId.charAt(0).toUpperCase();
        span.style.cssText = 'color: #888; font-size: 11px;';
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
      font-size: 11px;
      display: inline-block;
    `;
    } else {
        span.style.cssText = `
      color: ${style.color};
      font-weight: ${style.bold ? 'bold' : 'normal'};
      font-size: 11px;
    `;
    }

    return span;
}

/**
 * Create the missing variants row element
 * Returns null if no missing variants or species not found
 */
export function createMissingVariantsRow(speciesId: string): HTMLElement | null {
    const missingVariants = getUnloggedCropVariants(speciesId);

    if (missingVariants.length === 0) {
        return null;
    }

    const row = document.createElement('div');
    row.className = 'gemini-qol-missingVariants';
    row.style.cssText = `
    display: flex;
    gap: 4px;
    margin-top: 4px;
    flex-wrap: wrap;
    align-items: center;
  `;

    // Create colored letter for each missing variant
    for (const variantId of missingVariants) {
        const letter = createVariantLetter(variantId);
        row.appendChild(letter);
    }

    return row;
}

/**
 * Check if a species ID is valid crop species
 */
export function isValidCropSpecies(speciesId: string): boolean {
    const plants = MGData.get('plants') ?? {};
    return speciesId in plants;
}
