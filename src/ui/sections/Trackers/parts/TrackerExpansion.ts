/**
 * Team Card Expansion Handler
 * 
 * Manages expansion/collapse of pet team cards with feature panel integration.
 * Implements the "Blank Shell" pattern using BasePetCard component.
 * 
 * Per .claude/rules/ui/sections.md:
 * - Parts handle focused sub-features
 * - One part = one file
 */

import { element } from "../../../styles/helpers";
import { MGPetTeam } from "../../../../features/petTeam";
import { Globals } from "../../../../globals";
import { MGEnvironment } from "../../../../modules";
import { MGSprite } from "../../../../modules/sprite";
import type { PetTeam } from "../../../../features/petTeam";
import { BasePetCard } from "../../../components/BasePetCard/BasePetCard";
import { FEATURE_PANELS } from "./featurePanels";
import { featureCardCss } from "./featureCard.css";
import { detectTeamPurpose } from "../../../../features/petTeam/logic/purpose";
import { GeminiIconButton } from "../../../components/GeminiIconButton";
import {
    hasEggBoosts,
    hasPlantBoosts,
    calculateEggBoosts,
    calculatePlantBoosts,
    calculateBoostStats
} from "../../../../features/growthTimers/logic/boostCalculator";
import { calculateItemEffectiveGrowth } from "../../../../features/growthTimers/logic/effectiveTime";
import type { EggWithTile, PlantWithTile, UnifiedPet } from "../../../../globals/core/types";
import type { FeaturePanelDefinition } from "./featurePanels";
import { analyzeTeamGrouping } from "../../../../features/growthTimers/logic/petAbilityUtils";
import { ABILITY_CATEGORIES } from "../../../../features/petTeam/constants";


// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Maximum total rows across all panels to trigger combined panel mode
 * When panels have ≤ this many rows combined, merge into single view
 */
const COMBINED_PANEL_MAX_ROWS = 3;

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type FeatureCardState = {
    slotIndex: number;
    currentFeatureId: string;
    shell: BasePetCard | null;
    container: HTMLElement;
    featureData: FeaturePanelDefinition;
};

export type ExpandedTeamState = {
    cards: FeatureCardState[];
    expandedAt: number;
    container: HTMLElement;
    growthViewType?: 'egg' | 'plant';
    pinnedItemId?: string;
    currentBarMode?: 'xp' | 'growth';
    /** Set for virtual (always-expanded) teams — bypasses MGPetTeam storage lookups */
    virtualTeam?: PetTeam;
    /** Callback invoked instead of collapse+expand when a virtual team needs full rebuild */
    reexpandCallback?: () => void;
};

export interface ExpansionHandlerOptions {
    getListContainer: () => HTMLElement | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Detect the best feature panel for a single pet based on its abilities
 * Used for individual pet rows to show relevant stats instead of team-wide defaults
 */
function detectBestFeatureForPet(
    pet: any,
    availableFeatures: FeaturePanelDefinition[]
): string {
    const abilities = pet.abilities || [];

    // Helper to check if abilities array contains any from a category
    const hasAbilityFrom = (category: readonly string[]) =>
        abilities.some((a: string) => category.includes(a));

    // Priority 1: Hatching abilities (most specific)
    const hasHatching =
        hasAbilityFrom(ABILITY_CATEGORIES.DOUBLE_HATCH) ||
        hasAbilityFrom(ABILITY_CATEGORIES.PET_REFUND) ||
        hasAbilityFrom(ABILITY_CATEGORIES.PET_MUTATION) ||
        hasAbilityFrom(ABILITY_CATEGORIES.MAX_STR_BOOST);
    if (hasHatching && availableFeatures.some(f => f.id === 'hatch')) {
        return 'hatch';
    }

    // Priority 2: Economy/Value abilities (coin/crop farming)
    const hasEconomy =
        hasAbilityFrom(ABILITY_CATEGORIES.COIN_FINDER) ||
        hasAbilityFrom(ABILITY_CATEGORIES.SELL_BOOST) ||
        hasAbilityFrom(ABILITY_CATEGORIES.CROP_REFUND_HARVEST) ||
        hasAbilityFrom(ABILITY_CATEGORIES.CROP_SIZE) ||
        hasAbilityFrom(ABILITY_CATEGORIES.CROP_MUTATION) ||
        hasAbilityFrom(ABILITY_CATEGORIES.RARE_GRANTERS) ||
        hasAbilityFrom(ABILITY_CATEGORIES.COMMON_GRANTERS);
    if (hasEconomy && availableFeatures.some(f => f.id === 'coin')) {
        return 'coin';
    }

    // Priority 3: Growth abilities (egg/plant speed)
    const hasGrowth =
        hasAbilityFrom(ABILITY_CATEGORIES.EGG_GROWTH) ||
        hasAbilityFrom(ABILITY_CATEGORIES.PLANT_GROWTH);
    if (hasGrowth && availableFeatures.some(f => f.id === 'growth')) {
        return 'growth';
    }

    // Priority 4: XP (default if pet is leveling or has XP boost)
    const isLeveling = pet.currentStrength < pet.maxStrength;
    const hasXpBoost = hasAbilityFrom(ABILITY_CATEGORIES.XP_BOOST);
    if ((isLeveling || hasXpBoost) && availableFeatures.some(f => f.id === 'xp')) {
        return 'xp';
    }

    // Fallback: First available feature
    return availableFeatures[0]?.id || 'xp';
}

// ─────────────────────────────────────────────────────────────────────────────
// Expansion Handler
// ─────────────────────────────────────────────────────────────────────────────

export class TrackerExpansionHandler {
    private expandedTeams: Map<string, ExpandedTeamState> = new Map();
    private featureUpdateInterval: ReturnType<typeof setInterval> | null = null;
    private options: ExpansionHandlerOptions;
    private tileFilter?: Set<string>;

    constructor(options: ExpansionHandlerOptions) {
        this.options = options;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Tile Filtering
    // ─────────────────────────────────────────────────────────────────────────

    setTileFilter(filter?: Set<string>): void {
        this.tileFilter = filter;
        // Re-render all expanded panels with new filter
        this.refreshAllPanels();
    }

    private refreshAllPanels(): void {
        // Update all currently expanded teams with the new filter
        for (const [teamId, state] of this.expandedTeams) {
            this.updateSpecificTeam(teamId, state);
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Public API
    // ─────────────────────────────────────────────────────────────────────────

    isExpanded(teamId: string): boolean {
        return this.expandedTeams.has(teamId);
    }

    toggle(teamId: string): void {
        if (this.expandedTeams.has(teamId)) {
            this.collapse(teamId);
        } else {
            this.expand(teamId);
        }
    }

    expand(teamId: string, forceIndividual: boolean = false, preferredFeature?: 'xp' | 'growth'): void {
        const listContainer = this.options.getListContainer();
        const team = MGPetTeam.getTeam(teamId);
        if (!team || !listContainer) return;

        const pets = MGPetTeam.getPetsForTeam(team);
        const myPets = Globals.myPets.get();

        // Detect team purpose for strict filtering (Phase 3)
        const purpose = detectTeamPurpose(team);

        const availableFeatures = FEATURE_PANELS.filter(f => {
            if (!f.isAvailable()) return false;
            // Pass purpose to shouldDisplay for strict filtering
            if (f.shouldDisplay && !f.shouldDisplay(team, pets, purpose)) return false;
            return true;
        });

        if (availableFeatures.length === 0) {
            console.warn('[TeamCardExpansion] No available features to display');
            return;
        }

        // Detect team configuration before building sub-components
        const isGrowthTeam = purpose.primary === 'time-reduction' || hasEggBoosts(pets) || hasPlantBoosts(pets);

        // Intelligent growth view selection
        let growthViewType: 'egg' | 'plant' | undefined = undefined;
        if (isGrowthTeam) {
            const hasEgg = hasEggBoosts(pets);
            const hasPlant = hasPlantBoosts(pets);
            const garden = Globals.myGarden.get();
            const hasGrowingEggs = garden.eggs.growing.length > 0;
            const hasGrowingPlants = garden.crops.growing.length > 0;

            if (hasEgg && hasPlant) {
                // Both abilities: prioritize view with growing items
                if (hasGrowingPlants && !hasGrowingEggs) {
                    growthViewType = 'plant';
                } else if (hasGrowingEggs && !hasGrowingPlants) {
                    growthViewType = 'egg';
                } else {
                    // Both or neither growing: default to plant
                    growthViewType = 'plant';
                }
            } else if (hasPlant) {
                growthViewType = 'plant';
            } else if (hasEgg) {
                growthViewType = 'egg';
            }
        }

        const expandedContainer = element('div', {
            className: 'team-expanded-container',
        });


        const cardStates: FeatureCardState[] = [];

        // Check if we should group pets (only for growth teams, not if forceIndividual)
        // Pass growthViewType for view-dependent grouping (less strict rules)
        let groupingAnalysis = forceIndividual
            ? { shouldGroup: false, matchingPets: [], remainingPets: pets }
            : this.analyzeTeamForGrouping(team, pets, growthViewType);

        // Determine which feature will be selected for grouped view
        // Grouping is allowed for Growth, Hatching, and Coin panels
        // XP panels only group if all pets are max strength
        const hasGroupableFeature = availableFeatures.some(f =>
            f.id === 'growth' || f.id === 'hatch' || f.id === 'coin'
        );

        // If no groupable feature (e.g. only XP), only allow grouping if ALL pets are max-STR
        if (groupingAnalysis.shouldGroup && !hasGroupableFeature) {
            const allMaxStrength = groupingAnalysis.matchingPets.every(
                (pet: any) => pet.currentStrength >= pet.maxStrength
            );
            if (!allMaxStrength) {
                // Force individual cards for XP teams with non-max-STR pets
                groupingAnalysis = { shouldGroup: false, matchingPets: [], remainingPets: pets };
            }
        }

        if (groupingAnalysis.shouldGroup && groupingAnalysis.matchingPets.length >= 2) {
            // Filter features to only those with content for these specific pets
            const featuresWithContent = availableFeatures.filter(f =>
                !f.hasContent || f.hasContent(groupingAnalysis.matchingPets, team)
            );

            // Select feature from those that have content, prioritizing Growth/Hatching/Coin
            const selectedFeature = featuresWithContent.find(f =>
                f.id === 'growth' || f.id === 'hatch' || f.id === 'coin'
            ) || featuresWithContent[0] || availableFeatures[0];

            const groupedRow = this.createGroupedPetRow(
                team,
                groupingAnalysis.matchingPets,
                availableFeatures,
                selectedFeature,
                growthViewType, // Use intelligent view type
                teamId
            );
            expandedContainer.appendChild(groupedRow.container);
            cardStates.push(groupedRow.cardState);

            // Create individual cards for remaining pets
            for (const remainingPet of groupingAnalysis.remainingPets) {
                const slotIndex = team.petIds.indexOf(remainingPet.id);
                const individualRow = this.createIndividualPetRow(
                    team,
                    remainingPet,
                    slotIndex,
                    availableFeatures,
                    growthViewType, // Use intelligent view type
                    teamId
                );
                expandedContainer.appendChild(individualRow.container);
                cardStates.push(individualRow.cardState);
            }
        } else {
            // Create 3 individual pet rows (original logic)
            for (let slotIndex = 0; slotIndex < 3; slotIndex++) {
                const petId = team.petIds[slotIndex];
                const pet = petId ? (myPets.all.find(p => p.id === petId) ?? null) : null;

                const individualRow = this.createIndividualPetRow(
                    team,
                    pet,
                    slotIndex,
                    availableFeatures,
                    growthViewType, // Use intelligent view type
                    teamId,
                    preferredFeature // Pass preferred feature
                );
                expandedContainer.appendChild(individualRow.container);
                cardStates.push(individualRow.cardState);
            }
        }

        this.expandedTeams.set(teamId, {
            cards: cardStates,
            expandedAt: Date.now(),
            container: expandedContainer,
            growthViewType
        });

        // Team progress bar (now state exists)
        // Use preferredFeature to determine initial bar mode when re-expanding
        const initialBarMode = preferredFeature === 'xp' ? 'xp' : (preferredFeature === 'growth' ? 'growth' : undefined);
        this.addProgressBar(expandedContainer, pets, teamId, initialBarMode);

        // Insert after team item
        const teams = MGPetTeam.getAllTeams();
        const teamIndex = teams.findIndex(t => t.id === teamId);
        const teamItems = Array.from(listContainer.children).filter(
            (node): node is HTMLElement => node instanceof HTMLElement && node.classList.contains('team-list-item')
        );
        if (teamIndex !== -1 && teamIndex < teamItems.length) {
            teamItems[teamIndex].insertAdjacentElement('afterend', expandedContainer);
        }

        this.startUpdates();
    }

    /**
     * Expand a virtual (always-on) team into a caller-provided container.
     *
     * Unlike `expand()`, this method:
     * - Does NOT look up the team in MGPetTeam storage
     * - Does NOT insert a container into the tracker list; the caller owns `container`
     * - Stores `virtualTeam` on the ExpandedTeamState so every internal update
     *   method can resolve pets without hitting MGPetTeam.getTeam()
     *
     * Call this again (with the same container) to rebuild after slot overrides change.
     * Previous state is cleaned up automatically without removing `container` from the DOM.
     */
    expandInto(
        container: HTMLElement,
        virtualTeam: PetTeam,
        pets: UnifiedPet[],
        options?: { reexpand?: () => void }
    ): void {
        const teamId = virtualTeam.id;

        // Soft-cleanup any previous state for this virtual team without removing
        // the container from the DOM (it is owned by the caller).
        const existingState = this.expandedTeams.get(teamId);
        if (existingState) {
            for (const card of existingState.cards) {
                if (card.shell) card.shell.destroy();
            }
            while (container.firstChild) container.removeChild(container.firstChild);
            this.expandedTeams.delete(teamId);
            if (this.expandedTeams.size === 0) this.stopUpdates();
        }

        const purpose = detectTeamPurpose(virtualTeam);

        const availableFeatures = FEATURE_PANELS.filter(f => {
            if (!f.isAvailable()) return false;
            if (f.shouldDisplay && !f.shouldDisplay(virtualTeam, pets, purpose)) return false;
            return true;
        });

        if (availableFeatures.length === 0) {
            console.warn('[TrackerExpansion] No available features for virtual team');
            return;
        }

        // Intelligent growth view selection (mirrors expand())
        const isGrowthTeam = purpose.primary === 'time-reduction' || hasEggBoosts(pets) || hasPlantBoosts(pets);
        let growthViewType: 'egg' | 'plant' | undefined = undefined;
        if (isGrowthTeam) {
            const hasEgg = hasEggBoosts(pets);
            const hasPlant = hasPlantBoosts(pets);
            const garden = Globals.myGarden.get();
            const hasGrowingEggs = garden.eggs.growing.length > 0;
            const hasGrowingPlants = garden.crops.growing.length > 0;
            if (hasEgg && hasPlant) {
                growthViewType = (hasGrowingPlants && !hasGrowingEggs) ? 'plant'
                    : (hasGrowingEggs && !hasGrowingPlants) ? 'egg'
                    : 'plant';
            } else if (hasPlant) {
                growthViewType = 'plant';
            } else if (hasEgg) {
                growthViewType = 'egg';
            }
        }

        let groupingAnalysis = this.analyzeTeamForGrouping(virtualTeam, pets, growthViewType);

        const hasGroupableFeature = availableFeatures.some(f =>
            f.id === 'growth' || f.id === 'hatch' || f.id === 'coin'
        );

        if (groupingAnalysis.shouldGroup && !hasGroupableFeature) {
            const allMaxStrength = groupingAnalysis.matchingPets.every(
                (pet: any) => pet.currentStrength >= pet.maxStrength
            );
            if (!allMaxStrength) {
                groupingAnalysis = { shouldGroup: false, matchingPets: [], remainingPets: pets };
            }
        }

        const cardStates: FeatureCardState[] = [];

        if (groupingAnalysis.shouldGroup && groupingAnalysis.matchingPets.length >= 2) {
            const featuresWithContent = availableFeatures.filter(f =>
                !f.hasContent || f.hasContent(groupingAnalysis.matchingPets, virtualTeam)
            );
            const selectedFeature = featuresWithContent.find(f =>
                f.id === 'growth' || f.id === 'hatch' || f.id === 'coin'
            ) || featuresWithContent[0] || availableFeatures[0];

            const groupedRow = this.createGroupedPetRow(
                virtualTeam, groupingAnalysis.matchingPets, availableFeatures,
                selectedFeature, growthViewType, teamId
            );
            container.appendChild(groupedRow.container);
            cardStates.push(groupedRow.cardState);

            for (const remainingPet of groupingAnalysis.remainingPets) {
                const slotIndex = virtualTeam.petIds.indexOf(remainingPet.id);
                const individualRow = this.createIndividualPetRow(
                    virtualTeam, remainingPet, slotIndex, availableFeatures, growthViewType, teamId
                );
                container.appendChild(individualRow.container);
                cardStates.push(individualRow.cardState);
            }
        } else {
            const myPets = Globals.myPets.get();
            for (let slotIndex = 0; slotIndex < 3; slotIndex++) {
                const petId = virtualTeam.petIds[slotIndex];
                const pet = petId ? (myPets.all.find(p => p.id === petId) ?? null) : null;
                const individualRow = this.createIndividualPetRow(
                    virtualTeam, pet, slotIndex, availableFeatures, growthViewType, teamId
                );
                container.appendChild(individualRow.container);
                cardStates.push(individualRow.cardState);
            }
        }

        this.expandedTeams.set(teamId, {
            cards: cardStates,
            expandedAt: Date.now(),
            container,
            growthViewType,
            virtualTeam,
            reexpandCallback: options?.reexpand,
        });

        this.addProgressBar(container, pets, teamId);
        this.startUpdates();
    }

    collapse(teamId: string): void {
        const expandedState = this.expandedTeams.get(teamId);
        if (!expandedState) return;

        for (const card of expandedState.cards) {
            if (card.shell) card.shell.destroy();
        }

        expandedState.container.remove();
        this.expandedTeams.delete(teamId);

        if (this.expandedTeams.size === 0) {
            this.stopUpdates();
        }
    }

    cleanupAll(): void {
        const teamIds = Array.from(this.expandedTeams.keys());
        for (const teamId of teamIds) {
            this.collapse(teamId);
        }
    }

    destroy(): void {
        this.cleanupAll();
        this.stopUpdates();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Private
    // ─────────────────────────────────────────────────────────────────────────

    private addProgressBar(container: HTMLElement, pets: any[], teamId: string, forceMode?: 'xp' | 'growth'): void {
        const state = this.expandedTeams.get(teamId);
        const team = state?.virtualTeam ?? MGPetTeam.getTeam(teamId);
        const purpose = team ? detectTeamPurpose(team) : null;

        const isGrowthTeam = purpose?.primary === 'time-reduction' || hasEggBoosts(pets) || hasPlantBoosts(pets);

        // Determine which bar mode to use
        const barMode = forceMode ?? (isGrowthTeam ? 'growth' : 'xp');

        // Track current bar mode in state
        if (state) {
            state.currentBarMode = barMode;
        }

        if (barMode === 'growth') {
            this.renderGrowthSummaryBar(container, pets, teamId);
        } else {
            this.renderXpProgressBar(container, pets);
        }
    }

    /**
     * Update progress bar when feature carousel changes between XP and Growth
     */
    private updateProgressBarForFeature(teamId: string, featureId: string): void {
        const state = this.expandedTeams.get(teamId);
        if (!state) return;

        const team = state.virtualTeam ?? MGPetTeam.getTeam(teamId);
        if (!team) return;

        // Only update progress bar for xp and growth features
        // Other features (coin, hatch) should leave the current bar unchanged
        if (featureId !== 'xp' && featureId !== 'growth') return;

        const pets = MGPetTeam.getPetsForTeam(team);
        const newBarMode = featureId === 'xp' ? 'xp' : 'growth';

        // Skip if bar mode hasn't changed
        if (state.currentBarMode === newBarMode) return;

        // Remove existing progress bar elements
        const existingGrowthBar = state.container.querySelector('.growth-summary-overhaul');
        const existingXpBar = state.container.querySelector('.team-progress-bar:not(.team-progress-bar--egg):not(.team-progress-bar--plant)');

        if (existingGrowthBar) existingGrowthBar.remove();
        if (existingXpBar) existingXpBar.remove();

        // Add new progress bar with forced mode
        this.addProgressBar(state.container, pets, teamId, newBarMode);
    }

    private renderXpProgressBar(container: HTMLElement, pets: any[]): void {
        const teamHasNonMaxPets = pets.some(p => p.currentStrength < p.maxStrength);
        if (teamHasNonMaxPets && pets.length > 0) {
            const teamProgressPercent = Math.round(
                (pets.reduce((sum: number, p) => sum + (p.currentStrength / p.maxStrength), 0) / pets.length) * 100
            );

            const progressBar = element('div', { className: 'team-progress-bar' });
            const colorClass = teamProgressPercent < 33 ? 'low' : teamProgressPercent < 67 ? 'medium' : 'high';
            const progressFill = element('div', {
                className: `team-progress-bar__fill team-progress-bar__fill--${colorClass}`
            });
            progressFill.style.width = `${teamProgressPercent}%`;

            const progressPercentText = element('div', {
                className: 'team-progress-bar__percent',
                textContent: `${teamProgressPercent}%`
            });

            progressBar.appendChild(progressFill);
            progressBar.appendChild(progressPercentText);
            container.prepend(progressBar);
        }
    }

    private renderGrowthSummaryBar(container: HTMLElement, pets: any[], teamId: string): void {
        const state = this.expandedTeams.get(teamId);
        const viewType = state?.growthViewType || 'plant';
        const garden = Globals.myGarden.get();
        const now = Date.now();

        // Use crops.growing for plants (individual crop slots), eggs.growing for eggs
        // CropInfo has startTime/endTime, EggWithTile has plantedAt/maturedAt
        const allItems = viewType === 'egg' ? garden.eggs.growing : garden.crops.growing;

        // Filter by selected tiles if a filter is active
        const items = this.tileFilter
            ? allItems.filter(item => this.tileFilter!.has(item.tileIndex))
            : allItems;

        const totalItemsCount = items.length;

        const eggBoosts = calculateEggBoosts(pets);
        const plantBoosts = calculatePlantBoosts(pets);
        const eggReduction = calculateBoostStats(eggBoosts).timeReductionPerHour;
        const plantReduction = calculateBoostStats(plantBoosts).timeReductionPerHour;
        const currentReduction = Math.round(viewType === 'egg' ? eggReduction : plantReduction);

        let avgPercent = totalItemsCount > 0 ? 0 : 100;
        if (totalItemsCount > 0) {
            const speedMultiplier = (60 + currentReduction) / 60;
            avgPercent = Math.round(items.reduce((sum, item) => {
                const startTime = viewType === 'egg' ? (item as EggWithTile).plantedAt : (item as any).startTime;
                const endTime = viewType === 'egg' ? (item as EggWithTile).maturedAt : (item as any).endTime;

                const elapsed = now - startTime;
                const remainingRaw = endTime - now;
                const remainingEffective = remainingRaw / speedMultiplier;

                // Effective Progress = Elapsed / (Elapsed + (Remaining / Speed))
                const totalEffective = elapsed + remainingEffective;
                const percent = totalEffective > 0 ? (elapsed / totalEffective) * 100 : 0;

                return sum + Math.min(100, Math.max(0, percent));
            }, 0) / totalItemsCount);
        }

        // 2. Identify Next/Pinned Item
        // For plants: CropInfo uses endTime, for eggs: EggWithTile uses maturedAt
        let activeItem: any = items.find(item => item.tileIndex === state?.pinnedItemId);
        if (!activeItem && totalItemsCount > 0) {
            // Sort by end time - CropInfo has endTime, EggWithTile has maturedAt
            activeItem = [...items].sort((a, b) => {
                const aEnd = viewType === 'egg' ? (a as EggWithTile).maturedAt : (a as any).endTime;
                const bEnd = viewType === 'egg' ? (b as EggWithTile).maturedAt : (b as any).endTime;
                return aEnd - bEnd;
            })[0];
        }

        // 3. Render Bar
        const barWrapper = element('div', { className: 'growth-summary-overhaul' });

        const progressBar = element('div', {
            className: `team-progress-bar team-progress-bar--${viewType}`
        });
        const progressFill = element('div', {
            className: `team-progress-bar__fill team-progress-bar__fill--${viewType}`
        });
        progressFill.style.width = `${avgPercent}%`;

        // Format minutes per hour to "Xh Ym/h" (matching GrowthPanel.ts pattern)
        const formatMinPerHour = (min: number): string => {
            const h = Math.floor(min / 60);
            const m = min % 60;
            return h > 0 && m > 0 ? `${h}h ${m}m/h` : h > 0 ? `${h}h/h` : `${m}m/h`;
        };

        // Calculate team multiplier (showing time boost as a multiplier)
        // Formula: (60 + hourlyReduction) / 60
        const teamMultiplier = currentReduction > 0
            ? ((60 + currentReduction) / 60).toFixed(2) + 'x'
            : '1.00x';

        const barText = element('div', { className: 'team-progress-bar__overlay' });
        barText.innerHTML = `
            <span class="bar-percent">${avgPercent}%</span>
            <span class="bar-info">${totalItemsCount} total +${formatMinPerHour(currentReduction)}</span>
        `;

        progressBar.appendChild(progressFill);
        progressBar.appendChild(barText);

        // 4. Next/Pinned Item Display
        const nextItemRow = element('div', { className: 'growth-next-item' });
        if (activeItem) {
            // CropInfo has species, EggWithTile has eggId
            let species = viewType === 'egg' ? activeItem.eggId : activeItem.species;
            const category = viewType === 'egg' ? 'pet' : 'plant';

            // Handle Celestial plant sprite mapping
            if (viewType === 'plant' && species) {
                if (species === 'DawnCelestial') species = 'DawnCelestialCrop';
                if (species === 'MoonCelestial') species = 'MoonCelestialCrop';
            }

            // CropInfo uses endTime, EggWithTile uses maturedAt
            const itemEndTime = viewType === 'egg' ? activeItem.maturedAt : activeItem.endTime;
            const itemStartTime = viewType === 'egg' ? activeItem.plantedAt : activeItem.startTime;

            // Calculate effective time based on boost
            const effective = calculateItemEffectiveGrowth(
                itemStartTime,
                itemEndTime,
                now,
                currentReduction // This is already hourly reduction, but the function expects minutes reduced per proc?
                // Wait, calculateItemEffectiveGrowth expects boostMinPerProc (minutes added per proc).
                // currentReduction is minutes reduction per HOUR.
            );

            // Actually, we calculated currentReduction as hourly reduction.
            // Let's check calculateItemEffectiveGrowth signature again.
            // export function calculateItemEffectiveGrowth(startTime, endTime, now, boostMinPerProc)
            // It uses speedMultiplier = (10 + boostMinPerProc) / 10.

            // If we have hourlyReduction, speedMultiplier = (60 + hourlyReduction) / 60.
            const speedMultiplier = (60 + currentReduction) / 60;
            const effectiveRemainingMs = Math.max(0, Math.round((itemEndTime - now) / speedMultiplier));
            const effectiveEndTime = now + effectiveRemainingMs;

            const date = new Date(effectiveEndTime);
            const isTomorrow = date.getDate() !== new Date().getDate();
            const timeStr = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();
            const dateStr = `${isTomorrow ? 'Tomorrow ' : ''}${timeStr}`;

            // Format time compact (copying from growthPanel or making shared helper)
            const formatTime = (ms: number) => {
                const s = Math.floor(ms / 1000);
                const m = Math.floor(s / 60);
                const h = Math.floor(m / 60);
                if (h > 0) return `${h}h ${m % 60}m ${s % 60}s`;
                if (m > 0) return `${m}m ${s % 60}s`;
                return `${s}s`;
            };

            const spriteEl = element('div', { className: 'growth-next-sprite' });
            try {
                if (MGSprite.isReady() && MGSprite.has(category, species)) {
                    const canvas = MGSprite.toCanvas(category, species, { scale: 0.3 });
                    canvas.style.height = '20px';
                    canvas.style.width = 'auto';
                    canvas.style.imageRendering = 'pixelated';
                    spriteEl.appendChild(canvas);
                } else {
                    spriteEl.textContent = viewType === 'egg' ? '🥚' : '🌱';
                }
            } catch (e) {
                console.warn('[GrowthSummary] Sprite error:', e);
                spriteEl.textContent = viewType === 'egg' ? '🥚' : '🌱';
            }

            nextItemRow.innerHTML = `
                <div class="growth-next-details">
                    <span class="growth-next-time">${formatTime(effectiveRemainingMs)}</span>
                    <span class="growth-next-date">| ${dateStr}</span>
                </div>
            `;
            nextItemRow.prepend(spriteEl);
        } else {
            nextItemRow.innerHTML = `<span class="empty-text">No items growing</span>`;
        }

        // 5. Controls (Toggle + Dropdown)
        const controls = element('div', { className: 'growth-overhaul-controls' });

        // Create sprite for toggle button
        const toggleId = viewType === 'egg' ? 'UncommonEgg' : 'Carrot';
        const toggleCategory = viewType === 'egg' ? 'pet' : 'plant';
        let toggleSprite: HTMLCanvasElement | null = null;

        try {
            if (MGSprite.isReady() && MGSprite.has(toggleCategory, toggleId)) {
                toggleSprite = MGSprite.toCanvas(toggleCategory, toggleId, { scale: 0.35 });
            }
        } catch (e) {
            // Use null sprite, ArcadeButton handles fallback
        }

        // Create GeminiIconButton for toggle (sprite shows what it toggles to)
        const toggleBtn = GeminiIconButton({
            variant: viewType === 'egg' ? 'egg' : 'plant', // Match current view type
            sprite: toggleSprite,
            playSound: true,
            tooltip: `Switch to ${viewType === 'egg' ? 'plants' : 'eggs'}`,
            onClick: (e) => {
                e.stopPropagation();
                if (state) {
                    state.growthViewType = viewType === 'egg' ? 'plant' : 'egg';
                    state.pinnedItemId = undefined; // Reset pin on toggle
                    this.updateGrowthSummary(teamId);
                }
            }
        });

        const dropdownBtn = element('button', { className: 'growth-dropdown-overhaul', textContent: '▼' });
        dropdownBtn.onclick = (e) => {
            e.stopPropagation();
            this.showGrowthDropdown(dropdownBtn, items, viewType, teamId);
        };

        // Only show toggle button if team has BOTH egg and plant growth abilities
        const hasBothAbilities = eggReduction > 0 && plantReduction > 0;
        if (hasBothAbilities) {
            controls.appendChild(toggleBtn);
        }
        controls.appendChild(dropdownBtn);

        barWrapper.appendChild(progressBar);
        barWrapper.appendChild(nextItemRow);
        barWrapper.appendChild(controls);

        // Replace or Prepend
        const existing = container.querySelector('.growth-summary-overhaul');
        if (existing) {
            existing.replaceWith(barWrapper);
        } else {
            container.prepend(barWrapper);
        }
    }

    private updateGrowthSummary(teamId: string): void {
        const state = this.expandedTeams.get(teamId);
        if (state) {
            const team = state.virtualTeam ?? MGPetTeam.getTeam(teamId);
            if (!team) return;
            const pets = MGPetTeam.getPetsForTeam(team);
            this.renderGrowthSummaryBar(state.container, pets, teamId);

            // Check if grouping structure needs to change due to view toggle
            // (e.g., different pets get grouped in egg view vs plant view)
            const newGrouping = this.analyzeTeamForGrouping(team, pets, state.growthViewType);
            const currentlyGrouped = state.cards.some(c => c.slotIndex === -1);
            const shouldNowGroup = newGrouping.shouldGroup && newGrouping.matchingPets.length >= 2;

            // If grouping state changed, re-expand to rebuild structure
            if (currentlyGrouped !== shouldNowGroup) {
                if (state.virtualTeam) {
                    // Virtual teams: rebuildInPlace instead of collapse+expand
                    requestAnimationFrame(() => this.rebuildInPlace(teamId, false));
                    return;
                }
                this.collapse(teamId);
                // Use requestAnimationFrame for smoother transition
                requestAnimationFrame(() => this.expand(teamId, false));
                return;
            }

            // If grouping exists but matching pets changed, also rebuild
            if (currentlyGrouped && shouldNowGroup) {
                const currentGroupedCard = state.cards.find(c => c.slotIndex === -1);
                if (currentGroupedCard?.shell) {
                    const currentGroupSize = currentGroupedCard.shell.root.classList.contains('base-pet-card--grouped')
                        ? 3
                        : currentGroupedCard.shell.root.classList.contains('base-pet-card--grouped-2')
                            ? 2
                            : 0;
                    if (currentGroupSize !== newGrouping.matchingPets.length) {
                        if (state.virtualTeam) {
                            requestAnimationFrame(() => this.rebuildInPlace(teamId, false));
                            return;
                        }
                        this.collapse(teamId);
                        // Use requestAnimationFrame for smoother transition
                        requestAnimationFrame(() => this.expand(teamId, false));
                        return;
                    }
                }
            }

            // Update grouped cards with new viewType BEFORE updating individual cards
            this.updateGroupedCardsViewType(teamId, state);

            // Immediately update the pet slots too, so there is no lag
            this.updateSpecificTeam(teamId, state);
        }
    }

    private updateSpecificTeam(teamId: string, state: ExpandedTeamState): void {
        const team = state.virtualTeam ?? MGPetTeam.getTeam(teamId);
        if (!team) return;

        const myPets = Globals.myPets.get();
        for (const card of state.cards) {
            const petId = team.petIds[card.slotIndex];
            const pet = petId ? myPets.all.find(p => p.id === petId) : null;

            if (pet && card.shell) {
                card.shell.update(pet);
                if (card.featureData.renderPetSlot) {
                    try {
                        const slot = card.shell.getContentSlot();
                        card.featureData.renderPetSlot(pet, team, slot, state.growthViewType, this.tileFilter);

                        const isMax = pet.currentStrength >= pet.maxStrength;
                        const hasStats = slot.children.length > 0 || slot.textContent.trim().length > 0;
                        card.shell.setCentered(isMax && !hasStats);
                    } catch (err) {
                        console.error(`[TeamCardExpansion] Failed to render slot for ${pet.id}:`, err);
                    }
                }
            }
        }
    }

    /**
     * Update grouped cards when viewType changes (egg/plant toggle)
     */
    private updateGroupedCardsViewType(teamId: string, state: ExpandedTeamState): void {
        const team = state.virtualTeam ?? MGPetTeam.getTeam(teamId);
        if (!team) return;

        for (const card of state.cards) {
            // Only update grouped cards (slotIndex === -1)
            if (card.slotIndex === -1 && card.shell) {
                const slot = card.shell.getContentSlot();

                // Re-render with new viewType
                if ((card.featureData as any).renderGroupedSlot && card.shell.root.classList.contains('base-pet-card--grouped')) {
                    // Need to get matching pets for this grouped card
                    // For now, we can trigger via updateSpecificTeam which already exists
                    // The issue is that updateSpecificTeam checks pet by slotIndex, which is -1 for grouped
                    // So we need to re-render directly
                    slot.innerHTML = '';

                    // Re-render grouped card with updated viewType
                    // Note: We need to preserve the original grouped pets, not all team pets
                    // For now, get all pets and let renderGroupedSlot handle the filtering
                    const allPets = MGPetTeam.getPetsForTeam(team);
                    (card.featureData as any).renderGroupedSlot(allPets, team, slot, state.growthViewType, this.tileFilter);

                    // Prevent centering when stats exist
                    const hasStats = slot.children.length > 0 || slot.textContent.trim().length > 0;
                    card.shell.setCentered(!hasStats);
                }
            }
        }
    }

    private showGrowthDropdown(anchor: HTMLElement, items: any[], viewType: 'egg' | 'plant', teamId: string): void {
        // Remove any existing dropdown (global lookup to close others)
        const existingMenu = document.querySelector('.growth-dropdown-menu');
        if (existingMenu) {
            const isSameToggle = existingMenu.getAttribute('data-owner-id') === teamId &&
                existingMenu.getAttribute('data-view-type') === viewType;
            existingMenu.remove();

            // If we just closed the menu for THIS button, we're done (toggle off).
            // Otherwise (different button clicked), we continue to open the new one.
            if (isSameToggle) {
                return;
            }
        }

        const menu = element('div', { className: 'growth-dropdown-menu' });
        // Tag valid menu with owner info for toggle logic
        menu.setAttribute('data-owner-id', teamId);
        menu.setAttribute('data-view-type', viewType);

        if (items.length === 0) {
            const emptyOption = element('div', { className: 'growth-dropdown-option' });
            emptyOption.textContent = 'No items growing';
            menu.appendChild(emptyOption);
        } else {
            const category = viewType === 'egg' ? 'pet' : 'plant';

            items.forEach(item => {
                const id = item.tileIndex;
                // CropInfo has species, EggWithTile has eggId
                let species = viewType === 'egg' ? (item as EggWithTile).eggId : (item as any).species;

                // Handle Celestial plant sprite mapping (pattern from GrowthPanel.ts)
                if (viewType === 'plant') {
                    if (species === 'DawnCelestial') species = 'DawnCelestialCrop';
                    if (species === 'MoonCelestial') species = 'MoonCelestialCrop';
                }

                const option = element('div', { className: 'growth-dropdown-option' });

                // Add sprite
                const spriteContainer = element('span', { className: 'dropdown-sprite' });
                try {
                    if (MGSprite.isReady() && MGSprite.has(category, species)) {
                        const canvas = MGSprite.toCanvas(category, species, { scale: 0.3 });
                        canvas.style.height = '16px';
                        canvas.style.width = 'auto';
                        canvas.style.imageRendering = 'pixelated';
                        spriteContainer.appendChild(canvas);
                    } else {
                        spriteContainer.textContent = viewType === 'egg' ? '🥚' : '🌱';
                    }
                } catch {
                    spriteContainer.textContent = viewType === 'egg' ? '🥚' : '🌱';
                }

                // CropInfo uses endTime, EggWithTile uses maturedAt
                const itemEndTime = viewType === 'egg' ? (item as EggWithTile).maturedAt : (item as any).endTime;
                const date = new Date(itemEndTime);
                const timeStr = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();

                const textSpan = element('span', { className: 'dropdown-text' });
                textSpan.textContent = `${species} - ${timeStr}`;

                option.appendChild(spriteContainer);
                option.appendChild(textSpan);

                option.onclick = (e) => {
                    e.stopPropagation();
                    const state = this.expandedTeams.get(teamId);
                    if (state) {
                        state.pinnedItemId = id;
                        this.updateGrowthSummary(teamId);
                    }
                    menu.remove();
                };
                menu.appendChild(option);
            });
        }

        // Use FIXED positioning to escape container clipping
        const rect = anchor.getBoundingClientRect();

        menu.style.position = 'fixed';
        // Open ABOVE the button (not below)
        menu.style.bottom = `${window.innerHeight - rect.top + 4}px`;
        menu.style.top = 'auto';
        // Align right edge of menu with right edge of button
        menu.style.left = 'auto';
        menu.style.right = `${window.innerWidth - rect.right}px`;
        menu.style.marginTop = '0'; // reset
        menu.style.zIndex = '999999';

        // Append to document.body to ensure it's on top of everything
        document.body.appendChild(menu);

        // Close on click outside
        const close = (e: MouseEvent) => {
            if (!menu.contains(e.target as Node) && e.target !== anchor) {
                menu.remove();
                document.removeEventListener('click', close, true);
            }
        };
        setTimeout(() => document.addEventListener('click', close, true), 10);
    }

    /**
     * Create an individual pet row (extracted from original loop logic)
     */
    private createIndividualPetRow(
        team: PetTeam,
        pet: any | null,
        slotIndex: number,
        availableFeatures: FeaturePanelDefinition[],
        viewType: 'egg' | 'plant' | undefined,
        teamId: string,
        preferredFeature?: 'xp' | 'growth'
    ): { container: HTMLElement; cardState: FeatureCardState } {
        // Filter features by hasContent() to remove empty panels for THIS pet
        const featuresWithContent = pet
            ? availableFeatures.filter(f => !f.hasContent || f.hasContent(pet, team))
            : availableFeatures;

        // Use filtered features for carousel (prevents empty panel navigation)
        const carouselFeatures = featuresWithContent.length > 0 ? featuresWithContent : availableFeatures;

        // Use preferredFeature if specified, otherwise use intelligent selection
        let selectedFeature: FeaturePanelDefinition = carouselFeatures[0]; // Initialize with fallback

        if (preferredFeature) {
            selectedFeature = carouselFeatures.find(f => f.id === preferredFeature) || carouselFeatures[0];
        } else if (pet) {
            // Intelligent feature selection based on THIS PET'S abilities (not team-wide)
            const bestFeatureId = detectBestFeatureForPet(pet, carouselFeatures);
            selectedFeature = carouselFeatures.find(f => f.id === bestFeatureId) || carouselFeatures[0];
        } else {
            // No pet (empty slot) - use team-wide defaults
            const teamPurpose = detectTeamPurpose(team);
            const suggestedFeatures = teamPurpose?.suggestedFeatures || [];

            // Try to find a suggested feature that's available
            let foundSuggested = false;
            for (const suggested of suggestedFeatures) {
                const feature = carouselFeatures.find(f => f.id === suggested);
                if (feature) {
                    selectedFeature = feature;
                    foundSuggested = true;
                    break;
                }
            }

            // Fallback to growth/xp based on viewType if no suggested feature found
            if (!foundSuggested) {
                if (viewType) {
                    selectedFeature = carouselFeatures.find(f => f.id === 'growth') || carouselFeatures[0];
                } else {
                    selectedFeature = carouselFeatures.find(f => f.id === 'xp') || carouselFeatures[0];
                }
            }
        }

        const petRow = element('div', { className: 'expanded-pet-row' });
        const rowHeader = element('div', { className: 'pet-row__header' });
        const prevBtn = element('button', { textContent: '<', className: 'pet-row__nav' });
        const featureLabel = element('div', {
            textContent: `${selectedFeature.icon} ${selectedFeature.label.toUpperCase()}`,
            className: 'pet-label'
        });
        const nextBtn = element('button', { textContent: '>', className: 'pet-row__nav' });

        let shell: BasePetCard | null = null;
        if (pet) {
            shell = new BasePetCard(pet);
        }

        const cardState: any = {
            slotIndex,
            currentFeatureId: selectedFeature.id,
            shell,
            featureData: selectedFeature
        };

        const updateFeature = (newIndex: number) => {
            const newFeature = carouselFeatures[newIndex];

            // Check if switching TO growth from XP - might need to restore grouping
            if (newFeature.id === 'growth') {
                const allPets = MGPetTeam.getPetsForTeam(team);
                const state = this.expandedTeams.get(teamId);
                const groupingAnalysis = this.analyzeTeamForGrouping(team, allPets, state?.growthViewType);
                if (groupingAnalysis.shouldGroup && groupingAnalysis.matchingPets.length >= 2) {
                    // Collapse and re-expand with grouping
                    this.collapseAndReexpandForGrowth(teamId);
                    return;
                }
            }

            featureLabel.textContent = `${newFeature.icon} ${newFeature.label.toUpperCase()}`;

            if (shell && pet) {
                const slot = shell.getContentSlot();
                slot.innerHTML = '';
                if (newFeature.renderPetSlot) {
                    const state = this.expandedTeams.get(teamId);
                    newFeature.renderPetSlot(pet, team, slot, state?.growthViewType, this.tileFilter);
                }

                const isMax = pet.currentStrength >= pet.maxStrength;
                const hasStats = slot.children.length > 0 || slot.textContent.trim().length > 0;
                shell.setCentered(isMax && !hasStats);
            }

            cardState.currentFeatureId = newFeature.id;
            cardState.featureData = newFeature;
            rowHeader.className = `pet-row__header pet-row__header--${newFeature.id}`;

            // Update progress bar when switching between XP and Growth features
            this.updateProgressBarForFeature(teamId, newFeature.id);
        };

        rowHeader.className = `pet-row__header pet-row__header--${selectedFeature.id}`;

        let currentIndex = carouselFeatures.findIndex(f => f.id === selectedFeature.id);
        prevBtn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            currentIndex = (currentIndex - 1 + carouselFeatures.length) % carouselFeatures.length;
            updateFeature(currentIndex);
        });
        nextBtn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            currentIndex = (currentIndex + 1) % carouselFeatures.length;
            updateFeature(currentIndex);
        });

        // Only show nav buttons if more than one feature has content
        if (carouselFeatures.length > 1) {
            rowHeader.appendChild(prevBtn);
        }
        rowHeader.appendChild(featureLabel);
        if (carouselFeatures.length > 1) {
            rowHeader.appendChild(nextBtn);
        }

        let rowContent: HTMLElement;
        if (shell && pet) {
            rowContent = shell.build();
            if (selectedFeature.renderPetSlot) {
                const slot = shell.getContentSlot();
                selectedFeature.renderPetSlot(pet, team, slot, viewType, this.tileFilter);

                const isMax = pet.currentStrength >= pet.maxStrength;
                const hasStats = slot.children.length > 0 || slot.textContent.trim().length > 0;
                shell.setCentered(isMax && !hasStats);
            }
        } else {
            rowContent = element('div', { className: 'pet-row__content pet-row__content--empty' });
            rowContent.innerHTML = `
                <div class="pet-row__sprite"><div class="pet-row__empty-slot">Empty</div></div>
                <div class="pet-row__info"><span class="pet-row__empty-text">No pet assigned</span></div>
            `;
        }

        petRow.appendChild(rowHeader);
        petRow.appendChild(rowContent);

        // Add container to cardState directly (not spread) to maintain reference
        // so updateFeature callback can modify the state stored in state.cards
        cardState.container = petRow;

        return {
            container: petRow,
            cardState: cardState  // Return same reference, not a copy
        };
    }

    /**
     * Create a grouped pet row for 2-3 matching pets with team-aggregated stats
     * Renders bundled sprites in triad/duo formation with individual MAX badges
     */
    private createGroupedPetRow(
        team: PetTeam,
        matchingPets: any[],
        availableFeatures: FeaturePanelDefinition[],
        selectedFeature: FeaturePanelDefinition,
        viewType: 'egg' | 'plant' | undefined,
        teamId: string
    ): { container: HTMLElement; cardState: FeatureCardState } {
        // Filter features by hasContent() to remove empty panels for these grouped pets
        const featuresWithContent = availableFeatures.filter(f =>
            !f.hasContent || f.hasContent(matchingPets, team)
        );

        // Use filtered features for carousel (prevents empty panel navigation)
        const carouselFeatures = featuresWithContent.length > 0 ? featuresWithContent : availableFeatures;

        // CHECK: Should panels be combined into single view?
        // If total rows across all panels ≤ 3, use combined panel instead of carousel
        if (this.shouldUseCombinedPanel(carouselFeatures, matchingPets, team, viewType)) {
            return this.createCombinedPanelRow(team, matchingPets, carouselFeatures, viewType, teamId);
        }

        const petRow = element('div', { className: 'expanded-pet-row expanded-pet-row--grouped' });
        const rowHeader = element('div', { className: 'pet-row__header' });
        const prevBtn = element('button', { textContent: '<', className: 'pet-row__nav' });
        const featureLabel = element('div', {
            textContent: `${selectedFeature.icon} ${selectedFeature.label.toUpperCase()}`,
            className: 'pet-label'
        });
        const nextBtn = element('button', { textContent: '>', className: 'pet-row__nav' });

        // Build custom grouped card layout (not using BasePetCard for sprite rendering)
        const rowContent = element('div', {
            className: `base-pet-card base-pet-card--grouped${matchingPets.length === 2 ? '-2' : ''}`
        });

        // Left section with grouped sprites
        const left = element('div', { className: 'base-pet-card__left' });

        // Grouped sprite container with triad/duo formation
        const spriteContainer = element('div', {
            className: `grouped-sprite-container${matchingPets.length === 2 ? ' grouped-sprite-container--duo' : ''}`
        });

        // Render each pet sprite
        for (const pet of matchingPets) {
            try {
                const mutations = (pet.mutations || []) as string[];
                if (MGSprite.has('pet', pet.petSpecies)) {
                    const canvas = MGSprite.toCanvas('pet', pet.petSpecies, {
                        mutations: mutations as any,
                        scale: 1,
                        boundsMode: 'padded'
                    });
                    canvas.style.imageRendering = 'pixelated';
                    spriteContainer.appendChild(canvas);
                }
            } catch (e) {
                // Skip failed sprites
            }
        }
        left.appendChild(spriteContainer);

        // Grouped badges row with individual STR badges - triangle layout
        const badgesRow = element('div', {
            className: `grouped-badges${matchingPets.length === 2 ? ' grouped-badges--duo' : ''}`
        });
        for (const pet of matchingPets) {
            const isMax = pet.currentStrength >= pet.maxStrength;
            const badgeText = isMax ? `MAX ${pet.maxStrength}` : `STR ${pet.currentStrength}/${pet.maxStrength}`;
            const badge = element('span', {
                className: 'badge badge--neutral badge--soft badge--sm badge--pill',
                textContent: badgeText
            });
            badgesRow.appendChild(badge);
        }
        left.appendChild(badgesRow);
        rowContent.appendChild(left);

        // Right content slot for feature stats
        const contentSlot = element('div', { className: 'base-pet-card__content' });
        rowContent.appendChild(contentSlot);

        // Create a shell-like object to maintain compatibility with updateFeature
        const shell = {
            root: rowContent,
            getContentSlot: () => contentSlot,
            setCentered: (centered: boolean) => {
                rowContent.classList.toggle('base-pet-card--centered', centered);
            },
            destroy: () => {
                rowContent.remove();
            },
            update: () => {
                // Re-render badges on update
                badgesRow.innerHTML = '';
                for (const pet of matchingPets) {
                    const isMax = pet.currentStrength >= pet.maxStrength;
                    const badgeText = isMax ? `MAX ${pet.maxStrength}` : `STR ${pet.currentStrength}/${pet.maxStrength}`;
                    const badge = element('span', {
                        className: 'badge badge--neutral badge--soft badge--sm badge--pill',
                        textContent: badgeText
                    });
                    badgesRow.appendChild(badge);
                }
            }
        };

        const cardState: any = {
            slotIndex: -1,
            currentFeatureId: selectedFeature.id,
            shell,
            featureData: selectedFeature
        };

        const updateFeature = (newIndex: number) => {
            const newFeature = carouselFeatures[newIndex];

            // XP feature requires ALL grouped pets to be at max STR
            // If not all max STR, collapse and re-expand with individual cards
            if (newFeature.id === 'xp') {
                const allMaxStrength = matchingPets.every(
                    (pet: any) => pet.currentStrength >= pet.maxStrength
                );
                if (!allMaxStrength) {
                    this.collapseAndReexpandForXP(teamId);
                    return;
                }
            }

            featureLabel.textContent = `${newFeature.icon} ${newFeature.label.toUpperCase()}`;

            contentSlot.innerHTML = '';

            if ((newFeature as any).renderGroupedSlot) {
                const state = this.expandedTeams.get(teamId);
                (newFeature as any).renderGroupedSlot(matchingPets, team, contentSlot, state?.growthViewType, this.tileFilter);
            } else if (newFeature.renderPetSlot) {
                const state = this.expandedTeams.get(teamId);
                newFeature.renderPetSlot(matchingPets[0], team, contentSlot, state?.growthViewType, this.tileFilter);
            }

            // Prevent centering when stats are present
            const hasStats = contentSlot.children.length > 0 || contentSlot.textContent.trim().length > 0;
            shell.setCentered(!hasStats);

            cardState.currentFeatureId = newFeature.id;
            cardState.featureData = newFeature;
            rowHeader.className = `pet-row__header pet-row__header--${newFeature.id}`;
        };

        rowHeader.className = `pet-row__header pet-row__header--${selectedFeature.id}`;

        let currentIndex = carouselFeatures.findIndex(f => f.id === selectedFeature.id);
        prevBtn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            currentIndex = (currentIndex - 1 + carouselFeatures.length) % carouselFeatures.length;
            updateFeature(currentIndex);
        });
        nextBtn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            currentIndex = (currentIndex + 1) % carouselFeatures.length;
            updateFeature(currentIndex);
        });

        // Only show nav buttons if more than one feature has content
        if (carouselFeatures.length > 1) {
            rowHeader.appendChild(prevBtn);
        }
        rowHeader.appendChild(featureLabel);
        if (carouselFeatures.length > 1) {
            rowHeader.appendChild(nextBtn);
        }

        // Render initial feature content
        if ((selectedFeature as any).renderGroupedSlot) {
            (selectedFeature as any).renderGroupedSlot(matchingPets, team, contentSlot, viewType, this.tileFilter);
        } else if (selectedFeature.renderPetSlot) {
            selectedFeature.renderPetSlot(matchingPets[0], team, contentSlot, viewType, this.tileFilter);
        }

        petRow.appendChild(rowHeader);
        petRow.appendChild(rowContent);

        // Apply grouped class for CSS detection
        rowContent.classList.add('base-pet-card--grouped');

        return {
            container: petRow,
            cardState: { ...cardState, container: petRow }
        };
    }

    /**
     * Smoothly transition to XP view with individual cards (in-place rebuild)
     * Eliminates flash by using CSS transitions instead of full collapse/expand
     */
    private collapseAndReexpandForXP(teamId: string): void {
        const state = this.expandedTeams.get(teamId);
        if (!state) {
            // Fallback to original behavior if no state
            this.collapse(teamId);
            setTimeout(() => this.expand(teamId, true, 'xp'), 100);
            return;
        }

        // Apply fade-out transition
        state.container.style.transition = 'opacity 0.15s ease-out';
        state.container.style.opacity = '0.4';

        // Rebuild in-place after brief fade
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.rebuildInPlace(teamId, true, 'xp');
                // Fade back in
                state.container.style.opacity = '1';
            });
        });
    }

    /**
     * Smoothly transition to Growth view with grouping (in-place rebuild)
     * Eliminates flash by using CSS transitions instead of full collapse/expand
     */
    private collapseAndReexpandForGrowth(teamId: string): void {
        const state = this.expandedTeams.get(teamId);
        if (!state) {
            // Fallback to original behavior if no state
            this.collapse(teamId);
            setTimeout(() => this.expand(teamId, false, 'growth'), 100);
            return;
        }

        // Apply fade-out transition  
        state.container.style.transition = 'opacity 0.15s ease-out';
        state.container.style.opacity = '0.4';

        // Rebuild in-place after brief fade
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.rebuildInPlace(teamId, false, 'growth');
                // Fade back in
                state.container.style.opacity = '1';
            });
        });
    }

    /**
     * Rebuild expanded cards in-place without removing the container
     * Provides smooth transition between grouping states
     */
    private rebuildInPlace(teamId: string, forceIndividual: boolean, preferredFeature?: string): void {
        const state = this.expandedTeams.get(teamId);
        if (!state) return;

        const team = state.virtualTeam ?? MGPetTeam.getTeam(teamId);
        if (!team) return;

        const pets = MGPetTeam.getPetsForTeam(team);
        const myPets = Globals.myPets.get();
        const availableFeatures = this.getAvailableFeaturesForTeam(team, pets);
        const growthViewType = state.growthViewType;

        // Destroy existing cards but keep container
        for (const card of state.cards) {
            if (card.shell) card.shell.destroy();
            if (card.container && card.container.parentNode) {
                card.container.remove();
            }
        }

        // Remove progress bar if exists
        const existingBar = state.container.querySelector('.team-progress-bar');
        if (existingBar) existingBar.remove();

        // Build new cards
        const cardStates: FeatureCardState[] = [];

        let groupingAnalysis = forceIndividual
            ? { shouldGroup: false, matchingPets: [], remainingPets: pets }
            : this.analyzeTeamForGrouping(team, pets, growthViewType);

        // Check if groupable feature exists
        const hasGroupableFeature = availableFeatures.some(f =>
            f.id === 'growth' || f.id === 'hatch' || f.id === 'coin'
        );

        if (groupingAnalysis.shouldGroup && !hasGroupableFeature) {
            const allMaxStrength = groupingAnalysis.matchingPets.every(
                (pet: any) => pet.currentStrength >= pet.maxStrength
            );
            if (!allMaxStrength) {
                groupingAnalysis = { shouldGroup: false, matchingPets: [], remainingPets: pets };
            }
        }

        if (groupingAnalysis.shouldGroup && groupingAnalysis.matchingPets.length >= 2) {
            // Filter features to only those with content for these specific pets  
            const featuresWithContent = availableFeatures.filter(f =>
                !f.hasContent || f.hasContent(groupingAnalysis.matchingPets, team)
            );

            // Select feature from those that have content, prioritizing Growth/Hatching/Coin
            const selectedFeature = featuresWithContent.find(f =>
                f.id === 'growth' || f.id === 'hatch' || f.id === 'coin'
            ) || featuresWithContent[0] || availableFeatures[0];
            const groupedRow = this.createGroupedPetRow(
                team,
                groupingAnalysis.matchingPets,
                availableFeatures,
                selectedFeature,
                growthViewType,
                teamId
            );
            state.container.appendChild(groupedRow.container);
            cardStates.push(groupedRow.cardState);

            for (const remainingPet of groupingAnalysis.remainingPets) {
                const slotIndex = team.petIds.indexOf(remainingPet.id);
                const individualRow = this.createIndividualPetRow(
                    team,
                    remainingPet,
                    slotIndex,
                    availableFeatures,
                    growthViewType,
                    teamId
                );
                state.container.appendChild(individualRow.container);
                cardStates.push(individualRow.cardState);
            }
        } else {
            for (let slotIndex = 0; slotIndex < 3; slotIndex++) {
                const petId = team.petIds[slotIndex];
                const pet = petId ? (myPets.all.find(p => p.id === petId) ?? null) : null;

                const individualRow = this.createIndividualPetRow(
                    team,
                    pet,
                    slotIndex,
                    availableFeatures,
                    growthViewType,
                    teamId,
                    preferredFeature as 'xp' | 'growth' | undefined
                );
                state.container.appendChild(individualRow.container);
                cardStates.push(individualRow.cardState);
            }
        }

        // Update state
        state.cards = cardStates;

        // Re-add progress bar
        const barMode = preferredFeature === 'xp' ? 'xp' : (preferredFeature === 'growth' ? 'growth' : undefined);
        this.addProgressBar(state.container, pets, teamId, barMode);
    }

    /**
     * Get available features for a team (helper for rebuildInPlace)
     */
    private getAvailableFeaturesForTeam(team: PetTeam, pets: any[]): FeaturePanelDefinition[] {
        const purposeAnalysis = detectTeamPurpose(team);
        return FEATURE_PANELS.filter(panel =>
            panel.isAvailable()
        );
    }

    /**
     * Count total rows across all panels for combined panel detection
     * @param panels - Panels to count rows for
     * @param pets - Pets to count rows for
     * @param team - Team context
     * @param viewType - Growth view type
     * @returns Total row count across all panels
     */
    private countTotalRows(
        panels: FeaturePanelDefinition[],
        pets: any[],
        team: PetTeam,
        viewType?: 'egg' | 'plant'
    ): number {
        let totalRows = 0;

        for (const panel of panels) {
            if (panel.countRows) {
                totalRows += panel.countRows(pets, team, viewType);
            } else if (panel.hasContent?.(pets, team)) {
                // Default to 1 row if hasContent but no countRows
                totalRows += 1;
            }
        }

        return totalRows;
    }

    /**
     * Check if panels should be combined into single view
     * @param panels - Available panels with content
     * @param pets - Pets to check
     * @param team - Team context
     * @param viewType - Growth view type
     * @returns true if panels should merge (total rows ≤ threshold and multiple panels)
     */
    private shouldUseCombinedPanel(
        panels: FeaturePanelDefinition[],
        pets: any[],
        team: PetTeam,
        viewType?: 'egg' | 'plant'
    ): boolean {
        // Need at least 2 panels to combine
        if (panels.length < 2) return false;

        const totalRows = this.countTotalRows(panels, pets, team, viewType);
        return totalRows <= COMBINED_PANEL_MAX_ROWS;
    }

    /**
     * Create a combined panel row that merges all panels into a single view
     * Used when total rows across all panels ≤ COMBINED_PANEL_MAX_ROWS
     * 
     * Eliminates carousel navigation for sparse content - all stats visible at once
     */
    private createCombinedPanelRow(
        team: PetTeam,
        matchingPets: any[],
        panels: FeaturePanelDefinition[],
        viewType: 'egg' | 'plant' | undefined,
        teamId: string
    ): { container: HTMLElement; cardState: FeatureCardState } {
        const petRow = element('div', { className: 'expanded-pet-row expanded-pet-row--combined' });

        // Header without carousel buttons - show combined panel icons
        const rowHeader = element('div', { className: 'pet-row__header pet-row__header--combined' });

        // Build icons string from all panels
        const iconsSpan = element('span', {
            className: 'combined-panel__icons',
            textContent: panels.map(p => p.icon).join(' ')
        });
        rowHeader.appendChild(iconsSpan);

        const featureLabel = element('div', {
            textContent: 'COMBINED',
            className: 'pet-label'
        });
        rowHeader.appendChild(featureLabel);

        // Build grouped card layout (same as regular grouped row)
        const rowContent = element('div', {
            className: `base-pet-card base-pet-card--grouped${matchingPets.length === 2 ? '-2' : ''}`
        });

        // Left section with grouped sprites
        const left = element('div', { className: 'base-pet-card__left' });
        const spriteContainer = element('div', {
            className: `grouped-sprite-container${matchingPets.length === 2 ? ' grouped-sprite-container--duo' : ''}`
        });

        // Render each pet sprite
        for (const pet of matchingPets) {
            try {
                const mutations = (pet.mutations || []) as string[];
                if (MGSprite.has('pet', pet.petSpecies)) {
                    const canvas = MGSprite.toCanvas('pet', pet.petSpecies, {
                        mutations: mutations as any,
                        scale: 1,
                        boundsMode: 'padded'
                    });
                    canvas.style.imageRendering = 'pixelated';
                    spriteContainer.appendChild(canvas);
                }
            } catch (e) {
                // Skip failed sprites
            }
        }
        left.appendChild(spriteContainer);

        // Grouped badges row
        const badgesRow = element('div', {
            className: `grouped-badges${matchingPets.length === 2 ? ' grouped-badges--duo' : ''}`
        });
        for (const pet of matchingPets) {
            const isMax = pet.currentStrength >= pet.maxStrength;
            const badgeText = isMax ? `MAX ${pet.maxStrength}` : `STR ${pet.currentStrength}/${pet.maxStrength}`;
            const badge = element('span', {
                className: 'badge badge--neutral badge--soft badge--sm badge--pill',
                textContent: badgeText
            });
            badgesRow.appendChild(badge);
        }
        left.appendChild(badgesRow);
        rowContent.appendChild(left);

        // Right content slot - COMBINED panel content
        const contentSlot = element('div', { className: 'base-pet-card__content base-pet-card__content--combined' });

        // Render each panel's content into a section
        for (const panel of panels) {
            const section = element('div', { className: `combined-section combined-section--${panel.id}` });

            // Add panel icon prefix
            const iconPrefix = element('span', {
                className: 'combined-section__icon',
                textContent: panel.icon
            });
            section.appendChild(iconPrefix);

            // Render panel content
            const panelContent = element('div', { className: 'combined-section__content' });
            if (panel.renderGroupedSlot) {
                panel.renderGroupedSlot(matchingPets, team, panelContent, viewType, this.tileFilter);
            } else if (panel.renderPetSlot) {
                panel.renderPetSlot(matchingPets[0], team, panelContent, viewType, this.tileFilter);
            }

            // Only add section if it has content
            if (panelContent.children.length > 0 || panelContent.textContent?.trim()) {
                section.appendChild(panelContent);
                contentSlot.appendChild(section);
            }
        }

        rowContent.appendChild(contentSlot);

        // Create shell-like object for compatibility
        const shell = {
            root: rowContent,
            getContentSlot: () => contentSlot,
            setCentered: (centered: boolean) => {
                rowContent.classList.toggle('base-pet-card--centered', centered);
            },
            destroy: () => {
                rowContent.remove();
            },
            update: () => {
                // Update badges
                badgesRow.innerHTML = '';
                for (const pet of matchingPets) {
                    const isMax = pet.currentStrength >= pet.maxStrength;
                    const badgeText = isMax ? `MAX ${pet.maxStrength}` : `STR ${pet.currentStrength}/${pet.maxStrength}`;
                    const badge = element('span', {
                        className: 'badge badge--neutral badge--soft badge--sm badge--pill',
                        textContent: badgeText
                    });
                    badgesRow.appendChild(badge);
                }
            },
            build: () => rowContent
        } as any;

        const cardState: FeatureCardState = {
            slotIndex: -1, // Grouped
            currentFeatureId: 'combined',
            shell,
            container: petRow,
            featureData: panels[0] // Primary panel for reference
        };

        petRow.appendChild(rowHeader);
        petRow.appendChild(rowContent);

        return { container: petRow, cardState };
    }

    /**
     * Analyze team to determine if pets should be grouped
     * Supports growth teams (egg/plant) and hatching teams
     *
     * @param team - Pet team to analyze
     * @param pets - Pets in the team
     * @param viewCategory - Current view category ('egg' | 'plant') for view-dependent grouping
     */
    private analyzeTeamForGrouping(
        team: PetTeam,
        pets: any[],
        viewCategory?: 'egg' | 'plant'
    ): {
        shouldGroup: boolean;
        matchingPets: any[];
        remainingPets: any[];
    } {
        // Detect if this is a hatching team (has hatching abilities)
        const hasHatchingAbilities = (pet: any) => {
            const abilities = pet.abilities || [];
            return abilities.some((a: string) =>
                (ABILITY_CATEGORIES.MAX_STR_BOOST as readonly string[]).includes(a) ||
                (ABILITY_CATEGORIES.PET_MUTATION as readonly string[]).includes(a) ||
                (ABILITY_CATEGORIES.DOUBLE_HATCH as readonly string[]).includes(a) ||
                (ABILITY_CATEGORIES.PET_REFUND as readonly string[]).includes(a)
            );
        };

        const hatchingPets = pets.filter(hasHatchingAbilities);

        // If 2+ pets have hatching abilities, group them together
        if (hatchingPets.length >= 2 && hatchingPets.length <= 3) {
            const remainingPets = pets.filter(p => !hatchingPets.includes(p));
            return {
                shouldGroup: true,
                matchingPets: hatchingPets,
                remainingPets
            };
        }

        // Detect if this is a crop economy team (capybaras with DoubleHarvest/ProduceRefund)
        const CROP_HARVEST_ABILITIES = ['DoubleHarvest', 'ProduceRefund', 'ProduceRefundII'] as const;
        const hasCropHarvestAbilities = (pet: any) => {
            const abilities = pet.abilities || [];
            return abilities.some((a: string) =>
                CROP_HARVEST_ABILITIES.includes(a as any)
            );
        };

        const cropHarvestPets = pets.filter(hasCropHarvestAbilities);

        // If 2+ pets have crop harvest abilities (and no growth/mutation), group them
        if (cropHarvestPets.length >= 2 && cropHarvestPets.length <= 3) {
            // Check that these pets don't have growth/mutation abilities (which would use standard grouping)
            const hasGrowthOrMutation = cropHarvestPets.some(pet => {
                const abilities = pet.abilities || [];
                return abilities.some((a: string) =>
                    (ABILITY_CATEGORIES.EGG_GROWTH as readonly string[]).includes(a) ||
                    (ABILITY_CATEGORIES.PLANT_GROWTH as readonly string[]).includes(a) ||
                    (ABILITY_CATEGORIES.CROP_MUTATION as readonly string[]).includes(a)
                );
            });

            if (!hasGrowthOrMutation) {
                const remainingPets = pets.filter(p => !cropHarvestPets.includes(p));
                return {
                    shouldGroup: true,
                    matchingPets: cropHarvestPets,
                    remainingPets
                };
            }
        }

        // Otherwise, use standard growth-based grouping
        return analyzeTeamGrouping(pets, viewCategory);
    }

    private startUpdates(): void {
        if (this.featureUpdateInterval !== null) return;
        const env = MGEnvironment.detect();
        const intervalMs = env.platform === 'mobile' ? 8000 : 5000;
        this.featureUpdateInterval = setInterval(() => {
            this.updateAllFeatures();
        }, intervalMs);
    }

    private stopUpdates(): void {
        if (this.featureUpdateInterval !== null) {
            clearInterval(this.featureUpdateInterval);
            this.featureUpdateInterval = null;
        }
    }

    private updateAllFeatures(): void {
        for (const [teamId, state] of this.expandedTeams) {
            this.updateSpecificTeam(teamId, state);
        }
    }
}
