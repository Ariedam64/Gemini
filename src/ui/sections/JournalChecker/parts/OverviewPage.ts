/**
 * Journal Overview Page
 * Consolidated view showing both Produce and Pets with high-density detail
 */

import { element } from "../../../styles/helpers";
import { MGSprite, MGData } from "../../../../modules";
import type { JournalProgress, CategoryProgress, SpeciesProgress } from "../../../../features/journalChecker/types";
import type { MutationName } from "../../../../modules/sprite/types";
import { SeeMore } from "../../../components/SeeMore";

// Game-authentic progress bar color thresholds
const getProgressColor = (percentage: number): string => {
    if (percentage < 15) return '#F98B4B';  // Light Orange
    if (percentage < 25) return '#FC6D30';  // Orange.Magic
    if (percentage < 50) return '#F3D32B';  // Yellow.Magic
    if (percentage < 75) return '#E9B52F';  // Yellow.Dark
    if (percentage < 100) return '#5EAC46'; // Green.Magic
    return '#0B893F';                       // Green.Dark (100%)
};

// Percentage text color using theme status variables
const getPercentageColor = (percentage: number): string => {
    if (percentage >= 100) return 'var(--complete)';
    if (percentage >= 75) return 'var(--high)';
    if (percentage >= 50) return 'var(--medium)';
    return 'var(--low)';
};

// Rarity ordering (matching Auto Favorite)
const RARITY_ORDER: Record<string, number> = {
    Common: 1,
    Uncommon: 2,
    Rare: 3,
    Legendary: 4,
    Mythical: 5,
    Divine: 6,
    Celestial: 7,
};

function getRarityOrder(rarity: string | null): number {
    if (!rarity) return 0;
    return RARITY_ORDER[rarity] ?? 0;
}

// Type definitions for game data (replacing any usage)
interface GamePlantData {
    seed?: { rarity?: string };
}

interface GamePetData {
    rarity?: string;
}

function getSpeciesRarity(speciesName: string, type: 'plants' | 'pets'): string | null {
    try {
        if (type === 'pets') {
            const pets = (MGData.get('pets') || {}) as Record<string, GamePetData>;
            return pets[speciesName]?.rarity || null;
        }
        if (type === 'plants') {
            const plants = (MGData.get('plants') || {}) as Record<string, GamePlantData>;
            return plants[speciesName]?.seed?.rarity || null;
        }
    } catch { }
    return null;
}

export interface OverviewPageOptions {
    progress: JournalProgress;
    activeTab: 'all' | 'plants' | 'pets';
    expandedCategories: Set<'plants' | 'pets'>;
    onSpeciesClick: (species: SpeciesProgress, category: 'plants' | 'pets') => void;
    onToggleExpand: (category: 'plants' | 'pets') => void;
}

export function OverviewPage({ progress, activeTab, expandedCategories, onSpeciesClick, onToggleExpand }: OverviewPageOptions): HTMLElement {
    const container = element("div", { className: "journal-content" });

    // Main Header
    const header = element("div", { className: "journal-header" }, "Garden Journal");
    container.appendChild(header);

    // Overall Progress Indicator for active category (shows variant count WITH %)
    if (activeTab !== 'all') {
        const activeCategory = activeTab === 'plants' ? progress.plants : progress.pets;
        const progressIndicator = element("div", {
            className: "journal-progress-indicator"
        });
        const percentage = Math.floor((activeCategory.variantsLogged / activeCategory.variantsTotal) * 100);
        const percentageSpan = element("span", { className: "percentage" }, `Collected ${percentage}%`);
        const countSpan = element("span", { className: "count" }, ` (${activeCategory.variantsLogged}/${activeCategory.variantsTotal})`);
        progressIndicator.appendChild(percentageSpan);
        progressIndicator.appendChild(countSpan);
        container.appendChild(progressIndicator);
    }

    // Render based on active tab
    if (activeTab === 'all') {
        // Show both categories with their overall progress
        container.appendChild(renderCategorySection(
            "Produce",
            progress.plants,
            'plants',
            expandedCategories.has('plants'),
            onSpeciesClick,
            () => onToggleExpand('plants'),
            true  // showOverallProgress
        ));
        container.appendChild(renderCategorySection(
            "Pets",
            progress.pets,
            'pets',
            expandedCategories.has('pets'),
            onSpeciesClick,
            () => onToggleExpand('pets'),
            true  // showOverallProgress
        ));
    } else if (activeTab === 'plants') {
        container.appendChild(renderCategorySection(
            "Produce",
            progress.plants,
            'plants',
            expandedCategories.has('plants'),
            onSpeciesClick,
            () => onToggleExpand('plants')
        ));
    } else {
        container.appendChild(renderCategorySection(
            "Pets",
            progress.pets,
            'pets',
            expandedCategories.has('pets'),
            onSpeciesClick,
            () => onToggleExpand('pets')
        ));
    }

    return container;
}

function renderCategorySection(
    title: string,
    category: CategoryProgress,
    type: 'plants' | 'pets',
    isExpanded: boolean,
    onSpeciesClick: (species: SpeciesProgress, category: 'plants' | 'pets') => void,
    onToggle: () => void,
    showOverallProgress: boolean = false
): HTMLElement {
    const section = element("div", { style: "display: flex; flex-direction: column;" });

    // Scrollable container for species list
    const speciesListContainer = element("div", {
        style: `
            max-height: ${isExpanded ? '480px' : 'none'};
            overflow-y: ${isExpanded ? 'auto' : 'visible'};
            overflow-x: hidden;
            margin-bottom: 8px;
        `,
        className: "journal-species-list"
    });

    // Category Header with Stats (1 line = 28px)
    const headerWrapper = element("div", {
        className: "journal-category-stats",
        style: "height: 28px; line-height: 28px; margin-bottom: 0; display: flex; align-items: center; gap: 6px;"
    });

    // Add sprite icon for category
    const iconContainer = element("div", {
        style: "width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"
    });

    try {
        if (MGSprite.isReady()) {
            // Use Carrot for plants, CommonEgg for pets
            const spriteCategory = type === 'plants' ? 'plant' : 'pet';
            const spriteAsset = type === 'plants' ? 'Carrot' : 'CommonEgg';

            if (MGSprite.has(spriteCategory, spriteAsset)) {
                const canvas = MGSprite.toCanvas(spriteCategory, spriteAsset, { scale: 0.3 });
                canvas.style.maxWidth = "20px";
                canvas.style.maxHeight = "20px";
                canvas.style.display = "block";
                iconContainer.appendChild(canvas);
            }
        }
    } catch { }

    // Category header shows species count (no percentage)
    const speciesCount = category.speciesDetails.length;
    const totalSpecies = category.total;
    const textLabel = element("span", {}, `[ ${title.toUpperCase()} ] — ${speciesCount}/${totalSpecies} SPECIES`);

    headerWrapper.append(iconContainer, textLabel);
    section.appendChild(headerWrapper);

    // Overall progress indicator for All tab (variant count with %)
    if (showOverallProgress) {
        const progressIndicator = element("div", {
            className: "journal-progress-indicator",
            style: "text-align: right; margin-bottom: 4px;"
        });
        const percentage = Math.floor((category.variantsLogged / category.variantsTotal) * 100);
        const percentageSpan = element("span", { className: "percentage" }, `Collected ${percentage}%`);
        const countSpan = element("span", { className: "count" }, ` (${category.variantsLogged}/${category.variantsTotal})`);
        progressIndicator.appendChild(percentageSpan);
        progressIndicator.appendChild(countSpan);
        section.appendChild(progressIndicator);
    }

    // Species List - Sorted by rarity then alphabetically (matching Auto Favorite)
    const sortedSpecies = [...category.speciesDetails]
        .sort((a, b) => {
            const rarA = getSpeciesRarity(a.species, type);
            const rarB = getSpeciesRarity(b.species, type);
            const diff = getRarityOrder(rarA) - getRarityOrder(rarB);
            if (diff !== 0) return diff;
            return a.species.localeCompare(b.species, undefined, { numeric: true, sensitivity: "base" });
        });

    const displayList = isExpanded ? sortedSpecies : sortedSpecies.slice(0, 5);

    for (const species of displayList) {
        speciesListContainer.appendChild(renderSpeciesRow(species, type, onSpeciesClick));
    }

    section.appendChild(speciesListContainer);

    // Toggle expansion button using JournalSeeMore component
    if (category.speciesDetails.length > 5) {
        const seeMore = SeeMore({
            count: category.speciesDetails.length - 5,
            expanded: isExpanded,
            onClick: () => {
                onToggle();
            }
        });
        section.appendChild(seeMore);
    } else {
        // Spacer to keep grid alignment
        section.appendChild(element("div", { style: "height: 28px;" }));
    }

    return section;
}

function renderSpeciesRow(
    species: SpeciesProgress,
    type: 'plants' | 'pets',
    onSpeciesClick: (species: SpeciesProgress, category: 'plants' | 'pets') => void
): HTMLElement {
    const row = element("div", {
        className: "journal-row",
        style: "height: 56px;",
        onclick: (e) => {
            e.stopPropagation();
            onSpeciesClick(species, type);
        }
    });

    // Sprite on the left
    const iconContainer = element("div", {
        style: "width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"
    });

    try {
        const normalizedCategory = type === 'plants' ? 'plant' : 'pet';
        let loadCategory = normalizedCategory;
        let loadAsset = species.species;

        if (type === 'plants') {
            if (species.species === 'DawnCelestial') loadAsset = 'DawnCelestialCrop';
            if (species.species === 'MoonCelestial') loadAsset = 'MoonCelestialCrop';
            if (species.species === 'OrangeTulip') loadAsset = 'Tulip';
        }

        const mutations: MutationName[] = species.isComplete ? ['Rainbow'] : [];
        const tryCanvasWithMutations = (c: string, a: string) => {
            try {
                if (MGSprite.has(c, a)) return MGSprite.toCanvas(c, a, { scale: 0.4, mutations });
            } catch { }
            return null;
        };

        const canvas = tryCanvasWithMutations(loadCategory, loadAsset) ||
            (type === 'plants' ? tryCanvasWithMutations('tallplant', loadAsset) : null) ||
            tryCanvasWithMutations(loadCategory, loadAsset.toLowerCase()) ||
            (type === 'plants' ? tryCanvasWithMutations('tallplant', loadAsset.toLowerCase()) : null);

        if (canvas) {
            canvas.style.maxWidth = "32px";
            canvas.style.maxHeight = "32px";
            canvas.style.display = "block";
            iconContainer.appendChild(canvas);
        } else {
            console.warn(`[JournalChecker] No sprite found for ${species.species} in ${type}`);
        }
    } catch (err) {
        console.error(`[JournalChecker] Sprite error for ${species.species}`, err);
    }

    // Progress bar container with name overlay
    const progressContainer = element("div", {
        style: "flex: 1; position: relative; height: 22px;"
    });

    const barContainer = element("div", {
        className: "journal-bar-container",
        style: "width: 100%; height: 100%; border-radius: 4px; overflow: hidden;"
    });

    // Use rainbow for 100%, otherwise use game-authentic colors
    let barFillStyle: string;
    if (species.isComplete) {
        barFillStyle = `width: 100%; height: 100%; background: linear-gradient(90deg, rgb(255,0,0) 0%, rgb(255,154,0) 14%, rgb(255,255,0) 28%, rgb(0,255,0) 42%, rgb(0,200,255) 56%, rgb(0,0,255) 70%, rgb(143,0,255) 84%, rgb(255,0,255) 100%);`;
    } else {
        const progressColor = getProgressColor(species.variantsPercentage);
        barFillStyle = `width: ${Math.max(2, species.variantsPercentage)}%; height: 100%; background: ${progressColor};`;
    }

    const barFill = element("div", {
        className: species.isComplete ? "journal-bar-fill rainbow" : "journal-bar-fill",
        style: barFillStyle
    });

    barContainer.appendChild(barFill);

    // Name overlay
    const nameLabel = element("div", {
        style: "position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-weight: 600; font-size: 14px; color: var(--journal-ink); z-index: 1; pointer-events: none;"
    }, species.species);

    progressContainer.append(barContainer, nameLabel);

    // Percentage on the right - colored by completion status
    const percentColor = getPercentageColor(species.variantsPercentage);
    const percent = element("span", {
        style: `flex-shrink: 0; font-weight: 800; font-size: 13px; min-width: 50px; text-align: right; color: ${percentColor};`
    }, `${Math.round(species.variantsPercentage)}%`);

    row.append(iconContainer, progressContainer, percent);
    return row;
}
