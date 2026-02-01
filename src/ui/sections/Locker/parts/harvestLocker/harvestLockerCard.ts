/**
 * HarvestLockerCard Part
 * Rule-based harvest lock management UI
 *
 * Per .claude/rules/ui/sections.md
 */

import { Card } from "../../../../components/Card/Card";
import { element } from "../../../../styles/helpers";
import { SegmentedControl, SegmentedControlHandle } from "../../../../components/SegmentedControl/SegmentedControl";
import { Button, ButtonHandle } from "../../../../components/Button/Button";
import { Select, SelectHandle } from "../../../../components/Select/Select";
import { Checkbox } from "../../../../components/Checkbox/Checkbox";
import { MGHarvestLocker } from "../../../../../features/harvestLocker";
import type { HarvestRule } from "../../../../../features/harvestLocker";
import { MGData } from "../../../../../modules";
import { createRuleEditorModal } from "./RuleEditorModal";

/* ─────────────────────────── Types ─────────────────────────── */

type ViewMode = "overall" | "bySpecies";

export interface HarvestLockerCardOptions {
    defaultExpanded?: boolean;
}

/* ─────────────────────────── Class ─────────────────────────── */

export class HarvestLockerCardPart {
    private card: HTMLDivElement | null = null;
    private modeContainer: HTMLDivElement | null = null;
    private content: HTMLDivElement | null = null;
    private options: HarvestLockerCardOptions;
    private cleanups: (() => void)[] = [];

    // Component references
    private modeControl: SegmentedControlHandle | null = null;
    private speciesSelect: SelectHandle | null = null;
    private createButton: ButtonHandle | null = null;

    // Internal state
    private mode: ViewMode = "overall";
    private selectedSpecies: string | null = null;
    private rules: HarvestRule[] = [];

    constructor(options: HarvestLockerCardOptions = {}) {
        this.options = options;
    }

    /* ───────────────────── Public API ───────────────────── */

    build(): HTMLDivElement {
        if (this.card) return this.card;
        return this.createCard();
    }

    destroy(): void {
        this.cleanups.forEach(fn => fn());
        this.cleanups.length = 0;

        this.modeControl?.destroy?.();
        this.modeControl = null;

        this.modeContainer = null;
        this.speciesSelect?.destroy?.();
        this.speciesSelect = null;

        this.createButton = null;

        this.card = null;
        this.content = null;
    }

    render(): void {
        if (!this.card) return;
        this.loadRules();
        this.ensureModeControl();
        this.renderContent();
    }

    /* ───────────────────── Card Setup ───────────────────── */

    private createCard(): HTMLDivElement {
        const wrapper = element("div", {
            className: "harvest-locker-card-wrapper",
        });

        this.modeContainer = element("div", {
            className: "harvest-locker-card__mode-container",
        });
        wrapper.appendChild(this.modeContainer);

        this.content = element("div", {
            className: "harvest-locker-card__content",
        });
        wrapper.appendChild(this.content);

        this.card = Card(
            {
                title: "Harvest Rules",
                subtitle: "Configure harvest locking rules",
                expandable: true,
                defaultExpanded: this.options.defaultExpanded ?? true,
            },
            wrapper
        );

        // Load initial data and render
        this.loadRules();
        this.renderContent();

        return this.card;
    }

    /* ───────────────────── Data Loading ───────────────────── */

    private loadRules(): void {
        if (this.mode === "overall") {
            this.rules = MGHarvestLocker.getOverallRules();
        } else {
            this.rules = this.selectedSpecies
                ? MGHarvestLocker.getSpeciesRules(this.selectedSpecies)
                : [];
        }
    }

    private getAvailableSpecies(): Array<{ value: string; label: string }> {
        const plantsData = MGData.get("plants") as Record<string, unknown> | null;
        if (!plantsData) return [];

        return Object.keys(plantsData)
            .filter(key => {
                const plant = plantsData[key];
                return plant && typeof plant === "object" && "crop" in plant;
            })
            .map(species => ({ value: species, label: species }))
            .sort((a, b) => a.label.localeCompare(b.label));
    }

    /* ───────────────────── Rendering ───────────────────── */

    private renderContent(): void {
        if (!this.content) return;

        this.content.replaceChildren();

        // Species selector (if in "By Species" mode)
        if (this.mode === "bySpecies") {
            this.renderSpeciesSelector();
        }

        // Rules list
        this.renderRulesList();

        // Action buttons
        this.renderActionButtons();
    }

    private ensureModeControl(): void {
        if (!this.modeContainer) return;

        if (!this.modeControl) {
            this.modeControl = SegmentedControl({
                segments: [
                    { id: "overall", label: "Overall" },
                    { id: "bySpecies", label: "By Species" },
                ],
                selected: this.mode,
                onChange: (id) => {
                    this.mode = id as ViewMode;
                    this.loadRules();
                    this.renderContent();
                },
            });

            this.modeContainer.appendChild(this.modeControl);
            return;
        }

        if (this.modeControl.getSelected() !== this.mode) {
            this.modeControl.select(this.mode);
        }
    }

    private renderSpeciesSelector(): void {
        if (!this.content) return;

        const species = this.getAvailableSpecies();
        if (species.length === 0) {
            const noSpecies = element("div", {
                className: "harvest-locker-card__message harvest-locker-card__message--compact",
            }, "No species available");
            this.content.appendChild(noSpecies);
            return;
        }

        this.speciesSelect = Select({
            options: species,
            placeholder: "Select a species...",
            value: this.selectedSpecies ?? undefined,
            onChange: (value) => {
                this.selectedSpecies = value;
                this.loadRules();
                this.renderContent();
            },
        });

        const selectWrapper = element("div", {
            className: "harvest-locker-card__control",
        });
        selectWrapper.appendChild(this.speciesSelect.root);
        this.content.appendChild(selectWrapper);
    }

    private renderRulesList(): void {
        if (!this.content) return;

        if (this.mode === "bySpecies" && !this.selectedSpecies) {
            const placeholder = element("div", {
                className: "harvest-locker-card__message",
            }, "Select a species to view and manage rules");
            this.content.appendChild(placeholder);
            return;
        }

        if (this.rules.length === 0) {
            const empty = element("div", {
                className: "harvest-locker-card__empty",
            }, "No rules yet. Click 'Create Rule' to add one.");
            this.content.appendChild(empty);
            return;
        }

        const list = element("div", {
            className: "harvest-locker-card__list",
        });

        this.rules.forEach(rule => {
            const item = this.createRuleItem(rule);
            list.appendChild(item);
        });

        this.content.appendChild(list);
    }

    private createRuleItem(rule: HarvestRule): HTMLElement {
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
            this.handleDeleteRule(rule.id);
        });

        // Long press to delete (mobile) / click to edit
        let longPressTimer: number | null = null;
        let longPressTriggered = false;

        item.addEventListener("touchstart", () => {
            longPressTriggered = false;
            longPressTimer = window.setTimeout(() => {
                longPressTriggered = true;
                this.handleDeleteRule(rule.id);
                // Haptic feedback if available
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }, 500); // 500ms long press
        });

        item.addEventListener("touchend", () => {
            if (longPressTimer) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }
            // If long press was not triggered, it's a normal tap - open edit modal
            if (!longPressTriggered) {
                this.handleEditRule(rule);
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
            this.handleEditRule(rule);
        });

        return item;
    }


    private renderActionButtons(): void {
        if (!this.content) return;

        if (this.mode === "bySpecies" && !this.selectedSpecies) {
            return; // Don't show buttons if no species selected
        }

        const buttons = element("div", {
            className: "harvest-locker-card__actions",
        });

        this.createButton = Button({
            label: "Create Rule",
            variant: "primary",
            onClick: () => this.handleCreateRule(),
        });
        buttons.appendChild(this.createButton);

        this.content.appendChild(buttons);
    }

    /* ───────────────────── Event Handlers ───────────────────── */

    private handleCreateRule(): void {
        createRuleEditorModal({
            mode: this.mode === "overall" ? "overall" : "species",
            species: this.selectedSpecies,
            mountRoot: this.card?.getRootNode() instanceof ShadowRoot
                ? (this.card.getRootNode() as ShadowRoot)
                : undefined,
            onSave: (data) => {
                if (this.mode === "overall") {
                    MGHarvestLocker.addNewOverallRule(
                        data.name,
                        data.ruleMode,
                        data.sizeCondition,
                        data.mutationCondition
                    );
                } else if (this.selectedSpecies) {
                    MGHarvestLocker.addNewSpeciesRule(
                        this.selectedSpecies,
                        data.name,
                        data.ruleMode,
                        data.sizeCondition,
                        data.mutationCondition
                    );
                }

                this.loadRules();
                this.renderContent();
            },
        });
    }

    private handleEditRule(rule: HarvestRule): void {
        createRuleEditorModal({
            mode: this.mode === "overall" ? "overall" : "species",
            species: this.selectedSpecies,
            ruleId: rule.id,
            mountRoot: this.card?.getRootNode() instanceof ShadowRoot
                ? (this.card.getRootNode() as ShadowRoot)
                : undefined,
            initialData: {
                name: rule.name,
                ruleMode: rule.mode,
                sizeCondition: rule.sizeCondition,
                mutationCondition: rule.mutationCondition,
            },
            onSave: (data) => {
                // Update the existing rule
                MGHarvestLocker.modifyRule(rule.id, {
                    name: data.name,
                    mode: data.ruleMode,
                    sizeCondition: data.sizeCondition,
                    mutationCondition: data.mutationCondition,
                });

                this.loadRules();
                this.renderContent();
            },
            onDelete: () => {
                this.handleDeleteRule(rule.id);
            },
        });
    }

    private handleDeleteRule(ruleId: string): void {
        MGHarvestLocker.removeRule(ruleId);
        this.loadRules();
        this.renderContent();
    }
}
