/**
 * Color Mutation Section
 * Color mutation selector (None, Gold, Rainbow)
 */

import { element } from "../../../../../styles/helpers";
import { Card } from "../../../../../components/Card/Card";
import { Checkbox } from "../../../../../components/Checkbox/Checkbox";
import { createMutationItem, type MutationItemHandle } from "./MutationItemFactory";
import { COLOR_MUTATIONS } from "../types";
import type { RuleMode } from "../../../../../../features/harvestLocker";

/* ─────────────────────────── Types ─────────────────────────── */

export interface ColorMutationSectionOptions {
    /** Whether color mutation condition is enabled */
    enabled: boolean;
    /** Currently selected color mutations */
    selected: string[];
    /** Current rule mode (lock/allow) */
    ruleMode: RuleMode;
    /** Callback when enabled changes */
    onEnabledChange: (enabled: boolean) => void;
    /** Callback when selection changes */
    onSelectionChange: (selected: string[]) => void;
    /** Whether section is expanded */
    expanded?: boolean;
    /** Callback when expand state changes */
    onExpandChange?: (expanded: boolean) => void;
}

export interface ColorMutationSectionHandle {
    root: HTMLElement;
    /** Update the rule mode (affects description text) */
    setRuleMode(mode: RuleMode): void;
    /** Get current selection */
    getSelection(): string[];
    destroy(): void;
}

/* ─────────────────────────── Factory ─────────────────────────── */

export function createColorMutationSection(options: ColorMutationSectionOptions): ColorMutationSectionHandle {
    const {
        enabled: initialEnabled,
        selected: initialSelected,
        ruleMode: initialRuleMode,
        onEnabledChange,
        onSelectionChange,
        expanded = false,
        onExpandChange,
    } = options;

    let enabled = initialEnabled;
    let selected = [...initialSelected];
    let ruleMode = initialRuleMode;

    // References
    let descriptionEl: HTMLElement | null = null;
    const itemHandles: MutationItemHandle[] = [];

    const content = element("div", {
        style: "display: flex; flex-direction: column; gap: 12px;",
    });

    // Enabled badge (top-right of card header)
    const enabledBadgeEl = element("div", {
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
    }, "Enabled");

    render();

    const card = Card(
        {
            title: "Color Mutation",
            subtitle: "Gold / Rainbow color variants",
            actions: [enabledBadgeEl],
            variant: "soft",
            padding: "md",
            expandable: true,
            defaultExpanded: expanded,
            onExpandChange,
        },
        content
    );


    /* ───────────────────── Rendering ───────────────────── */

    function render(): void {
        content.replaceChildren();
        itemHandles.length = 0;
        enabledBadgeEl.style.display = enabled ? "" : "none";

        // Top row: Checkbox + Description
        const topRow = element("div", {
            style: "display: flex; align-items: center; gap: 12px;",
        });

        const checkbox = Checkbox({
            checked: enabled,
            label: "Enable",
            size: "md",
            onChange: (checked) => {
                enabled = checked;
                onEnabledChange(checked);
                render();
            },
        });
        topRow.appendChild(checkbox.root);

        // Dynamic description
        if (enabled) {
            descriptionEl = element("div", {
                style: "font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); line-height: 1.4;",
            }, getDescriptionText());
            topRow.appendChild(descriptionEl);
        }

        content.appendChild(topRow);

        // Color mutations grid (always rendered, greyed out when disabled)
        const controlsWrapper = element("div", {
            style: enabled ? "" : "opacity: 0.4; pointer-events: none; transition: opacity 0.2s ease;",
        });

        const grid = element("div", {
            style: `
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
                gap: 8px;
            `,
        });

        COLOR_MUTATIONS.forEach(colorOption => {
            const isSelected = selected.includes(colorOption);
            const itemHandle = createMutationItem({
                mutationId: colorOption,
                isSelected,
                onToggle: () => handleToggle(colorOption),
            });
            itemHandles.push(itemHandle);
            grid.appendChild(itemHandle.root);
        });

        controlsWrapper.appendChild(grid);
        content.appendChild(controlsWrapper);
    }

    function handleToggle(colorOption: string): void {
        const isSelected = selected.includes(colorOption);

        if (isSelected) {
            // Deselect - but ensure minimum 1 selection
            const filtered = selected.filter(c => c !== colorOption);
            if (filtered.length === 0) {
                return; // Can't deselect if it would leave nothing
            }
            selected = filtered;
        } else {
            // Select - enforce max 3
            if (selected.length >= 3) {
                return;
            }
            selected = [...selected, colorOption];
        }

        onSelectionChange(selected);
        updateDescription();
        updateItemStates();
    }

    function updateDescription(): void {
        if (descriptionEl) {
            descriptionEl.textContent = getDescriptionText();
        }
    }

    function updateItemStates(): void {
        COLOR_MUTATIONS.forEach((colorOption, index) => {
            const handle = itemHandles[index];
            if (handle) {
                handle.setSelected(selected.includes(colorOption));
            }
        });
    }

    function getDescriptionText(): string {
        const selectedNames = selected
            .map(c => c === "none" ? "normal" : c.toLowerCase())
            .join(", ");

        return ruleMode === "lock"
            ? `Lock ${selectedNames} plants`
            : `Allow ${selectedNames} plants`;
    }

    /* ───────────────────── Public API ───────────────────── */

    function setRuleMode(mode: RuleMode): void {
        ruleMode = mode;
        updateDescription();
    }

    function getSelection(): string[] {
        return [...selected];
    }

    function destroy(): void {
        descriptionEl = null;
        itemHandles.length = 0;
    }

    return {
        root: card,
        setRuleMode,
        getSelection,
        destroy,
    };
}
