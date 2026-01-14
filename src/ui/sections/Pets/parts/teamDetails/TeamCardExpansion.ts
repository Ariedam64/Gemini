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

import { element } from "../../../../styles/helpers";
import { MGPetTeam } from "../../../../../features/petTeam";
import { Globals } from "../../../../../globals";
import { MGEnvironment } from "../../../../../modules";
import { MGSprite } from "../../../../../modules/sprite";
import type { PetTeam } from "../../../../../features/petTeam";
import { BasePetCard } from "../../../../components/BasePetCard/BasePetCard";
import { FEATURE_PANELS } from "./featurePanels";
import { featureCardCss } from "./featureCard.css";
import { detectTeamPurpose } from "../../../../../features/petTeam/logic/purpose";
import { GeminiIconButton } from "../../../../components/GeminiIconButton";
import {
    hasEggBoosts,
    hasPlantBoosts,
    calculateEggBoosts,
    calculatePlantBoosts,
    calculateBoostStats
} from "../../../../../features/growthTimers/logic/boostCalculator";
import { calculateItemEffectiveGrowth } from "../../../../../features/growthTimers/logic/effectiveTime";
import type { EggWithTile, PlantWithTile } from "../../../../../globals/core/types";
import type { FeaturePanelDefinition } from "./featurePanels";

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
};

export interface ExpansionHandlerOptions {
    getListContainer: () => HTMLElement | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Expansion Handler
// ─────────────────────────────────────────────────────────────────────────────

export class TeamCardExpansionHandler {
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

    expand(teamId: string): void {
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
        const growthViewType = isGrowthTeam ? 'plant' : undefined;

        const expandedContainer = element('div', {
            className: 'team-expanded-container',
        });

        const cardStates: FeatureCardState[] = [];

        // Create 3 pet rows (one per slot)
        for (let slotIndex = 0; slotIndex < 3; slotIndex++) {
            const petId = team.petIds[slotIndex];
            const pet = petId ? (myPets.all.find(p => p.id === petId) ?? null) : null;
            const selectedFeature = availableFeatures.find(f => f.id === 'xp') || availableFeatures[0];

            const petRow = element('div', { className: 'expanded-pet-row' });
            const rowHeader = element('div', { className: 'pet-row__header' });
            const prevBtn = element('button', { textContent: '<', className: 'pet-row__nav' });
            const featureLabel = element('div', {
                textContent: `${selectedFeature.icon} ${selectedFeature.label.toUpperCase()}`,
                className: 'pet-label'
            });
            const nextBtn = element('button', { textContent: '>', className: 'pet-row__nav' });

            // The "Blank Shell" - BasePetCard component
            let shell: BasePetCard | null = null;
            if (pet) {
                shell = new BasePetCard(pet);
            }

            const updateFeature = (newIndex: number) => {
                const newFeature = availableFeatures[newIndex];
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

                const state = cardStates.find(s => s.slotIndex === slotIndex);
                if (state) {
                    state.currentFeatureId = newFeature.id;
                    state.featureData = newFeature;
                }

                // Update header color
                rowHeader.className = `pet-row__header pet-row__header--${newFeature.id}`;
            };

            // Initialize header class
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
                    selectedFeature.renderPetSlot(pet, team, slot, isGrowthTeam ? 'plant' : undefined);

                    const isMax = pet.currentStrength >= pet.maxStrength;
                    const hasStats = slot.children.length > 0 || slot.textContent.trim().length > 0;
                    shell.setCentered(isMax && !hasStats);
                }

                // Set initial header class when first rendering
                rowHeader.className = `pet-row__header pet-row__header--${selectedFeature.id}`;
            } else {
                rowContent = element('div', { className: 'pet-row__content pet-row__content--empty' });
                rowContent.innerHTML = `
                    <div class="pet-row__sprite"><div class="pet-row__empty-slot">Empty</div></div>
                    <div class="pet-row__info"><span class="pet-row__empty-text">No pet assigned</span></div>
                `;
            }

            petRow.appendChild(rowHeader);
            petRow.appendChild(rowContent);
            expandedContainer.appendChild(petRow);

            cardStates.push({
                slotIndex,
                currentFeatureId: selectedFeature.id,
                shell: shell,
                container: petRow,
                featureData: selectedFeature
            });
        }

        this.expandedTeams.set(teamId, {
            cards: cardStates,
            expandedAt: Date.now(),
            container: expandedContainer,
            growthViewType
        });

        // Team progress bar (now state exists)
        this.addProgressBar(expandedContainer, pets, teamId);

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

    private addProgressBar(container: HTMLElement, pets: any[], teamId: string): void {
        const team = MGPetTeam.getTeam(teamId);
        const purpose = team ? detectTeamPurpose(team) : null;

        const isGrowthTeam = purpose?.primary === 'time-reduction' || hasEggBoosts(pets) || hasPlantBoosts(pets);

        if (isGrowthTeam) {
            this.renderGrowthSummaryBar(container, pets, teamId);
        } else {
            this.addXpProgressBar(container, pets);
        }
    }

    private addXpProgressBar(container: HTMLElement, pets: any[]): void {
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
            const pets = team ? MGPetTeam.getPetsForTeam(team) : [];
            this.renderGrowthSummaryBar(state.container, pets, teamId);

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
