/**
 * Size Section
 * Size condition editor with enable toggle and percentage slider
 */

import { element } from "../../../../../styles/helpers";
import { Card } from "../../../../../components/Card/Card";
import { Checkbox } from "../../../../../components/Checkbox/Checkbox";
import { Slider } from "../../../../../components/Slider/Slider";
import type { RuleMode } from "../../../../../../features/harvestLocker";

/* ─────────────────────────── Types ─────────────────────────── */

export interface SizeSectionOptions {
    /** Whether size condition is enabled */
    enabled: boolean;
    /** Minimum size percentage (50-100) */
    percentage: number;
    /** Current rule mode (lock/allow) */
    ruleMode: RuleMode;
    /** Callback when enabled changes */
    onEnabledChange: (enabled: boolean) => void;
    /** Callback when percentage changes */
    onPercentageChange: (percentage: number) => void;
    /** Whether section is expanded */
    expanded?: boolean;
    /** Callback when expand state changes */
    onExpandChange?: (expanded: boolean) => void;
}

export interface SizeSectionHandle {
    root: HTMLElement;
    /** Update the rule mode (affects description text) */
    setRuleMode(mode: RuleMode): void;
    destroy(): void;
}

/* ─────────────────────────── Factory ─────────────────────────── */

export function createSizeSection(options: SizeSectionOptions): SizeSectionHandle {
    const {
        enabled: initialEnabled,
        percentage: initialPercentage,
        ruleMode: initialRuleMode,
        onEnabledChange,
        onPercentageChange,
        expanded = false,
        onExpandChange,
    } = options;

    let enabled = initialEnabled;
    let percentage = initialPercentage;
    let ruleMode = initialRuleMode;

    // References for live updates
    let descriptionEl: HTMLElement | null = null;
    let valueDisplayEl: HTMLElement | null = null;
    let sliderContainer: HTMLElement | null = null;

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
            title: "Size",
            subtitle: "Minimum growth percentage",
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

        // Slider row (always rendered, greyed out when disabled)
        const controlsWrapper = element("div", {
            style: enabled ? "" : "opacity: 0.4; pointer-events: none; transition: opacity 0.2s ease;",
        });

        sliderContainer = element("div", {
            style: "display: flex; flex-direction: column; gap: 4px;",
        });

        // Label with value display
        const labelContainer = element("div", {
            style: "display: flex; justify-content: space-between; align-items: center;",
        });

        const labelText = element("div", {
            style: "font-size: 12px; color: var(--fg); font-weight: 500;",
        }, "Minimum Size");

        valueDisplayEl = element("span", {
            style: "font-size: 12px; font-weight: 600; color: var(--accent);",
        }, `${percentage}%`);

        labelContainer.appendChild(labelText);
        labelContainer.appendChild(valueDisplayEl);
        sliderContainer.appendChild(labelContainer);

        // Slider
        const slider = Slider({
            min: 50,
            max: 100,
            step: 1,
            value: percentage,
            showValue: false,
            onInput: (value) => {
                // Live update during drag
                percentage = value;
                if (valueDisplayEl) valueDisplayEl.textContent = `${value}%`;
                if (descriptionEl) descriptionEl.textContent = getDescriptionText();
            },
            onChange: (value) => {
                // Final update when drag ends
                percentage = value;
                onPercentageChange(value);
            },
        });
        sliderContainer.appendChild(slider.root);

        controlsWrapper.appendChild(sliderContainer);
        content.appendChild(controlsWrapper);
    }

    function getDescriptionText(): string {
        return ruleMode === "lock"
            ? `Lock plants smaller than ${percentage}%`
            : `Allow harvesting plants smaller than ${percentage}%`;
    }

    /* ───────────────────── Public API ───────────────────── */

    function setRuleMode(mode: RuleMode): void {
        ruleMode = mode;
        if (descriptionEl) {
            descriptionEl.textContent = getDescriptionText();
        }
    }

    function destroy(): void {
        descriptionEl = null;
        valueDisplayEl = null;
        sliderContainer = null;
    }

    return {
        root: card,
        setRuleMode,
        destroy,
    };
}
