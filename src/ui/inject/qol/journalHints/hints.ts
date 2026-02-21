/**
 * Journal Hints - Hint Data
 * 
 * Contains hint text for each variant explaining how to obtain it.
 * Also contains egg-to-species mapping for ability hints.
 */

// ?????????????????????????????????????????????????????????????????????????????
// Crop Variant Hints
// ?????????????????????????????????????????????????????????????????????????????

export const CROP_HINTS: Record<string, string> = {
    'Normal': 'Normal: Harvest a {cropName} and log it without any mutations.',
    'Wet': 'Wet is the most common mutation, gained during the Rain weather event.',
    'Chilled': 'The Chilled mutation is gained during the Snow weather event.',
    'Frozen': 'The Frozen mutation is obtained from Wet crops during the Snow weather event, or Chilled crops during Rain.',
    'Dawnlit': 'The Dawnlit mutation is gained during the Dawn weather event.',
    'Ambershine': 'The Amberlit mutation is gained during the Amber Moon weather event.',
    'Thunderstruck': 'The Thunderstruck mutation is gained during the Thunderstorm weather event.',
    'Gold': 'Gold is a rare mutation that appears in 1% of newly planted crops. Pets with the Gold Granter ability have a small chance to apply the Gold mutation to a random crop.',
    'Rainbow': 'Rainbow is a very rare mutation that appears in 0.1% of newly planted crops.  Pets with the Rainbow Granter ability have a small chance to apply the Rainbow mutation to a random crop.',
    'Dawncharged': 'Dawnbound: During the Dawn lunar event, place a {cropName} with the Dawnlit mutation adjacent to a Dawnbinder crop.',
    'Ambercharged': 'Amberbound: During the Amber Moon lunar event, place a {cropName} with the Amberlit mutation adjacent to a Moonbinder crop.',
    'Max Weight': 'Max weight applies only to size 100 crops (the largest possible). The size of a crop can be checked by hovering over its weight. Obtaining weight 100 crops can be achieved through Crop Size Boost pets.',
};

// ?????????????????????????????????????????????????????????????????????????????
// Pet Variant Hints
// ?????????????????????????????????????????????????????????????????????????????

export const PET_VARIANT_HINTS: Record<string, string> = {
    'Normal': 'Hatch a {petName} without any mutations',
    'Gold': 'All pets have a 1% base chance to hatch with the gold mutation; increase these chances with the Pet Mutation Boost abilities.',
    'Rainbow': 'All pets have a 0.1% base chance to hatch with the rainbow mutation; increase these chances with the Pet Mutation Boost abilities.',
    'Max Weight': 'Hatch a {petName} with a Max STR of 100, using Max Strength Boost ability is recommended while hatching',
}; 

// ?????????????????????????????????????????????????????????????????????????????
// Egg to Species Mapping (from game source eggsDex.ts)
// ?????????????????????????????????????????????????????????????????????????????

const EGG_TO_SPECIES: Record<string, string[]> = {
    'CommonEgg': ['Worm', 'Snail', 'Bee'],
    'UncommonEgg': ['Chicken', 'Bunny', 'Dragonfly'],
    'RareEgg': ['Pig', 'Cow', 'Turkey'],
    'WinterEgg': ['SnowFox', 'Stoat', 'WhiteCaribou'],
    'LegendaryEgg': ['Squirrel', 'Turtle', 'Goat'],
    'MythicalEgg': ['Butterfly', 'Peacock', 'Capybara'],
};

const EGG_DISPLAY_NAMES: Record<string, string> = {
    'CommonEgg': 'Common Eggs',
    'UncommonEgg': 'Uncommon Eggs',
    'RareEgg': 'Rare Eggs',
    'WinterEgg': 'Winter Eggs',
    'LegendaryEgg': 'Legendary Eggs',
    'MythicalEgg': 'Mythical Eggs',
};

/**
 * Get the egg type display name for a pet species
 */
export function getEggTypeForSpecies(speciesId: string): string {
    for (const [eggId, species] of Object.entries(EGG_TO_SPECIES)) {
        if (species.includes(speciesId)) {
            return EGG_DISPLAY_NAMES[eggId] || eggId;
        }
    }
    return 'Eggs';
}

/**
 * Get the hint text for a pet ability
 */
export function getAbilityHint(speciesId: string): string {
    const eggType = getEggTypeForSpecies(speciesId);
    return `Keep hatching ${eggType} to get a pet with this ability`;
}

/**
 * Get hint text for a crop variant, with species name substituted
 */
export function getCropHint(variantId: string, speciesName: string): string {
    const template = CROP_HINTS[variantId];
    if (!template) return `Obtain a ${variantId} ${speciesName}`;
    return template.replace(/\{cropName\}/g, speciesName);
}

/**
 * Get hint text for a pet variant, with species name substituted
 */
export function getPetVariantHint(variantId: string, speciesName: string): string {
    const template = PET_VARIANT_HINTS[variantId];
    if (!template) return `Obtain a ${variantId} ${speciesName}`;
    return template.replace(/\{petName\}/g, speciesName);
}
