/**
 * HarvestLockerCard Part
 * Rule-based harvest lock management UI
 *
 * Refactored to factory pattern per .claude/rules/ui/sections.md
 */

import { Card } from "../../../../components/Card/Card";
import { element } from "../../../../styles/helpers";
import { SegmentedControl, type SegmentedControlHandle } from "../../../../components/SegmentedControl/SegmentedControl";
import { Button, type ButtonHandle } from "../../../../components/Button/Button";
import { PlantSelector, type PlantSelectorHandle } from "../../../../components/PlantSelector/PlantSelector";
import { MGHarvestLocker } from "../../../../../features/harvestLocker";
import type { HarvestRule } from "../../../../../features/harvestLocker";
import { MGData } from "../../../../../modules";
import { createRuleEditorModal } from "./RuleEditorModal";
import { createExistingRuleSelector } from "./ExistingRuleSelector";
import { setHarvestLockerMode, setSelectedSpecies, setSearchQuery } from "../../state";
import { renderPlantSprite, getRuleSignature } from "./helpers";
import type { ViewMode } from "./types";

/* ─────────────────────────── Types ─────────────────────────── */

export interface HarvestLockerCardOptions {
    defaultExpanded?: boolean;
    defaultMode?: ViewMode;
    defaultSelectedSpecies?: string | null;
    defaultSearchQuery?: string;
    onExpandChange?: (expanded: boolean) => void;
}

export interface HarvestLockerCardHandle {
    root: HTMLDivElement;
    render(): void;
    destroy(): void;
}

/* ─────────────────────────── Factory ─────────────────────────── */

export function createHarvestLockerCard(options: HarvestLockerCardOptions = {}): HarvestLockerCardHandle {
    // State
    let mode: ViewMode = options.defaultMode ?? "overall";
    let selectedSpecies: string | null = options.defaultSelectedSpecies ?? null;
    let rules: HarvestRule[] = [];

    // DOM references
    let card: HTMLDivElement | null = null;
    let modeContainer: HTMLDivElement | null = null;
    let content: HTMLDivElement | null = null;

    // Component references
    let modeControl: SegmentedControlHandle | null = null;
    let speciesSelector: PlantSelectorHandle | null = null;
    let createButton: ButtonHandle | null = null;

    // Cleanups
    const cleanups: (() => void)[] = [];

    // Build card
    card = buildCard();

    /* ───────────────────── Card Building ───────────────────── */

    function buildCard(): HTMLDivElement {
        const wrapper = element("div", {
            className: "harvest-locker-card-wrapper",
        });

        modeContainer = element("div", {
            className: "harvest-locker-card__mode-container",
        });
        wrapper.appendChild(modeContainer);

        content = element("div", {
            className: "harvest-locker-card__content",
        });
        wrapper.appendChild(content);

        const cardEl = Card(
            {
                title: "Crop Harvest",
                subtitle: "Prevent harvesting specific crops",
                expandable: true,
                defaultExpanded: options.defaultExpanded ?? true,
                onExpandChange: options.onExpandChange,
            },
            wrapper
        );

        // Initial render
        loadRules();
        ensureModeControl();
        renderContent();

        return cardEl;
    }

    /* ───────────────────── Data Loading ───────────────────── */

    function loadRules(): void {
        if (mode === "overall") {
            rules = MGHarvestLocker.getOverallRules();
        } else {
            rules = selectedSpecies
                ? MGHarvestLocker.getSpeciesRules(selectedSpecies)
                : [];
        }
    }

    /* ───────────────────── Rendering ───────────────────── */

    function renderContent(): void {
        if (!content) return;

        content.replaceChildren();

        // Species selector (if in "By Species" mode)
        if (mode === "bySpecies") {
            renderSpeciesSelector();

            // Show selected species section if one is selected
            if (selectedSpecies) {
                renderSelectedSpeciesSection();
            }
        }

        // Rules list
        renderRulesList();

        // Action buttons
        renderActionButtons();
    }

    function ensureModeControl(): void {
        if (!modeContainer) return;

        if (!modeControl) {
            modeControl = SegmentedControl({
                segments: [
                    { id: "overall", label: "Overall" },
                    { id: "bySpecies", label: "By Species" },
                ],
                selected: mode,
                onChange: (id) => {
                    mode = id as ViewMode;
                    setHarvestLockerMode(mode);
                    loadRules();
                    renderContent();
                },
            });

            modeContainer.appendChild(modeControl);
            return;
        }

        if (modeControl.getSelected() !== mode) {
            modeControl.select(mode);
        }
    }

    function renderSpeciesSelector(): void {
        if (!content) return;

        const plantsData = MGData.get("plants") as Record<string, unknown> | null;
        if (!plantsData || Object.keys(plantsData).length === 0) {
            const noSpecies = element("div", {
                className: "harvest-locker-card__message harvest-locker-card__message--compact",
            }, "No species available");
            content.appendChild(noSpecies);
            return;
        }

        // Build map of species to rule counts
        const config = MGHarvestLocker.getConfig();
        const speciesRuleCount: Record<string, number> = {};
        Object.entries(config.speciesRules).forEach(([species, speciesRules]) => {
            speciesRuleCount[species] = speciesRules.length;
        });

        // Create PlantSelector
        speciesSelector = PlantSelector({
            selectedSpecies: selectedSpecies ?? undefined,
            placeholder: "Search plants...",
            speciesRuleCount,
            onChange: (species: string) => {
                selectedSpecies = species;
                setSelectedSpecies(species);
                loadRules();
                renderContent();
            },
            onSearchChange: (query: string) => {
                setSearchQuery(query);
            },
        });

        const selectorWrapper = element("div", {
            className: "harvest-locker-card__control",
        });
        selectorWrapper.appendChild(speciesSelector.root);
        content.appendChild(selectorWrapper);
    }

    function renderSelectedSpeciesSection(): void {
        if (!content || !selectedSpecies) return;

        // Section header with divider
        const sectionHeader = element("div", {
            className: "harvest-locker-card__species-section-header",
        });

        // Sprite container
        const spriteContainer = element("div", {
            className: "harvest-locker-card__species-section-sprite",
        });

        renderPlantSprite(selectedSpecies, spriteContainer, { size: 36 });

        sectionHeader.appendChild(spriteContainer);

        // Name and label container
        const textContainer = element("div", {
            className: "harvest-locker-card__species-section-text",
        });

        const name = element("div", {
            className: "harvest-locker-card__species-section-name",
        }, selectedSpecies);
        textContainer.appendChild(name);

        const label = element("div", {
            className: "harvest-locker-card__species-section-label",
        }, "SELECTED");
        textContainer.appendChild(label);

        sectionHeader.appendChild(textContainer);
        content.appendChild(sectionHeader);
    }

    function renderRulesList(): void {
        if (!content) return;

        if (mode === "bySpecies" && !selectedSpecies) {
            const placeholder = element("div", {
                className: "harvest-locker-card__message",
            }, "Select a species to view and manage rules");
            content.appendChild(placeholder);
            return;
        }

        // Section frame (cadran)
        const rulesSection = element("div", {
            className: "harvest-locker-card__rules-section",
        });

        const sectionLabel = element("div", {
            className: "harvest-locker-card__rules-section-label",
        }, "Rules");
        rulesSection.appendChild(sectionLabel);

        if (rules.length === 0) {
            const empty = element("div", {
                className: "harvest-locker-card__empty",
            }, "No rules yet");
            rulesSection.appendChild(empty);
            content.appendChild(rulesSection);
            return;
        }

        const list = element("div", {
            className: "harvest-locker-card__list",
        });

        rules.forEach(rule => {
            const item = createRuleItem(rule);
            list.appendChild(item);
        });

        rulesSection.appendChild(list);

        // Hint desktop/mobile — détection auto via CSS media query
        const hint = element("div", {
            className: "harvest-locker-card__rules-hint",
        });
        hint.appendChild(element("span", {
            className: "harvest-locker-card__rules-hint--desktop",
        }, "Click to edit · Right-click to delete"));
        hint.appendChild(element("span", {
            className: "harvest-locker-card__rules-hint--mobile",
        }, "Tap to edit · Long-press to delete"));
        rulesSection.appendChild(hint);

        content.appendChild(rulesSection);
    }

    function createRuleItem(rule: HarvestRule): HTMLElement {
        const item = element("div", {
            className: "harvest-locker-rule-item",
        });

        // Rule name
        const name = element("div", {
            className: "harvest-locker-rule-item__name",
        }, rule.name);
        item.appendChild(name);

        // Mode badge
        const badge = element("div", {
            className: "harvest-locker-rule-item__badge",
        }, rule.mode);
        item.appendChild(badge);

        // Right-click to delete (desktop)
        item.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            handleDeleteRule(rule.id);
        });

        // Long press to delete (mobile) / click to edit
        let longPressTimer: number | null = null;
        let longPressTriggered = false;

        item.addEventListener("touchstart", () => {
            longPressTriggered = false;
            longPressTimer = window.setTimeout(() => {
                longPressTriggered = true;
                handleDeleteRule(rule.id);
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }, 500);
        });

        item.addEventListener("touchend", () => {
            if (longPressTimer) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }
            if (!longPressTriggered) {
                handleEditRule(rule);
            }
        });

        item.addEventListener("touchmove", () => {
            if (longPressTimer) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }
        });

        // Mouse click to edit (desktop)
        item.addEventListener("click", () => {
            handleEditRule(rule);
        });

        return item;
    }

    function renderActionButtons(): void {
        if (!content) return;

        if (mode === "bySpecies" && !selectedSpecies) {
            return;
        }

        const buttons = element("div", {
            className: "harvest-locker-card__actions",
        });

        // In bySpecies mode, show "Add Existing Rule" button
        if (mode === "bySpecies" && selectedSpecies) {
            const overallRules = MGHarvestLocker.getOverallRules();

            if (overallRules.length > 0) {
                // Check if there are available rules (not already assigned)
                const speciesRules = MGHarvestLocker.getSpeciesRules(selectedSpecies);
                const assignedSignatures = new Set(
                    speciesRules.map(rule => getRuleSignature(rule))
                );
                const availableRules = overallRules.filter(
                    rule => !assignedSignatures.has(getRuleSignature(rule))
                );

                const addExistingBtn = Button({
                    label: "Add Existing Rule",
                    variant: "default",
                    disabled: availableRules.length === 0,
                    onClick: () => handleAddExistingRule(),
                });
                buttons.appendChild(addExistingBtn);
            }
        }

        createButton = Button({
            label: mode === "bySpecies" ? "Create Override Rule" : "Create Rule",
            variant: "primary",
            onClick: () => handleCreateRule(),
        });
        buttons.appendChild(createButton);

        content.appendChild(buttons);
    }

    /* ───────────────────── Event Handlers ───────────────────── */

    function handleCreateRule(): void {
        createRuleEditorModal({
            mode: mode === "overall" ? "overall" : "species",
            species: selectedSpecies,
            onSave: (data) => {
                if (mode === "overall") {
                    MGHarvestLocker.addNewOverallRule(
                        data.name,
                        data.ruleMode,
                        data.sizeCondition,
                        data.mutationCondition
                    );
                } else if (selectedSpecies) {
                    MGHarvestLocker.addNewSpeciesRule(
                        selectedSpecies,
                        data.name,
                        data.ruleMode,
                        data.sizeCondition,
                        data.mutationCondition
                    );
                }

                loadRules();
                renderContent();
            },
        });
    }

    function handleEditRule(rule: HarvestRule): void {
        createRuleEditorModal({
            mode: mode === "overall" ? "overall" : "species",
            species: selectedSpecies,
            ruleId: rule.id,
            initialData: {
                name: rule.name,
                ruleMode: rule.mode,
                sizeCondition: rule.sizeCondition,
                mutationCondition: rule.mutationCondition,
            },
            onSave: (data) => {
                MGHarvestLocker.modifyRule(rule.id, {
                    name: data.name,
                    mode: data.ruleMode,
                    sizeCondition: data.sizeCondition,
                    mutationCondition: data.mutationCondition,
                });

                loadRules();
                renderContent();
            },
            onDelete: () => {
                handleDeleteRule(rule.id);
            },
        });
    }

    function handleDeleteRule(ruleId: string): void {
        MGHarvestLocker.removeRule(ruleId);
        loadRules();
        renderContent();
    }

    function handleAddExistingRule(): void {
        if (mode !== "bySpecies" || !selectedSpecies) return;

        const overallRules = MGHarvestLocker.getOverallRules();
        if (overallRules.length === 0) return;

        // Get rules already assigned to this species
        const speciesRules = MGHarvestLocker.getSpeciesRules(selectedSpecies);

        // Create a set of signatures for rules already assigned to this species
        const assignedSignatures = new Set(
            speciesRules.map(rule => getRuleSignature(rule))
        );

        // Filter overall rules to exclude those with equivalent conditions
        const availableRules = overallRules.filter(
            rule => !assignedSignatures.has(getRuleSignature(rule))
        );

        if (availableRules.length === 0) {
            return;
        }

        createExistingRuleSelector({
            species: selectedSpecies,
            existingRules: availableRules,
            onSelect: () => {
                loadRules();
                renderContent();
            },
            onCancel: () => {
                // Nothing to do on cancel
            },
        });
    }

    /* ───────────────────── Public API ───────────────────── */

    function render(): void {
        loadRules();
        ensureModeControl();
        renderContent();
    }

    function destroy(): void {
        cleanups.forEach(fn => fn());
        cleanups.length = 0;

        modeControl?.destroy?.();
        modeControl = null;

        speciesSelector?.destroy?.();
        speciesSelector = null;

        createButton = null;
        modeContainer = null;
        content = null;
        card = null;
    }

    return {
        root: card,
        render,
        destroy,
    };
}

// Keep class export for backward compatibility with existing section.ts
export class HarvestLockerCardPart {
    private handle: HarvestLockerCardHandle | null = null;
    private options: HarvestLockerCardOptions;

    constructor(options: HarvestLockerCardOptions = {}) {
        this.options = options;
    }

    build(): HTMLDivElement {
        if (!this.handle) {
            this.handle = createHarvestLockerCard(this.options);
        }
        return this.handle.root;
    }

    render(): void {
        this.handle?.render();
    }

    destroy(): void {
        this.handle?.destroy();
        this.handle = null;
    }
}
