/**
 * Rule Editor Modal
 * Compact modal for creating/editing harvest rules with visual preview
 */

import { element } from "../../../../styles/helpers";
import { Button } from "../../../../components/Button/Button";
import { SegmentedControl } from "../../../../components/SegmentedControl/SegmentedControl";
import { Slider } from "../../../../components/Slider/Slider";
import { Checkbox } from "../../../../components/Checkbox/Checkbox";
import { Input } from "../../../../components/Input/Input";
import { Card } from "../../../../components/Card/Card";
import type { RuleMode, MutationMatchMode } from "../../../../../features/harvestLocker";
import { MGData } from "../../../../../modules";
import { MGSprite } from "../../../../../modules";
import { getMyGarden } from "../../../../../globals/variables/myGarden";

/* ─────────────────────────── Types ─────────────────────────── */

export interface RuleEditorData {
    name: string;
    ruleMode: RuleMode;
    sizeCondition?: { enabled: boolean; minPercentage: number };
    mutationCondition?: { enabled: boolean; mutations: string[]; matchMode: MutationMatchMode };
}

export interface RuleEditorModalOptions {
    mode: "overall" | "species";
    species?: string | null;
    ruleId?: string;
    initialData?: Partial<RuleEditorData>;
    onSave: (data: RuleEditorData) => void;
    onDelete?: () => void;
    onCancel?: () => void;
    mountRoot?: HTMLElement | ShadowRoot;
}

export interface RuleEditorModalHandle {
    root: HTMLElement;
    destroy(): void;
}

/* ─────────────────────────── Factory ─────────────────────────── */

export function createRuleEditorModal(options: RuleEditorModalOptions): RuleEditorModalHandle {
    const { mode, species, ruleId, initialData, onSave, onDelete, onCancel, mountRoot } = options;

    // State
    let ruleName = initialData?.name ?? "";
    let ruleMode: RuleMode = initialData?.ruleMode ?? "lock";
    let sizeEnabled = initialData?.sizeCondition?.enabled ?? false;
    let sizePercentage = initialData?.sizeCondition?.minPercentage ?? 75;

    // Reference to save button for updating disabled state
    let saveButtonElement: HTMLButtonElement | null = null;

    const initialMutations = initialData?.mutationCondition?.mutations ?? [];
    const initialColorMuts = initialMutations.filter(m => ["none", "Gold", "Rainbow"].includes(m));

    let selectedColorMutations: string[] = initialColorMuts.length > 0 ? initialColorMuts : ["none"];
    let colorMutationEnabled = initialColorMuts.length > 0;

    let weatherMutationEnabled = initialData?.mutationCondition?.enabled ?? false;
    let selectedWeatherMutations: string[] = initialMutations.filter(m => !["Gold", "Rainbow"].includes(m));
    if (weatherMutationEnabled && selectedWeatherMutations.length === 0) {
        selectedWeatherMutations = ["none"];
    }
    let weatherMatchMode: MutationMatchMode = initialData?.mutationCondition?.matchMode ?? "any";

    // Collapsible sections state
    let sizeExpanded = true;
    let colorExpanded = true;
    let weatherExpanded = true;

    // Root element
    const overlay = element("div", {
        style: `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(4px);
        `,
    });

    const modal = element("div", {
        className: "harvest-locker-modal",
        style: `
            background: var(--bg);
            border: 1px solid color-mix(in oklab, var(--fg) 10%, transparent);
            border-radius: 12px;
            padding: 20px;
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `,
    });

    /**
     * Render modal content
     */
    function render(): void {
        modal.replaceChildren();

        // Header
        const header = element("div", {
            style: "margin-bottom: 20px;",
        });

        const title = element("h2", {
            style: "font-size: 18px; font-weight: 600; margin-bottom: 16px; color: var(--fg);",
        }, mode === "overall" ? "Create Overall Rule" : `Create Rule: ${species || "Species"}`);
        header.appendChild(title);

        // Rule name + Mode in same row
        const nameRow = element("div", {
            style: "display: flex; gap: 12px; align-items: flex-start; margin-bottom: 12px;",
        });

        // Rule name (takes most space)
        const nameContainer = element("div", {
            style: "flex: 1; display: flex; flex-direction: column; gap: 6px;",
        });

        const nameLabel = element("label", {
            style: "font-size: 12px; font-weight: 500; color: var(--fg);",
        }, "Rule Name");
        nameContainer.appendChild(nameLabel);

        const inputHandle = Input({
            placeholder: "e.g., Lock Large Frozen",
            value: ruleName,
            maxLength: 30,
            blockGameKeys: true,
            onChange: (val) => {
                ruleName = val;
                // Update save button disabled state
                updateSaveButtonState();
            },
        });
        nameContainer.appendChild(inputHandle.root);

        nameRow.appendChild(nameContainer);

        // Mode selector (compact)
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
                render();
            },
        });
        modeContainer.appendChild(modeControl);

        nameRow.appendChild(modeContainer);
        header.appendChild(nameRow);

        modal.appendChild(header);

        // Sections
        modal.appendChild(renderSizeSection());
        modal.appendChild(renderColorSection());
        modal.appendChild(renderWeatherSection());

        // Preview (static, always visible)
        modal.appendChild(renderPreview());

        // Actions
        modal.appendChild(renderActions());
    }


    /**
     * Size section
     */
    function renderSizeSection(): HTMLElement {
        const content = element("div", {
            style: "display: flex; flex-direction: column; gap: 12px;",
        });

        // Top row: Checkbox + Description
        const topRow = element("div", {
            style: "display: flex; align-items: center; gap: 12px;",
        });

        const checkbox = Checkbox({
            checked: sizeEnabled,
            label: "Enable",
            size: "md",
            onChange: (checked) => {
                sizeEnabled = checked;
                render();
            },
        });
        topRow.appendChild(checkbox.root);

        // Dynamic description based on rule mode (will be updated during drag)
        let descriptionText: HTMLElement | null = null;
        if (sizeEnabled) {
            descriptionText = element("div", {
                style: "font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); line-height: 1.4;",
            }, ruleMode === "lock"
                ? `Lock plants smaller than ${sizePercentage}%`
                : `Allow harvesting plants smaller than ${sizePercentage}%`
            );
            topRow.appendChild(descriptionText);
        }

        content.appendChild(topRow);

        // Slider row (full width below)
        if (sizeEnabled) {
            const sliderContainer = element("div", {
                style: "display: flex; flex-direction: column; gap: 4px;",
            });

            // Label with value display
            const labelContainer = element("div", {
                style: "display: flex; justify-content: space-between; align-items: center;",
            });

            const labelText = element("div", {
                style: "font-size: 12px; color: var(--fg); font-weight: 500;",
            }, "Minimum Size");

            const valueDisplay = element("span", {
                style: "font-size: 12px; font-weight: 600; color: var(--accent);",
            }, `${sizePercentage}%`);

            labelContainer.appendChild(labelText);
            labelContainer.appendChild(valueDisplay);
            sliderContainer.appendChild(labelContainer);

            // Slider
            const slider = Slider({
                min: 50,
                max: 100,
                step: 1,
                value: sizePercentage,
                showValue: false,
                onInput: (value) => {
                    // Update only the visual elements during drag (don't re-render)
                    sizePercentage = value;
                    valueDisplay.textContent = `${value}%`;
                    if (descriptionText) {
                        descriptionText.textContent = ruleMode === "lock"
                            ? `Lock plants smaller than ${value}%`
                            : `Allow harvesting plants smaller than ${value}%`;
                    }
                },
                onChange: (value) => {
                    // Final update when drag ends - re-render to update preview
                    sizePercentage = value;
                    render();
                },
            });
            sliderContainer.appendChild(slider.root);

            content.appendChild(sliderContainer);
        }

        const card = Card(
            {
                title: "Size",
                variant: "soft",
                padding: "md",
                expandable: true,
                defaultExpanded: sizeExpanded,
                onExpandChange: (expanded) => {
                    sizeExpanded = expanded;
                },
            },
            content
        );

        card.style.marginBottom = "16px";
        return card;
    }

    /**
     * Color mutation section
     */
    function renderColorSection(): HTMLElement {
        const content = element("div", {
            style: "display: flex; flex-direction: column; gap: 12px;",
        });

        // Top row: Checkbox + Description
        const topRow = element("div", {
            style: "display: flex; align-items: center; gap: 12px;",
        });

        const checkbox = Checkbox({
            checked: colorMutationEnabled,
            label: "Enable",
            size: "md",
            onChange: (checked) => {
                colorMutationEnabled = checked;
                render();
            },
        });
        topRow.appendChild(checkbox.root);

        // Dynamic description based on rule mode and selected mutations
        if (colorMutationEnabled) {
            const selectedNames = selectedColorMutations
                .map(c => c === "none" ? "normal" : c.toLowerCase())
                .join(", ");

            const description = element("div", {
                style: "font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); line-height: 1.4;",
            }, ruleMode === "lock"
                ? `Lock ${selectedNames} plants`
                : `Allow ${selectedNames} plants`
            );
            topRow.appendChild(description);
        }

        content.appendChild(topRow);

        // Color mutations grid (only if enabled)
        if (colorMutationEnabled) {
            const colorOptions = ["none", "Gold", "Rainbow"];
            const grid = element("div", {
                style: `
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
                    gap: 8px;
                `,
            });

            colorOptions.forEach(colorOption => {
                const item = createColorMutationItem(colorOption);
                grid.appendChild(item);
            });

            content.appendChild(grid);
        }

        const card = Card(
            {
                title: "Color Mutation",
                variant: "soft",
                padding: "md",
                expandable: true,
                defaultExpanded: colorExpanded,
                onExpandChange: (expanded) => {
                    colorExpanded = expanded;
                },
            },
            content
        );

        card.style.marginBottom = "16px";
        return card;
    }

    /**
     * Create a color mutation item (sprite + name)
     */
    function createColorMutationItem(colorOption: string): HTMLElement {
        const isSelected = selectedColorMutations.includes(colorOption);

        const item = element("div", {
            style: `
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
                padding: 8px;
                cursor: pointer;
                border-radius: 6px;
                background: ${isSelected ? "color-mix(in oklab, var(--accent) 20%, transparent)" : "color-mix(in oklab, var(--fg) 5%, transparent)"};
                border: 1px solid ${isSelected ? "var(--accent)" : "color-mix(in oklab, var(--fg) 10%, transparent)"};
                transition: all 0.15s ease;
            `,
        });

        item.addEventListener("click", () => {
            if (isSelected) {
                // Deselect - but ensure minimum 1 selection
                const filtered = selectedColorMutations.filter(c => c !== colorOption);
                if (filtered.length === 0) {
                    // Can't deselect if it would leave nothing - minimum 1 required
                    return;
                }
                selectedColorMutations = filtered;
            } else {
                // Select - enforce max 3
                if (selectedColorMutations.length >= 3) {
                    return; // Already at max
                }
                selectedColorMutations.push(colorOption);
            }
            render();
        });

        item.addEventListener("mouseenter", () => {
            if (!isSelected) {
                item.style.background = "color-mix(in oklab, var(--fg) 10%, transparent)";
            }
        });

        item.addEventListener("mouseleave", () => {
            if (!isSelected) {
                item.style.background = "color-mix(in oklab, var(--fg) 5%, transparent)";
            }
        });

        // Sprite
        const spriteContainer = element("div", {
            style: "display: flex; align-items: center; justify-content: center;",
        });

        if (colorOption === "none") {
            // Special "None" placeholder
            const placeholder = element("div", {
                style: `
                    width: 32px;
                    height: 32px;
                    background: linear-gradient(135deg, color-mix(in oklab, var(--fg) 8%, transparent) 0%, color-mix(in oklab, var(--fg) 15%, transparent) 100%);
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    font-weight: 300;
                    color: color-mix(in oklab, var(--fg) 40%, transparent);
                `,
            }, "—");
            spriteContainer.appendChild(placeholder);
        } else if (MGSprite.isReady()) {
            try {
                // Get sprite ID from MGData
                const mutationsData = MGData.get("mutations") as Record<string, any> | null;
                const mutationInfo = mutationsData?.[colorOption];
                const spriteId = mutationInfo?.spriteId;

                if (spriteId) {
                    const canvas = MGSprite.toCanvas(spriteId, {
                        boundsMode: "padded",
                    });
                    if (canvas) {
                        canvas.style.maxWidth = "32px";
                        canvas.style.maxHeight = "32px";
                        canvas.style.width = "auto";
                        canvas.style.height = "auto";
                        canvas.style.display = "block";
                        spriteContainer.appendChild(canvas);
                    }
                } else {
                    throw new Error(`No sprite ID found for ${colorOption}`);
                }
            } catch (error) {
                console.warn(`[RuleEditorModal] Failed to load sprite for color mutation: ${colorOption}`, error);
                // Fallback colored square
                const placeholder = element("div", {
                    style: `
                        width: 32px;
                        height: 32px;
                        background: ${colorOption === "Gold" ? "#FFD700" : "linear-gradient(135deg, #ff0000 0%, #ff7700 16%, #ffff00 33%, #00ff00 50%, #0099ff 66%, #9966ff 83%, #ff0088 100%)"};
                        border-radius: 4px;
                    `,
                });
                spriteContainer.appendChild(placeholder);
            }
        }

        item.appendChild(spriteContainer);

        // Name
        const name = element("div", {
            style: "font-size: 10px; color: var(--fg); text-align: center; font-weight: 500;",
        }, colorOption === "none" ? "None" : colorOption);
        item.appendChild(name);

        return item;
    }

    /**
     * Weather mutation section
     */
    function renderWeatherSection(): HTMLElement {
        const content = element("div", {
            style: "display: flex; flex-direction: column; gap: 12px;",
        });

        // Top row: Checkbox + Description
        const topRow = element("div", {
            style: "display: flex; align-items: center; gap: 12px;",
        });

        // Enable checkbox
        const enableCheckbox = Checkbox({
            checked: weatherMutationEnabled,
            label: "Enable",
            size: "md",
            onChange: (checked) => {
                weatherMutationEnabled = checked;
                render();
            },
        });
        topRow.appendChild(enableCheckbox.root);

        // Dynamic description based on rule mode and selected mutations
        if (weatherMutationEnabled && selectedWeatherMutations.length > 0) {
            // Get display names from MGData
            const mutationsData = MGData.get("mutations") as Record<string, any> | null;
            const displayNames = selectedWeatherMutations
                .map(m => m === "none" ? "normal" : (mutationsData?.[m]?.name || m))
                .join(", ");
            const matchText = weatherMatchMode === "all" ? "AND" : "OR";

            const description = element("div", {
                style: "font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); line-height: 1.4;",
            }, ruleMode === "lock"
                ? `Lock ${displayNames} plants (${matchText})`
                : `Allow ${displayNames} plants (${matchText})`
            );
            topRow.appendChild(description);
        }

        content.appendChild(topRow);

        // Match mode control (separate row)
        if (weatherMutationEnabled) {
            const matchModeRow = element("div", {
                style: "display: flex; justify-content: center;",
            });

            const matchModeControl = SegmentedControl({
                segments: [
                    { id: "any", label: "Any" },
                    { id: "all", label: "All" },
                ],
                selected: weatherMatchMode,
                onChange: (id) => {
                    weatherMatchMode = id as MutationMatchMode;

                    // Clean up selections when switching to "all" mode
                    if (id === "all") {
                        const wetGroup = ["Wet", "Chilled", "Frozen"];
                        const lunarGroup = ["Dawnlit", "Ambershine", "Dawncharged", "Ambercharged"];

                        const selectedWet = selectedWeatherMutations.filter(m => wetGroup.includes(m));
                        const selectedLunar = selectedWeatherMutations.filter(m => lunarGroup.includes(m));

                        const cleaned: string[] = [];
                        if (selectedWet.length > 0) cleaned.push(selectedWet[0]);
                        if (selectedLunar.length > 0 && cleaned.length < 2) cleaned.push(selectedLunar[0]);

                        selectedWeatherMutations = cleaned;
                    }

                    render();
                },
            });
            matchModeRow.appendChild(matchModeControl);
            content.appendChild(matchModeRow);
        }

        // Mutation grid
        if (weatherMutationEnabled) {
            const mutations = getAvailableWeatherMutations();
            const allOptions = ["none", ...mutations];

            const grid = element("div", {
                style: `
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(85px, 1fr));
                    gap: 8px;
                    max-height: 300px;
                    overflow-y: auto;
                `,
            });

            allOptions.forEach(mutation => {
                const item = createWeatherMutationItem(mutation);
                grid.appendChild(item);
            });

            content.appendChild(grid);
        }

        const card = Card(
            {
                title: "Weather Mutation",
                variant: "soft",
                padding: "md",
                expandable: true,
                defaultExpanded: weatherExpanded,
                onExpandChange: (expanded) => {
                    weatherExpanded = expanded;
                },
            },
            content
        );

        card.style.marginBottom = "16px";
        return card;
    }

    /**
     * Create a weather mutation item (sprite + name)
     */
    function createWeatherMutationItem(mutation: string): HTMLElement {
        const isSelected = selectedWeatherMutations.includes(mutation);

        const item = element("div", {
            style: `
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
                padding: 8px;
                background: ${isSelected ? "color-mix(in oklab, var(--accent) 20%, transparent)" : "color-mix(in oklab, var(--fg) 5%, transparent)"};
                border: 1px solid ${isSelected ? "var(--accent)" : "color-mix(in oklab, var(--fg) 10%, transparent)"};
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s ease;
            `,
        });

        item.addEventListener("click", () => {
            if (isSelected) {
                // Deselect
                selectedWeatherMutations = selectedWeatherMutations.filter(m => m !== mutation);
            } else {
                // Select - in "All" mode, enforce mutually exclusive groups and max 2 selections
                if (weatherMatchMode === "all" && mutation !== "none") {
                    const wetGroup = ["Wet", "Chilled", "Frozen"];
                    const lunarGroup = ["Dawnlit", "Ambershine", "Dawncharged", "Ambercharged"];

                    // If selecting from wet group, remove other wet mutations
                    if (wetGroup.includes(mutation)) {
                        selectedWeatherMutations = selectedWeatherMutations.filter(m => !wetGroup.includes(m));
                    }
                    // If selecting from lunar group, remove other lunar mutations
                    else if (lunarGroup.includes(mutation)) {
                        selectedWeatherMutations = selectedWeatherMutations.filter(m => !lunarGroup.includes(m));
                    }

                    // If already at max 2 selections (excluding "none"), don't add more
                    const nonNoneCount = selectedWeatherMutations.filter(m => m !== "none").length;
                    if (nonNoneCount >= 2) {
                        return;
                    }
                }

                selectedWeatherMutations.push(mutation);
            }
            render();
        });

        item.addEventListener("mouseenter", () => {
            if (!isSelected) {
                item.style.background = "color-mix(in oklab, var(--fg) 10%, transparent)";
            }
        });

        item.addEventListener("mouseleave", () => {
            if (!isSelected) {
                item.style.background = "color-mix(in oklab, var(--fg) 5%, transparent)";
            }
        });

        // Sprite
        const spriteContainer = element("div", {
            style: "display: flex; align-items: center; justify-content: center;",
        });

        if (mutation === "none") {
            // Special "None" placeholder
            const placeholder = element("div", {
                style: `
                    width: 32px;
                    height: 32px;
                    background: linear-gradient(135deg, color-mix(in oklab, var(--fg) 8%, transparent) 0%, color-mix(in oklab, var(--fg) 15%, transparent) 100%);
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    font-weight: 300;
                    color: color-mix(in oklab, var(--fg) 40%, transparent);
                `,
            }, "—");
            spriteContainer.appendChild(placeholder);
        } else if (MGSprite.isReady()) {
            try {
                // Get sprite ID from MGData
                const mutationsData = MGData.get("mutations") as Record<string, any> | null;
                const mutationInfo = mutationsData?.[mutation];
                const spriteId = mutationInfo?.spriteId;

                if (spriteId) {
                    const canvas = MGSprite.toCanvas(spriteId, {
                        boundsMode: "padded",
                    });
                    if (canvas) {
                        canvas.style.maxWidth = "32px";
                        canvas.style.maxHeight = "32px";
                        canvas.style.width = "auto";
                        canvas.style.height = "auto";
                        canvas.style.display = "block";
                        spriteContainer.appendChild(canvas);
                    }
                } else {
                    throw new Error(`No sprite ID found for ${mutation}`);
                }
            } catch (error) {
                console.warn(`[RuleEditorModal] Failed to load sprite for mutation: ${mutation}`, error);
                // Fallback colored square
                const placeholder = element("div", {
                    style: `
                        width: 40px;
                        height: 40px;
                        background: ${isSelected ? "var(--accent)" : "color-mix(in oklab, var(--fg) 20%, transparent)"};
                        border-radius: 4px;
                    `,
                });
                spriteContainer.appendChild(placeholder);
            }
        } else {
            // MGSprite not ready, show placeholder
            const placeholder = element("div", {
                style: "width: 40px; height: 40px; background: color-mix(in oklab, var(--fg) 10%, transparent); border-radius: 4px;",
            });
            spriteContainer.appendChild(placeholder);
        }

        item.appendChild(spriteContainer);

        // Name (use display name from MGData)
        const mutationsData = MGData.get("mutations") as Record<string, any> | null;
        const displayName = mutation === "none" ? "None" : (mutationsData?.[mutation]?.name || mutation);

        const name = element("div", {
            style: "font-size: 10px; color: var(--fg); text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;",
        }, displayName);
        item.appendChild(name);

        return item;
    }

    /**
     * Preview section (static, always visible)
     */
    function renderPreview(): HTMLElement {
        const content = element("div", {
            style: "display: flex; flex-direction: column; gap: 8px;",
        });

        // Description
        const description = element("div", {
            style: "font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); text-align: center; line-height: 1.4;",
        }, ruleMode === "lock"
            ? "Preview of plants that will be blocked from harvesting"
            : "Preview of plants that will be harvestable"
        );
        content.appendChild(description);

        // Preview plants container
        const previewContainer = element("div", {
            className: "harvest-locker-preview-grid",
        });

        content.appendChild(previewContainer);

        // Generate previews after container is added to DOM
        // Use requestAnimationFrame to ensure container is rendered and measurable
        requestAnimationFrame(() => {
            const { previews, remaining } = generatePreviewPlants(previewContainer);
            previews.forEach(preview => {
                previewContainer.appendChild(preview);
            });

            // Add "+X" badge if there are more combinations
            if (remaining > 0) {
                const badge = element("div", {
                    style: `
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 48px;
                        height: 48px;
                        background: color-mix(in oklab, var(--accent) 15%, transparent);
                        border: 1px dashed var(--accent);
                        border-radius: 6px;
                        font-size: 12px;
                        font-weight: 600;
                        color: var(--accent);
                        flex-shrink: 0;
                    `,
                }, `+${remaining}`);
                previewContainer.appendChild(badge);
            }
        });

        const card = Card(
            {
                title: "Preview",
                variant: "soft",
                padding: "md",
                expandable: false,
            },
            content
        );

        card.style.marginBottom = "16px";
        return card;
    }

    /**
     * Generate all valid mutation combinations based on stacking rules
     * "none" represents plants without mutations in that category
     */
    function generateValidCombinations(): string[][] {
        const combinations: string[][] = [];

        // Collect all selected mutations (excluding "none" for processing)
        const weatherMuts = weatherMutationEnabled ? selectedWeatherMutations.filter(m => m !== "none") : [];
        const colorMuts = colorMutationEnabled ? selectedColorMutations.filter(m => m !== "none") : [];

        // Check if "none" is selected for each category
        const includeWeatherNone = weatherMutationEnabled && selectedWeatherMutations.includes("none");
        const includeColorNone = colorMutationEnabled && selectedColorMutations.includes("none");

        // If both categories are disabled or only "none" is selected
        if ((weatherMuts.length === 0 && colorMuts.length === 0) ||
            (!weatherMutationEnabled && !colorMutationEnabled)) {
            combinations.push([]);
            return combinations;
        }

        // Mutation groups (mutually exclusive within each group)
        const wetGroup = ["Wet", "Chilled", "Frozen"];
        const lunarGroup = ["Dawnlit", "Ambershine", "Dawncharged", "Ambercharged"];

        const selectedWet = weatherMuts.filter(m => wetGroup.includes(m));
        const selectedLunar = weatherMuts.filter(m => lunarGroup.includes(m));

        // Helper to generate weather × color combinations
        const generateCombos = (weatherCombos: string[][], colorCombos: string[][]) => {
            if (weatherCombos.length === 0 && colorCombos.length === 0) {
                // Both empty - add empty combination
                combinations.push([]);
            } else if (weatherCombos.length === 0) {
                // Only color combinations
                colorCombos.forEach(colorCombo => {
                    combinations.push([...colorCombo]);
                });
            } else if (colorCombos.length === 0) {
                // Only weather combinations
                weatherCombos.forEach(weatherCombo => {
                    combinations.push([...weatherCombo]);
                });
            } else {
                // Combine weather and color
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
            weatherCombos.push([]); // Empty array = no weather mutations
        }

        if (weatherMatchMode === "all" && weatherMuts.length > 0) {
            const hasMultipleWet = selectedWet.length > 1;
            const hasMultipleLunar = selectedLunar.length > 1;

            if (hasMultipleWet || hasMultipleLunar) {
                // Invalid combination
                return [];
            }

            // Valid "All" combination
            weatherCombos.push(weatherMuts);
        } else if (weatherMatchMode === "any" && weatherMuts.length > 0) {
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
            colorCombos.push([]); // Empty array = no color mutations
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

    /**
     * Generate preview plant sprites based on valid mutation combinations
     */
    function generatePreviewPlants(container: HTMLElement): { previews: HTMLElement[], remaining: number } {
        const previews: HTMLElement[] = [];
        const exampleSpecies = species || "Starweaver";

        // Calculate max previews based on container width
        // Flexbox with 48px items and 6px gap
        const containerWidth = container.offsetWidth || modal.offsetWidth || 600;
        const itemWidth = 48; // Fixed item width
        const gap = 6; // Gap between items

        // Calculate how many items fit per row
        const itemsPerRow = Math.max(4, Math.floor((containerWidth + gap) / (itemWidth + gap)));

        // Show 2 full rows, last slot reserved for badge
        const MAX_PREVIEWS = Math.max(7, (itemsPerRow * 2) - 1);

        const hasAnyCondition = sizeEnabled || weatherMutationEnabled || colorMutationEnabled;

        if (!hasAnyCondition) {
            // No conditions enabled, show normal plant
            previews.push(createPreviewPlant(exampleSpecies, []));
            return { previews, remaining: 0 };
        }

        const validCombinations = generateValidCombinations();

        if (validCombinations.length === 0) {
            // Invalid combination selected
            const errorMsg = element("div", {
                style: "padding: 12px; text-align: center; color: #ef4444; font-size: 12px;",
            }, "⚠️ Invalid mutation combination");
            previews.push(errorMsg);
            return { previews, remaining: 0 };
        }

        // Generate previews for first MAX_PREVIEWS combinations
        const displayCount = Math.min(validCombinations.length, MAX_PREVIEWS);
        for (let i = 0; i < displayCount; i++) {
            previews.push(createPreviewPlant(exampleSpecies, validCombinations[i]));
        }

        const remaining = Math.max(0, validCombinations.length - MAX_PREVIEWS);
        return { previews, remaining };
    }

    /**
     * Create a preview plant element (compact, no labels)
     */
    function createPreviewPlant(speciesName: string, mutations: string[]): HTMLElement {
        const container = element("div", {
            style: `
                display: flex;
                align-items: center;
                justify-content: center;
                width: 48px;
                height: 48px;
                padding: 4px;
                background: color-mix(in oklab, var(--fg) 5%, transparent);
                border: 1px solid color-mix(in oklab, var(--fg) 10%, transparent);
                border-radius: 6px;
                flex-shrink: 0;
            `,
        });

        if (MGSprite.isReady()) {
            try {
                // Get sprite ID from MGData
                const plantsData = MGData.get("plants") as Record<string, any> | null;
                const plantInfo = plantsData?.[speciesName];
                const spriteId = plantInfo?.crop?.spriteId;

                if (spriteId) {
                    const canvas = MGSprite.toCanvas(spriteId, {
                        mutations: mutations.length > 0 ? (mutations as any) : undefined,
                        boundsMode: "padded" as any,
                    });
                    if (canvas) {
                        canvas.style.maxWidth = "40px";
                        canvas.style.maxHeight = "40px";
                        canvas.style.width = "auto";
                        canvas.style.height = "auto";
                        canvas.style.display = "block";
                        container.appendChild(canvas);
                    }
                } else {
                    throw new Error(`No sprite ID found for ${speciesName}`);
                }
            } catch (error) {
                console.warn(`[RuleEditorModal] Failed to load sprite for plant: ${speciesName}`, error);
                // Fallback
                const placeholder = element("div", {
                    style: "width: 40px; height: 40px; background: color-mix(in oklab, var(--accent) 20%, transparent); border-radius: 4px;",
                });
                container.appendChild(placeholder);
            }
        } else {
            // MGSprite not ready
            const placeholder = element("div", {
                style: "width: 40px; height: 40px; background: color-mix(in oklab, var(--accent) 20%, transparent); border-radius: 4px;",
            });
            container.appendChild(placeholder);
        }

        return container;
    }

    /**
     * Action buttons
     */
    function renderActions(): HTMLElement {
        const container = element("div", {
            style: "display: flex; gap: 8px; justify-content: space-between;",
        });

        // Left side: Delete button
        const leftActions = element("div", {
            style: "display: flex; gap: 8px;",
        });

        const deleteBtn = Button({
            label: "Delete Rule",
            variant: "danger",
            onClick: () => {
                if (ruleId && onDelete) {
                    // Deleting an existing rule
                    onDelete();
                }
                destroy();
            },
        });
        leftActions.appendChild(deleteBtn);

        container.appendChild(leftActions);

        // Right side: Cancel and Save buttons
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

        const saveBtn = Button({
            label: "Save",
            variant: "primary",
            disabled: !isValid(),
            onClick: () => {
                if (!isValid()) return;

                const data: RuleEditorData = {
                    name: ruleName.trim(),
                    ruleMode,
                };

                if (sizeEnabled) {
                    data.sizeCondition = {
                        enabled: true,
                        minPercentage: sizePercentage,
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
            },
        });
        rightActions.appendChild(saveBtn);

        // Store reference to the button element for updating disabled state
        saveButtonElement = saveBtn as unknown as HTMLButtonElement;

        container.appendChild(rightActions);

        return container;
    }

    /**
     * Validate form
     */
    function isValid(): boolean {
        if (!ruleName.trim()) return false;

        // At least one filter must be enabled
        if (!sizeEnabled && !colorMutationEnabled && !weatherMutationEnabled) return false;

        // If weather mutation is enabled, must have at least one selected
        if (weatherMutationEnabled && selectedWeatherMutations.length === 0) return false;

        // If color mutation is enabled, must have at least one selected
        if (colorMutationEnabled && selectedColorMutations.length === 0) return false;

        return true;
    }

    /**
     * Update save button disabled state without re-rendering
     */
    function updateSaveButtonState(): void {
        if (saveButtonElement) {
            saveButtonElement.disabled = !isValid();
        }
    }

    /**
     * Get available weather mutations (excluding Gold/Rainbow)
     */
    function getAvailableWeatherMutations(): string[] {
        if (!MGSprite.isReady()) {
            console.warn("[RuleEditorModal] MGSprite not ready yet");
            return [];
        }
        try {
            const allMutations = MGSprite.getMutationNames();
            return allMutations.filter(m => m !== "Gold" && m !== "Rainbow");
        } catch (error) {
            console.error("[RuleEditorModal] Failed to get mutation names:", error);
            return [];
        }
    }

    /**
     * Destroy modal
     */
    function destroy(): void {
        overlay.remove();
    }

    // Build and attach
    overlay.appendChild(modal);
    render();
    (mountRoot ?? document.body).appendChild(overlay);

    // Close on overlay click
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            onCancel?.();
            destroy();
        }
    });

    return {
        root: overlay,
        destroy,
    };
}
