import { MGData } from '../../../../modules/data';

interface SpeciesResolution {
    id: string;
    type: 'crop' | 'pet';
}

/**
 * Resolve a display name (as shown in game UI) to an internal species ID.
 *
 * Plants: keyed by internal ID (e.g. "OrangeTulip"), display name at .crop.name ("Tulip")
 * Pets: keyed by internal ID (e.g. "Chicken"), display name at .name ("Chicken")
 */
export function resolveSpeciesId(displayName: string): SpeciesResolution | null {
    // Check plants first (more complex nesting)
    const plants = MGData.get('plants') ?? {};
    for (const [id, data] of Object.entries(plants)) {
        const plant = data as Record<string, any>;
        // Check crop.name (primary display name in journal)
        if (plant?.crop?.name === displayName) return { id, type: 'crop' };
        // Check plant.name
        if (plant?.plant?.name === displayName) return { id, type: 'crop' };
        // Check exact ID match
        if (id === displayName) return { id, type: 'crop' };
    }

    // Check pets (flat .name at top level)
    const pets = MGData.get('pets') ?? {};
    for (const [id, data] of Object.entries(pets)) {
        const pet = data as Record<string, any>;
        if (pet?.name === displayName) return { id, type: 'pet' };
        if (pet?.displayName === displayName) return { id, type: 'pet' };
        if (id === displayName) return { id, type: 'pet' };
    }

    // Case-insensitive fallback
    const lower = displayName.toLowerCase();
    for (const [id, data] of Object.entries(plants)) {
        const plant = data as Record<string, any>;
        if (plant?.crop?.name?.toLowerCase() === lower) return { id, type: 'crop' };
        if (plant?.plant?.name?.toLowerCase() === lower) return { id, type: 'crop' };
        if (id.toLowerCase() === lower) return { id, type: 'crop' };
    }
    for (const [id, data] of Object.entries(pets)) {
        const pet = data as Record<string, any>;
        if (pet?.name?.toLowerCase() === lower) return { id, type: 'pet' };
        if (pet?.displayName?.toLowerCase() === lower) return { id, type: 'pet' };
        if (id.toLowerCase() === lower) return { id, type: 'pet' };
    }

    return null;
}

/**
 * Get display name from internal ID.
 * Plants: returns crop.name. Pets: returns .name.
 */
export function getDisplayName(speciesId: string, type: 'crop' | 'pet'): string {
    if (type === 'crop') {
        const plants = MGData.get('plants') ?? {};
        const plant = plants[speciesId] as Record<string, any> | undefined;
        return plant?.crop?.name || plant?.plant?.name || speciesId;
    } else {
        const pets = MGData.get('pets') ?? {};
        const pet = pets[speciesId] as Record<string, any> | undefined;
        return pet?.name || pet?.displayName || speciesId;
    }
}
