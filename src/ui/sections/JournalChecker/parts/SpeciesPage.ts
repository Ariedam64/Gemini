/**
 * Journal Species Page
 * Displays a grid of variant stamps for a specific species
 */

import { element } from "../../../styles/helpers";
import { MGSprite } from "../../../../modules";
import type { SpeciesProgress } from "../../../../features/journalChecker/types";
import type { MutationName } from "../../../../modules/sprite";

export interface SpeciesPageOptions {
    species: SpeciesProgress;
    category: 'plants' | 'pets';
    onBack: () => void;
}

export function SpeciesPage({ species, category, onBack }: SpeciesPageOptions): HTMLElement {
    const container = element("div", { className: "journal-content" });

    // Back Navigation (Absolute in styles)
    const back = element("div", {
        className: "journal-back",
        onclick: (e) => {
            e.stopPropagation();
            onBack();
        }
    }, "← Return");
    container.appendChild(back);

    // Header (1 line = 28px)
    const header = element("div", { className: "journal-header" }, species.species);
    container.appendChild(header);

    // Summary Stats (1 line = 28px)
    const summary = element("div", {
        className: "journal-category-stats",
        style: "text-align: center; height: 28px; line-height: 28px; margin-bottom: 28px;"
    }, `[ ${species.variantsLogged.length} / ${species.variantsTotal} STAMPS ]`);
    container.appendChild(summary);

    // Variant Grid
    const grid = element("div", { className: "journal-grid" });

    // Combine logged and missing for a full list
    const allVariants = [...species.variantsLogged, ...species.variantsMissing].sort((a, b) => {
        if (a === 'Normal') return -1;
        if (b === 'Normal') return 1;
        if (a === 'Max Weight') return 1;
        if (b === 'Max Weight') return -1;
        return a.localeCompare(b);
    });

    for (const variant of allVariants) {
        const isCollected = species.variantsLogged.includes(variant);
        grid.appendChild(renderVariantStamp(species.species, variant, category, isCollected));
    }

    container.appendChild(grid);

    return container;
}

function renderVariantStamp(
    speciesName: string,
    variant: string,
    category: 'plants' | 'pets',
    isCollected: boolean
): HTMLElement {
    const wrapper = element("div", { className: "journal-stamp-wrapper" });

    const stamp = element("div", {
        className: "journal-stamp",
        style: isCollected ? "" : "opacity: 0.1; filter: grayscale(100%);"
    });

    try {
        const mutations = (variant !== 'Normal' && variant !== 'Max Weight') ? [variant as MutationName] : [];

        // Normalize category: 'plants' -> 'plant', 'pets' -> 'pet' (MGSprite expects singular)
        const normalizedCategory = category === 'plants' ? 'plant' : 'pet';

        // Resolve category and asset name (matching Auto Favorite pattern)
        let loadCategory = normalizedCategory;
        let loadAsset = speciesName;

        if (category === 'plants') {
            // Handle asset name mappings for special cases
            if (speciesName === 'DawnCelestial') loadAsset = 'DawnCelestialCrop';
            if (speciesName === 'MoonCelestial') loadAsset = 'MoonCelestialCrop';
            if (speciesName === 'OrangeTulip') loadAsset = 'Tulip';
        }

        const tryCanvas = (c: string, a: string) => {
            try {
                // Max Weight gets slightly larger scale (20% bigger)
                const scaleValue = variant === 'Max Weight' ? 0.72 : 0.6;
                if (MGSprite.has(c, a)) return MGSprite.toCanvas(c, a, { mutations, scale: scaleValue, boundsMode: 'padded' });
            } catch { }
            return null;
        };

        // Try original category first, then tallplant for plants, then lowercase variants
        const canvas = tryCanvas(loadCategory, loadAsset) ||
            (category === 'plants' ? tryCanvas('tallplant', loadAsset) : null) ||
            tryCanvas(loadCategory, loadAsset.toLowerCase()) ||
            (category === 'plants' ? tryCanvas('tallplant', loadAsset.toLowerCase()) : null);

        if (canvas) {
            canvas.style.width = "44px";
            canvas.style.height = "44px";
            canvas.style.objectFit = "contain";
            canvas.style.display = "block";
            stamp.appendChild(canvas);
        }
    } catch {
        // Sprites only
    }

    const label = element("div", { className: "journal-stamp-label" }, variant);

    wrapper.append(stamp, label);
    return wrapper;
}
