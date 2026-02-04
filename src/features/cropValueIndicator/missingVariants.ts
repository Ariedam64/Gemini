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
import { getVariantLetterStyle } from '../missingVariantsIndicator/letterStyles';

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

/**
 * Create a single colored variant letter element
 */
function createVariantLetter(variantId: string): HTMLElement {
  const style = getVariantLetterStyle(variantId);
  const span = document.createElement('span');
  span.textContent = style.text;
  span.title = variantId;
  span.style.cssText = style.css;
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


