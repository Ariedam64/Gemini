/**
 * Weather Mutation Section
 * Weather mutation selector with match mode (any/all)
 */

import { element } from "../../../../../styles/helpers";
import { Card } from "../../../../../components/Card/Card";
import { Checkbox } from "../../../../../components/Checkbox/Checkbox";
import { SegmentedControl } from "../../../../../components/SegmentedControl/SegmentedControl";
import { createMutationItem, type MutationItemHandle } from "./MutationItemFactory";
import {
    getAvailableWeatherMutations,
    formatMutationNames,
    isWetMutation,
    isLunarMutation,
    cleanSelectionsForAllMode,
} from "../helpers";
import type { RuleMode, MutationMatchMode } from "../../../../../../features/harvestLocker";

/* ─────────────────────────── Types ─────────────────────────── */

export interface WeatherMutationSectionOptions {
    /** Whether weather mutation condition is enabled */
    enabled: boolean;
    /** Currently selected weather mutations */
    selected: string[];
    /** Match mode (any/all) */
    matchMode: MutationMatchMode;
    /** Current rule mode (lock/allow) */
    ruleMode: RuleMode;
    /** Callback when enabled changes */
    onEnabledChange: (enabled: boolean) => void;
    /** Callback when selection changes */
    onSelectionChange: (selected: string[]) => void;
    /** Callback when match mode changes */
    onMatchModeChange: (mode: MutationMatchMode) => void;
    /** Whether section is expanded */
    expanded?: boolean;
    /** Callback when expand state changes */
    onExpandChange?: (expanded: boolean) => void;
}

export interface WeatherMutationSectionHandle {
    root: HTMLElement;
    /** Update the rule mode (affects description text) */
    setRuleMode(mode: RuleMode): void;
    /** Get current selection */
    getSelection(): string[];
    /** Get current match mode */
    getMatchMode(): MutationMatchMode;
    destroy(): void;
}

/* ─────────────────────────── Factory ─────────────────────────── */

export function createWeatherMutationSection(options: WeatherMutationSectionOptions): WeatherMutationSectionHandle {
    const {
        enabled: initialEnabled,
        selected: initialSelected,
        matchMode: initialMatchMode,
        ruleMode: initialRuleMode,
        onEnabledChange,
        onSelectionChange,
        onMatchModeChange,
        expanded = false,
        onExpandChange,
    } = options;

    let enabled = initialEnabled;
    let selected = [...initialSelected];
    let matchMode = initialMatchMode;
    let ruleMode = initialRuleMode;

    // References
    let descriptionEl: HTMLElement | null = null;
    const itemHandles: Map<string, MutationItemHandle> = new Map();

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
            title: "Weather Mutation",
            subtitle: "Weather-based mutation variants",
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
        itemHandles.clear();
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

        // Dynamic description (always created when enabled, text set when selections exist)
        if (enabled) {
            descriptionEl = element("div", {
                style: "font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); line-height: 1.4;",
            });
            if (selected.length > 0) {
                descriptionEl.textContent = getDescriptionText();
            }
            topRow.appendChild(descriptionEl);
        }

        content.appendChild(topRow);

        // Controls wrapper (always rendered, greyed out when disabled)
        const controlsWrapper = element("div", {
            style: (enabled ? "" : "opacity: 0.4; pointer-events: none;") + " display: flex; flex-direction: column; gap: 12px; transition: opacity 0.2s ease;",
        });

        // Match mode control
        const matchModeRow = element("div", {
            style: "display: flex; justify-content: center;",
        });

        const matchModeControl = SegmentedControl({
            segments: [
                { id: "any", label: "Any" },
                { id: "all", label: "All" },
            ],
            selected: matchMode,
            onChange: (id) => {
                matchMode = id as MutationMatchMode;

                // Clean up selections when switching to "all" mode
                if (id === "all") {
                    selected = cleanSelectionsForAllMode(selected);
                    onSelectionChange(selected);
                }

                onMatchModeChange(matchMode);
                render();
            },
        });
        matchModeRow.appendChild(matchModeControl);
        controlsWrapper.appendChild(matchModeRow);

        // Mutation grid
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
            const isSelected = selected.includes(mutation);
            const itemHandle = createMutationItem({
                mutationId: mutation,
                isSelected,
                onToggle: () => handleToggle(mutation),
                label: mutation === "none" ? "None" : undefined,
            });
            itemHandles.set(mutation, itemHandle);
            grid.appendChild(itemHandle.root);
        });

        controlsWrapper.appendChild(grid);
        content.appendChild(controlsWrapper);
    }

    function handleToggle(mutation: string): void {
        if (matchMode === "all") {
            // "all" mode : none exclusif + un seul par groupe
            if (mutation === "none") {
                if (selected.length === 1 && selected[0] === "none") {
                    selected = [];
                } else {
                    selected = ["none"];
                }
            } else {
                if (selected.includes("none")) {
                    return;
                }

                if (selected.includes(mutation)) {
                    selected = selected.filter(m => m !== mutation);
                } else {
                    if (isWetMutation(mutation)) {
                        selected = selected.filter(m => !isWetMutation(m));
                    } else if (isLunarMutation(mutation)) {
                        selected = selected.filter(m => !isLunarMutation(m));
                    }
                    selected = [...selected, mutation];
                }
            }
        } else {
            // "any" mode : toggle libre, pas de contrainte
            if (selected.includes(mutation)) {
                selected = selected.filter(m => m !== mutation);
            } else {
                selected = [...selected, mutation];
            }
        }

        onSelectionChange(selected);
        updateDescription();
        updateItemStates();
    }

    function updateDescription(): void {
        if (descriptionEl) {
            descriptionEl.textContent = selected.length > 0 ? getDescriptionText() : "";
        }
    }

    function updateItemStates(): void {
        const noneBlocks = matchMode === "all" && selected.includes("none");
        itemHandles.forEach((handle, mutation) => {
            handle.setSelected(selected.includes(mutation));
            handle.setDisabled(noneBlocks && mutation !== "none");
        });
    }

    function getDescriptionText(): string {
        const displayNames = formatMutationNames(selected);
        const matchText = matchMode === "all" ? "AND" : "OR";

        return ruleMode === "lock"
            ? `Lock ${displayNames} plants (${matchText})`
            : `Allow ${displayNames} plants (${matchText})`;
    }

    /* ───────────────────── Public API ───────────────────── */

    function setRuleMode(mode: RuleMode): void {
        ruleMode = mode;
        updateDescription();
    }

    function getSelection(): string[] {
        return [...selected];
    }

    function getMatchMode(): MutationMatchMode {
        return matchMode;
    }

    function destroy(): void {
        descriptionEl = null;
        itemHandles.clear();
    }

    return {
        root: card,
        setRuleMode,
        getSelection,
        getMatchMode,
        destroy,
    };
}
