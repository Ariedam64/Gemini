/**
 * Rule Editor Modal
 * Compact modal for creating/editing harvest rules with visual preview
 *
 * Refactored to use Modal component and composable sections
 */

import { element } from "../../../../styles/helpers";
import { Modal, type ModalHandle } from "../../../../components/Modal/Modal";
import { Button } from "../../../../components/Button/Button";
import { SegmentedControl } from "../../../../components/SegmentedControl/SegmentedControl";
import { Input, type InputHandle } from "../../../../components/Input/Input";
import { renderPlantSprite } from "./helpers";
import {
    createSizeSection,
    createColorMutationSection,
    createWeatherMutationSection,
    createPreviewSection,
    type SizeSectionHandle,
    type ColorMutationSectionHandle,
    type WeatherMutationSectionHandle,
    type PreviewSectionHandle,
} from "./sections";
import type { RuleEditorData, RuleEditorModalOptions, RuleEditorModalHandle } from "./types";
import type { RuleMode, MutationMatchMode } from "../../../../../features/harvestLocker";

/* ─────────────────────────── Factory ─────────────────────────── */

export function createRuleEditorModal(options: RuleEditorModalOptions): RuleEditorModalHandle {
    const { mode, species, ruleId, initialData, onSave, onDelete, onCancel } = options;

    // State
    let ruleName = initialData?.name ?? "";
    let ruleMode: RuleMode = initialData?.ruleMode ?? "lock";

    // Size state
    let sizeEnabled = initialData?.sizeCondition?.enabled ?? false;
    let sizePercentage = initialData?.sizeCondition?.minPercentage ?? 75;
    let sizeMode: "min" | "max" = initialData?.sizeCondition?.sizeMode ?? "max";

    // Parse initial mutations
    const initialMutations = initialData?.mutationCondition?.mutations ?? [];
    const initialColorMuts = initialMutations.filter(m => ["none", "Gold", "Rainbow"].includes(m));

    // Color state
    let colorMutationEnabled = initialColorMuts.length > 0;
    let selectedColorMutations: string[] = initialColorMuts.length > 0 ? initialColorMuts : ["none"];

    // Weather state — enabled uniquement si des mutations weather sont présentes
    const parsedWeatherMuts = initialMutations.filter(m => !["none", "Gold", "Rainbow"].includes(m));
    let weatherMutationEnabled = parsedWeatherMuts.length > 0;
    let selectedWeatherMutations: string[] = parsedWeatherMuts.length > 0 ? parsedWeatherMuts : ["none"];
    let weatherMatchMode: MutationMatchMode = initialData?.mutationCondition?.matchMode ?? "any";

    // Section handles
    let sizeSection: SizeSectionHandle | null = null;
    let colorSection: ColorMutationSectionHandle | null = null;
    let weatherSection: WeatherMutationSectionHandle | null = null;
    let previewSection: PreviewSectionHandle | null = null;
    let nameInput: InputHandle | null = null;
    let saveButton: HTMLButtonElement | null = null;
    let modalHandle: ModalHandle | null = null;

    // Build content
    const content = buildContent();
    const footer = buildFooter();

    // Create modal
    modalHandle = Modal({
        title: buildModalTitle(),
        content,
        footer,
        size: "lg",
        closeOnBackdrop: true,
        closeOnEscape: true,
        onClose: () => {
            onCancel?.();
        },
    });

    /* ───────────────────── Title Building ───────────────────── */

    function buildModalTitle(): string | Node {
        if (mode !== "species" || !species) {
            return ruleId ? "Edit Overall Rule" : "Create Overall Rule";
        }

        // Species mode: [sprite] SpeciesName — Override Rule
        const titleRow = element("div", {
            style: "display: flex; align-items: center; gap: 10px;",
        });

        const spriteContainer = element("div", {
            style: "width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;",
        });
        renderPlantSprite(species, spriteContainer, { size: 24 });
        titleRow.appendChild(spriteContainer);

        const titleText = element("span", {}, `${species} — Override Rule`);
        titleRow.appendChild(titleText);

        return titleRow;
    }

    /* ───────────────────── Content Building ───────────────────── */

    function buildContent(): HTMLElement {
        const container = element("div", {
            style: "display: flex; flex-direction: column; gap: 16px;",
        });

        // Description (species mode only)
        if (mode === "species") {
            const description = element("div", {
                style: "font-size: 12px; color: color-mix(in oklab, var(--fg) 60%, transparent); padding: 8px 10px; background: color-mix(in oklab, var(--accent) 8%, transparent); border-radius: 6px; border-left: 3px solid var(--accent);",
            }, "Global rules still apply. This override takes priority for this species only.");
            container.appendChild(description);
        }

        // Name + Mode row
        container.appendChild(buildHeader());

        // Sections
        sizeSection = createSizeSection({
            enabled: sizeEnabled,
            percentage: sizePercentage,
            sizeMode,
            ruleMode,
            onEnabledChange: (enabled) => {
                sizeEnabled = enabled;
                updateSaveButtonState();
                updatePreview();
            },
            onPercentageChange: (percentage) => {
                sizePercentage = percentage;
                updatePreview();
            },
            onSizeModeChange: (mode) => {
                sizeMode = mode;
                updatePreview();
            },
        });
        container.appendChild(sizeSection.root);

        colorSection = createColorMutationSection({
            enabled: colorMutationEnabled,
            selected: selectedColorMutations,
            ruleMode,
            onEnabledChange: (enabled) => {
                colorMutationEnabled = enabled;
                updateSaveButtonState();
                updatePreview();
            },
            onSelectionChange: (selected) => {
                selectedColorMutations = selected;
                updatePreview();
            },
        });
        container.appendChild(colorSection.root);

        weatherSection = createWeatherMutationSection({
            enabled: weatherMutationEnabled,
            selected: selectedWeatherMutations,
            matchMode: weatherMatchMode,
            ruleMode,
            onEnabledChange: (enabled) => {
                weatherMutationEnabled = enabled;
                updateSaveButtonState();
                updatePreview();
            },
            onSelectionChange: (selected) => {
                selectedWeatherMutations = selected;
                updatePreview();
            },
            onMatchModeChange: (mode) => {
                weatherMatchMode = mode;
                updatePreview();
            },
        });
        container.appendChild(weatherSection.root);

        previewSection = createPreviewSection({
            species: mode === "overall" ? "Carrot" : species,
            ruleMode,
            sizeEnabled,
            sizePercentage,
            sizeMode,
            colorEnabled: colorMutationEnabled,
            colorMutations: selectedColorMutations,
            weatherEnabled: weatherMutationEnabled,
            weatherMutations: selectedWeatherMutations,
            weatherMatchMode,
        });
        container.appendChild(previewSection.root);

        return container;
    }

    function buildHeader(): HTMLElement {
        const header = element("div", {
            style: "display: flex; flex-direction: column; gap: 12px;",
        });

        // Name + Mode row
        const nameRow = element("div", {
            style: "display: flex; gap: 12px; align-items: flex-start;",
        });

        // Rule name input
        const nameContainer = element("div", {
            style: "flex: 1; display: flex; flex-direction: column; gap: 6px;",
        });

        const nameLabel = element("label", {
            style: "font-size: 12px; font-weight: 500; color: var(--fg);",
        }, "Rule Name");
        nameContainer.appendChild(nameLabel);

        nameInput = Input({
            placeholder: "e.g., Lock Large Frozen",
            value: ruleName,
            maxLength: 30,
            blockGameKeys: true,
            onChange: (val) => {
                ruleName = val;
                updateSaveButtonState();
            },
        });
        nameContainer.appendChild(nameInput.root);
        nameRow.appendChild(nameContainer);

        // Mode selector
        const modeContainer = element("div", {
            style: "display: flex; flex-direction: column; gap: 6px;",
        });

        const modeLabel = element("label", {
            style: "font-size: 12px; font-weight: 500; color: var(--fg);",
        }, "Mode");
        modeContainer.appendChild(modeLabel);

        const modeControl = SegmentedControl({
            segments: [
                { id: "lock", label: "Lock" },
                { id: "allow", label: "Allow" },
            ],
            selected: ruleMode,
            onChange: (id) => {
                ruleMode = id as RuleMode;
                // Update sections with new mode
                sizeSection?.setRuleMode(ruleMode);
                colorSection?.setRuleMode(ruleMode);
                weatherSection?.setRuleMode(ruleMode);
                updatePreview();
            },
        });
        modeContainer.appendChild(modeControl);
        nameRow.appendChild(modeContainer);

        header.appendChild(nameRow);
        return header;
    }

    function buildFooter(): HTMLElement {
        const footer = element("div", {
            style: "display: flex; gap: 8px; justify-content: space-between; width: 100%;",
        });

        // Left: Delete button (only for existing rules)
        const leftActions = element("div", {
            style: "display: flex; gap: 8px;",
        });

        if (ruleId && onDelete) {
            const deleteBtn = Button({
                label: "Delete Rule",
                variant: "danger",
                onClick: () => {
                    onDelete();
                    destroy();
                },
            });
            leftActions.appendChild(deleteBtn);
        }
        footer.appendChild(leftActions);

        // Right: Cancel + Save
        const rightActions = element("div", {
            style: "display: flex; gap: 8px;",
        });

        const cancelBtn = Button({
            label: "Cancel",
            variant: "default",
            onClick: () => {
                onCancel?.();
                destroy();
            },
        });
        rightActions.appendChild(cancelBtn);

        const saveBtnHandle = Button({
            label: "Save",
            variant: "primary",
            disabled: !isValid(),
            onClick: handleSave,
        });
        saveButton = saveBtnHandle as unknown as HTMLButtonElement;
        rightActions.appendChild(saveBtnHandle);

        footer.appendChild(rightActions);
        return footer;
    }

    /* ───────────────────── Helpers ───────────────────── */

    function isValid(): boolean {
        if (!ruleName.trim()) return false;
        if (!sizeEnabled && !colorMutationEnabled && !weatherMutationEnabled) return false;
        return true;
    }

    function updateSaveButtonState(): void {
        if (saveButton) {
            saveButton.disabled = !isValid();
        }
    }

    function updatePreview(): void {
        previewSection?.update({
            ruleMode,
            sizeEnabled,
            sizePercentage,
            sizeMode,
            colorEnabled: colorMutationEnabled,
            colorMutations: selectedColorMutations,
            weatherEnabled: weatherMutationEnabled,
            weatherMutations: selectedWeatherMutations,
            weatherMatchMode,
        });
    }

    function handleSave(): void {
        if (!isValid()) return;

        const data: RuleEditorData = {
            name: ruleName.trim(),
            ruleMode,
        };

        if (sizeEnabled) {
            data.sizeCondition = {
                enabled: true,
                minPercentage: sizePercentage,
                sizeMode,
            };
        }

        // Combine weather and color mutations
        const allMutations: string[] = [];
        if (weatherMutationEnabled) {
            allMutations.push(...selectedWeatherMutations);
        }
        if (colorMutationEnabled) {
            allMutations.push(...selectedColorMutations);
        }

        if (allMutations.length > 0) {
            data.mutationCondition = {
                enabled: true,
                mutations: allMutations,
                matchMode: weatherMatchMode,
            };
        }

        onSave(data);
        destroy();
    }

    /* ───────────────────── Public API ───────────────────── */

    function destroy(): void {
        sizeSection?.destroy();
        colorSection?.destroy();
        weatherSection?.destroy();
        previewSection?.destroy();
        nameInput?.destroy();
        modalHandle?.destroy();

        sizeSection = null;
        colorSection = null;
        weatherSection = null;
        previewSection = null;
        nameInput = null;
        saveButton = null;
        modalHandle = null;
    }

    return {
        root: modalHandle.root,
        destroy,
    };
}

// Re-export types for backward compatibility
export type { RuleEditorData, RuleEditorModalOptions, RuleEditorModalHandle } from "./types";
