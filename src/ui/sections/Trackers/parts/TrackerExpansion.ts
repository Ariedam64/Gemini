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
import type { EggWithTile, PlantWithTile } from "../../../../globals/core/types";
import type { FeaturePanelDefinition } from "./featurePanels";
import { analyzeTeamGrouping } from "../../../../features/growthTimers/logic/petAbilityUtils";

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
};

export interface ExpansionHandlerOptions {
    getListContainer: () => HTMLElement | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Expansion Handler
// ─────────────────────────────────────────────────────────────────────────────

export class TrackerExpansionHandler {
    private expandedTeams: Map<string, ExpandedTeamState> = new Map();
    private featureUpdateInterval: ReturnType<typeof setInterval> | null = null;
    private options: ExpansionHandlerOptions;

    constructor(options: ExpansionHandlerOptions) {
        this.options = options;
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

        const availableFeatures = FEATURE_PANELS.filter(f => {
            if (!f.isAvailable()) return false;
            if (f.shouldDisplay && !f.shouldDisplay(team, pets)) return false;
            return true;
        });

        if (availableFeatures.length === 0) {
            console.warn('[TeamCardExpansion] No available features to display');
            return;
        }

        // Detect team configuration before building sub-components
        const isGrowthTeam = detectTeamPurpose(team)?.primary === 'time-reduction' || hasEggBoosts(pets) || hasPlantBoosts(pets);

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
        const groupingAnalysis = forceIndividual
            ? { shouldGroup: false, matchingPets: [], remainingPets: pets }
            : this.analyzeTeamForGrouping(team, pets, growthViewType);

        if (groupingAnalysis.shouldGroup && groupingAnalysis.matchingPets.length >= 2) {
            // Create grouped card for matching pets
            const selectedFeature = availableFeatures.find(f => f.id === 'growth') || availableFeatures[0];
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
        const team = MGPetTeam.getTeam(teamId);
        const purpose = team ? detectTeamPurpose(team) : null;
        const state = this.expandedTeams.get(teamId);

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

        const team = MGPetTeam.getTeam(teamId);
        if (!team) return;

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
        const items = viewType === 'egg' ? garden.eggs.growing : garden.crops.growing;
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

        controls.appendChild(toggleBtn);
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
            const team = MGPetTeam.getTeam(teamId);
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
                this.collapse(teamId);
                setTimeout(() => this.expand(teamId, false), 50);
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
                        this.collapse(teamId);
                        setTimeout(() => this.expand(teamId, false), 50);
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
        const team = MGPetTeam.getTeam(teamId);
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
                        card.featureData.renderPetSlot(pet, team, slot, state.growthViewType);

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
        const team = MGPetTeam.getTeam(teamId);
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
                    (card.featureData as any).renderGroupedSlot(allPets, team, slot, state.growthViewType);

                    // Prevent centering when stats exist
                    const hasStats = slot.children.length > 0 || slot.textContent.trim().length > 0;
                    card.shell.setCentered(!hasStats);
                }
            }
        }
    }

    private showGrowthDropdown(anchor: HTMLElement, items: any[], viewType: 'egg' | 'plant', teamId: string): void {
        // Remove any existing dropdown
        const existingMenu = anchor.closest('.growth-summary-overhaul')?.querySelector('.growth-dropdown-menu');
        if (existingMenu) {
            existingMenu.remove();
            return; // Toggle behavior: if open, just close
        }

        const menu = element('div', { className: 'growth-dropdown-menu' });

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

        // Position dropdown below button (relative to container, not document.body)
        menu.style.position = 'absolute';
        menu.style.top = '100%';
        menu.style.right = '0';
        menu.style.marginTop = '4px';
        menu.style.zIndex = '100';

        // Make parent relative for positioning
        const controls = anchor.parentElement;
        if (controls) {
            controls.style.position = 'relative';
            controls.appendChild(menu);
        }

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
        // Use preferredFeature if specified, otherwise use intelligent selection
        let selectedFeature: FeaturePanelDefinition;
        if (preferredFeature) {
            selectedFeature = availableFeatures.find(f => f.id === preferredFeature) || availableFeatures[0];
        } else {
            // Intelligent feature selection: prefer growth for growth teams, XP for XP teams
            selectedFeature = viewType
                ? (availableFeatures.find(f => f.id === 'growth') || availableFeatures[0])
                : (availableFeatures.find(f => f.id === 'xp') || availableFeatures[0]);
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
            const newFeature = availableFeatures[newIndex];

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
                    newFeature.renderPetSlot(pet, team, slot, state?.growthViewType);
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

        let currentIndex = availableFeatures.findIndex(f => f.id === selectedFeature.id);
        prevBtn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            currentIndex = (currentIndex - 1 + availableFeatures.length) % availableFeatures.length;
            updateFeature(currentIndex);
        });
        nextBtn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            currentIndex = (currentIndex + 1) % availableFeatures.length;
            updateFeature(currentIndex);
        });

        rowHeader.appendChild(prevBtn);
        rowHeader.appendChild(featureLabel);
        rowHeader.appendChild(nextBtn);

        let rowContent: HTMLElement;
        if (shell && pet) {
            rowContent = shell.build();
            if (selectedFeature.renderPetSlot) {
                const slot = shell.getContentSlot();
                selectedFeature.renderPetSlot(pet, team, slot, viewType);

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

        return {
            container: petRow,
            cardState: { ...cardState, container: petRow }
        };
    }

    /**
     * Create a grouped pet row for 2-3 matching pets with team-aggregated stats
     */
    private createGroupedPetRow(
        team: PetTeam,
        matchingPets: any[],
        availableFeatures: FeaturePanelDefinition[],
        selectedFeature: FeaturePanelDefinition,
        viewType: 'egg' | 'plant' | undefined,
        teamId: string
    ): { container: HTMLElement; cardState: FeatureCardState } {
        const petRow = element('div', { className: 'expanded-pet-row expanded-pet-row--grouped' });
        const rowHeader = element('div', { className: 'pet-row__header' });
        const prevBtn = element('button', { textContent: '<', className: 'pet-row__nav' });
        const featureLabel = element('div', {
            textContent: `${selectedFeature.icon} ${selectedFeature.label.toUpperCase()}`,
            className: 'pet-label'
        });
        const nextBtn = element('button', { textContent: '>', className: 'pet-row__nav' });

        const shell = new BasePetCard(matchingPets[0], {
            groupedPets: matchingPets,
            hideStr: true
        });

        const cardState: any = {
            slotIndex: -1,
            currentFeatureId: selectedFeature.id,
            shell,
            featureData: selectedFeature
        };

        const updateFeature = (newIndex: number) => {
            const newFeature = availableFeatures[newIndex];

            // Check for feature incompatibility (XP should never be grouped)
            if (newFeature.id === 'xp') {
                // Need to re-expand with individual cards
                this.collapseAndReexpandForXP(teamId);
                return;
            }

            featureLabel.textContent = `${newFeature.icon} ${newFeature.label.toUpperCase()}`;

            const slot = shell.getContentSlot();
            slot.innerHTML = '';

            if ((newFeature as any).renderGroupedSlot) {
                const state = this.expandedTeams.get(teamId);
                (newFeature as any).renderGroupedSlot(matchingPets, team, slot, state?.growthViewType);
            } else if (newFeature.renderPetSlot) {
                const state = this.expandedTeams.get(teamId);
                newFeature.renderPetSlot(matchingPets[0], team, slot, state?.growthViewType);
            }

            // Prevent centering when stats are present
            const hasStats = slot.children.length > 0 || slot.textContent.trim().length > 0;
            shell.setCentered(!hasStats);

            cardState.currentFeatureId = newFeature.id;
            cardState.featureData = newFeature;
            rowHeader.className = `pet-row__header pet-row__header--${newFeature.id}`;
        };

        rowHeader.className = `pet-row__header pet-row__header--${selectedFeature.id}`;

        let currentIndex = availableFeatures.findIndex(f => f.id === selectedFeature.id);
        prevBtn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            currentIndex = (currentIndex - 1 + availableFeatures.length) % availableFeatures.length;
            updateFeature(currentIndex);
        });
        nextBtn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            currentIndex = (currentIndex + 1) % availableFeatures.length;
            updateFeature(currentIndex);
        });

        rowHeader.appendChild(prevBtn);
        rowHeader.appendChild(featureLabel);
        rowHeader.appendChild(nextBtn);

        const rowContent = shell.build();
        const slot = shell.getContentSlot();

        if ((selectedFeature as any).renderGroupedSlot) {
            (selectedFeature as any).renderGroupedSlot(matchingPets, team, slot, viewType);
        } else if (selectedFeature.renderPetSlot) {
            selectedFeature.renderPetSlot(matchingPets[0], team, slot, viewType);
        }

        petRow.appendChild(rowHeader);
        petRow.appendChild(rowContent);

        return {
            container: petRow,
            cardState: { ...cardState, container: petRow }
        };
    }

    /**
     * Collapse and re-expand team for XP feature (incompatible with grouping)
     */
    private collapseAndReexpandForXP(teamId: string): void {
        // Collapse the current grouped display
        this.collapse(teamId);

        // Re-expand after a moment - will naturally create individual cards
        setTimeout(() => {
            this.expand(teamId, true, 'xp'); // Force individual cards with XP view
        }, 100);
    }

    /**
     * Collapse and re-expand team to restore grouping (for switching FROM XP to Growth)
     */
    private collapseAndReexpandForGrowth(teamId: string): void {
        // Collapse the current individual display
        this.collapse(teamId);

        // Re-expand with forceIndividual=false to allow natural grouping
        setTimeout(() => {
            this.expand(teamId, false, 'growth'); // Allow grouping with growth view
        }, 100);
    }

    /**
     * Analyze team to determine if pets should be grouped
     * Only groups for growth teams (not XP) with relevant abilities for the view
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
        // Must be growth team (not XP - XP always shows individual cards)
        const purpose = detectTeamPurpose(team);
        const isGrowthTeam = purpose?.primary === 'time-reduction' ||
            hasEggBoosts(pets) || hasPlantBoosts(pets);

        if (!isGrowthTeam) {
            return { shouldGroup: false, matchingPets: [], remainingPets: pets };
        }

        // Check for 2-3 matching pets using view-dependent grouping
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
