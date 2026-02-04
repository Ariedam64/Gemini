/**
 * Preview Section
 * Shows preview of plants matching the rule conditions
 */

import { element } from "../../../../../styles/helpers";
import { Card } from "../../../../../components/Card/Card";
import { SegmentedControl } from "../../../../../components/SegmentedControl/SegmentedControl";
import { renderPlantSprite, createPlaceholder, getWeatherMutationIndex } from "../helpers";
import { MUTATION_GROUPS, COLOR_MUTATIONS } from "../types";
import type { RuleMode, MutationMatchMode } from "../../../../../../features/harvestLocker";

/* ─────────────────────────── Types ─────────────────────────── */

export interface PreviewSectionOptions {
    /** Species to use for preview (fallback: "Starweaver") */
    species?: string | null;
    /** Current rule mode */
    ruleMode: RuleMode;
    /** Whether size condition is enabled */
    sizeEnabled: boolean;
    /** Minimum size percentage (shown below each preview plant) */
    sizePercentage?: number;
    /** Whether color mutation is enabled */
    colorEnabled: boolean;
    /** Selected color mutations */
    colorMutations: string[];
    /** Whether weather mutation is enabled */
    weatherEnabled: boolean;
    /** Selected weather mutations */
    weatherMutations: string[];
    /** Weather match mode */
    weatherMatchMode: MutationMatchMode;
}

export interface PreviewSectionHandle {
    root: HTMLElement;
    /** Update preview with new state */
    update(options: Partial<PreviewSectionOptions>): void;
    destroy(): void;
}

/* ─────────────────────────── Constants ─────────────────────────── */

const SPRITE_SIZE = 60;

/* ─────────────────────────── Factory ─────────────────────────── */

export function createPreviewSection(options: PreviewSectionOptions): PreviewSectionHandle {
    let state = { ...options };
    let pendingRaf: number | null = null;
    let activeColorFilter: string | null = null;

    const content = element("div", {
        style: "display: flex; flex-direction: column; gap: 8px;",
    });

    // Color filter container (centered, shown when 2+ colors selected)
    const filterContainer = element("div", {
        style: "display: flex; justify-content: center;",
    });

    // Preview container
    const previewContainer = element("div", {
        className: "harvest-locker-preview-grid",
    });

    content.appendChild(filterContainer);
    content.appendChild(previewContainer);

    // Size badge (top-right of card header, shown only when size condition is active)
    const sizeBadgeEl = element("div", {
        style: `
            font-size: 10px;
            font-weight: 600;
            color: var(--accent);
            background: color-mix(in oklab, var(--accent) 12%, transparent);
            border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
            border-radius: 10px;
            padding: 1px 6px;
            display: none;
        `,
    });
    if (state.sizeEnabled && state.sizePercentage !== undefined) {
        sizeBadgeEl.textContent = `size ≥ ${state.sizePercentage}%`;
        sizeBadgeEl.style.display = "";
    }

    const card = Card(
        {
            title: "Preview",
            subtitle: getDescriptionText(),
            actions: [sizeBadgeEl],
            variant: "soft",
            padding: "md",
            expandable: true,
            defaultExpanded: true,
        },
        content
    );

    const subtitleEl = card.querySelector(".card-subtitle");


    // Initial render
    render();

    /* ───────────────────── Rendering ───────────────────── */

    function getDescriptionText(): string {
        return state.ruleMode === "lock"
            ? "Preview of plants that will be blocked from harvesting"
            : "Preview of plants that will be harvestable";
    }

    function render(): void {
        // Cancel any pending rAF to avoid stale previews piling up
        if (pendingRaf !== null) {
            cancelAnimationFrame(pendingRaf);
            pendingRaf = null;
        }

        // Update subtitle
        if (subtitleEl) subtitleEl.textContent = getDescriptionText();

        // Update size badge visibility
        if (state.sizeEnabled && state.sizePercentage !== undefined) {
            sizeBadgeEl.textContent = `size ≥ ${state.sizePercentage}%`;
            sizeBadgeEl.style.display = "";
        } else {
            sizeBadgeEl.style.display = "none";
        }

        // Color filter: show SegmentedControl when 2+ colors are selected (including "none")
        // Preserve canonical order from COLOR_MUTATIONS (none → Gold → Rainbow)
        const selectedColors = state.colorEnabled
            ? COLOR_MUTATIONS.filter(m => state.colorMutations.includes(m))
            : [];

        if (selectedColors.length >= 2) {
            // Reset filter if current selection is no longer valid
            if (activeColorFilter && !(selectedColors as readonly string[]).includes(activeColorFilter)) {
                activeColorFilter = selectedColors[0];
            }
            if (!activeColorFilter) {
                activeColorFilter = selectedColors[0];
            }

            filterContainer.replaceChildren();
            const control = SegmentedControl({
                segments: selectedColors.map(color => ({
                    id: color,
                    label: color === "none" ? "Normal" : color,
                })),
                selected: activeColorFilter,
                onChange: (id) => {
                    activeColorFilter = id;
                    render();
                },
            });
            filterContainer.appendChild(control);
        } else {
            activeColorFilter = null;
            filterContainer.replaceChildren();
        }

        // Clear and regenerate preview
        previewContainer.replaceChildren();

        // Wait for container to be rendered
        pendingRaf = requestAnimationFrame(() => {
            const previews = generatePreviewPlants();
            previews.forEach(preview => {
                previewContainer.appendChild(preview);
            });
        });
    }

    function generatePreviewPlants(): HTMLElement[] {
        const previews: HTMLElement[] = [];
        const exampleSpecies = state.species || "Starweaver";

        const hasAnyCondition = state.sizeEnabled || state.colorEnabled || state.weatherEnabled;

        if (!hasAnyCondition) {
            previews.push(createPreviewPlant(exampleSpecies, []));
            return previews;
        }

        const validCombinations = generateValidCombinations();

        // Sort: color (none → Gold → Rainbow), puis nombre de mutations météo (0 → 1 → 2),
        // puis ordre des mutations météo selon MGData (Wet → Chilled → Frozen → Dawnlit → …)
        validCombinations.sort((a, b) => {
            const colorIndexA = Math.max(0, ...a.map(m => COLOR_MUTATIONS.indexOf(m as typeof COLOR_MUTATIONS[number])));
            const colorIndexB = Math.max(0, ...b.map(m => COLOR_MUTATIONS.indexOf(m as typeof COLOR_MUTATIONS[number])));
            if (colorIndexA !== colorIndexB) return colorIndexA - colorIndexB;

            const weatherA = a.filter(m => !COLOR_MUTATIONS.includes(m as typeof COLOR_MUTATIONS[number]))
                .sort((x, y) => getWeatherMutationIndex(x) - getWeatherMutationIndex(y));
            const weatherB = b.filter(m => !COLOR_MUTATIONS.includes(m as typeof COLOR_MUTATIONS[number]))
                .sort((x, y) => getWeatherMutationIndex(x) - getWeatherMutationIndex(y));

            if (weatherA.length !== weatherB.length) return weatherA.length - weatherB.length;

            // Same count: compare element-by-element using MGData order
            for (let i = 0; i < weatherA.length; i++) {
                const diff = getWeatherMutationIndex(weatherA[i]) - getWeatherMutationIndex(weatherB[i]);
                if (diff !== 0) return diff;
            }
            return 0;
        });

        if (validCombinations.length === 0) {
            // Invalid combination selected
            const errorMsg = element("div", {
                style: "padding: 12px; text-align: center; color: #ef4444; font-size: 12px;",
            }, "Invalid mutation combination");
            previews.push(errorMsg);
            return previews;
        }

        // Apply color filter: each segment shows exclusively its color group
        const filtered = activeColorFilter
            ? validCombinations.filter(combo => {
                const comboColors = combo.filter(m => COLOR_MUTATIONS.includes(m as typeof COLOR_MUTATIONS[number]) && m !== "none");
                if (activeColorFilter === "none") return comboColors.length === 0;
                return comboColors.includes(activeColorFilter!);
            })
            : validCombinations;

        filtered.forEach(combo => {
            previews.push(createPreviewPlant(exampleSpecies, combo));
        });

        return previews;
    }

    function generateValidCombinations(): string[][] {
        const combinations: string[][] = [];

        // Collect all selected mutations (excluding "none" for processing)
        const weatherMuts = state.weatherEnabled
            ? state.weatherMutations.filter(m => m !== "none")
            : [];
        const colorMuts = state.colorEnabled
            ? state.colorMutations.filter(m => m !== "none")
            : [];

        // Check if "none" is selected for each category
        const includeWeatherNone = state.weatherEnabled && state.weatherMutations.includes("none");
        const includeColorNone = state.colorEnabled && state.colorMutations.includes("none");

        // If both categories are disabled or only "none" is selected
        if ((weatherMuts.length === 0 && colorMuts.length === 0) ||
            (!state.weatherEnabled && !state.colorEnabled)) {
            combinations.push([]);
            return combinations;
        }

        const selectedWet = weatherMuts.filter(m => (MUTATION_GROUPS.wet as readonly string[]).includes(m));
        const selectedLunar = weatherMuts.filter(m => (MUTATION_GROUPS.lunar as readonly string[]).includes(m));

        // Helper to generate weather × color combinations
        const generateCombos = (weatherCombos: string[][], colorCombos: string[][]) => {
            if (weatherCombos.length === 0 && colorCombos.length === 0) {
                combinations.push([]);
            } else if (weatherCombos.length === 0) {
                colorCombos.forEach(colorCombo => {
                    combinations.push([...colorCombo]);
                });
            } else if (colorCombos.length === 0) {
                weatherCombos.forEach(weatherCombo => {
                    combinations.push([...weatherCombo]);
                });
            } else {
                weatherCombos.forEach(weatherCombo => {
                    colorCombos.forEach(colorCombo => {
                        combinations.push([...weatherCombo, ...colorCombo]);
                    });
                });
            }
        };

        // Build weather combinations
        const weatherCombos: string[][] = [];
        if (includeWeatherNone) {
            weatherCombos.push([]);
        }

        if (state.weatherMatchMode === "all" && weatherMuts.length > 0) {
            const hasMultipleWet = selectedWet.length > 1;
            const hasMultipleLunar = selectedLunar.length > 1;

            if (hasMultipleWet || hasMultipleLunar) {
                return []; // Invalid combination
            }

            weatherCombos.push(weatherMuts);
        } else if (state.weatherMatchMode === "any" && weatherMuts.length > 0) {
            // Individual weather mutations
            weatherMuts.forEach(mut => {
                weatherCombos.push([mut]);
            });

            // Stackable combinations (one from each group)
            selectedWet.forEach(wet => {
                selectedLunar.forEach(lunar => {
                    weatherCombos.push([wet, lunar]);
                });
            });
        }

        // Build color combinations
        const colorCombos: string[][] = [];
        if (includeColorNone) {
            colorCombos.push([]);
        }
        colorMuts.forEach(colorMut => {
            colorCombos.push([colorMut]);
        });

        // Generate all combinations
        generateCombos(weatherCombos, colorCombos);

        // Remove duplicates
        const uniqueCombos = Array.from(
            new Set(combinations.map(combo => combo.sort().join(",")))
        ).map(str => str.split(",").filter(Boolean));

        return uniqueCombos;
    }

    function createPreviewPlant(speciesName: string, mutations: string[]): HTMLElement {
        const container = element("div", {
            style: "flex-shrink: 0;",
        });

        renderPlantSprite(speciesName, container, {
            size: SPRITE_SIZE,
            mutations,
        });

        return container;
    }

    /* ───────────────────── Public API ───────────────────── */

    function update(newOptions: Partial<PreviewSectionOptions>): void {
        state = { ...state, ...newOptions };
        render();
    }

    function destroy(): void {
        if (pendingRaf !== null) {
            cancelAnimationFrame(pendingRaf);
            pendingRaf = null;
        }
        previewContainer.replaceChildren();
    }

    return {
        root: card,
        update,
        destroy,
    };
}
